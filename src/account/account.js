const { getApi, } = require("../api");
const { encodeAddress } = require("@polkadot/util-crypto");
const { allNetworks } = require("@polkadot/networks");

const kintsugi = allNetworks.find(network => network.network === 'kintsugi');
function normalizeEntry([key, value]) {
  const pubKeyU8a = key.slice(48);
  const addr = encodeAddress(pubKeyU8a, kintsugi.prefix);
  const detail = value.toJSON();

  return {
    addr,
    detail,
  };
}

async function getAllAccounts() {
  const api = await getApi();
  const entries = await api.query.system.account.entries()
  return entries.map(normalizeEntry);
}

module.exports = {
  getAllAccounts,
}
