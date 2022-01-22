const { getAllAccounts } = require("./account/account");
const { allBalance } = require("./account/balance");
const { disconnect } = require("./api")

async function main() {
  // const accounts = await getAllAccounts();
  // console.log(accounts)

  const allBalances = await allBalance();
  for (const { addr, token, balance } of allBalances) {
    console.log(addr, token, balance);
  }

  await disconnect()
}

main();
