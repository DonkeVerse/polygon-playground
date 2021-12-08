const { getPOSClient, from, pos } = require("../../utils");
const { ethers } = require("ethers");

const execute = async () => {
  const posClient = await getPOSClient();
  const posParentERC20 = posClient.erc20(pos.parent.erc20, true);
  // depositing matic from goerli to matic network(make sure approved)
  // const posParentERC20 = posClient.erc20(pos.parent.matic, true);

  let amount = ethers.utils.parseUnits("0.1").toString();
  //   console.log(amount);

  const result = await posParentERC20.deposit(amount, from, {
    from,
    gasLimit: 300000,
    gasPrice: 50000000000,
    // maxPriorityFeePerGas: 6000000000,
  });

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
