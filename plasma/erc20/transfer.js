const { getPlasmaClient, plasma, to } = require("../../utils");
const { ethers } = require("ethers");

async function execute() {
  try {
    const plasmaClient = await getPlasmaClient();
    const erc20Token = plasmaClient.erc20(plasma.child.erc20);

    let amount = ethers.utils.parseUnits("0.1").toString();
    //   console.log(amount);

    const result = await erc20Token.transfer(amount, to, {
      gasPrice: 1000000000,
    });
    const txHash = await result.getTransactionHash();
    console.log(txHash);
  } catch (error) {
    console.log(error);
  }
}

execute()
  .then(() => {})
  .catch((err) => {
    console.error("err", err);
  })
  .finally((_) => {
    process.exit(0);
  });
