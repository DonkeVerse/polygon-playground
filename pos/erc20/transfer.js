const { getPOSClient, to, pos } = require("../../utils");
const { ethers } = require("ethers");

const execute = async () => {
  const client = await getPOSClient();

  // TRANSFER ERC20 IN -> PARENT_CHAIN (GOERLI)
  // const erc20Token = client.erc20(pos.parent.erc20, true);

  // TRANSFER ERC20 IN -> CHILD_CHAIN (MATIC) note*** only 1 matic network, and pos & plasma are bridges/mechanisms
  const erc20Token = client.erc20(pos.child.erc20);

  let amount = ethers.utils.parseUnits("0.1").toString();
  //   console.log(amount);

  const result = await erc20Token.transfer(amount, to, {
    gasPrice: "30000000000",
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
