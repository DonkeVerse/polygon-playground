const { getPlasmaClient, from, plasma } = require("../../utils");
const { ethers } = require("ethers");

const execute = async () => {
  const plasmaClient = await getPlasmaClient();
  const erc20Token = plasmaClient.erc20(plasma.parent.erc20, true);

  //   const amount = "1000000000000000000"; // amount in wei
  const amount = ethers.utils.parseUnits("0.1").toString();
  //   console.log(amount);

  const result = await erc20Token.deposit(amount, from, {
    maxPriorityFeePerGas: 1000000000,
  });
  const receipt = await result.getReceipt();
  console.log(receipt);
};

execute()
  .then(() => {})
  .catch((err) => {
    console.error("err", err);
  })
  .finally((_) => {
    process.exit(0);
  });
