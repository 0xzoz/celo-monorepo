# Module: "base"

## Index

### Enumerations

* [CeloContract](../enums/_base_.celocontract.md)

### Type aliases

* [CeloToken](_base_.md#celotoken)
* [CeloTokenContract](_base_.md#celotokencontract)
* [ExchangeContract](_base_.md#exchangecontract)
* [StableTokenContract](_base_.md#stabletokencontract)

### Variables

* [AllContracts](_base_.md#const-allcontracts)
* [ProxyContracts](_base_.md#const-proxycontracts)
* [RegisteredContracts](_base_.md#const-registeredcontracts)

### Functions

* [stripProxy](_base_.md#const-stripproxy)
* [suffixProxy](_base_.md#const-suffixproxy)

## Type aliases

###  CeloToken

Ƭ **CeloToken**: *[CeloTokenContract](_base_.md#celotokencontract)*

*Defined in [contractkit/src/base.ts:38](https://github.com/celo-org/celo-monorepo/blob/master/packages/sdk/contractkit/src/base.ts#L38)*

Deprecated alias for CeloTokenContract.

**`deprecated`** Use CeloTokenContract instead

___

###  CeloTokenContract

Ƭ **CeloTokenContract**: *[StableTokenContract](_base_.md#stabletokencontract) | [GoldToken](../enums/_base_.celocontract.md#goldtoken)*

*Defined in [contractkit/src/base.ts:33](https://github.com/celo-org/celo-monorepo/blob/master/packages/sdk/contractkit/src/base.ts#L33)*

___

###  ExchangeContract

Ƭ **ExchangeContract**: *[Exchange](../enums/_base_.celocontract.md#exchange)*

*Defined in [contractkit/src/base.ts:31](https://github.com/celo-org/celo-monorepo/blob/master/packages/sdk/contractkit/src/base.ts#L31)*

___

###  StableTokenContract

Ƭ **StableTokenContract**: *[StableToken](../enums/_base_.celocontract.md#stabletoken)*

*Defined in [contractkit/src/base.ts:29](https://github.com/celo-org/celo-monorepo/blob/master/packages/sdk/contractkit/src/base.ts#L29)*

## Variables

### `Const` AllContracts

• **AllContracts**: *[CeloContract](../enums/_base_.celocontract.md)[]* = Object.keys(CeloContract) as CeloContract[]

*Defined in [contractkit/src/base.ts:40](https://github.com/celo-org/celo-monorepo/blob/master/packages/sdk/contractkit/src/base.ts#L40)*

___

### `Const` ProxyContracts

• **ProxyContracts**: *[CeloContract](../enums/_base_.celocontract.md)[]* = AllContracts.map((c) => suffixProxy(c))

*Defined in [contractkit/src/base.ts:53](https://github.com/celo-org/celo-monorepo/blob/master/packages/sdk/contractkit/src/base.ts#L53)*

___

### `Const` RegisteredContracts

• **RegisteredContracts**: *[CeloContract](../enums/_base_.celocontract.md)[]* = AllContracts.filter((v) => !AuxiliaryContracts.includes(v))

*Defined in [contractkit/src/base.ts:46](https://github.com/celo-org/celo-monorepo/blob/master/packages/sdk/contractkit/src/base.ts#L46)*

## Functions

### `Const` stripProxy

▸ **stripProxy**(`contract`: [CeloContract](../enums/_base_.celocontract.md)): *[CeloContract](../enums/_base_.celocontract.md)*

*Defined in [contractkit/src/base.ts:48](https://github.com/celo-org/celo-monorepo/blob/master/packages/sdk/contractkit/src/base.ts#L48)*

**Parameters:**

Name | Type |
------ | ------ |
`contract` | [CeloContract](../enums/_base_.celocontract.md) |

**Returns:** *[CeloContract](../enums/_base_.celocontract.md)*

___

### `Const` suffixProxy

▸ **suffixProxy**(`contract`: [CeloContract](../enums/_base_.celocontract.md)): *[CeloContract](../enums/_base_.celocontract.md)*

*Defined in [contractkit/src/base.ts:50](https://github.com/celo-org/celo-monorepo/blob/master/packages/sdk/contractkit/src/base.ts#L50)*

**Parameters:**

Name | Type |
------ | ------ |
`contract` | [CeloContract](../enums/_base_.celocontract.md) |

**Returns:** *[CeloContract](../enums/_base_.celocontract.md)*
