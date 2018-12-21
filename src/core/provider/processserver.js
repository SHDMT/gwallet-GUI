const { ipcMain } = require("electron");

let fs = require('fs');
let ProcessManager = require("./business/processmgr").ProcessManager;
let tools = require('./tools').Tools;
let config = require('./config').Config;
let DBDrive = require("./drive/sequelize").DBDrive;

class ProcessServer {
    constructor() {
        this.initNewUser();
        this.dbdrive = new DBDrive();
        this.dbdrive.open(config.dbParams);

        this.processManager = new ProcessManager(this.dbdrive);
    }

    initialize() {
        ipcMain.on("startcore", (event, args) => {
            this.processManager.startCore(args, event.sender);
        });
        ipcMain.on("startwallet", (event, args) => {
            this.processManager.startWallet(args, event.sender);
        });
        ipcMain.on("createwallet", (event, args) => {
            this.processManager.createWallet(args, event.sender);
        });
        ipcMain.on("setnewwalletpassword", (event, args) => {
            this.processManager.setNewWalletPassword(args, event.sender);
        });
        ipcMain.on("restorewallet", (event, args) => {
            this.processManager.restoreWallet(args, event.sender);
        });
        ipcMain.on("stopcore", (event, args) => {
            this.processManager.stopCore(args, event.sender);
        });
        ipcMain.on("stopwallet", (event, args) => {
            this.processManager.stopWallet(args, event.sender);
        });
        ipcMain.on("isnewuser", (event, args) => {
            this.processManager.isNewUser(args, event.sender);
        });
        ipcMain.on("loginwallet", (event, args) => {
            this.processManager.loginWallet(args, event.sender);
        });
    }

    createFileStructure(){
        if (!fs.existsSync(tools.getAppDataDirectory() + "/db/data.db")) {
            fs.mkdir(tools.getAppDataDirectory() + "/db", (err) => {
                if (err) {
                    return err;
                }
                tools.copyFile("./public/data/data.db", tools.getAppDataDirectory() + "/db/data.db")
                fs.mkdir(tools.getAppDataDirectory() + "/img", (err) => {
                    if (err) {
                        console.log("mkdir error:", err);
                        return err;
                    }
                });
            });
        }
    }
    initNewUser() {
        if(!fs.existsSync(tools.getAppDataDirectory())){
            fs.mkdir(tools.getAppDataDirectory(), (err) => {
                if (err) {
                    return err;
                }
                this.createFileStructure();
            });
        }else{
            this.createFileStructure();
        }
    }
}

let processServer = new ProcessServer();
processServer.initialize();
exports.ProcessServer = processServer;