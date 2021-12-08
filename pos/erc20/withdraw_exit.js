const { getPOSClient, from, to, pos } = require("../../utils");
const { ethers } = require("ethers");

const execute = async () => {
  const client = await getPOSClient();
  const erc20Token = client.erc20(pos.parent.erc20, true);

  // Burn transaction has not been checkpointed as yet - takes 5-10min
  const result = await erc20Token.withdrawExit(
    "0x12786a24eb3cdb71f6600472db4285c4316d9fa3bc1b51f86960a9e5817e1ff1"
  );

  // WITHDRAW_EXIT_FSATER
  // setProofApi - public RPCs slow - use this then. Refer https://maticnetwork.github.io/matic.js/docs/set-proof-api/
  // const result = await erc20Token.withdrawExitFaster(
  //   "0x12786a24eb3cdb71f6600472db4285c4316d9fa3bc1b51f86960a9e5817e1ff1"
  // );

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
