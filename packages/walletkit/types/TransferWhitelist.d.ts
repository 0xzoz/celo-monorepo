/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */

import Contract, { CustomOptions, contractOptions } from 'web3/eth/contract'
import { TransactionObject, BlockType } from 'web3/eth/types'
import { Callback, EventLog } from 'web3/types'
import { EventEmitter } from 'events'
import { Provider } from 'web3/providers'

export class TransferWhitelist extends Contract {
  constructor(jsonInterface: any[], address?: string, options?: CustomOptions)
  _address: string
  options: contractOptions
  methods: {
    whitelistedContractIdentifiers(arg0: number | string): TransactionObject<string>

    renounceOwnership(): TransactionObject<void>

    setRegistry(registryAddress: string): TransactionObject<void>

    transferOwnership(newOwner: string): TransactionObject<void>

    whitelistAddress(newAddress: string): TransactionObject<void>

    removeAddress(removedAddress: string, index: number | string): TransactionObject<void>

    whitelistRegisteredContract(contractIdentifier: string | number[]): TransactionObject<void>

    setDirectlyWhitelistedAddresses(_whitelist: string[]): TransactionObject<void>

    setWhitelistedContractIdentifiers(
      _registeredContracts: (string | number[])[]
    ): TransactionObject<void>

    selfDestruct(): TransactionObject<void>

    registry(): TransactionObject<string>
    owner(): TransactionObject<string>
    isOwner(): TransactionObject<boolean>
    getNumberOfWhitelistedContractIdentifiers(): TransactionObject<string>
    getWhitelist(): TransactionObject<string[]>
  }
  deploy(options: { data: string; arguments: any[] }): TransactionObject<Contract>
  events: {
    WhitelistedAddress(
      options?: {
        filter?: object
        fromBlock?: BlockType
        topics?: (null | string)[]
      },
      cb?: Callback<EventLog>
    ): EventEmitter

    WhitelistedAddressRemoved(
      options?: {
        filter?: object
        fromBlock?: BlockType
        topics?: (null | string)[]
      },
      cb?: Callback<EventLog>
    ): EventEmitter

    WhitelistedContractIdentifier(
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
  clone(): TransferWhitelist
}
