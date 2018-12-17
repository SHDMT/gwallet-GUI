let Sequelize = require('sequelize');

class SystemInfoModal {
    constructor(dbdrive) {
        this.dbdrive = dbdrive;
        this.initialize();
    }

    initialize() {
        this.system = this.dbdrive.createModal('system', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            alt: Sequelize.INTEGER,
            key: Sequelize.STRING,
            value: Sequelize.STRING
        });
    }
    
    // checkPassword(req, res){
    //     let params = {
    //         where: {
    //             alt: 1,
    //             value: req.password
    //         }
    //     }
    //     this.dbdrive.query(this.system, params, (err, result) => {
    //         let data = {result: false};
    //         if(result.length > 0){
    //             data.result = true;
    //         }
    //         response(res, "checkPassword", err, data);
    //     });
    // }

    // updatePassword(req, res){
    //     let data = {
    //         key: "root",
    //         value: req.password
    //     };
    //     let conditions = {
    //         id: req.id,
    //         alt: 1
    //     };
    //     this.dbdrive.update(this.system, data, conditions, (err, result) => {
    //         response(res, "updatePassword", err, result);
    //     });
    // }


    deleteSystemInfo(id, callback) {
        let params = {
            where:{
                id: id
            }
        };
        
        this.dbdrive.delete(this.system, params, callback);
    }

    updateSystemInfo(alt, data, callback) {  
        let conditions = {
            alt: alt
        };
        this.dbdrive.update(this.system, data, {where:conditions}, callback);
    }

    addSystemInfo(data, callback) {    
        this.dbdrive.add(this.system, data, callback);
    }
    
    listSystemInfo(where, callback) {
        
        let params = {
            where: where
        }
        this.dbdrive.query(this.system, params, callback);
    }
}

exports.SystemInfoModal = SystemInfoModal;