const dotenv = require("dotenv");
const path = require("path");
dotenv.config({
  path: path.join(__dirname, "../../.env"),
});
const config = require("../config/config.json");
const hre = require("hardhat");

async function main() {
  let fxRoot, checkpointManager;

  const network = await hre.ethers.provider.getNetwork();
  // console.log(network);

  if (network.chainId === 1) {
    // Ethereum Mainnet
    fxRoot = config.mainnet.fxRoot.address;
    checkpointManager = config.mainnet.checkpointManager.address;
  } else if (network.chainId === 5) {
    // Goerli Testnet
    fxRoot = config.testnet.fxRoot.address;
    checkpointManager = config.testnet.checkpointManager.address;
  } else {
    fxRoot = process.env.FX_ROOT;
    checkpointManager = process.env.CHECKPOINT_MANAGER;
  }

  // You will want to use your own tunnel addresses here instead!
  const FxStateRootTunnel = await hre.ethers.getContractFactory(
    "FxStateRootTunnel"
  );
  const fxStateRootTunnel = await FxStateRootTunnel.deploy(
    checkpointManager,
    fxRoot
  );
  console.log("fxStateRootTunnel: ", fxStateRootTunnel);
  await fxStateRootTunnel.deployTransaction.wait();
  console.log("FxStateRootTunnel deployed to:", fxStateRootTunnel.address);
  console.log(
    "npx hardhat verify --network goerli",
    fxStateRootTunnel.address,
    checkpointManager,
    fxRoot
  );
}

// npx hardhat run scripts/deploy_root_tunnel.js --network goerli
// FxStateRootTunnel deployed to: 0xaB914bD287Fcc388742D3916CA261Bf58aeA7113
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
