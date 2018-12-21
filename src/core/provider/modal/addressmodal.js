let Sequelize = require('sequelize');

class AddressModal {
    constructor(dbdrive) {
        this.dbdrive = dbdrive;
        this.initialize();

        this.userAddressType = 0;
        this.contactAddressType = 1;
    }

    initialize() {
        this.addressList = this.dbdrive.createModal('address_list', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            alt: Sequelize.INTEGER,
            account: Sequelize.STRING,
            name: Sequelize.STRING,
            address: Sequelize.STRING,
            note: Sequelize.TEXT
        });
    }


    deleteAddress(where, callback) {
        let params = {
            where:where
        };
        
        this.dbdrive.delete(this.addressList, params, callback);
    }

    updateAddress(conditions, data, callback) {  
        this.dbdrive.update(this.addressList, data, {where:conditions}, callback);
    }

    addAddress(data, callback) {    
        this.dbdrive.add(this.addressList, data, callback);
    }

    hasAddress(where, callback){
        let params = {
            where: where
        }
        this.dbdrive.query(this.addressList, params, (err, result)=>{
            if(err != null){
                callback(err, result);
                return;
            }
            callback(null, result.length > 0);
        });
    }
    
    listAddresses(page, count, where, callback) {
        if (page > 0) {
            page = (page - 1) * count;
        }
        let params = {
            where: where,
            offset: page,
            limit: count
        }
        this.dbdrive.query(this.addressList, params, callback);
    }
}

exports.AddressModal = AddressModal;