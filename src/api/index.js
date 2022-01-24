const { ApiPromise, WsProvider, } = require("@polkadot/api");
const definitions = require("./definitions");
const { getRegistry } = require("./registry");

let provider = null;
let api = null;

// const kintEndPoint = "wss://api-dev-kintsugi.interlay.io/parachain";

const kintEndPoint = "wss://kintsugi.api.onfinality.io/public-ws";

async function getApi() {
  const registry = getRegistry();

  if (!api) {
    provider = new WsProvider(kintEndPoint);
    api = await ApiPromise.create({ provider, registry, rpc: definitions.providerRpc });
  }

  return api;
}

async function disconnect() {
  if (api) {
    await api.disconnect()
  }
}

module.exports = {
  getApi,
  disconnect,
}
