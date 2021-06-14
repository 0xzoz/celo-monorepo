/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */

import Contract, { CustomOptions, contractOptions } from 'web3/eth/contract'
import { TransactionObject, BlockType } from 'web3/eth/types'
import { Callback, EventLog } from 'web3/types'
import { EventEmitter } from 'events'
import { Provider } from 'web3/providers'

export class MockSortedOracles extends Contract {
  constructor(jsonInterface: any[], address?: string, options?: CustomOptions)
  _address: string
  options: contractOptions
  methods: {
    medianTimestamp(arg0: string): TransactionObject<string>

    numRates(arg0: string): TransactionObject<string>

    expired(arg0: string): TransactionObject<boolean>

    numerators(arg0: string): TransactionObject<string>

    medianRate(
      token: string
    ): TransactionObject<{
      0: string
      1: string
    }>

    isOldestReportExpired(
      token: string
    ): TransactionObject<{
      0: boolean
      1: string
    }>

    setMedianRate(token: string, numerator: number | string): TransactionObject<boolean>

    setMedianTimestamp(token: string, timestamp: number | string): TransactionObject<void>

    setMedianTimestampToNow(token: string): TransactionObject<void>

    setNumRates(token: string, rate: number | string): TransactionObject<void>

    setOldestReportExpired(token: string): TransactionObject<void>

    DENOMINATOR(): TransactionObject<string>
  }
  deploy(options: { data: string; arguments: any[] }): TransactionObject<Contract>
  events: {
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
  clone(): MockSortedOracles
}
