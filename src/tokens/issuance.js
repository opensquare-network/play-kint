const { getApi, disconnect } = require("../api");
const monetary = require("@interlay/monetary-js");

;(async function () {
  const api = await getApi();

  const currency = api.createType("InterbtcPrimitivesCurrencyId", { token: monetary.Kintsugi.ticker });
  const issuance = await api.query.tokens.totalIssuance(currency);

  // This values will be used as the `electorate` in the voting threshold calculation
  console.log(issuance.toString());

  await disconnect();
})()
