const { getApi, disconnect } = require("../api");
const { encodeAddress } = require("@polkadot/util-crypto");
const { allNetworks } = require("@polkadot/networks");

const kintsugi = allNetworks.find(network => network.network === 'kintsugi');

function normalizeEntry(api, [key, value]) {
  const pubKeyU8a = key.slice(48, 80);
  const addr = encodeAddress(pubKeyU8a, kintsugi.prefix);

  return {
    addr,
    locked: {
      amount: value.amount.toString(),
      end: value.end.toNumber(),
    }
  }
}

async function getAllLocks() {
  const api = await getApi()

  const entries = await api.query.escrow.locked.entries()
  const allLocks = entries.map(entry => normalizeEntry(api, entry));

  console.log(allLocks)
  const charlieLocked = await api.query.escrow.locked('a3dUtq9KTHT1kvin6Vrx2FjC5jCd8fju7bsYyE2rSE9uANgQP');
  console.log('charlie', charlieLocked.toJSON())

  await disconnect()
}

getAllLocks();
