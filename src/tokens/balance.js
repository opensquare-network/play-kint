const { getApi, disconnect } = require("../api");
const monetary = require("@interlay/monetary-js");
const { getTreasuryAccount } = require("../account/treasuryAccount");

;(async function () {
  const api = await getApi();

  const burn = api.consts.treasury.burn
  const treasuryAccount = getTreasuryAccount(api);
  const accountData = await api.query.tokens.accounts(treasuryAccount, { token: monetary.Kintsugi.ticker });
  console.log(accountData);

  await disconnect();
})()
