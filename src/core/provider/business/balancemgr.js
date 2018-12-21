let response = require('../response');

class BalanceManager {
    constructor(dbDrive, rpcClient) {
        this.dbDrive = dbDrive;
        this.rpcClient = rpcClient;
    }

    getBalance(req, res){
        this.rpcClient.getWalletClient().GetBalance(req,(err,result)=>{
            response(res, "getbalance", err, result);
        });
    }
    getAssetBalance(req, res){
        this.rpcClient.getWalletClient().GetBalance(req,(err,result)=>{
            response(res, "getassetbalance", err, result);
        });
    }

    listTransaction(req, res){
        this.rpcClient.getWalletClient().ListTX({accountName:req.accountName,count:req.count},(err,result)=>{
            response(res, "listtx", err, result);
        });
    }

    getAllAssets(req, res){
        this.rpcClient.getWalletClient().GetAllAssets(req, (err, result)=>{
            response(res, "getallassets", err, result);
        });
    }

}

exports.BalanceManager = BalanceManager;