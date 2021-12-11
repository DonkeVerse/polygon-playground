const hre = require("hardhat");

// Use your own deployed tunnel addresses here instead!
const AddrFxStateRootTunnel = "0xaB914bD287Fcc388742D3916CA261Bf58aeA7113";
const AddrFxStateChildTunnel = "0xaB914bD287Fcc388742D3916CA261Bf58aeA7113";

async function main() {
  const fxStateChildTunnel = await hre.ethers.getContractAt(
    "FxStateChildTunnel",
    AddrFxStateChildTunnel
  );
  console.log("fxStateChildTunnel: ", fxStateChildTunnel.address);

  console.log("Setting Root Tunnel in FxStateChildTunnel...");
  const setFxStateRootTunnel = await fxStateChildTunnel.setFxRootTunnel(
    AddrFxStateRootTunnel
  );
  console.log("setFxStateRootTunnel: ", setFxStateRootTunnel);
  await setFxStateRootTunnel.wait();
  console.log("FxStateRootTunnel set in child!");
}

// npx hardhat run scripts/set_root_tunnel_in_child.js --network mumbai
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
