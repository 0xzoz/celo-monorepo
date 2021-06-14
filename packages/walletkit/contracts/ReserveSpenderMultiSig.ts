import Web3 from 'web3'
import { ReserveSpenderMultiSig as ReserveSpenderMultiSigType } from '../types/ReserveSpenderMultiSig'
export default async function getInstance(web3: Web3, account: string | null = null) {
  const contract = (new web3.eth.Contract(
    [
      {
        constant: true,
        inputs: [
          {
            name: '',
            type: 'uint256',
          },
        ],
        name: 'owners',
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
        inputs: [
          {
            name: 'owner',
            type: 'address',
          },
        ],
        name: 'removeOwner',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          {
            name: 'transactionId',
            type: 'uint256',
          },
        ],
        name: 'revokeConfirmation',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          {
            name: '_internalRequired',
            type: 'uint256',
          },
        ],
        name: 'changeInternalRequirement',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: true,
        inputs: [
          {
            name: '',
            type: 'address',
          },
        ],
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
        constant: true,
        inputs: [
          {
            name: '',
            type: 'uint256',
          },
          {
            name: '',
            type: 'address',
          },
        ],
        name: 'confirmations',
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
        constant: true,
        inputs: [
          {
            name: 'pending',
            type: 'bool',
          },
          {
            name: 'executed',
            type: 'bool',
          },
        ],
        name: 'getTransactionCount',
        outputs: [
          {
            name: 'count',
            type: 'uint256',
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
            name: '_owners',
            type: 'address[]',
          },
          {
            name: '_required',
            type: 'uint256',
          },
          {
            name: '_internalRequired',
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
            name: 'owner',
            type: 'address',
          },
        ],
        name: 'addOwner',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: true,
        inputs: [
          {
            name: 'transactionId',
            type: 'uint256',
          },
        ],
        name: 'isConfirmed',
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
        constant: true,
        inputs: [
          {
            name: 'transactionId',
            type: 'uint256',
          },
        ],
        name: 'getConfirmationCount',
        outputs: [
          {
            name: 'count',
            type: 'uint256',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [
          {
            name: '',
            type: 'uint256',
          },
        ],
        name: 'transactions',
        outputs: [
          {
            name: 'destination',
            type: 'address',
          },
          {
            name: 'value',
            type: 'uint256',
          },
          {
            name: 'data',
            type: 'bytes',
          },
          {
            name: 'executed',
            type: 'bool',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'getOwners',
        outputs: [
          {
            name: '',
            type: 'address[]',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'internalRequired',
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
        inputs: [
          {
            name: 'from',
            type: 'uint256',
          },
          {
            name: 'to',
            type: 'uint256',
          },
          {
            name: 'pending',
            type: 'bool',
          },
          {
            name: 'executed',
            type: 'bool',
          },
        ],
        name: 'getTransactionIds',
        outputs: [
          {
            name: '_transactionIds',
            type: 'uint256[]',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [
          {
            name: 'transactionId',
            type: 'uint256',
          },
        ],
        name: 'getConfirmations',
        outputs: [
          {
            name: '_confirmations',
            type: 'address[]',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'transactionCount',
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
        constant: false,
        inputs: [
          {
            name: '_required',
            type: 'uint256',
          },
        ],
        name: 'changeRequirement',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          {
            name: 'transactionId',
            type: 'uint256',
          },
        ],
        name: 'confirmTransaction',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          {
            name: 'destination',
            type: 'address',
          },
          {
            name: 'value',
            type: 'uint256',
          },
          {
            name: 'data',
            type: 'bytes',
          },
        ],
        name: 'submitTransaction',
        outputs: [
          {
            name: 'transactionId',
            type: 'uint256',
          },
        ],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'MAX_OWNER_COUNT',
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
        name: 'required',
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
        constant: false,
        inputs: [
          {
            name: 'owner',
            type: 'address',
          },
          {
            name: 'newOwner',
            type: 'address',
          },
        ],
        name: 'replaceOwner',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          {
            name: 'transactionId',
            type: 'uint256',
          },
        ],
        name: 'executeTransaction',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        payable: true,
        stateMutability: 'payable',
        type: 'fallback',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            name: 'sender',
            type: 'address',
          },
          {
            indexed: true,
            name: 'transactionId',
            type: 'uint256',
          },
        ],
        name: 'Confirmation',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            name: 'sender',
            type: 'address',
          },
          {
            indexed: true,
            name: 'transactionId',
            type: 'uint256',
          },
        ],
        name: 'Revocation',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            name: 'transactionId',
            type: 'uint256',
          },
        ],
        name: 'Submission',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            name: 'transactionId',
            type: 'uint256',
          },
          {
            indexed: false,
            name: 'returnData',
            type: 'bytes',
          },
        ],
        name: 'Execution',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            name: 'sender',
            type: 'address',
          },
          {
            indexed: false,
            name: 'value',
            type: 'uint256',
          },
        ],
        name: 'Deposit',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            name: 'owner',
            type: 'address',
          },
        ],
        name: 'OwnerAddition',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            name: 'owner',
            type: 'address',
          },
        ],
        name: 'OwnerRemoval',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            name: 'required',
            type: 'uint256',
          },
        ],
        name: 'RequirementChange',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            name: 'internalRequired',
            type: 'uint256',
          },
        ],
        name: 'InternalRequirementChange',
        type: 'event',
      },
    ],
    '0x39C51d205FfaaDe6F6a813a3c68C468201e31E7b'
  ) as unknown) as ReserveSpenderMultiSigType
  contract.options.from = account || (await web3.eth.getAccounts())[0]
  return contract
}
