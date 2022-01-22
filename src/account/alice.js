const { createTestKeyring } = require("@polkadot/keyring")
const { allNetworks } = require("@polkadot/networks");

const kintsugi = allNetworks.find(network => network.network === 'kintsugi');
const instance = createTestKeyring({ ss58Format: kintsugi.prefix });

for (const pair of instance.pairs) {
  console.log(pair.address)
}

// followings are the test addresses:

// a3f1Q33MZ6B82T7rwQ1Ke1Qekzuxe8yRbfvRxkPh11jdsrTLR seed: 'Alice',
// a3eWkwvXHP1kocn5SbWiZab1HTb1Zp4fawJfozmqs1nzSuKRv seed: 'Alice//stash',
// a3dSEkyBQxT88J7NRy5MhG4jnu4wkgS2GB6Hdh2ZKwkie5XoL seed: 'Bob',
// a3fxiGQFYBXEWxETYs9YB2GbmTjQPeQK3WDaPs1o2LHrRNu4Z seed: 'Bob//stash',
// a3dUtq9KTHT1kvin6Vrx2FjC5jCd8fju7bsYyE2rSE9uANgQP seed: 'Charlie',
// a3bJcuKrRVU4SDod7kLMzZ77WsNGczoW32uhw5UjB8DQwPySQ seed: 'Dave',
// a3fRBcdmZDqqdwRUgVZLigDWCrnnHnutgDxY3nZgpwYWJR8at seed: 'Eve',
// a3arqWLmqPQo3Bm79pF51vZx5nVJVGPu75ueUQSsGyDorxbnG seed: 'Ferdie',
