let response = require('../response');

class NetworkManager {
    constructor(dbDrive, rpcClient) {
        this.dbDrive = dbDrive;
        this.rpcClient = rpcClient;
    }

    //req：{}
    getPeerList(req, res){
        this.rpcClient.getCoreClient().GetPeerList(req,(err,result)=>{
            response(res, "getpeerlist", err, result);
        });
    }
    //req：{}
    getNetworkStatus(req, res){
        this.rpcClient.getCoreClient().GetNetworkStatus(req,(err,result)=>{
            response(res, "getnetworkstatus", err, result);
        });
    }
    getCoreSyncProgress(req, res){
        this.rpcClient.getCoreClient().CoreSyncProgress(req,(err,result)=>{
            response(res, "getcoresyncprogress", err, result);
        });
    }

    //req：{}
    getSyncProgress(req, res){
        this.rpcClient.getCoreClient().CoreSyncProgress(req,(err1,CoreProcess)=>{
            if(err1 != null){
                response(res, "getsyncprogress", err1, null);
                return;
            }
            this.rpcClient.getWalletClient().WalletIsSynced(req,(err2,WalletProcess)=>{
                if(err2 != null){
                    response(res, "getsyncprogress", err2, null);
                    return;
                }
                let walletprocess = 0;
                if(WalletProcess.synced){
                    walletprocess = 100;
                }
                let result = CoreProcess.score * 8 / 10 + walletprocess * 2 / 10;
                response(res, "getsyncprogress", err2, result);
            });
        });
    }
}

exports.NetworkManager = NetworkManager;