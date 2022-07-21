const { getApi, disconnect } = require("../api");
const monetary = require("@interlay/monetary-js");
const { getTreasuryAccount } = require("../account/treasuryAccount");

;(async function () {
  const api = await getApi();

  const address = 'a3c5XSG3msKgh1T1Cu8ig6CDrHA3qyxJVMWkMENGCjvZGCsWb';

  const burn = api.consts.treasury.burn
  const treasuryAccount = getTreasuryAccount(api);
  const accountData = await api.query.tokens.accounts(address, { token: monetary.Kintsugi.ticker });
  console.log(accountData.toJSON());

  await disconnect();
})()
