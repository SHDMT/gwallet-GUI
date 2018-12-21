let response = require('../response');

class ContractManager {
    constructor(dbDrive, rpcClient) {
        this.dbDrive = dbDrive;
        this.rpcClient = rpcClient;
    }

    invokeContract(req, res){
        this.rpcClient.getWalletClient().InvokeContract(req, (err, result)=>{
            response(res, "invokecontract", err, result);
        });
    }

    calcInvokeContractFee(req, res){
        this.rpcClient.getWalletClient().CalcInvokeContractFee(req, (err, result)=>{
            response(res, "calcinvokecontractfee", err, result);
        });
    }

    deployContract(req, res){
        this.rpcClient.getWalletClient().DeployContract(req, (err, result)=>{
            response(res, "deploycontract", err, result);
        });
    }

    calcDeployContractFee(req, res){
        this.rpcClient.getWalletClient().CalcDeployContractFee(req, (err, result)=>{
            response(res, "calcdeploycontractfee", err, result);
        });
    }

    getAllContracts(req, res) {
        this.rpcClient.getCoreClient().ListContracts(req, (err, result) => {
            response(res, "getallcontracts", err, result);
        });
    }
    getAllContractsByAsset(req, res) {
        this.rpcClient.getCoreClient().ListContractsByAsset(req, (err, result) => {
            response(res, "getallcontractsbyasset", err, result);
        });
    }
    contractDetail(req, res) {
        this.rpcClient.getCoreClient().ContractDetail(req, (err, result) => {
            response(res, "contractdetail", err, result);
        });
    }

}

exports.ContractManager = ContractManager;