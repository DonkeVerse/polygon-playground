const { getPOSClient, from, to, pos } = require("../../utils");
const { ethers } = require("ethers");

const execute = async () => {
  const client = await getPOSClient();
  const erc20Token = client.erc20(pos.child.erc20);

  let amount = ethers.utils.parseUnits("1").toString();
  //   console.log(amount);

  const result = await erc20Token.withdrawStart(amount);

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
