let response = require('../response');
let AddressModal = require('../modal/addressmodal').AddressModal;

class AddressManager {
    constructor(dbDrive, rpcClient) {
        this.dbDrive = dbDrive;
        this.rpcClient = rpcClient;
        this.addressModal= new AddressModal(this.dbDrive);
    }

    getNewAddress(req, res){
        this.rpcClient.getWalletClient().GetNewAddress({accountName:req.account}, (err, result)=>{
            if(err != null){
                response(res, "getnewaddress", err, result);
                return
            }
            let data = {
                alt: this.addressModal.userAddressType, 
                account: req.account,
                // name: req.name,
                // note: req.note
                address: result.address,
            };
            this.addressModal.hasAddress(data, (err, result)=>{
                if(err != null){
                    response(res, "getnewaddress", err, result);
                    return
                }
                if(!result){
                    this.addressModal.addAddress(data, (err, result)=>{
                        response(res, "getnewaddress", null, data);
                    });
                }else{
                    response(res, "getnewaddress", null, data);
                }
            });
            
        });
    }
    
    removeUserAddress(req, res){
        this.addressModal.deleteAddress({alt: this.addressModal.userAddressType, id: req.id}, (err, result)=>{
            response(res, "removeuseraddress", err, result);
        });
    }

    updateUserAddressInfo(req, res){
        this.addressModal.updateAddress({alt: this.addressModal.userAddressType, id: req.id}, req.newData, (err, result)=>{
            response(res, "updateuseraddressinfo", err, result);
        });
    }

    listUserAddress(req, res){
        let page = req.page;
        let count = req.count;
        
        this.addressModal.listAddresses(page, count, {alt: this.addressModal.userAddressType, account: req.accountName}, (err, result)=>{
            response(res, "listuseraddress", err, result);
        });
    }
}

exports.AddressManager = AddressManager;