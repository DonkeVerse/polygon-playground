const { getPlasmaClient, plasma } = require("../../utils");
const { ethers } = require("ethers");

async function execute() {
  const plasmaClient = await getPlasmaClient();
  const erc20Token = plasmaClient.erc20(plasma.child.erc20);

  let amount = ethers.utils.parseUnits("1").toString();
  //   console.log(amount);

  const result = await erc20Token.withdrawStart(amount);
  console.log(await result.getReceipt());
}

execute()
  .then(() => {})
  .catch((err) => {
    console.error("err", err);
  })
  .finally((_) => {
    process.exit(0);
  });
