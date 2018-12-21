let response = require('../response');
let AddressModal = require('../modal/addressmodal').AddressModal;

class ContactManager {
    constructor(dbDrive, rpcClient) {
        this.dbDrive = dbDrive;
        this.rpcClient = rpcClient;
        this.addressModal= new AddressModal(this.dbDrive);
    }

    addContactAddress(req, res){
        let data = {
            alt: this.addressModal.contactAddressType, 
            account: req.account,
            name: req.name,
            address: req.address,
            note: req.note
        };
        this.addressModal.addAddress(data, (err, result)=>{
            response(res, "addcontactaddress", err, result);
        });
    }
    
    deleteContactAddress(req, res){
        this.addressModal.deleteAddress({alt: this.addressModal.contactAddressType, id: req.id}, (err, result)=>{
            response(res, "deletecontactaddress", err, result);
        });
    }

    updateContactAddress(req, res){
        this.addressModal.updateAddress({alt: this.addressModal.contactAddressType, id: req.id}, req.newData, (err, result)=>{
            response(res, "updatecontactaddress", err, result);
        });
    }

    listContactAddress(req, res){
        let page = req.page;
        let count = req.count;
        
        this.addressModal.listAddresses(page, count, {alt: this.addressModal.contactAddressType, account: req.accountName}, (err, result)=>{
            response(res, "listcontactaddress", err, result);
        });
    }

}

exports.ContactManager = ContactManager;