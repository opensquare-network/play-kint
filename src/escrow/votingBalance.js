const { getApi, disconnect } = require("../api");
const { createTestKeyring } = require("@polkadot/keyring");
const BN = require("bn.js")
const monetary = require("@interlay/monetary-js")

function parseEscrowPoint(e) {
  return {
    bias: e.bias.toBn(),
    slope: e.slope.toBn(),
    ts: e.ts.toBn()
  };
}

function rawBalanceAt(escrowPoint, height) {
  const heightDiff = new BN(height).sub(escrowPoint.ts);
  return escrowPoint.bias.sub(escrowPoint.slope.mul(heightDiff));
}

function newMonetaryAmount(
  amount,
  currency,
  base = false
) {
  const unit = base ? currency.base : currency.rawBase;
  return new monetary.MonetaryAmount(currency, amount, unit);
}

(async function () {
  const api = await getApi();
  const head = await api.rpc.chain.getFinalizedHead();
  const nowHeight = (await api.query.system.number.at(head)).toNumber();

  const instance = createTestKeyring();
  const charlie = instance.pairs[4];

  const userPointEpoch = await api.query.escrow.userPointEpoch(charlie.publicKey);
  const lastPoint = await api.query.escrow.userPointHistory(charlie.publicKey, userPointEpoch);
  const escrowPoint = parseEscrowPoint(lastPoint);
  const rawBalance = rawBalanceAt(escrowPoint, nowHeight);
  console.log('raw balance', rawBalance.toString());

  const balance = newMonetaryAmount(rawBalance, monetary.VoteKintsugi);
  console.log('the normalized voting balance is', balance.toHuman())
  await disconnect()
})()

// output shows like following:
// raw balance 117326559
// the normalized voting balance is 0.00012
