const { getApi, disconnect } = require("../api");
const { createTestKeyring } = require("@polkadot/keyring");
const monetary = require("@interlay/monetary-js")
const {
  getFinalizedBlockNumber, parseEscrowPoint, newMonetaryAmount,
  saturatingSub,
} = require("./utils");

function rawBalanceAt(escrowPoint, height) {
  const heightDiff = saturatingSub(height, escrowPoint.ts);
  return saturatingSub(escrowPoint.bias, escrowPoint.slope.mul(heightDiff))
}

(async function () {
  const api = await getApi();
  const nowHeight = await getFinalizedBlockNumber();

  const instance = createTestKeyring();
  const charlie = instance.pairs[4];

  const userPointEpoch = await api.query.escrow.userPointEpoch(charlie.publicKey);
  const lastPoint = await api.query.escrow.userPointHistory(charlie.publicKey, userPointEpoch);
  const escrowPoint = parseEscrowPoint(lastPoint);
  const rawBalance = rawBalanceAt(escrowPoint, nowHeight);
  console.log('raw balance', rawBalance.toString());

  const balance = newMonetaryAmount(rawBalance, monetary.VoteKintsugi);
  console.log('the normalized voting balance is', balance.toHuman());
  await disconnect();
})()

// output shows like following:
// raw balance 117326559
// the normalized voting balance is 0.00012
