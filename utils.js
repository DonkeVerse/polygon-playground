const bn = require("bn.js");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const config = require("./config");
const { POSClient, setProofApi, use } = require("@maticnetwork/maticjs");
const { PlasmaClient } = require("@maticnetwork/maticjs-plasma");
const SCALING_FACTOR = new bn(10).pow(new bn(18));
const { Web3ClientPlugin } = require("@maticnetwork/maticjs-web3");

// install web3 plugin
use(Web3ClientPlugin);

if (config.proofApi) {
  setProofApi(config.proofApi);
}

const privateKey = config.user1.privateKey;
const userAddress = config.user1.address;

const getPOSClient = (network = "testnet", version = "mumbai") => {
  try {
    const posClient = new POSClient();
    return posClient.init({
      //   log: true,
      network: network,
      version: version,
      child: {
        provider: new HDWalletProvider(privateKey, config.child.rpc),
        defaultConfig: {
          from: userAddress,
        },
      },
      parent: {
        provider: new HDWalletProvider(privateKey, config.parent.rpc),
        defaultConfig: {
          from: userAddress,
        },
      },
    });
  } catch (error) {
    console.error("error unable to initiate posClient", error);
  }
};

const getPlasmaClient = async (network = "testnet", version = "mumbai") => {
  try {
    const plasmaClient = new PlasmaClient();
    await plasmaClient.init({
      network: network,
      version: version,
      parent: {
        provider: new HDWalletProvider(privateKey, config.parent.rpc),
        defaultConfig: {
          from: userAddress,
        },
      },
      child: {
        provider: new HDWalletProvider(privateKey, config.child.rpc),
        defaultConfig: {
          from: userAddress,
        },
      },
    });
    return plasmaClient;
  } catch (error) {
    console.error("error unable to initiate plasmaClient", error);
  }
};

module.exports = {
  SCALING_FACTOR,
  getPOSClient: getPOSClient,
  getPlasmaClient: getPlasmaClient,
  parent: config.parent,
  child: config.child,
  plasma: config.plasma,
  pos: config.pos,
  from: config.user1.address,
  privateKey: config.user1.privateKey,
  to: config.user2.address,
};
