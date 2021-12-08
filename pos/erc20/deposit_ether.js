const { getPOSClient, from } = require("../../utils");
const { ethers } = require("ethers");

const execute = async () => {
  const posClient = await getPOSClient();
  let amount = ethers.utils.parseUnits("0.0012").toString();
  console.log(amount);

  const result = await posClient.depositEther(amount, from);

  const txHash = await result.getTransactionHash();
  console.log("txHash", txHash);
  const receipt = await result.getReceipt();
  console.log("receipt", receipt);
};

execute()
  .then(() => {})
  .catch((err) => {
    console.error("err", err);
  })
  .finally((_) => {
    process.exit(0);
  });
