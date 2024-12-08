const {
  getFinalizedBlockNumber,
  parseEscrowPoint,
  newMonetaryAmount,
  saturatingSub,
} = require("./utils");
const { getApi, disconnect } = require("../api");
const BN = require("bn.js");
const monetary = require("@interlay/monetary-js");
const isNil = require("lodash.isnil");

async function getSpan() {
  const api = await getApi();
  return (await api.consts.escrow.span).toBn();
}

function getSlopeChange(slopeChanges, key) {
  let d_slope = slopeChanges.get(key.toNumber());
  if (d_slope === undefined) {
    d_slope = new BN(0);
  }
  return d_slope;
}

function roundHeight(height, span) {
  return height.div(span).mul(span);
}

function rawSupplyAt(escrowPoint, height, span, slopeChanges) {
  const escrowSpan = new BN(span);
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

    const heightDiff = saturatingSub(t_i, lastPoint.ts);
    lastPoint.bias = saturatingSub(
      lastPoint.bias,
      lastPoint.slope.mul(heightDiff)
    );

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

;(async function (blockNumber) {
  const api = await getApi();
  let height = blockNumber;
  if (isNil(height)) {
    height = await getFinalizedBlockNumber()
  }
  const blockHash = await api.rpc.chain.getBlockHash(height);
  const blockApi = await api.at(blockHash);
  const span = blockApi.consts.escrow.span.toNumber();
  const rawEpoch = await blockApi.query.escrow.epoch();
  const epoch = rawEpoch.toNumber();
  const rawSlopeChanges = await blockApi.query.escrow.slopeChanges.entries();

  const slopeChanges = new Map();
  rawSlopeChanges.forEach(
    ([id, value]) => slopeChanges.set(storageKeyToNthInner(id).toNumber(), value.toJSON())
  );

  const lastPoint = await blockApi.query.escrow.pointHistory(epoch);
  const rawSupply = rawSupplyAt(parseEscrowPoint(lastPoint), new BN(height), span, slopeChanges);

  const totalSupply = newMonetaryAmount(rawSupply.toString(), monetary.VoteInterlay);
  console.log('the normalized total voting supply is', totalSupply.toHuman());

  // let sqrt_electorate = electorate.max(tally.turnout).integer_sqrt();

  await disconnect();
})(524444)
