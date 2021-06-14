import Web3 from 'web3'
import { DowntimeSlasher as DowntimeSlasherType } from '../types/DowntimeSlasher'
export default async function getInstance(web3: Web3, account: string | null = null) {
  const contract = (new web3.eth.Contract(
    [
      {
        constant: true,
        inputs: [],
        name: 'slashingIncentives',
        outputs: [
          {
            name: 'penalty',
            type: 'uint256',
          },
          {
            name: 'reward',
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
            name: 'index',
            type: 'uint256',
          },
        ],
        name: 'validatorSignerAddressFromCurrentSet',
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
        constant: true,
        inputs: [
          {
            name: 'sender',
            type: 'address',
          },
          {
            name: 'blsKey',
            type: 'bytes',
          },
          {
            name: 'blsPop',
            type: 'bytes',
          },
        ],
        name: 'checkProofOfPossession',
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
            name: 'blockNumber',
            type: 'uint256',
          },
        ],
        name: 'getEpochNumberOfBlock',
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
        name: 'slashableDowntime',
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
            name: 'header',
            type: 'bytes',
          },
        ],
        name: 'getVerifiedSealBitmapFromHeader',
        outputs: [
          {
            name: '',
            type: 'bytes32',
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
            name: 'index',
            type: 'uint256',
          },
          {
            name: 'blockNumber',
            type: 'uint256',
          },
        ],
        name: 'validatorSignerAddressFromSet',
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
        inputs: [
          {
            name: 'header',
            type: 'bytes',
          },
        ],
        name: 'hashHeader',
        outputs: [
          {
            name: '',
            type: 'bytes32',
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
        name: 'minQuorumSizeInCurrentSet',
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
        name: 'registry',
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
        name: 'numberValidatorsInCurrentSet',
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
            name: 'validator',
            type: 'address',
          },
          {
            name: 'blockNumber',
            type: 'uint256',
          },
          {
            name: 'groupMembershipHistoryIndex',
            type: 'uint256',
          },
        ],
        name: 'groupMembershipAtBlock',
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
        inputs: [
          {
            name: 'header',
            type: 'bytes',
          },
        ],
        name: 'getBlockNumberFromHeader',
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
        constant: true,
        inputs: [],
        name: 'getEpochNumber',
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
            name: 'blockNumber',
            type: 'uint256',
          },
        ],
        name: 'numberValidatorsInSet',
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
            name: 'registryAddress',
            type: 'address',
          },
        ],
        name: 'setRegistry',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          {
            name: 'penalty',
            type: 'uint256',
          },
          {
            name: 'reward',
            type: 'uint256',
          },
        ],
        name: 'setSlashingIncentives',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'getEpochSize',
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
            name: 'blockNumber',
            type: 'uint256',
          },
        ],
        name: 'minQuorumSize',
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
            name: 'aNumerator',
            type: 'uint256',
          },
          {
            name: 'aDenominator',
            type: 'uint256',
          },
          {
            name: 'bNumerator',
            type: 'uint256',
          },
          {
            name: 'bDenominator',
            type: 'uint256',
          },
          {
            name: 'exponent',
            type: 'uint256',
          },
          {
            name: '_decimals',
            type: 'uint256',
          },
        ],
        name: 'fractionMulExp',
        outputs: [
          {
            name: '',
            type: 'uint256',
          },
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
        constant: true,
        inputs: [
          {
            name: 'blockNumber',
            type: 'uint256',
          },
        ],
        name: 'getParentSealBitmap',
        outputs: [
          {
            name: '',
            type: 'bytes32',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            name: 'interval',
            type: 'uint256',
          },
        ],
        name: 'SlashableDowntimeSet',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            name: 'penalty',
            type: 'uint256',
          },
          {
            indexed: false,
            name: 'reward',
            type: 'uint256',
          },
        ],
        name: 'SlashingIncentivesSet',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            name: 'registryAddress',
            type: 'address',
          },
        ],
        name: 'RegistrySet',
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
            name: 'registryAddress',
            type: 'address',
          },
          {
            name: '_penalty',
            type: 'uint256',
          },
          {
            name: '_reward',
            type: 'uint256',
          },
          {
            name: '_slashableDowntime',
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
            name: 'interval',
            type: 'uint256',
          },
        ],
        name: 'setSlashableDowntime',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: true,
        inputs: [
          {
            name: 'startBlock',
            type: 'uint256',
          },
          {
            name: 'startSignerIndex',
            type: 'uint256',
          },
          {
            name: 'endSignerIndex',
            type: 'uint256',
          },
        ],
        name: 'isDown',
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
            name: 'startBlock',
            type: 'uint256',
          },
          {
            name: 'startSignerIndex',
            type: 'uint256',
          },
          {
            name: 'endSignerIndex',
            type: 'uint256',
          },
          {
            name: 'groupMembershipHistoryIndex',
            type: 'uint256',
          },
          {
            name: 'validatorElectionLessers',
            type: 'address[]',
          },
          {
            name: 'validatorElectionGreaters',
            type: 'address[]',
          },
          {
            name: 'validatorElectionIndices',
            type: 'uint256[]',
          },
          {
            name: 'groupElectionLessers',
            type: 'address[]',
          },
          {
            name: 'groupElectionGreaters',
            type: 'address[]',
          },
          {
            name: 'groupElectionIndices',
            type: 'uint256[]',
          },
        ],
        name: 'slash',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    '0xA5989Bc6A8B9604f39360b55AcF4EBa976884BF4'
  ) as unknown) as DowntimeSlasherType
  contract.options.from = account || (await web3.eth.getAccounts())[0]
  return contract
}
