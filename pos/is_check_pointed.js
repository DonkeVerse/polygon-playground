const { getPOSClient } = require("../utils");

const execute = async () => {
  const client = await getPOSClient();

  // PARAM -> TxnHash prrof of burn (whie going from matic to eth), note*** when(eth->matic), state_sync mechanism
  const isCheckPointed = await client.isCheckPointed(
    "0x54f47c891b460369661e22e27eeb4afbbb5dd792c7c8b48cab758892c14ffe85"
  );

  console.log("isCheckPointed", isCheckPointed);
};
execute()
  .then(() => {})
  .catch((err) => {
    console.error("err", err);
  })
  .finally((_) => {
    process.exit(0);
  });
