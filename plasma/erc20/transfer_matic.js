const { getPlasmaClient, plasma, to } = require("../../utils");
const { ethers } = require("ethers");

async function execute() {
  try {
    const plasmaClient = await getPlasmaClient();
    // initiating token with null means - use matic token address
    const erc20Token = plasmaClient.erc20(null);

    let amount = ethers.utils.parseUnits("1").toString();
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
