const dotenv = require("dotenv");
const path = require("path");
dotenv.config({
  path: path.join(__dirname, "../../.env"),
});
const config = require("../config/config.json");
const hre = require("hardhat");

async function main() {
  let fxChild;

  const network = await hre.ethers.provider.getNetwork();
  // console.log(network);

  if (network.chainId === 137) {
    // Polygon Mainnet
    fxChild = config.mainnet.fxChild.address;
  } else if (network.chainId === 80001) {
    // Mumbai Testnet
    fxChild = config.testnet.fxChild.address;
  } else {
    fxChild = process.env.FX_CHILD;
  }

  const FxStateChildTunnel = await hre.ethers.getContractFactory(
    "FxStateChildTunnel"
  );
  const fxStateChildTunnel = await FxStateChildTunnel.deploy(fxChild);
  console.log("fxStateChildTunnel: ", fxStateChildTunnel);
  await fxStateChildTunnel.deployTransaction.wait();
  console.log("FxStateChildTunnel deployed to:", fxStateChildTunnel.address);
  console.log(
    "npx hardhat verify --network mumbai",
    fxStateChildTunnel.address,
    fxChild
  );
}

// npx hardhat run scripts/deploy_child_tunnel.js --network mumbai
// FxStateChildTunnel deployed to: 0xaB914bD287Fcc388742D3916CA261Bf58aeA7113
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
