/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */

import Contract, { CustomOptions, contractOptions } from 'web3/eth/contract'
import { TransactionObject, BlockType } from 'web3/eth/types'
import { Callback, EventLog } from 'web3/types'
import { EventEmitter } from 'events'
import { Provider } from 'web3/providers'

export class Attestations extends Contract {
  constructor(jsonInterface: any[], address?: string, options?: CustomOptions)
  _address: string
  options: contractOptions
  methods: {
    validatorSignerAddressFromCurrentSet(index: number | string): TransactionObject<string>

    checkProofOfPossession(
      sender: string,
      blsKey: (string | number[])[],
      blsPop: (string | number[])[]
    ): TransactionObject<boolean>

    getEpochNumberOfBlock(blockNumber: number | string): TransactionObject<string>

    getVerifiedSealBitmapFromHeader(header: (string | number[])[]): TransactionObject<string>

    validatorSignerAddressFromSet(
      index: number | string,
      blockNumber: number | string
    ): TransactionObject<string>

    hashHeader(header: (string | number[])[]): TransactionObject<string>

    getBlockNumberFromHeader(header: (string | number[])[]): TransactionObject<string>

    numberValidatorsInSet(blockNumber: number | string): TransactionObject<string>

    attestationRequestFees(arg0: string): TransactionObject<string>

    minQuorumSize(blockNumber: number | string): TransactionObject<string>

    pendingWithdrawals(arg0: string, arg1: string): TransactionObject<string>

    fractionMulExp(
      aNumerator: number | string,
      aDenominator: number | string,
      bNumerator: number | string,
      bDenominator: number | string,
      exponent: number | string,
      _decimals: number | string
    ): TransactionObject<{
      0: string
      1: string
    }>

    getParentSealBitmap(blockNumber: number | string): TransactionObject<string>

    getUnselectedRequest(
      identifier: string | number[],
      account: string
    ): TransactionObject<{
      0: string
      1: string
      2: string
    }>

    getAttestationIssuers(
      identifier: string | number[],
      account: string
    ): TransactionObject<string[]>

    getAttestationStats(
      identifier: string | number[],
      account: string
    ): TransactionObject<{
      0: string
      1: string
    }>

    batchGetAttestationStats(
      identifiersToLookup: (string | number[])[]
    ): TransactionObject<{
      0: string[]
      1: string[]
      2: string[]
      3: string[]
    }>

    getAttestationState(
      identifier: string | number[],
      account: string,
      issuer: string
    ): TransactionObject<{
      0: string
      1: string
      2: string
    }>

    getCompletableAttestations(
      identifier: string | number[],
      account: string
    ): TransactionObject<{
      0: string[]
      1: string[]
      2: string[]
      3: string[]
    }>

    getAttestationRequestFee(token: string): TransactionObject<string>

    validateAttestationCode(
      identifier: string | number[],
      account: string,
      v: number | string,
      r: string | number[],
      s: string | number[]
    ): TransactionObject<string>

    lookupAccountsForIdentifier(identifier: string | number[]): TransactionObject<string[]>

    renounceOwnership(): TransactionObject<void>

    setRegistry(registryAddress: string): TransactionObject<void>

    transferOwnership(newOwner: string): TransactionObject<void>

    initialize(
      registryAddress: string,
      _attestationExpiryBlocks: number | string,
      _selectIssuersWaitBlocks: number | string,
      _maxAttestations: number | string,
      attestationRequestFeeTokens: string[],
      attestationRequestFeeValues: (number | string)[]
    ): TransactionObject<void>

    request(
      identifier: string | number[],
      attestationsRequested: number | string,
      attestationRequestFeeToken: string
    ): TransactionObject<void>

    selectIssuers(identifier: string | number[]): TransactionObject<void>

    complete(
      identifier: string | number[],
      v: number | string,
      r: string | number[],
      s: string | number[]
    ): TransactionObject<void>

    revoke(identifier: string | number[], index: number | string): TransactionObject<void>

    withdraw(token: string): TransactionObject<void>

    setAttestationRequestFee(token: string, fee: number | string): TransactionObject<void>

    setAttestationExpiryBlocks(_attestationExpiryBlocks: number | string): TransactionObject<void>

    setSelectIssuersWaitBlocks(_selectIssuersWaitBlocks: number | string): TransactionObject<void>

    setMaxAttestations(_maxAttestations: number | string): TransactionObject<void>

    initialized(): TransactionObject<boolean>
    minQuorumSizeInCurrentSet(): TransactionObject<string>
    registry(): TransactionObject<string>
    maxAttestations(): TransactionObject<string>
    numberValidatorsInCurrentSet(): TransactionObject<string>
    selectIssuersWaitBlocks(): TransactionObject<string>
    owner(): TransactionObject<string>
    isOwner(): TransactionObject<boolean>
    getEpochNumber(): TransactionObject<string>
    attestationExpiryBlocks(): TransactionObject<string>
    getEpochSize(): TransactionObject<string>
    getMaxAttestations(): TransactionObject<string>
  }
  deploy(options: { data: string; arguments: any[] }): TransactionObject<Contract>
  events: {
    AttestationsRequested(
      options?: {
        filter?: object
        fromBlock?: BlockType
        topics?: (null | string)[]
      },
      cb?: Callback<EventLog>
    ): EventEmitter

    AttestationIssuerSelected(
      options?: {
        filter?: object
        fromBlock?: BlockType
        topics?: (null | string)[]
      },
      cb?: Callback<EventLog>
    ): EventEmitter

    AttestationCompleted(
      options?: {
        filter?: object
        fromBlock?: BlockType
        topics?: (null | string)[]
      },
      cb?: Callback<EventLog>
    ): EventEmitter

    Withdrawal(
      options?: {
        filter?: object
        fromBlock?: BlockType
        topics?: (null | string)[]
      },
      cb?: Callback<EventLog>
    ): EventEmitter

    AttestationExpiryBlocksSet(
      options?: {
        filter?: object
        fromBlock?: BlockType
        topics?: (null | string)[]
      },
      cb?: Callback<EventLog>
    ): EventEmitter

    AttestationRequestFeeSet(
      options?: {
        filter?: object
        fromBlock?: BlockType
        topics?: (null | string)[]
      },
      cb?: Callback<EventLog>
    ): EventEmitter

    SelectIssuersWaitBlocksSet(
      options?: {
        filter?: object
        fromBlock?: BlockType
        topics?: (null | string)[]
      },
      cb?: Callback<EventLog>
    ): EventEmitter

    MaxAttestationsSet(
      options?: {
        filter?: object
        fromBlock?: BlockType
        topics?: (null | string)[]
      },
      cb?: Callback<EventLog>
    ): EventEmitter

    RegistrySet(
      options?: {
        filter?: object
        fromBlock?: BlockType
        topics?: (null | string)[]
      },
      cb?: Callback<EventLog>
    ): EventEmitter

    OwnershipTransferred(
      options?: {
        filter?: object
        fromBlock?: BlockType
        topics?: (null | string)[]
      },
      cb?: Callback<EventLog>
    ): EventEmitter

    allEvents: (
      options?: {
        filter?: object
        fromBlock?: BlockType
        topics?: (null | string)[]
      },
      cb?: Callback<EventLog>
    ) => EventEmitter
  }
  getPastEvents(
    event: string,
    options?: {
      filter?: object
      fromBlock?: BlockType
      toBlock?: BlockType
      topics?: (null | string)[]
    },
    cb?: Callback<EventLog[]>
  ): Promise<EventLog[]>
  setProvider(provider: Provider): void
  clone(): Attestations
}
