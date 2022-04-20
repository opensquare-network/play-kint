const { getApi, disconnect } = require("../api");

;(async () => {
  const api = await getApi();

  // const height = 651008
  // const height = 654256
  const height = 654071
  const blockHash = await api.rpc.chain.getBlockHash(height);
  const blockApi = await api.at(blockHash);
  const raw = await blockApi.query.democracy.publicProps();
  const allProposals = raw.toJSON() || [];

  console.log(allProposals.map(p => p[0]));

  await disconnect();
})()
