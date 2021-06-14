/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */

import { EventEmitter } from 'events'
import Web3 from 'web3'
import { EventLog } from 'web3-core'
import { Callback } from 'web3-core-helpers'
import { BlockType, TransactionObject } from 'web3-eth'
import { Contract } from 'web3-eth-contract'
import { AbiItem } from 'web3-utils'

interface EventOptions {
  filter?: object
  fromBlock?: BlockType
  topics?: string[]
}

interface ContractEventLog<T> extends EventLog {
  returnValues: T
}

interface ContractEventEmitter<T> extends EventEmitter {
  on(event: 'connected', listener: (subscriptionId: string) => void): this
  on(event: 'data' | 'changed', listener: (event: ContractEventLog<T>) => void): this
  on(event: 'error', listener: (error: Error) => void): this
}

type ContractEvent<T> = (
  options?: EventOptions,
  cb?: Callback<ContractEventLog<T>>
) => ContractEventEmitter<T>

export interface SortedOracles extends Contract {
  clone(): SortedOracles
  methods: {
    initialized(): TransactionObject<boolean>

    isOracle(arg0: string, arg1: string): TransactionObject<boolean>

    reportExpirySeconds(): TransactionObject<string>

    renounceOwnership(): TransactionObject<void>

    owner(): TransactionObject<string>

    isOwner(): TransactionObject<boolean>

    oracles(arg0: string, arg1: number | string): TransactionObject<string>

    transferOwnership(newOwner: string): TransactionObject<void>

    initialize(_reportExpirySeconds: number | string): TransactionObject<void>

    setReportExpiry(_reportExpirySeconds: number | string): TransactionObject<void>

    addOracle(token: string, oracleAddress: string): TransactionObject<void>

    removeOracle(
      token: string,
      oracleAddress: string,
      index: number | string
    ): TransactionObject<void>

    removeExpiredReports(token: string, n: number | string): TransactionObject<void>

    isOldestReportExpired(
      token: string
    ): TransactionObject<{
      0: boolean
      1: string
    }>

    report(
      token: string,
      value: number | string,
      lesserKey: string,
      greaterKey: string
    ): TransactionObject<void>

    numRates(token: string): TransactionObject<string>

    medianRate(
      token: string
    ): TransactionObject<{
      0: string
      1: string
    }>

    getRates(
      token: string
    ): TransactionObject<{
      0: string[]
      1: string[]
      2: string[]
    }>

    numTimestamps(token: string): TransactionObject<string>

    medianTimestamp(token: string): TransactionObject<string>

    getTimestamps(
      token: string
    ): TransactionObject<{
      0: string[]
      1: string[]
      2: string[]
    }>

    getOracles(token: string): TransactionObject<string[]>
  }
  events: {
    OracleAdded: ContractEvent<{
      token: string
      oracleAddress: string
      0: string
      1: string
    }>
    OracleRemoved: ContractEvent<{
      token: string
      oracleAddress: string
      0: string
      1: string
    }>
    OracleReported: ContractEvent<{
      token: string
      oracle: string
      timestamp: string
      value: string
      0: string
      1: string
      2: string
      3: string
    }>
    OracleReportRemoved: ContractEvent<{
      token: string
      oracle: string
      0: string
      1: string
    }>
    MedianUpdated: ContractEvent<{
      token: string
      value: string
      0: string
      1: string
    }>
    ReportExpirySet: ContractEvent<string>
    OwnershipTransferred: ContractEvent<{
      previousOwner: string
      newOwner: string
      0: string
      1: string
    }>
    allEvents: (options?: EventOptions, cb?: Callback<EventLog>) => EventEmitter
  }
}
export const ABI: AbiItem[] = [
  {
    constant: true,
    inputs: [],
    name: 'initialized',
    outputs: [{ name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      { name: '', type: 'address' },
      { name: '', type: 'address' },
    ],
    name: 'isOracle',
    outputs: [{ name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'reportExpirySeconds',
    outputs: [{ name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', type: 'address' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'isOwner',
    outputs: [{ name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      { name: '', type: 'address' },
      { name: '', type: 'uint256' },
    ],
    name: 'oracles',
    outputs: [{ name: '', type: 'address' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [{ name: 'newOwner', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'token', type: 'address' },
      { indexed: true, name: 'oracleAddress', type: 'address' },
    ],
    name: 'OracleAdded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'token', type: 'address' },
      { indexed: true, name: 'oracleAddress', type: 'address' },
    ],
    name: 'OracleRemoved',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'token', type: 'address' },
      { indexed: true, name: 'oracle', type: 'address' },
      { indexed: false, name: 'timestamp', type: 'uint256' },
      { indexed: false, name: 'value', type: 'uint256' },
    ],
    name: 'OracleReported',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'token', type: 'address' },
      { indexed: true, name: 'oracle', type: 'address' },
    ],
    name: 'OracleReportRemoved',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'token', type: 'address' },
      { indexed: false, name: 'value', type: 'uint256' },
    ],
    name: 'MedianUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, name: 'reportExpiry', type: 'uint256' }],
    name: 'ReportExpirySet',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'previousOwner', type: 'address' },
      { indexed: true, name: 'newOwner', type: 'address' },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    constant: false,
    inputs: [{ name: '_reportExpirySeconds', type: 'uint256' }],
    name: 'initialize',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [{ name: '_reportExpirySeconds', type: 'uint256' }],
    name: 'setReportExpiry',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { name: 'token', type: 'address' },
      { name: 'oracleAddress', type: 'address' },
    ],
    name: 'addOracle',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { name: 'token', type: 'address' },
      { name: 'oracleAddress', type: 'address' },
      { name: 'index', type: 'uint256' },
    ],
    name: 'removeOracle',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { name: 'token', type: 'address' },
      { name: 'n', type: 'uint256' },
    ],
    name: 'removeExpiredReports',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [{ name: 'token', type: 'address' }],
    name: 'isOldestReportExpired',
    outputs: [
      { name: '', type: 'bool' },
      { name: '', type: 'address' },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { name: 'token', type: 'address' },
      { name: 'value', type: 'uint256' },
      { name: 'lesserKey', type: 'address' },
      { name: 'greaterKey', type: 'address' },
    ],
    name: 'report',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [{ name: 'token', type: 'address' }],
    name: 'numRates',
    outputs: [{ name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [{ name: 'token', type: 'address' }],
    name: 'medianRate',
    outputs: [
      { name: '', type: 'uint256' },
      { name: '', type: 'uint256' },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [{ name: 'token', type: 'address' }],
    name: 'getRates',
    outputs: [
      { name: '', type: 'address[]' },
      { name: '', type: 'uint256[]' },
      { name: '', type: 'uint8[]' },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [{ name: 'token', type: 'address' }],
    name: 'numTimestamps',
    outputs: [{ name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [{ name: 'token', type: 'address' }],
    name: 'medianTimestamp',
    outputs: [{ name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [{ name: 'token', type: 'address' }],
    name: 'getTimestamps',
    outputs: [
      { name: '', type: 'address[]' },
      { name: '', type: 'uint256[]' },
      { name: '', type: 'uint8[]' },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [{ name: 'token', type: 'address' }],
    name: 'getOracles',
    outputs: [{ name: '', type: 'address[]' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
]

export function newSortedOracles(web3: Web3, address: string): SortedOracles {
  return new web3.eth.Contract(ABI, address) as any
}
