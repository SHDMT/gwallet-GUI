let fs = require("fs");
let os = require("os");
let sha256 = require("js-sha256").sha256;
let response = require('../response');
let exec = require('child_process').exec;
let spawn = require('child_process').spawn;
let SystemInfoModal = require('../modal/systeminfomodal').SystemInfoModal;

let globalParams = require('../../../global.json');
let tools = require('../tools').Tools;
//TODO
let binaryPath = __dirname + "/../../../../bin/";

class ProcessManager {
    constructor(dbDrive) {
        this.coreProc = null;
        this.walletProc = null;

        this.dbDrive = dbDrive;
        this.systemInfoModal = new SystemInfoModal(this.dbDrive);
    }

    startCore(req, res) {
        let params = [];
        this.coreProc = spawn(this.buildCommand(globalParams.coreBinary, params), { shell: true });
        this.coreProc.stdout.on('data', (data) => {
            // console.log("core stdout:", data.toString())
            // response(res, "startcore", null, data.toString());
        });
        this.coreProc.stderr.on('data', (data) => {
            // console.log("core stderr:", data.toString())
            // response(res, "startcore", data.toString(), null);
        });
        response(res, "startcore", null, "success");
    }

    startWallet(req, res) {
        let params = [
            { key: "pass", value: req.password }
        ];
        this.walletProc = spawn(this.buildCommand(globalParams.walletBinary, params), { shell: true });
        this.walletProc.stdout.on('data', (data) => {
            console.log(data.toString());
            // response(res, "startwallet", null, data.toString());
        });
        this.walletProc.stderr.on('data', (data) => {
            console.log(data.toString())
            // response(res, "startwallet", data.toString(), null);
        });
        response(res, "startwallet", null, "success");
    }

    createWallet(req, res) {
        let params = [
            { key: "generateseed", value: null }
        ];
        exec(this.buildCommand(globalParams.walletBinary, params), (err, stdout, stderr) => {
            if (err) {
                response(res, "createwallet", err, null);
            } else {
                try {
                    let result = stdout.split("=======result>>>>>>>")[1].split("<<<<<<<result=======")[0]
                    response(res, "createwallet", null, result);
                } catch (err) {
                    response(res, "createwallet", err, stdout);
                }
            }
        });
    }

    setNewWalletPassword(req, res) {
        let params = [
            { key: "create", value: null },
            { key: "pass", value: req.password },
            { key: "seed", value: "\"" + req.seed + "\"" },
        ];
        this.systemInfoModal.updateSystemInfo(1, { key: "root", value: sha256(req.password) }, (err, result) => {
            if (err) {
                response(res, "setnewwalletpassword", err, null);
                return;
            }
            exec(this.buildCommand(globalParams.walletBinary, params), (err, stdout, stderr) => {
                if (err) {
                    response(res, "setnewwalletpassword", err, null);
                } else {
                    try {
                        let result = stdout.split("=======result>>>>>>>")[1].split("<<<<<<<result=======")[0]
                    } catch (err) {
                        response(res, "setnewwalletpassword", err, stdout);
                    }
                }
            });
        });
    }

    restoreWallet(req, res) {
        let params = [
            { key: "create", value: null },
            { key: "pass", value: req.password },
            { key: "seed", value: "\"" + req.seed + "\"" },
        ];
        this.systemInfoModal.updateSystemInfo(1, { key: "root", value: sha256(req.password) }, (err, result) => {
            if (err) {
                response(res, "restorewallet", err, null);
                return;
            }
            exec(this.buildCommand(globalParams.walletBinary, params), (err, stdout, stderr) => {
                if (err) {
                    response(res, "restorewallet", err, null);
                } else {
                    try {
                        let result = stdout.split("=======result>>>>>>>")[1].split("<<<<<<<result=======")[0]
                        console.log("restored wallet:", result);
                    } catch (err) {
                        response(res, "restorewallet", err, stdout);
                    }
                }
            });
        });
    }

    loginWallet(req, res) {
        let where = {
            alt: 1,
            value: sha256(req.password)
        }
        this.systemInfoModal.listSystemInfo(where, (err, result) => {
            if (result.length > 0) {
                response(res, "loginwallet", null, "success");
            } else {
                response(res, "loginwallet", err, "failed");
            }
        });
    }

    buildCommand(command, params) {
        return binaryPath + command + this.buildParams(params);
    }
    buildParams(params) {
        let paramsString = " ";
        for (let i = 0; i < params.length; i++) {
            paramsString = paramsString + "--" + params[i].key;
            if (params[i].value != null) {
                paramsString = paramsString + "=" + params[i].value;
            }
            paramsString = paramsString + " ";
        }
        return paramsString;
    }

    stopProvider(){
        if (this.coreProc != null) {
            let killCMD = "killall " + globalParams.coreBinary;
            if (os.platform() == "win32") {
                killCMD = "TASKKILL /F /IM " + globalParams.coreBinary + ".exe";
            }
            exec(killCMD);
        }
        if (this.walletProc != null) {
            let killCMD = "killall " + globalParams.walletBinary;
            if (os.platform() == "win32") {
                killCMD = "TASKKILL /F /IM " + globalParams.walletBinary + ".exe";
            }
            exec(killCMD);
        }
    }

    stopCore(req, res) {
        if (this.coreProc != null) {
            // let pid = this.coreProc.pid;
            // this.killProcess(pid);
            let killCMD = "killall " + globalParams.coreBinary;
            if (os.platform() == "win32") {
                killCMD = "TASKKILL /F /IM " + globalParams.coreBinary + ".exe";
            }
            exec(killCMD);
            response(res, "stopcore");
        }
    }

    stopWallet(req, res) {
        if (this.walletProc != null) {
            // let pid = this.walletProc.pid;
            // this.killProcess(pid);
            let killCMD = "killall " + globalParams.walletBinary;
            if (os.platform() == "win32") {
                killCMD = "TASKKILL /F /IM " + globalParams.walletBinary + ".exe";
            }
            exec(killCMD);
            response(res, "stopwallet");
        }
    }

    isNewUser(req, res) {
        if (fs.existsSync(tools.getAppDataDirectory() + "/config.yaml")) {
            response(res, "isnewuser", null, "old");
        } else {
            this.InitializeFileSturcture();
            response(res, "isnewuser", null, "new");
        }
    }

    killProcess(pid) {
        if (os.platform() == "win32") {
            let exe_parm = "taskkill /PID  " + pid
            exec(exe_parm)
        } else {
            let exe_parm = 'kill ' + pid
            exec(exe_parm)
        }
    }

    InitializeFileSturcture() {
        fs.mkdir(tools.getAppDataDirectory() + "/db" ,(err) => {
            if (err) {
                return err;
            }
            tools.copyFile("./public/data/data.db", tools.getAppDataDirectory() + "/db/data.db")
            fs.mkdir(tools.getAppDataDirectory() + "/img",(err) => {
                if (err) {
                    console.log("mkdir error:", err);
                    return err;
                }});
         });
    }
    
}

exports.ProcessManager = ProcessManager;