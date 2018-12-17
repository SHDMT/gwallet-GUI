let response = require("../response");

class BlockchainManager {
  constructor(dbDrive, rpcClient) {
    this.dbDrive = dbDrive;
    this.rpcClient = rpcClient;
  }

  getBlockChainInfo(req, res) {
    this.rpcClient.getCoreClient().GetBlockChainInfo(req, (err, result) => {
      response(res, "getblockchaininfo", err, result);
    });
  }
}

exports.BlockchainManager = BlockchainManager;
