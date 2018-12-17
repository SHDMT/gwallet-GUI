let tools = require("./tools").Tools;

let coreRPCParams = {
  protoPath: __dirname + "/../../../public/proto/core.proto",
  packageName: "corerpc",
  host: "localhost",
  port: 50053
};
let walletRPCParams = {
  protoPath: __dirname + "/../../../public/proto/wallet.proto",
  packageName: "walletrpc",
  host: "localhost",
  port: 50052
};

let dbParams = {
  dbPath: tools.getAppDataDirectory() + "/db/data.db",
  dialect: "sqlite"
};
let config = {
  coreRPCParams,
  walletRPCParams,
  dbParams,
};

exports.Config = config;
