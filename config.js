const dotenv = require("dotenv");
const path = require("path");
const env = dotenv.config({
  path: path.join(__dirname, ".env"),
});

if (env.error) {
  throw new Error("no env file found");
}

module.exports = {
  parent: {
    rpc: process.env.GOERLI_RPC,
  },
  child: {
    rpc: process.env.MUMBAI_RPC || "https://rpc-mumbai.matic.today",
  },
  pos: {
    parent: {
      erc20: "0x655f2166b0709cd575202630952d71e2bb0d61af",
      matic: "0x499d11e0b6eac7c0593d8fb292dcbbf815fb29ae",
      // chainManagerAddress: "0xBbD7cBFA79faee899Eaf900F13C9065bF03B1A74", // Address of RootChainManager for POS Portal
    },
    child: {
      erc20: "0xfe4f5145f6e09952a5ba9e956ed0c25e3fa4c7f1",
      weth: "0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa",
      matic: "0x6FF0C4Ea2E3E33C7dB7cF4cEc263D727fd50461D",
    },
  },
  plasma: {
    parent: {
      erc20: "0x3f152b63ec5ca5831061b2dccfb29a874c317502",
    },
    child: {
      erc20: "0x499d11e0b6eac7c0593d8fb292dcbbf815fb29ae",
    },
  },
  SYNCER_URL: "https://testnetv3-syncer.api.matic.network/api/v1", // Backend service which syncs the Matic sidechain state to a MySQL database which we use for faster querying. This comes in handy especially for constructing withdrawal proofs while exiting assets from Plasma.
  WATCHER_URL: "https://testnetv3-watcher.api.matic.network/api/v1", // Backend service which syncs the Matic Plasma contract events on Ethereum mainchain to a MySQL database which we use for faster querying. This comes in handy especially for listening to asset deposits on the Plasma contract.
  user1: {
    // '<paste your private key here>' - A sample private key prefix with `0x`
    privateKey: process.env.USER1_PRIVATE_KEY,
    //'<paste address belonging to private key here>', Your address
    address: process.env.USER1_FROM,
  },
  user2: {
    address: process.env.USER2_FROM,
  },
  proofApi: process.env.PROOF_API,
};
