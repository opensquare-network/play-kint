const { getApi, disconnect } = require("../api");
const { createTestKeyring } = require("@polkadot/keyring");

(async function createLock() {
  const api = await getApi();

  const instance = createTestKeyring()
  const charlie = instance.pairs[4];
  const unsub = await api.tx.escrow.createLock(
    0.1 * Math.pow(10, 12),
    10000000
  ).signAndSend(charlie, (result) => {
    console.log(`Current status is ${ result.status }`);

    if (result.status.isInBlock) {
      console.log(`Transaction included at blockHash ${ result.status.asInBlock }`);
    } else if (result.status.isFinalized) {
      console.log(`Transaction finalized at blockHash ${ result.status.asFinalized }`);
      unsub();
      disconnect();
    }
  });
})()
