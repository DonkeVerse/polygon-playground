const { getPlasmaClient, from, plasma } = require("../../utils");
const { ethers } = require("ethers");

async function execute() {
  const plasmaClient = await getPlasmaClient();
  const erc20Token = plasmaClient.erc20(plasma.parent.erc20, true);

  //   const amount = "1000000000000000000"; // amount in wei
  const amount = ethers.utils.parseUnits("0.1").toString();
  //   console.log(amount);

  const result = await erc20Token.approve(amount);
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
