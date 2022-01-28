const { getApi, disconnect } = require("../api");

;(async function () {
  const api = await getApi();

  const info = await api.query.democracy.referendumInfoOf(2);

  console.log(`referendum info:`, info.toJSON())
  await disconnect();
})();
