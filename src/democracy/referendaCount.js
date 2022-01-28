const { getApi, disconnect } = require("../api");

// kintsugi dev: first fast track 65103
// kintsugi dev: second fast track 73447
;(async function () {
  const api = await getApi();

  const blockHash = await api.rpc.chain.getBlockHash(73447);
  const cnt = await api.query.democracy.referendumCount.at(blockHash);

  console.log(`referendum count:`, cnt.toNumber())
  await disconnect();
})();
