let grpc = require("grpc");

class GRPCClient {
  /**
   * grpc连接所需参数，
   * walletRPCParams/coreRPCParams：{
   *      protoPath: proto文件所在路径
   *      packageName: proto中文件包名
   *      host: IP地址
   *      port: 端口号
   * }
   *  */
  constructor() {
    this.walletClient = null;
    this.coreClient = null;
    this.connected = false;
  }

  //启动grpc连接coreRPCParams,walletRPCParams
  connect(coreRPCParams, walletRPCParams) {
    this.connectCore(coreRPCParams);
    this.connectWallet(walletRPCParams);
    this.connected = true;
  }
  //连接主链
  //其中GravityService为.proto中的服务函数名
  connectCore(coreRPCParams) {
    //TODO：包名gravityrpc和服务方法名均为写死，后改进
    let packageName = grpc.load(coreRPCParams.protoPath).corerpc;
    this.coreClient = new packageName.CoreService(
      `${coreRPCParams.host}:${coreRPCParams.port}`,
      grpc.credentials.createInsecure()
    );
    this.coreClient.waitForReady(Date.now() + 100 * 1000, error => {
      if (error) {
        console.error("Core caught error", error);
      }
    });
  }
  //连接钱包
  connectWallet(walletRPCParams) {
    let packageName = grpc.load(walletRPCParams.protoPath).walletrpc;
    this.walletClient = new packageName.WalletService(
      `${walletRPCParams.host}:${walletRPCParams.port}`,
      grpc.credentials.createInsecure()
    );
    this.walletClient.waitForReady(Date.now() + 10000, error => {
      if (error) {
        console.error("Wallet caught error", error);
      }
    });
  }

  disconnect() {
    this.coreClient.close();
    this.walletClient.close();
    this.connected = false;
  }
  getWalletClient() {
    return this.walletClient;
  }
  getCoreClient() {
    return this.coreClient;
  }
}
exports.GRPCClient = GRPCClient;
