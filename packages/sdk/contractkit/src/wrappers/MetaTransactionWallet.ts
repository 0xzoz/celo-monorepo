import { Address, ensureLeading0x, trimLeading0x } from '@celo/base/lib/address'
import { Signature } from '@celo/base/lib/signatureUtils'
import { CeloTransactionObject, CeloTxObject, toTransactionObject } from '@celo/connect'
import { EIP712TypedData } from '@celo/utils/lib/sign-typed-data-utils'
import BigNumber from 'bignumber.js'
import { MetaTransactionWallet } from '../generated/MetaTransactionWallet'
import {
  BaseWrapper,
  proxyCall,
  proxySend,
  stringIdentity,
  valueToInt,
  valueToString
} from './BaseWrapper'

export interface TransactionObjectWithValue<T> {
  txo: CeloTxObject<T>
  value: BigNumber.Value
}

export interface RawTransaction {
  destination: string
  value: string
  data: string
}

export interface RawTransactionWithRefund extends RawTransaction {
  maxGasPrice: number
  gasLimit: number
  metaGasLimit: number
  gasCurrency: string
}

//These are the types we care about
export type TransactionInput<T> =
  | CeloTxObject<T>
  | TransactionObjectWithValue<T>
  | RawTransaction
  | RawTransactionWithRefund

/**
 * Class that wraps the MetaTransactionWallet
 */
export class MetaTransactionWalletWrapper extends BaseWrapper<MetaTransactionWallet> {
  /**
   * Execute a transaction originating from the MTW
   * Reverts if the caller is not a signer
   * @param tx a TransactionInput
   */
  public executeTransaction(tx: TransactionInput<any>): CeloTransactionObject<string> {
    const rawTx = toRawTransaction(tx)
    return toTransactionObject(
      this.kit.connection,
      this.contract.methods.executeTransaction(rawTx.destination, rawTx.value, rawTx.data)
    )
  }

  /**
   * Execute a batch of transactions originating from the MTW
   * Reverts if the caller is not a signer
   * @param txs An array of TransactionInput
   */
  public executeTransactions(
    txs: Array<TransactionInput<any>>
  ): CeloTransactionObject<{ 0: string; 1: string[] }> {
    const { destinations, values, callData, callDataLengths } = toTransactionBatch(txs)

    return toTransactionObject(
      this.kit.connection,
      this.contract.methods.executeTransactions(destinations, values, callData, callDataLengths)
    )
  }

  /**
   * Execute a signed meta transaction
   * Reverts if meta-tx signer is not a signer for the wallet
   * @param tx a TransactionInput
   * @param signature a Signature
   */
  public executeMetaTransaction(
    tx: TransactionInput<any>,
    signature: Signature
  ): CeloTransactionObject<string> {
    const rawTx = toRawTransaction(tx) 

    return toTransactionObject(
      this.kit.connection,
      this.contract.methods.executeMetaTransaction(
        rawTx.destination,
        rawTx.value,
        rawTx.data,
        signature.v,
        signature.r,
        signature.s
      )
    )
  }

  /**
   * Execute a signed refundable meta transaction
   * Reverts if meta-tx signer is not a signer for the wallet
   * @param tx a TransactionInput
   * @param signature a Signature
   */
  public executeMetaTransactionWithRefund(
    tx: TransactionInput<any>,
    signature: Signature,
    maxGasPrice: number,
    gasLimit: number,
    metaGasLimit: number,
    gasCurrency: string
  ): CeloTransactionObject<string> {
    const rawTx = toRawTransactionWithRefund(tx, maxGasPrice, gasLimit, metaGasLimit, gasCurrency)

    return toTransactionObject(
      this.kit.connection,
      this.contract.methods.executeMetaTransactionWithRefund(
        rawTx.destination,
        rawTx.value,
        rawTx.data,
        rawTx.maxGasPrice,
        rawTx.gasLimit,
        rawTx.metaGasLimit,
        rawTx.gasCurrency,
        signature.v,
        signature.r,
        signature.s
      )
    )
  }

  /**
   * Signs a meta transaction as EIP712 typed data
   * @param tx a TransactionWrapper
   * @param nonce Optional -- will query contract state if not passed
   * @returns signature a Signature
   */
  public async signMetaTransaction(tx: TransactionInput<any>, nonce?: number): Promise<Signature> {
    if (nonce === undefined) {
      nonce = await this.nonce()
    }
    const typedData = buildMetaTxTypedData(
      this.address,
      toRawTransaction(tx),
      nonce,
      await this.chainId()
    )
    const signer = await this.signer()
    return this.kit.connection.signTypedData(signer, typedData)
  }

  /**
   * Signs a refundable meta transaction as EIP712 typed data
   * @param tx a TransactionWrapper
   * @param nonce Optional -- will query contract state if not passed
   * @returns signature a Signature
   */
   public async signMetaTransactionWithRefund(tx: TransactionInput<any>, maxGasPrice: number, gasLimit: number, metaGasLimit: number, gasCurrency: string, nonce?: number): Promise<Signature> {
    if (nonce === undefined) {
      nonce = await this.nonce()
    }
    const typedData = buildMetaTxWithRefundTypedData(
      this.address,
      toRawTransactionWithRefund(tx, maxGasPrice, gasLimit, metaGasLimit, gasCurrency),
      nonce,
      await this.chainId()
    )
    const signer = await this.signer()
    return this.kit.connection.signTypedData(signer, typedData)
  }

  /**
   * Sign and execute a signed meta transaction
   * Reverts if meta-tx signer is not a signer for the wallet
   * @param tx a TransactionInput
   */
  public async signAndExecuteMetaTransaction(
    tx: TransactionInput<any>
  ): Promise<CeloTransactionObject<string>> {
    const signature = await this.signMetaTransaction(tx)
    return this.executeMetaTransaction(tx, signature)
  }

  /**
   * Sign and execute a refundable meta transaction
   * Reverts if meta-tx signer is not a signer for the wallet
   * @param tx a TransactionInput
   */
   public async signAndExecuteMetaTransactionWithRefund(
    tx: TransactionInput<any>,
    maxGasPrice: number, 
    gasLimit: number, 
    metaGasLimit: number, 
    gasCurrency: string
  ): Promise<CeloTransactionObject<string>> {
    const signature = await this.signMetaTransactionWithRefund(tx, maxGasPrice, gasLimit, metaGasLimit, gasCurrency)
    return this.executeMetaTransactionWithRefund(tx, signature, maxGasPrice, gasLimit, metaGasLimit, gasCurrency)
  }

  private getMetaTransactionDigestParams = (
    tx: TransactionInput<any>,
    nonce: number
  ): [string, string, string, number] => {
    const rawTx = toRawTransaction(tx)
    return [rawTx.destination, rawTx.value, rawTx.data, nonce]
  }

  private getMetaTransactionWithRefundDigestParams = (
    tx: TransactionInput<any>,
    nonce: number,
    maxGasPrice: number, 
    gasLimit: number, 
    metaGasLimit: number, 
    gasCurrency: string
  ): [string, string, string, number, number, number, string, number] => {
    const rawTx = toRawTransactionWithRefund(tx, maxGasPrice, gasLimit, metaGasLimit, gasCurrency)
    return [rawTx.destination, rawTx.value, rawTx.data, rawTx.maxGasPrice, rawTx.gasLimit, rawTx.metaGasLimit, rawTx.gasCurrency, nonce]
  }

  getMetaTransactionDigest = proxyCall(
    this.contract.methods.getMetaTransactionDigest,
    this.getMetaTransactionDigestParams,
    stringIdentity
  )

  getMetaTransactionWithRefundDigest = proxyCall(
    this.contract.methods.getMetaTransactionWithRefundDigest,
    this.getMetaTransactionWithRefundDigestParams,
    stringIdentity
  )

  private getMetaTransactionSignerParams = (
    tx: TransactionInput<any>,
    nonce: number,
    signature: Signature
  ): [string, string, string, number, number, string, string] => {
    const rawTx = toRawTransaction(tx)
    return [
      rawTx.destination,
      rawTx.value,
      rawTx.data,
      nonce,
      signature.v,
      signature.r,
      signature.s,
    ]
  }

  private getMetaTransactionWithRefundSignerParams = (
    tx: TransactionInput<any>,
    nonce: number,
    signature: Signature,
    maxGasPrice: number, 
    gasLimit: number, 
    metaGasLimit: number, 
    gasCurrency: string
  ): [string, string, string, number, number, number, string, number, number, string, string] => {
    const rawTx = toRawTransactionWithRefund(tx, maxGasPrice, gasLimit, metaGasLimit, gasCurrency)
    return [
      rawTx.destination,
      rawTx.value,
      rawTx.data,
      rawTx.maxGasPrice, 
      rawTx.gasLimit, 
      rawTx.metaGasLimit, 
      rawTx.gasCurrency,
      nonce,
      signature.v,
      signature.r,
      signature.s,
    ]
  }

  getMetaTransactionSigner = proxyCall(
    this.contract.methods.getMetaTransactionSigner,
    this.getMetaTransactionSignerParams,
    stringIdentity
  )

  getMetaTransactionWithRefundSigner = proxyCall(
    this.contract.methods.getMetaTransactionWithRefundSigner,
    this.getMetaTransactionWithRefundSignerParams,
    stringIdentity
  )

  eip712DomainSeparator = proxyCall(this.contract.methods.eip712DomainSeparator)
  isOwner = proxyCall(this.contract.methods.isOwner)
  nonce = proxyCall(this.contract.methods.nonce, undefined, valueToInt)
  private getSigner = proxyCall(this.contract.methods.signer, undefined, stringIdentity)

  transferOwnership: (newOwner: Address) => CeloTransactionObject<void> = proxySend(
    this.kit,
    this.contract.methods.transferOwnership
  )

  setSigner: (newSigner: Address) => CeloTransactionObject<void> = proxySend(
    this.kit,
    this.contract.methods.setSigner
  )

  setEip712DomainSeparator: () => CeloTransactionObject<void> = proxySend(
    this.kit,
    this.contract.methods.setEip712DomainSeparator
  )

  /**
   * Get and cache the chain ID -- assume it's static for a kit instance
   * @returns chainId
   */
  _chainId?: number
  private async chainId(): Promise<number> {
    this._chainId = this._chainId ?? (await this.kit.connection.chainId())
    if (this._chainId === undefined) {
      this._chainId = await this.kit.connection.chainId()
    }
    return this._chainId!
  }

  /**
   * Get an cache the signer - it should be static for a Wallet instance
   * @returns signer
   */
  _signer?: Address
  public async signer() {
    if (this._signer === undefined) {
      this._signer = await this.getSigner()
    }
    return this._signer
  }
}

/**
 * Turns any possible way to pass in a transaction into the raw values
 * that are actually required. This is used both internally to normalize
 * ways in which transactions are passed in but also public in order
 * for one instance of ContractKit to serialize a meta transaction to
 * send over the wire and be consumed somewhere else.
 * @param tx TransactionInput<any> union of all the ways we expect transactions
 * @returns a RawTransactions that's serializable
 */
export const toRawTransaction = (tx: TransactionInput<any>): RawTransaction => {
  if ('destination' in tx) {
    return tx
  } else if ('value' in tx) {
    return {
      destination: tx.txo._parent.options.address,
      data: tx.txo.encodeABI(),
      value: valueToString(tx.value),
    }
  } else {
    return {
      destination: tx._parent.options.address,
      data: tx.encodeABI(),
      value: '0',
    }
  }
}

/**
 * Turns any possible way to pass in a transaction into the raw values
 * that are actually required for a transaction with a refund. This is used both internally to normalize
 * ways in which transactions are passed in but also public in order
 * for one instance of ContractKit to serialize a meta transaction to
 * send over the wire and be consumed somewhere else.
 * @param tx TransactionInput<any> union of all the ways we expect transactions
 * @returns a RawTransactions that's serializable
 */
export const toRawTransactionWithRefund = (tx: TransactionInput<any>, maxGasPrice: number, gasLimit: number, metaGasLimit: number, gasCurrency: string): RawTransactionWithRefund => {
  if ('maxGasPrice' in tx) {
    return tx
  } else {
    const rawTx = toRawTransaction(tx)
    return {...rawTx, maxGasPrice, gasLimit, metaGasLimit, gasCurrency}
  }
}

/**
 * Turns an array of transaction inputs into the argument that
 * need to be passed to the executeTransactions call.
 * Main transformation is that all the `data` parts of each
 * transaction in the batch are concatenated and an array
 * of lengths is constructed.
 * This is a gas optimisation on the contract.
 * @param txs Array<TransactionInput<any>> array of txs
 * @returns Params for the executeTransactions method call
 */
export const toTransactionBatch = (
  txs: Array<TransactionInput<any>>
): {
  destinations: string[]
  values: string[]
  callData: string
  callDataLengths: number[]
} => {
  const rawTxs: RawTransaction[] = txs.map(toRawTransaction)
  return {
    destinations: rawTxs.map((rtx) => rtx.destination),
    values: rawTxs.map((rtx) => rtx.value),
    callData: ensureLeading0x(rawTxs.map((rtx) => trimLeading0x(rtx.data)).join('')),
    callDataLengths: rawTxs.map((rtx) => trimLeading0x(rtx.data).length / 2),
  }
}

export const buildMetaTxTypedData = (
  walletAddress: Address,
  tx: RawTransaction,
  nonce: number,
  chainId: number
): EIP712TypedData => {
  return {
    types: {
      EIP712Domain: [
        { name: 'name', type: 'string' },
        { name: 'version', type: 'string' },
        { name: 'chainId', type: 'uint256' },
        { name: 'verifyingContract', type: 'address' },
      ],
      ExecuteMetaTransaction: [
        { name: 'destination', type: 'address' },
        { name: 'value', type: 'uint256' },
        { name: 'data', type: 'bytes' },
        { name: 'nonce', type: 'uint256' },
      ],
    },
    primaryType: 'ExecuteMetaTransaction',
    domain: {
      name: 'MetaTransactionWallet',
      version: '1.1',
      chainId,
      verifyingContract: walletAddress,
    },
    message: tx ? { ...tx, nonce } : {},
  }
}

export const buildMetaTxWithRefundTypedData = (
  walletAddress: Address,
  tx: RawTransactionWithRefund,
  nonce: number,
  chainId: number
): EIP712TypedData => {
  return {
    types: {
      EIP712Domain: [
        { name: 'name', type: 'string' },
        { name: 'version', type: 'string' },
        { name: 'chainId', type: 'uint256' },
        { name: 'verifyingContract', type: 'address' },
      ],
      ExecuteMetaTransactionWithRefund: [
        { name: 'destination', type: 'address' },
        { name: 'value', type: 'uint256' },
        { name: 'data', type: 'bytes' },
        { name: 'metaGasPrice', type: 'uint256' },
        { name: 'gasLimit', type: 'uint256' },
        { name: 'metaGasLimit', type: 'uint256' },
        { name: 'gasCurrency', type: 'string' },
        { name: 'nonce', type: 'uint256' },
      ],
    },
    primaryType: 'ExecuteMetaTransactionWithRefund',
    domain: {
      name: 'MetaTransactionWallet',
      version: '1.1',
      chainId,
      verifyingContract: walletAddress,
    },
    message: tx ? { ...tx, nonce } : {},
  }
}