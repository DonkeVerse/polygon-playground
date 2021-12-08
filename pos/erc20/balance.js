const { getPOSClient, from, pos } = require("../../utils");

const execute = async () => {
  const posClient = await getPOSClient();
  console.log("P O S ::::::::::::");
  const posParentERC20 = posClient.erc20(pos.parent.erc20, true);
  const balancePosParentERC20 = await posParentERC20.getBalance(from);
  console.log("balancePosParentERC20", balancePosParentERC20);
  const posChildERC20 = posClient.erc20(pos.child.erc20);
  const balancePosChildERC20 = await posChildERC20.getBalance(from);
  console.log("balancePosChildERC20", balancePosChildERC20);
};

execute()
  .then((_) => {
    process.exit(0);
  })
  .catch((err) => {
    console.error("error", err);
    process.exit(0);
  });
