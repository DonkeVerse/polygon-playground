const { getPOSClient, pos } = require("../../utils");
const { ethers } = require("ethers");

const execute = async () => {
  const posClient = await getPOSClient();
  const posParentERC20 = posClient.erc20(pos.parent.erc20, true);
  // instantiate erc20 for MATIC token instead of ERC20-POS, THEN approve matic from goerli to matic network
  // const posParentERC20 = posClient.erc20(pos.parent.matic, true);

  let amount = ethers.utils.parseUnits("0.1").toString();
  //   console.log(amount);

  // NORMAL_APPROVE
  const result = await posParentERC20.approve(amount);

  // APPROVE_MAX =>
  // Platforms want to maximize the user experience by asking unlimited approval for once
  // he approval amount equals the max value of uint256 (0xffff...ffff) or the total supply of the tokens.This type of approval is frequently used by many DeFi platforms (such as exchanges, lending platforms).
  // const result = await posParentERC20.approveMax();

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
