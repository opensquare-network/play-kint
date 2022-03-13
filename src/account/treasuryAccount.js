const { u8aConcat } = require("@polkadot/util");

const EMPTY_U8A_32 = new Uint8Array(32);

function getTreasuryAccount(api) {
  const TreasuryAccount = u8aConcat(
    "modl",
    api?.consts.treasury && api.consts.treasury.palletId
      ? api.consts.treasury.palletId.toU8a(true)
      : "py/trsry",
    EMPTY_U8A_32
  ).subarray(0, 32);

  return TreasuryAccount;
}

module.exports = {
  getTreasuryAccount,
}
