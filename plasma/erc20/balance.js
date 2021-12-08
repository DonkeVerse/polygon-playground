const { getPlasmaClient, from, plasma } = require("../../utils");

const execute = async () => {
  const plasmaClient = await getPlasmaClient();
  console.log("P L A S M A ::::::::::::");
  const plasmaParentERC20 = plasmaClient.erc20(plasma.parent.erc20, true);
  const balancePlasmaParentERC20 = await plasmaParentERC20.getBalance(from);
  console.log("balancePlasmaParentERC20", balancePlasmaParentERC20);
  const plasmaChildERC20 = plasmaClient.erc20(plasma.child.erc20);
  const balancePlasmaChildERC20 = await plasmaChildERC20.getBalance(from);
  console.log("balancePlasmaChildERC20", balancePlasmaChildERC20);
};

execute()
  .then((_) => {
    process.exit(0);
  })
  .catch((err) => {
    console.error("error", err);
    process.exit(0);
  });
