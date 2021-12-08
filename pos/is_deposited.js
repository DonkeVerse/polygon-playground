const { getPOSClient } = require("../utils");

const execute = async () => {
  const client = await getPOSClient();

  // PARAM -> TxnHash of deposit (whie going from eth to matic)- state-sync, note*** when(matic->eth), proofOfBurn & checkpointing
  const isDeposited = await client.isDeposited(
    "0x48fe1e4f8c915d01ef13ccd7ac1e7cb6db1db15ea1d1df2e6fd8e957fe980dab"
  );

  console.log("isDeposited", isDeposited);
};
execute()
  .then(() => {})
  .catch((err) => {
    console.error("err", err);
  })
  .finally((_) => {
    process.exit(0);
  });
