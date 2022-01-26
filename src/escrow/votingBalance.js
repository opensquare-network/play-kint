const { getApi, disconnect } = require("../api");
const { createTestKeyring } = require("@polkadot/keyring");
const monetary = require("@interlay/monetary-js")
const {
  getFinalizedBlockNumber, parseEscrowPoint, newMonetaryAmount,
  saturatingSub,
} = require("./utils");
const BN = require("bn.js");

function rawBalanceAt(escrowPoint, height) {
  const heightDiff = saturatingSub(height, escrowPoint.ts);
  return saturatingSub(escrowPoint.bias, escrowPoint.slope.mul(heightDiff))
}

const testAddr = 'a3aDHY94Ny9ZsB74LhtrWYjQUom9sEoQk97K1bCR324PFHMbb';

(async function () {
  const api = await getApi();
  const nowHeight = await getFinalizedBlockNumber();

  const instance = createTestKeyring();
  const charlie = instance.pairs[4];

  const userPointEpoch = await api.query.escrow.userPointEpoch(testAddr);
  const lastPoint = await api.query.escrow.userPointHistory(testAddr, userPointEpoch);
  const escrowPoint = parseEscrowPoint(lastPoint);
  const rawBalance = rawBalanceAt(escrowPoint, new BN(nowHeight));
  console.log('raw balance', rawBalance.toString());

  const balance = newMonetaryAmount(rawBalance, monetary.VoteKintsugi);
  console.log('the normalized voting balance is', balance.toHuman());
  await disconnect();
})()

// output shows like following:
// raw balance 117326559
// the normalized voting balance is 0.00012
