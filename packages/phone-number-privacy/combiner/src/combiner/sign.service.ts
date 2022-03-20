import {
  DomainRestrictedSignatureRequest,
  ErrorMessage,
  ErrorType,
  KEY_VERSION_HEADER,
  OdisResponse,
  SignMessageRequest,
  WarningMessage,
} from '@celo/phone-number-privacy-common'
import { Request } from 'express'
import { HeaderInit } from 'node-fetch'
import { CombinerService, Session } from './combiner.service'

export type SignatureRequest = SignMessageRequest | DomainRestrictedSignatureRequest
export type SignatureResponse<R extends SignatureRequest> = OdisResponse<R>

// export class SignSession<R extends SignatureRequest> extends SessionBase<R> {
//   protected readonly blsCryptoClient: BLSCryptographyClient

//   public constructor(
//     readonly request: Request<{}, {}, R>,
//     readonly response: Response<OdisResponse<R>>,
//     readonly service: SignService<R>
//   ) {
//     super(request, response, service)
//     this.blsCryptoClient = new BLSCryptographyClient(service.threshold, service.pubKey, service.polynomial)
//   }
// }

// tslint:disable-next-line: max-classes-per-file
export abstract class SignService<R extends SignatureRequest> extends CombinerService<R> {
  // readonly blsCryptoClient: BLSCryptographyClient
  // readonly pubKey: string
  // readonly keyVersion: number
  // readonly polynomial: string

  // public constructor(config: OdisConfig) {
  //   super(config)
  //   this.pubKey = config.keys.pubKey
  //   this.keyVersion = config.keys.version
  //   this.polynomial = config.keys.polynomial
  //   // TODO(Alec): add this to session (NEXT)
  //   // this.blsCryptoClient = new BLSCryptographyClient(this.threshold, this.pubKey, this.polynomial)
  // }

  protected headers(request: Request<{}, {}, R>): HeaderInit | undefined {
    return {
      ...super.headers(request),
      [KEY_VERSION_HEADER]: this.keyVersion.toString(),
    }
  }

  protected async handleResponseOK(
    data: string,
    status: number,
    url: string,
    session: Session<R>
  ): Promise<void> {
    const res = JSON.parse(data)

    const resKeyVersion: number = Number(res.header(KEY_VERSION_HEADER))
    session.logger.info({ resKeyVersion }, 'Signer responded with key version')
    if (resKeyVersion !== this.keyVersion) {
      throw new Error(ErrorMessage.INVALID_KEY_VERSION_RESPONSE)
    }

    const signature = this.parseSignature(res, url, session)
    if (!signature) {
      throw new Error(ErrorMessage.SIGNATURE_MISSING_FROM_SIGNER_RESPONSE)
    }

    session.responses.push({ url, res, status })

    session.logger.info({ signer: url }, 'Add signature')
    const signatureAdditionStart = Date.now()
    session.blsCryptoClient.addSignature({ url, signature })
    session.logger.info(
      {
        signer: url,
        hasSufficientSignatures: session.blsCryptoClient.hasSufficientSignatures(),
        additionLatency: Date.now() - signatureAdditionStart,
      },
      'Added signature'
    )
    // Send response immediately once we cross threshold
    // BLS threshold signatures can be combined without all partial signatures
    if (session.blsCryptoClient.hasSufficientSignatures()) {
      try {
        await session.blsCryptoClient.combinePartialBlindedSignatures(
          this.parseBlindedMessage(session.request.body)
        )
        // Close outstanding requests
        session.controller.abort() // 2
      } catch {
        // Already logged, continue to collect signatures
      }
    }
  }

  // protected buildSession(
  //   request: Request<{}, {}, R>,
  //   response: Response<OdisResponse<R>>,
  //   service: this
  // ): Session<R> {
  //   return new SignSession<R>(request, response, service)
  // }

  protected abstract logResponseDiscrepancies(session: Session<R>): void

  protected reqKeyHeaderCheck(request: Request<{}, {}, R>): boolean {
    const reqKeyVersion = request.headers[KEY_VERSION_HEADER]
    if (reqKeyVersion && Number(reqKeyVersion) !== this.keyVersion) {
      return false
    }
    return true
  }

  protected handleMissingSignatures(session: Session<R>) {
    let error: ErrorType = ErrorMessage.NOT_ENOUGH_PARTIAL_SIGNATURES
    const majorityErrorCode = session.getMajorityErrorCode()
    if (majorityErrorCode === 403) {
      error = WarningMessage.EXCEEDED_QUOTA
    }
    this.sendFailureResponse(error, majorityErrorCode ?? 500, session)
  }

  protected sendSuccessResponse(res: SignatureResponse<R>, status: number, session: Session<R>) {
    session.response.status(status).json(res)
  }

  protected abstract parseSignature(
    res: SignatureResponse<R>,
    signerUrl: string,
    session: Session<R>
  ): string | undefined

  protected abstract parseBlindedMessage(req: R): string
}