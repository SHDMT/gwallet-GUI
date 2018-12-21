let response = require('../response');

class TransactionManager {
    constructor(dbDrive, rpcClient) {
        this.dbDrive = dbDrive;
        this.rpcClient = rpcClient;
    }

    sendPayment(req, res){
        this.rpcClient.getWalletClient().SendPayment(req, (err, result)=>{
            response(res, "sendpayment", err, result);
        });
    }

    calcPaymentFee(req, res){
        this.rpcClient.getWalletClient().CalcPaymentFee(req, (err, result)=>{
            response(res, "calcpaymentfee", err, result);
        });
    }

    sendText(req, res){
        this.rpcClient.getWalletClient().SendText(req, (err, result)=>{
            response(res, "sendtext", err, result);
        });
    }

    calcTextFee(req, res){
        this.rpcClient.getWalletClient().CalcTextFee(req, (err, result)=>{
            response(res, "calctextfee", err, result);
        });
    }

    issueAsset(req, res){
        this.rpcClient.getWalletClient().IssueAsset(req, (err, result)=>{
            response(res, "issueasset", err, result);
        });
    }

    calcIssueAssetFee(req, res){
        this.rpcClient.getWalletClient().CalcIssueAssetFee(req, (err, result)=>{
            response(res, "calcissueassetfee", err, result);
        });
    }

}

exports.TransactionManager = TransactionManager;