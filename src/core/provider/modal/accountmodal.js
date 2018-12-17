let Sequelize = require('sequelize');

class AccountModal {
    constructor(dbdrive) {
        this.dbdrive = dbdrive;
        this.initialize();
    }

    initialize() {        
        this.accountInfo = this.dbdrive.createModal('account_info', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            type: Sequelize.STRING,
            name: Sequelize.STRING,
            img: Sequelize.STRING
        });
    }
    
    addAccount(data, callback){

        this.dbdrive.add(this.accountInfo, data, callback);
    }

    updateAccount(conditions, data, callback){
        this.dbdrive.update(this.accountInfo, data, {where:conditions},callback);
    }

    deleteAccount(where, callback){
        let params = {
            where:where
        };
        
        this.dbdrive.delete(this.accountInfo, params, callback);
    }

    listAccount(page, count, where, callback){
        if (page > 0) {
            page = (page - 1) * count;
        }
        let params = {
            where: where,
            offset: page,
            limit: count
        }
        this.dbdrive.query(this.accountInfo, params, callback);
    }
}

exports.AccountModal = AccountModal;