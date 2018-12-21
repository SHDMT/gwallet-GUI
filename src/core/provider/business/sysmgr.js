let fs = require("fs");
let path = require('path');
let response = require("../response");
let shell = require("electron").shell;
let clipboard = require("electron").clipboard;
let tools = require('../tools').Tools;
let SystemInfoModal = require('../modal/systeminfomodal').SystemInfoModal;

require("../../../global.json");

class SystemManager {
  constructor(dbDrive, rpcClient) {
    this.dbDrive = dbDrive;
    this.rpcClient = rpcClient;

    this.systemInfoModal = new SystemInfoModal(this.dbDrive);
  }

  openAbout(req, res) {
    let url = "http://www.dazzlemagnet.com/";
    let ret = shell.openExternal(url);
    if (ret) {
      response(res, "openabout", null, "success");
    } else {
      response(res, "openabout", "Can't open about page, url:" + url, null);
    }
  }

  openHelp(req, res) {
    let p = path.join(this.publicDir(), 'doc', 'document.pdf');
    let url = "file:///" + p;
    
    let ret = shell.openExternal(url);
    if (ret) {
      response(res, "openhelp", null, "success");
    } else {
      response(res, "openhelp", "Can't open help page, url:" + url, null);
    }
  }
  openMiningServer(req, res){
    let url = req.url;
    let ret = shell.openExternal(url);
    if (ret) {
      this.systemInfoModal.updateSystemInfo(2, {value: url}, (err, result)=>{
        response(res, "openminingserver", null, "success");
      });
    } else {
      response(
        res,
        "openminingserver",
        "Can't open block explorer, url:" + url,
        null
      );
    }
  }

  getMiningServer(req, res){
    this.systemInfoModal.listSystemInfo({alt:2}, (err, result) => {
      if(err != null){
        response(res, "getminingserver", err, null);
        return;
      }
      response(res, "getminingserver", null, result);
    });
  }


  openBlockExplorer(req, res) {
    let url = "http://www.dazzlemagnet.com/";
    let ret = shell.openExternal(url);
    if (ret) {
      response(res, "openblockexplorer", null, "success");
    } else {
      response(
        res,
        "openblockexplorer",
        "Can't open block explorer, url:" + url,
        null
      );
    }
  }

  copyToClipboard(req, res) {
    clipboard.writeText(req.text);
    response(res, "copytoclipboard", null, "success");
  }

  getVersionInfo(req, res) {
    this.rpcClient
      .getCoreClient()
      .GetGravityVersionInfo(req, (err, coreVersion) => {
        if (err != null) {
          response(res, "getversioninfo", err, null);
          return;
        }
        this.rpcClient
          .getWalletClient()
          .GetWalletVersionInfo(req, (err, walletVersion) => {
            if (err != null) {
              response(res, "getversioninfo", err, null);
              return;
            }
            let result = {
              coreVersion: coreVersion,
              walletVersion: walletVersion
            };
            response(res, "getversioninfo", null, result);
          });
      });
  }

  getSystemInfo(req, res) {
    response(res, "getsysinfo", "This feature is not supported now", null);
  }

  copyFileToUserData(req, res) {
    let sourceFile = req.sourceFile;
    let targetFile = tools.getAppDataDirectory() + "/" + req.targetFile;
    fs.readFile(sourceFile, function(err, data) {
      if (err) {
        response(res, "copyfiletouserdata", "Read file err:" + err.code, null);
      } else {
        fs.writeFile(targetFile, data, function(error) {
          if (error) {
            response(
              res,
              "copyfiletouserdata",
              "Write file err:" + error.code,
              null
            );
          } else {
            response(res, "copyfiletouserdata", null, targetFile);
          }
        });
      }
    });
  }

  readFile(req,res){
    let file = req.file;
    fs.readFile(file, (err, data) => {
      if (err) {
        response(res, "readfile", "Read file err:" + err.code, null);
      } else {
        response(res, "readfile", null, data.toString());
      }
    });
  }
  copyFile(req, res) {
    let sourceFile = req.sourceFile;
    let targetFile = req.targetFile;
    fs.readFile(sourceFile, function(err, data) {
      if (err) {
        response(res, "copyfile", "Read file err:" + err.code, null);
      } else {
        fs.writeFile(targetFile, data, function(error) {
          if (error) {
            response(res, "copyfile", "Write file err:" + error.code, null);
          } else {
            response(res, "copyfile", null, targetFile);
          }
        });
      }
    });
  }
  
  publicDir(){
    return path.join(__dirname , '..', '..', '..', '..', 'public');
  }
}

exports.SystemManager = SystemManager;
