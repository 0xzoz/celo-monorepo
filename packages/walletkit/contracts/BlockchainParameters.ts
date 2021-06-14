import Web3 from 'web3'
import { BlockchainParameters as BlockchainParametersType } from '../types/BlockchainParameters'
export default async function getInstance(web3: Web3, account: string | null = null) {
  const contract = (new web3.eth.Contract(
    [
      {
        constant: true,
        inputs: [],
        name: 'initialized',
        outputs: [
          {
            name: '',
            type: 'bool',
          },
        ],
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
        name: 'blockGasLimit',
        outputs: [
          {
            name: '',
            type: 'uint256',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'intrinsicGasForAlternativeFeeCurrency',
        outputs: [
          {
            name: '',
            type: 'uint256',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'owner',
        outputs: [
          {
            name: '',
            type: 'address',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'isOwner',
        outputs: [
          {
            name: '',
            type: 'bool',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          {
            name: 'newOwner',
            type: 'address',
          },
        ],
        name: 'transferOwnership',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            name: 'major',
            type: 'uint256',
          },
          {
            indexed: false,
            name: 'minor',
            type: 'uint256',
          },
          {
            indexed: false,
            name: 'patch',
            type: 'uint256',
          },
        ],
        name: 'MinimumClientVersionSet',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            name: 'gas',
            type: 'uint256',
          },
        ],
        name: 'IntrinsicGasForAlternativeFeeCurrencySet',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            name: 'limit',
            type: 'uint256',
          },
        ],
        name: 'BlockGasLimitSet',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            name: 'previousOwner',
            type: 'address',
          },
          {
            indexed: true,
            name: 'newOwner',
            type: 'address',
          },
        ],
        name: 'OwnershipTransferred',
        type: 'event',
      },
      {
        constant: false,
        inputs: [
          {
            name: 'major',
            type: 'uint256',
          },
          {
            name: 'minor',
            type: 'uint256',
          },
          {
            name: 'patch',
            type: 'uint256',
          },
          {
            name: '_gasForNonGoldCurrencies',
            type: 'uint256',
          },
          {
            name: 'gasLimit',
            type: 'uint256',
          },
        ],
        name: 'initialize',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          {
            name: 'major',
            type: 'uint256',
          },
          {
            name: 'minor',
            type: 'uint256',
          },
          {
            name: 'patch',
            type: 'uint256',
          },
        ],
        name: 'setMinimumClientVersion',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          {
            name: 'gasLimit',
            type: 'uint256',
          },
        ],
        name: 'setBlockGasLimit',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          {
            name: 'gas',
            type: 'uint256',
          },
        ],
        name: 'setIntrinsicGasForAlternativeFeeCurrency',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'getMinimumClientVersion',
        outputs: [
          {
            name: 'major',
            type: 'uint256',
          },
          {
            name: 'minor',
            type: 'uint256',
          },
          {
            name: 'patch',
            type: 'uint256',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
    ],
    '0x8567115F67B18B812EB4E610a523f81008dAf848'
  ) as unknown) as BlockchainParametersType
  contract.options.from = account || (await web3.eth.getAccounts())[0]
  return contract
}
