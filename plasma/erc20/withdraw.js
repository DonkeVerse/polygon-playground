const { getPlasmaClient, plasma } = require("../../utils");

async function execute() {
  const plasmaClient = await getPlasmaClient();
  const erc20Token = plasmaClient.erc20(plasma.parent.erc20, true);

  const result = await erc20Token.withdrawExit();

  const txHash = await result.getTransactionHash();
  console.log("txHash: ", txHash);
  const txReceipt = await result.getReceipt();
  console.log("txReceipt: ", txReceipt);
}

execute().then((_) => {
  process.exit(0);
});
