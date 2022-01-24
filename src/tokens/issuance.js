const { getApi, disconnect } = require("../api");
const monetary = require("@interlay/monetary-js");

;(async function () {
  const api = await getApi();

  const currency = api.createType("InterbtcPrimitivesCurrencyId", { token: monetary.Kintsugi.ticker });
  const issuance = await api.query.tokens.totalIssuance(currency);

  // total issuance of KINT
  console.log(issuance.toString());

  await disconnect();
})()
