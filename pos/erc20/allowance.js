const { getPOSClient, pos, from } = require("../../utils");
const { ethers } = require("ethers");

const execute = async () => {
  const client = await getPOSClient();
  const erc20Token = client.erc20(pos.parent.erc20, true);
  // check matic allowance
  // const erc20Token = client.erc20(pos.parent.matic, true);

  let allowance = await erc20Token.getAllowance(from);

  allowance = ethers.utils.formatUnits(allowance).toString();
  console.log("allowance: ", allowance);
};
execute()
  .then(() => {})
  .catch((err) => {
    console.error("err", err);
  })
  .finally((_) => {
    process.exit(0);
  });
