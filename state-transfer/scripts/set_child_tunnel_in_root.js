const hre = require("hardhat");

// Use your own deployed tunnel addresses here !
const AddrFxStateRootTunnel = "0xaB914bD287Fcc388742D3916CA261Bf58aeA7113";
const AddrFxStateChildTunnel = "0xaB914bD287Fcc388742D3916CA261Bf58aeA7113";

async function main() {
  const fxStateRootTunnel = await hre.ethers.getContractAt(
    "FxStateRootTunnel",
    AddrFxStateRootTunnel
  );
  console.log("fxStateRootTunnel : ", fxStateRootTunnel.address);

  console.log("Setting Child Tunnel in FxStateRootTunnel...");
  const setFxStateChildTunnel = await fxStateRootTunnel.setFxChildTunnel(
    AddrFxStateChildTunnel
  );
  console.log("setFxStateChildTunnel: ", setFxStateChildTunnel);
  await setFxStateChildTunnel.wait();
  console.log("FxStateChildTunnel set in root!");
}

// npx hardhat run scripts/set_child_tunnel_in_root.js --network goerli
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
