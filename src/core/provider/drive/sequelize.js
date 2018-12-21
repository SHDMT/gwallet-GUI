let Sequelize = require('sequelize');

class DBDrive {
    constructor() { }
    open(dbParams) {
        let opts = {
            define: {
                //prevent sequelize from pluralizing table names
                freezeTableName: true
            }
        }
        if (dbParams.dialect === "sqlite") {
            this.sequelize = new Sequelize('', '', '', {
                dialect: 'sqlite',
                storage: dbParams.dbPath
              }, opts);
        } else {
            this.sequelize = new Sequelize(dbParams.database, dbParams.username, dbParams.password, {
                host: dbParams.host,
                dialect: dbParams.dialect,
                pool: {
                    max: 10,
                    min: 0,
                    idle: 10000
                }
            }, opts);
        }

        this.sequelize
            .authenticate()
            .then(() => {
                console.log('Connection has been established successfully.');
            })
            .catch(err => {
                console.error('Unable to connect to the database:', err);
            });
    }
    close() {

    }

    createModal(tableName, tableColumns) {
        return this.sequelize.define(tableName, tableColumns,{
            timestamps: false,
            tableName: tableName
        });
    }

    add(modal, params, callback) {
        modal.create(params).then(function (result) {
            let ret = result.dataValues;
            callback(null, ret);
        }).catch(function (err) {
            callback(err, null);
        });
    }

    query(modal, params, callback) {
        modal.findAll(params).then(function (result) {
            let ret = [];
            result.forEach(element => {
                ret.push(element.dataValues);
            });
            callback(null, ret);
        }).catch(function (err) {
            callback(err, null);
        });
    }

    update(modal, data, condition, callback) {
        modal.update(data, condition).then(function (result) {
            if(result > 0){
                callback(null, result);
                return;
            }
            callback("Update no data", null)
        }).catch(function (err) {
            callback(err, null);
        });
    }

    delete(modal, params, callback) {
        modal.destroy(params).then(function (result) {
            console.log("MyResult:", result)
            if(result > 0){
                callback(null, result);
                return;
            }
            callback("Delete no data", null)
        }).catch(function (err) {
            callback(err, null);
        });
    }
}


exports.DBDrive = DBDrive;