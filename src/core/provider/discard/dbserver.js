let DBDrive = require('../drive/sequelize.js').DBDrive;
let AddressManager = require('./dbtx/addressmodal').AddressManager;
let AccountManager = require('./dbtx/accountmodal').AccountManager;
let SystemDBManager = require('./dbtx/systeminfomodal').SystemDBManager;

class DBServer {
    constructor() {
        this.dbdrive = new DBDrive();
    }

    open(dbPath) {
        this.dbdrive.open({ dbPath: dbPath, dialect: 'sqlite' });
        this.initialize();
    }

    close() {
        this.dbdrive.close();
    }

    initialize() {
        this.addressManager = new AddressManager(this.dbdrive);
        this.accountManager = new AccountManager(this.dbdrive);
        this.systemDBManager = new SystemDBManager(this.dbdrive);
    }
}

exports.DBServer = DBServer;