const { getPOSClient, pos } = require("../../utils");

const execute = async () => {
  const client = await getPOSClient();
  const erc20Token = client.erc20(pos.parent.erc20, true);

  // in parmas, pass txn hash you got from withdraw_start -> prrof of burn txnHash
  const isExited = await erc20Token.isWithdrawExited(
    "0xb005d8db45f33836c422ee18286fa8ebe49b4ec7b9930e673d85ecd081cc3b8e"
  );

  console.log("isExited", isExited);
};
execute()
  .then(() => {})
  .catch((err) => {
    console.error("err", err);
  })
  .finally((_) => {
    process.exit(0);
  });
