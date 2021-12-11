const hre = require("hardhat");

const AddrFxStateChildTunnel = "0xaB914bD287Fcc388742D3916CA261Bf58aeA7113";

async function main() {
  const fxStateChildTunnel = await hre.ethers.getContractAt(
    "FxStateChildTunnel",
    AddrFxStateChildTunnel
  );
  console.log("fxStateChildTunnel: ", fxStateChildTunnel.address);

  console.log("FxStateChildTunnel -> Sending Message From Child to Root...");
  const sendMessage = await fxStateChildTunnel.sendMessageToRoot(
    "0x6162636400000000000000000000000000000000000000000000000000000000"
  );
  console.log("sendMessage: ", sendMessage);
  await sendMessage.wait();
  console.log("Message sent");
}

// npx hardhat run scripts/send_child_to_root.js --network mumbai
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
