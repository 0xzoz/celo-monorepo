import { flags } from '@oclif/command'
import { BigNumber } from 'bignumber.js'
import { BaseCommand } from '../../base'
import { displaySendTx } from '../../utils/cli'
import { Args, Flags } from '../../utils/command'

export default class MultiSigTransfer extends BaseCommand {
  static description = 'Ability approve CELO transfers to and from multisig'

  static flags = {
    ...BaseCommand.flags,
    to: Flags.address({ required: true, description: 'Recipient of transfer' }),
    amount: flags.string({ required: true, description: 'Amount to transfer, e.g. 10e18' }),
    transferFrom: flags.boolean({ description: 'Perform transferFrom instead of transfer' }),
    sender: Flags.address({ description: 'Identify sender if performing transferFrom' }),
    from: Flags.address({ description: 'account performing transaction' }),
  }

  static args = [Args.address('address')]

  static examples = [
    'transfer <multiSigAddr> --to 0x5409ed021d9299bf6814279a6a1411a7e866a631 --amount 200000e18',
    'transfer <multiSigAddr> --transferFrom --sender 0x123abc --to 0x5409ed021d9299bf6814279a6a1411a7e866a631 --amount 200000e18',
  ]

  async run() {
    const {
      args,
      flags: { to, sender, from, amount, transferFrom },
    } = this.parse(MultiSigTransfer)
    const amountBN = new BigNumber(amount)
    const celoToken = await this.kit.contracts.getGoldToken()
    const multisig = await this.kit.contracts.getMultiSig(args.address)

    let transferTx
    if (transferFrom) {
      if (!sender) this.error("Must submit 'sender' when submitting TransferFrom tx")
      transferTx = await celoToken.transferFrom(sender, to, amountBN)
    } else {
      transferTx = await celoToken.transfer(to, amountBN)
    }

    let multiSigTx = await multisig.submitOrConfirmTransaction(celoToken.address, transferTx.txo)
    await displaySendTx<any>('submitOrApproveTransfer', multiSigTx, { from }, 'tx Sent')
  }
}
