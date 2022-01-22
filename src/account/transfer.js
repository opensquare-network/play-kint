const { getApi } = require("../api");
const { createTestKeyring } = require("@polkadot/keyring");

(async function transfer() {
  const api = await getApi();
  const kintCurrencyId = api.registry.createType('InterbtcPrimitivesCurrencyId', '0x000c');

  const instance = createTestKeyring()
  const charlie = instance.pairs[4];
  const unsub = await api.tx.tokens.transfer(
    'a3aDHY94Ny9ZsB74LhtrWYjQUom9sEoQk97K1bCR324PFHMbb',
    kintCurrencyId,
    0.5 * Math.pow(10, 12),
  ).signAndSend(charlie, (result) => {
    console.log(`Current status is ${ result.status }`);

    if (result.status.isInBlock) {
      console.log(`Transaction included at blockHash ${ result.status.asInBlock }`);
    } else if (result.status.isFinalized) {
      console.log(`Transaction finalized at blockHash ${ result.status.asFinalized }`);
      unsub();
    }
  });
})()
