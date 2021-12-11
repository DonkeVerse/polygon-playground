const hre = require("hardhat");

// Use your own deployed tunnel addresses here instead!
const AddrFxStateRootTunnel = "0x31a489a08603BfAb1B22430B2207C15c8d8897b2";
const AddrFxStateChildTunnel = "0x57e77542bDb91D22C8dA8FECFd7A93c5767D2056";

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
