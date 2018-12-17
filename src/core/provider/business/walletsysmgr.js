let response = require("../response");
let SystemInfoModal = require("../modal/systeminfomodal").SystemInfoModal;
let sha256 = require("js-sha256").sha256;

class WalletSystemManager {
  constructor(dbDrive, rpcClient) {
    this.dbDrive = dbDrive;
    this.rpcClient = rpcClient;
    this.systemInfoModal = new SystemInfoModal(this.dbDrive);
  }

  rescanWallet(req, res) {
    this.rpcClient.getWalletClient().RescanWallet(req, (err, result) => {
      response(res, "rescanwallet", err, result);
    });
  }

  changePassword(req, res) {
    let where = {
      alt: 1,
      value: sha256(req.oldPassword)
    };
    this.systemInfoModal.listSystemInfo(where, (err, result) => {
      if (result.length > 0) {
        this.rpcClient.getWalletClient().ChangePassword(req, (err, result) => {
          if (err != null) {
            response(res, "changepassword", err, null);
            return;
          }
          let passwordHash = sha256(req.newPassword);
          this.systemInfoModal.updateSystemInfo(
            1,
            { key: "root", value: passwordHash },
            (err, result) => {
              if (err != null) {
                response(res, "changepassword", err, null);
                return;
              }
              response(res, "changepassword", err, "success");
            }
          );
        });
      } else {
        response(res, "changepassword", err, "failed");
      }
    });
  }

  importPrivateKey(req, res) {
    this.rpcClient.getWalletClient().ImportPrivateKey(req, (err, result) => {
      response(res, "importprivateKey", err, result);
    });
  }

  lockWallet(req, res) {
    this.rpcClient.getWalletClient().LockWallet(req, (err, result) => {
      response(res, "lockwallet", err, result);
    });
  }

  unlockWallet(req, res) {
    this.rpcClient.getWalletClient().UnlockWallet(req, (err, result) => {
      response(res, "unlockwallet", err, result);
    });
  }

  getWalletVersionInfo(req, res) {
    this.rpcClient
      .getWalletClient()
      .GetWalletVersionInfo(req, (err, result) => {
        response(res, "getwalletversioninfo", err, result);
      });
  }

  getWalletSyncProgress(req, res) {
    this.rpcClient.getWalletClient().WalletIsSynced(req, (err, result) => {
      response(res, "getwalletsyncprogress", err, result);
    });
  }

  checkPassword(req, res) {
    let where = {
      alt: 1,
      value: sha256(req.password)
    };
    this.systemInfoModal.listSystemInfo(where, (err, result) => {
      if (result.length > 0) {
        response(res, "checkpassword", null, "success");
      } else {
        response(res, "checkpassword", err, "failed");
      }
    });
  }
}

exports.WalletSystemManager = WalletSystemManager;
