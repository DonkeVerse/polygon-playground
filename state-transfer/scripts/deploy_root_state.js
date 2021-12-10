const dotenv = require("dotenv");
const path = require("path");
dotenv.config({
  path: path.join(__dirname, "../../.env"),
});
const config = require("../config/config.json");
const hre = require("hardhat");

// Use your own deployed child tunnel addresses here instead!
const AddrFxStateChildTunnel = "0x9498aDC22Be5Dc389B8A6fb9b833AAC4970cd92C";

async function main() {
  let fxRoot, checkpointManager;

  const network = await hre.ethers.provider.getNetwork();

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
  console.log(fxStateRootTunnel.deployTransaction);
  await fxStateRootTunnel.deployTransaction.wait();
  console.log("FxStateRootTunnel deployed to:", fxStateRootTunnel.address);
  console.log(
    "npx hardhat verify --network goerli",
    fxStateRootTunnel.address,
    checkpointManager,
    fxRoot
  );

  console.log("Setting Child Tunnel in FxStateRootTunnel...");
  const setFxStateChildTunnel = await fxStateRootTunnel.setFxChildTunnel(
    AddrFxStateChildTunnel
  );
  console.log(setFxStateChildTunnel);
  await setFxStateChildTunnel.wait();
  console.log("FxStateChildTunnel set");
}

// npx hardhat run scripts/deploy_root_state.js --network goerli
// FxStateRootTunnel deployed to: 0x60CC03D60c0607a1f32E8bEa849f29619e858653
// FxStateChildTunnel set
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
