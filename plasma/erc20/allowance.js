const { getPlasmaClient, from, plasma } = require("../../utils");
const { ethers } = require("ethers");

const execute = async () => {
  const plasmaClient = await getPlasmaClient();
  const erc20Token = plasmaClient.erc20(plasma.parent.erc20, true);

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
