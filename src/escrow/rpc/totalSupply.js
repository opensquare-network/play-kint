const { getApi, disconnect } = require("../../api");

;(async () => {
  const api = await getApi();
  const totalSupply = await api.rpc.escrow.totalSupply(10000);

  console.log(totalSupply.toString());
  await disconnect();
})();
