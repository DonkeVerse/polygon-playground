const hre = require("hardhat");

const AddrFxStateRootTunnel = "0xaB914bD287Fcc388742D3916CA261Bf58aeA7113";

async function main() {
  const fxStateRootTunnel = await hre.ethers.getContractAt(
    "FxStateRootTunnel",
    AddrFxStateRootTunnel
  );
  console.log("fxStateRootTunnel : ", fxStateRootTunnel.address);
  console.log("FxStateRootTunnel -> Reading SEND_MESSAGE_EVENT_SIG...");
  const SEND_MESSAGE_EVENT_SIG =
    await fxStateRootTunnel.SEND_MESSAGE_EVENT_SIG();
  console.log("SEND_MESSAGE_EVENT_SIG: ", SEND_MESSAGE_EVENT_SIG);
}

// npx hardhat run scripts/query.js --network goerli
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
