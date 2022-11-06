const { ApiPromise, WsProvider, } = require("@polkadot/api");
const { kintsugiOptions } = require("./options");

let provider = null;
let api = null;

// const kintEndPoint = "wss://api-dev-kintsugi.interlay.io/parachain";

const kintEndPoint = "wss://kintsugi.api.onfinality.io/public-ws";

async function getApi() {

  if (!api) {
    provider = new WsProvider(kintEndPoint);
    api = await ApiPromise.create({ provider, ...kintsugiOptions });
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
