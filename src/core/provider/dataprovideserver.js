const { ipcMain } = require("electron");

let DBDrive = require("./drive/sequelize").DBDrive;
let GRPCClient = require("./drive/grpc").GRPCClient;
let AccountManager = require("./business/accountmgr").AccountManager;
let AddressManager = require("./business/addrmgr").AddressManager;
let BalanceManager = require("./business/balancemgr").BalanceManager;
let BlockchainManager = require("./business/blockchainmgr").BlockchainManager;
let ContactManager = require("./business/contactmgr").ContactManager;
let NetworkManager = require("./business/networkmanager").NetworkManager;
let SystemManager = require("./business/sysmgr").SystemManager;
let TransactionManager = require("./business/txmsgr").TransactionManager;
let ContractManager = require("./business/contractmgr").ContractManager;
let WalletSystemManager = require("./business/walletsysmgr")
  .WalletSystemManager;

let config = require('./config').Config;

class DataProvideServer {
  constructor() {
    this.dbdrive = new DBDrive();
    this.rpcClient = new GRPCClient();

    this.dbdrive.open(config.dbParams);
    this.rpcClient.connect(
      config.coreRPCParams,
      config.walletRPCParams
    );

    this.accountManager = new AccountManager(this.dbdrive, this.rpcClient);
    this.addressManager = new AddressManager(this.dbdrive, this.rpcClient);
    this.balanceManager = new BalanceManager(this.dbdrive, this.rpcClient);
    this.blockchainManager = new BlockchainManager(
      this.dbdrive,
      this.rpcClient
    );
    this.contactManager = new ContactManager(this.dbdrive, this.rpcClient);
    this.networkManager = new NetworkManager(this.dbdrive, this.rpcClient);
    this.systemManager = new SystemManager(this.dbdrive, this.rpcClient);
    this.transactionManager = new TransactionManager(
      this.dbdrive,
      this.rpcClient
    );
    this.walletSystemManager = new WalletSystemManager(
      this.dbdrive,
      this.rpcClient
    );
    this.contractManager = new ContractManager(
        this.dbdrive,
        this.rpcClient
    );
  }

  initialize() {
    //账户信息
    this.registerService("addaccount", (event, args) => this.accountManager.addAccount(event, args));
    this.registerService("updateaccount", (event, args) => this.accountManager.updateAccount(event, args));
    this.registerService("listaccount", (event, args) => this.accountManager.listAccount(event, args));
    this.registerService("deleteaccount", (event, args) => this.accountManager.deleteAccount(event, args));
    //地址管理
    this.registerService("getnewaddress", (event, args) => this.addressManager.getNewAddress(event, args));
    this.registerService("removeuseraddress", (event, args) => this.addressManager.removeUserAddress(event, args));
    this.registerService("updateuseraddressinfo", (event, args) => this.addressManager.updateUserAddressInfo(event, args));
    this.registerService("listuseraddress", (event, args) => this.addressManager.listUserAddress(event, args));

    //财务查询
    this.registerService("getbalance", (event, args) => this.balanceManager.getBalance(event, args));
    this.registerService("getassetbalance", (event, args) => this.balanceManager.getAssetBalance(event, args));
    this.registerService("getallassets", (event, args) => this.balanceManager.getAllAssets(event, args));
    this.registerService("listtx", (event, args) => this.balanceManager.listTransaction(event, args));

    //交易管理
    this.registerService("sendpayment", (event, args) => this.transactionManager.sendPayment(event, args));
    this.registerService("calcpaymentfee", (event, args) => this.transactionManager.calcPaymentFee(event, args));
    this.registerService("sendtext", (event, args) => this.transactionManager.sendText(event, args));
    this.registerService("calctextfee", (event, args) => this.transactionManager.calcTextFee(event, args));
    this.registerService("issueasset", (event, args) => this.transactionManager.issueAsset(event, args));
    this.registerService("calcissueassetfee", (event, args) => this.transactionManager.calcIssueAssetFee(event, args));

    //联系人管理
    this.registerService("addcontactaddress", (event, args) => this.contactManager.addContactAddress(event, args));
    this.registerService("deletecontactaddress", (event, args) => this.contactManager.deleteContactAddress(event, args));
    this.registerService("updatecontactaddress", (event, args) => this.contactManager.updateContactAddress(event, args));
    this.registerService("listcontactaddress", (event, args) => this.contactManager.listContactAddress(event, args));
    

    //区块链信息
    this.registerService("getblockchaininfo", (event, args) => this.blockchainManager.getBlockChainInfo(event, args));
    this.registerService("startmining", (event, args) => this.blockchainManager.startMining(event, args));
    this.registerService("stopmining", (event, args) => this.blockchainManager.stopMining(event, args));


    //网络信息
    this.registerService("getpeerlist", (event, args) => this.networkManager.getPeerList(event, args));
    this.registerService("getnetworkstatus", (event, args) => this.networkManager.getNetworkStatus(event, args));
    this.registerService("getcoresyncprogress", (event, args) => this.networkManager.getCoreSyncProgress(event, args));
    this.registerService("getsyncprogress", (event, args) => this.networkManager.getSyncProgress(event, args));

    //系统功能
    this.registerService("openabout", (event, args) => this.systemManager.openAbout(event, args));
    this.registerService("openhelp", (event, args) => this.systemManager.openHelp(event, args));
    this.registerService("openblockexplorer", (event, args) => this.systemManager.openBlockExplorer(event, args));
    this.registerService("openminingserver", (event, args) => this.systemManager.openMiningServer(event, args));
    this.registerService("getminingserver", (event, args) => this.systemManager.getMiningServer(event, args));
    this.registerService("getversioninfo", (event, args) => this.systemManager.getVersionInfo(event, args));
    this.registerService("getsysinfo", (event, args) => this.systemManager.getSystemInfo(event, args));
    this.registerService("copytoclipboard", (event, args) => this.systemManager.copyToClipboard(event, args));
    this.registerService("readfile", (event, args) => this.systemManager.readFile(event, args));
    this.registerService("copyfile", (event, args) => this.systemManager.copyFile(event, args));
    this.registerService("copyfiletouserdata", (event, args) => this.systemManager.copyFileToUserData(event, args));
    this.registerService("startcore", (event, args) => this.processManager.startCore(event, args));
    this.registerService("startwallet", (event, args) => this.processManager.startWallet(event, args));
    this.registerService("createwallet", (event, args) => this.processManager.createWallet(event, args));
    this.registerService("setnewwalletpassword", (event, args) => this.processManager.setNewWalletPassword(event, args));
    this.registerService("restorewallet", (event, args) => this.processManager.restoreWallet(event, args));
    this.registerService("stopcore", (event, args) => this.processManager.stopCore(event, args));
    this.registerService("stopwallet", (event, args) => this.processManager.stopWallet(event, args));

    //钱包系统功能
    this.registerService("rescanwallet", (event, args) => this.walletSystemManager.rescanWallet(event, args));
    this.registerService("changepassword", (event, args) => this.walletSystemManager.changePassword(event, args));
    this.registerService("importprivateKey", (event, args) => this.walletSystemManager.importPrivateKey(event, args));
    this.registerService("lockwallet", (event, args) => this.walletSystemManager.lockWallet(event, args));
    this.registerService("checkpassword", (event, args) => this.walletSystemManager.checkPassword(event, args));
    this.registerService("unlockwallet", (event, args) => this.walletSystemManager.unlockWallet(event, args));
    this.registerService("getwalletversioninfo", (event, args) => this.walletSystemManager.getWalletVersionInfo(event, args));
    this.registerService("getwalletsyncprogress", (event, args) => this.walletSystemManager.getWalletSyncProgress(event, args));

    //合约管理模块
    this.registerService("invokecontract", (event, args) => this.contractManager.invokeContract(event, args));
    this.registerService("calcinvokecontractfee", (event, args) => this.contractManager.calcInvokeContractFee(event, args));
    this.registerService("getallcontracts", (event, args) => this.contractManager.getAllContracts(event, args));
    this.registerService("getallcontractsbyasset", (event, args) => this.contractManager.getAllContractsByAsset(event, args));
    this.registerService("deploycontract", (event, args) => this.contractManager.deployContract(event, args));
    this.registerService("calcdeploycontractfee", (event, args) => this.contractManager.calcDeployContractFee(event, args));
    this.registerService("contractdetail", (event, args) => this.contractManager.contractDetail(event, args));
  }

  registerService(topic, serviceFunc) {
    ipcMain.on(topic, (event, args) => {
      try {
        if (this.rpcClient.connected) {
          serviceFunc(args, event.sender);
        }
      } catch (error) {
        console.log(error);
      }
      
    })
  }
}

let dataProvider = new DataProvideServer();
dataProvider.initialize();
exports.DataProviderServer = dataProvider;