let AccountModal = require('../modal/accountmodal').AccountModal;
let response = require('../response');

class AccountManager {
    constructor(dbDrive, rpcClient) {
        this.dbDrive = dbDrive;
        this.rpcClient = rpcClient;
        this.accountModal= new AccountModal(this.dbDrive);
    }

    addAccount(req, res){
        let accountTypeName = req.accountType == 0? "normal":"postquantum";

        this.rpcClient.getWalletClient().AddAccount({accountName:req.accountName, accountType: req.accountType}, (err, result)=>{
            if(err != null){
                response(res, "addaccount", err, result);
                return
            }
            this.accountModal.addAccount({name: req.accountName, img: req.accountImage, type: accountTypeName}, (err, result)=>{
                response(res, "addaccount", err, result);
            });
        });
    }

    updateAccount(req, res){
        let newData = {
            name: req.newAccountName,
        }
        if(req.img != null){
            newData.img = req.img;
        }
        this.rpcClient.getWalletClient().UpdateAccount({oldAccountName:req.oldAccountName, newAccountName:req.newAccountName}, (err, result)=>{
            if(err != null){
                response(res, "updateaccount", err, result);
                return
            }
            this.accountModal.updateAccount({name: req.oldAccountName}, {name: req.newAccountName, img: req.accountImage}, (err, result)=>{
                response(res, "updateaccount", err, result);
            });
        });
    }

    listAccount(req, res){
        this.accountModal.listAccount(0, 10000, {}, (err, result)=>{
            response(res, "listaccount", err, result);
        });
    }

    deleteAccount(req, res){
        this.accountModal.deleteAccount({name: req.name}, (err, result)=>{
            response(res, "deleteaccount", err, result);
        });
    }
}

exports.AccountManager = AccountManager;