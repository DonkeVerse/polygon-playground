const hre = require("hardhat");

const AddrFxStateRootTunnel = "0x31a489a08603BfAb1B22430B2207C15c8d8897b2";

async function main() {
  const fxStateRootTunnel = await hre.ethers.getContractAt(
    "FxStateRootTunnel",
    AddrFxStateRootTunnel
  );
  console.log("fxStateRootTunnel : ", fxStateRootTunnel.address);

  console.log("FxStateRootTunnel -> Sending Message From Root to Child...");
  const sendMessage = await fxStateRootTunnel.sendMessageToChild(
    "0x6162636400000000000000000000000000000000000000000000000000000000"
  );
  console.log("sendMessage: ", sendMessage);
  await sendMessage.wait();
  console.log("Message sent");
}

// npx hardhat run scripts/send_root_to_child.js --network goerli
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
