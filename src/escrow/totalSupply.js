const { getFinalizedBlockNumber, parseEscrowPoint, newMonetaryAmount, } = require("./utils");
const { getApi, disconnect } = require("../api");
const BN = require("bn.js");
const monetary = require("@interlay/monetary-js");

async function getSpan() {
  const api = await getApi();
  return (await api.consts.escrow.span).toBn();
}

function getSlopeChange(slopeChanges, key) {
  let d_slope = slopeChanges.get(key);
  if (d_slope === undefined) {
    d_slope = new BN(0);
  }
  return d_slope;
}

function roundHeight(height, span) {
  return height.div(span).mul(span);
}

function rawSupplyAt(escrowPoint, height, escrowSpan, slopeChanges) {
  /*
      Rust reference implementation:
      https://github.com/interlay/interbtc/blob/0302612ae5f8ddf1f556042ca347c6104704ad83/crates/escrow/src/lib.rs#L530
  */
  const lastPoint = escrowPoint;
  let t_i = roundHeight(lastPoint.ts, escrowSpan);
  while (t_i.lt(height)) {
    t_i = t_i.add(escrowSpan);
    // The BN type is handled by polkadot-js in the api call
    let d_slope;
    if (t_i.gt(height)) {
      t_i = height;
      d_slope = new BN(0);
    } else {
      d_slope = getSlopeChange(slopeChanges, t_i);
    }

    const heightDiff = t_i.sub(lastPoint.ts);
    lastPoint.bias = lastPoint.bias.sub(lastPoint.slope.mul(heightDiff));

    if (t_i.eq(height)) {
      break;
    }

    lastPoint.slope = lastPoint.slope.add(d_slope);
    lastPoint.ts = t_i;
  }

  return lastPoint.bias;
}

function storageKeyToNthInner(s, n = 0) {
  return s.args[n];
}

;(async function () {
  const api = await getApi();
  const [currentBlockNumber, epoch, span, rawSlopeChanges] = await Promise.all([
    getFinalizedBlockNumber(),
    api.query.escrow.epoch(),
    getSpan(),
    api.query.escrow.slopeChanges.entries()
  ]);

  const height = currentBlockNumber;
  const slopeChanges = new Map();
  rawSlopeChanges.forEach(
    ([id, value]) => slopeChanges.set(storageKeyToNthInner(id).toBn(), value.toBn())
  );

  const lastPoint = await api.query.escrow.pointHistory(epoch);
  const rawSupply = rawSupplyAt(parseEscrowPoint(lastPoint), new BN(height), span, slopeChanges);

  const totalSupply = newMonetaryAmount(rawSupply.toString(), monetary.VoteKintsugi);
  console.log('the normalized total voting supply is', totalSupply.toHuman());

  await disconnect();
})()