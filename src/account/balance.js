const { getApi } = require("../api");
const { encodeAddress } = require("@polkadot/util-crypto");
const { allNetworks } = require("@polkadot/networks");

const kintsugi = allNetworks.find(network => network.network === 'kintsugi');

function normalizeEntry(api, [key, value]) {
  const pubKeyU8a = key.slice(48, 81);
  const addr = encodeAddress(pubKeyU8a, kintsugi.prefix);
  const currencyIdKey = key.slice(88);

  const token = api.registry.createType('InterbtcPrimitivesCurrencyId', currencyIdKey).asToken.toString()

  const balance = {};
  for (const [k, v] of value.entries()) {
    balance[k] = v.toString()
  }

  return {
    addr,
    token,
    balance,
  }
}

async function allBalance() {
  const api = await getApi()

  const entries = await api.query.tokens.accounts.entries()
  const allBalances = entries.map(entry => normalizeEntry(api, entry));
  return allBalances
}

module.exports = {
  allBalance,
}
