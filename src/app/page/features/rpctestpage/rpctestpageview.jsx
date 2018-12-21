import React, { Component } from "react";
import { Button } from 'antd';
import provider from "../../../dataproviderclient";

import './style.css'
class RPCTestPageView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getblockchaininfo: "未测试",
      getpeerlist: "未测试",
      getnetworkstatus: "未测试",
      getbalance: "未测试",
      listtx: "未测试",
      sendpayment: "未测试",
      sendtext: "未测试",
      invokecontract: "未测试",
      issueasset: "未测试",
      deploycontract: "未测试",
      addaccount: "未测试",
      updateaccount: "未测试",
      listaccount: "未测试",
      getnewaddress: "未测试",
      listuseraddress: "未测试",
      rescanwallet: "未测试",
      changepassword: "未测试",
      importprivateKey: "未测试",
      lockwallet: "未测试",
      unlockwallet: "未测试",
      getwalletversioninfo: "未测试",
      getwalletsyncprogress: "未测试",
      getallassets: "未测试",
      getcoresyncprogress: "未测试",
      getsyncprogress: "未测试"
    }
  }

  testFeatures() {
    provider.requestWithResponse("getblockchaininfo", {}, res => {
      console.log("getblockchaininfo----------", res);
      if(res.status === 200){
        this.setState({
          getblockchaininfo:<span className="rpctest-success">测试通过</span>,
        });
      }else{
        this.setState({
          getblockchaininfo:<span className="rpctest-failed">测试未通过</span>,
        });
      }
    });

    provider.requestWithResponse("getpeerlist", {}, res => {
      console.log("getpeerlist-----------", res);
      if(res.status === 200){
        this.setState({
          getpeerlist:<span className="rpctest-success">测试通过</span>,
        });
      }else{
        this.setState({
          getpeerlist:<span className="rpctest-failed">测试未通过</span>,
        });
      }
    });

    provider.requestWithResponse("getnetworkstatus", {}, res => {
      console.log("getnetworkstatus-----------", res);
      if(res.status === 200){
        this.setState({
          getnetworkstatus:<span className="rpctest-success">测试通过</span>,
        });
      }else{
        this.setState({
          getnetworkstatus:<span className="rpctest-failed">测试未通过</span>,
        });
      }
    });

    let getbalance = { accountName: "default",};
    provider.requestWithResponse("getbalance", getbalance, res => {
      console.log("getbalance-----------", res);
      if(res.status === 200){
        this.setState({
          getbalance:<span className="rpctest-success">测试通过</span>,
        });
      }else{
        this.setState({
          getbalance:<span className="rpctest-failed">测试未通过</span>,
        });
      }
    });

      setTimeout("",3000)

    let sendPairs = new Map()
      .set("Jn8CKVvzLya1iLKW2ZRdFYTFiLMm88AxdG9n9ZVC2ag=", "1000");
    let sendPaymentReq = {
      accountName: "default",
      sendPairs: sendPairs
    };
    provider.requestWithResponse("sendpayment", sendPaymentReq, res => {
      console.log("sendpayment-----------", res);
      if(res.status === 200){
        this.setState({
          sendpayment:<span className="rpctest-success">测试通过</span>,
        });
      }else{
        this.setState({
          sendpayment:<span className="rpctest-failed">测试未通过</span>,
        });
      }
    });

      setTimeout("",3000)

    let getTX = { accountName: "default", count: 100 };
    provider.requestWithResponse("listtx", getTX, res => {
        console.log("listtx--------------", res);
        if(res.status === 200){
            this.setState({
                listtx:<span className="rpctest-success">测试通过</span>,
            });
        }else{
            this.setState({
                listtx:<span className="rpctest-failed">测试未通过</span>,
            });
        }
    });

      setTimeout("",3000)
    //
    //   let sendTextReq = { accountName: "default", text: "hello world" };
    // provider.requestWithResponse("sendtext", sendTextReq, res => {
    //   console.log("sendtext-----------", res);
    //   if(res.status === 200){
    //     this.setState({
    //       sendtext:<span className="rpctest-success">测试通过</span>,
    //     });
    //   }else{
    //     this.setState({
    //       sendtext:<span className="rpctest-failed">测试未通过</span>,
    //     });
    //   }
    // });
    //
    // let invokeContractReq = {
    //   accountName: "zhangsan",
    //   assetName: "gravity",
    //   invokeJson: "Hello invoke!"
    // };
    // provider.requestWithResponse("invokecontract", invokeContractReq, res => {
    //   console.log("invokecontract-----------", res);
    //   if(res.status === 200){
    //     this.setState({
    //       invokecontract:<span className="rpctest-success">测试通过</span>,
    //     });
    //   }else{
    //     this.setState({
    //       invokecontract:<span className="rpctest-failed">测试未通过</span>,
    //     });
    //   }
    // });
    //
    // let issueAssetReq = {
    //   accountName: "zhangsan",
    //   issueJson: "Hello issueAsset!"
    // };
    // provider.requestWithResponse("issueasset", issueAssetReq, res => {
    //   console.log("issueasset-----------", res);
    //   if(res.status === 200){
    //     this.setState({
    //       issueasset:<span className="rpctest-success">测试通过</span>,
    //     });
    //   }else{
    //     this.setState({
    //       issueasset:<span className="rpctest-failed">测试未通过</span>,
    //     });
    //   }
    // });
    //
    // let deployContractReq = {
    //   accountName: "zhangsan",
    //   deployJson: "Hello deploy!"
    // };
    // provider.requestWithResponse("deploycontract", deployContractReq, res => {
    //   console.log("deploycontract-----------", res);
    //   if(res.status === 200){
    //     this.setState({
    //       deploycontract:<span className="rpctest-success">测试通过</span>,
    //     });
    //   }else{
    //     this.setState({
    //       deploycontract:<span className="rpctest-failed">测试未通过</span>,
    //     });
    //   }
    // });
    //accountType: 0:普通账户，1：抗量子账户,
    let addAccountReq = { accountName: "zhangsan5",accountType:0};
    provider.requestWithResponse("addaccount", addAccountReq, res => {
      console.log("addaccount-----------", res);
      if(res.status === 200){
        this.setState({
          addaccount:<span className="rpctest-success">测试通过</span>,
        });
      }else{
        this.setState({
          addaccount:<span className="rpctest-failed">测试未通过</span>,
        });
      }
    });

      setTimeout("",3000)

    let updateAccountReq = {
        oldAccountName: "zhangsan4",
        newAccountName: "wangwu16",
      };
    provider.requestWithResponse("updateaccount", updateAccountReq, res => {
      console.log("updateaccount-----------", res);
      if(res.status === 200){
        this.setState({
          updateaccount:<span className="rpctest-success">测试通过</span>,
        });
      }else{
        this.setState({
          updateaccount:<span className="rpctest-failed">测试未通过</span>,
        });
      }
    });

      setTimeout("",3000)

    let listAccountReq = {};
    provider.requestWithResponse("listaccount", listAccountReq, res => {
      console.log("listaccount-----------", res);
      if(res.status === 200){
        this.setState({
          listaccount:<span className="rpctest-success">测试通过</span>,
        });
      }else{
        this.setState({
          listaccount:<span className="rpctest-failed">测试未通过</span>,
        });
      }
    });

      setTimeout("",3000)

    let getNewAddressReq = { accountName: "zhangsan2" };
    provider.requestWithResponse("getnewaddress", getNewAddressReq, res => {
      console.log("getnewaddress-----------", res);
      if(res.status === 200){
        this.setState({
          getnewaddress:<span className="rpctest-success">测试通过</span>,
        });
      }else{
        this.setState({
          getnewaddress:<span className="rpctest-failed">测试未通过</span>,
        });
      }
    });

      setTimeout("",3000)

    let listUserAddressesReq = { accountName: "default" };
    provider.requestWithResponse("listuseraddress", listUserAddressesReq, res => {
        console.log("listuseraddress-----------", res);
        if(res.status === 200){
          this.setState({
            listuseraddress:<span className="rpctest-success">测试通过</span>,
          });
        }else{
          this.setState({
            listuseraddress:<span className="rpctest-failed">测试未通过</span>,
          });
        }
      }
    );

    //
    // let rescanWalletReq = {};
    // provider.requestWithResponse("rescanwallet", rescanWalletReq, res => {
    //   console.log("rescanwallet-----------", res);
    //   if(res.status === 200){
    //     this.setState({
    //       rescanwallet:<span className="rpctest-success">测试通过</span>,
    //     });
    //   }else{
    //     this.setState({
    //       rescanwallet:<span className="rpctest-failed">测试未通过</span>,
    //     });
    //   }
    // });

    setTimeout("",3000)

    let changePasswordReq = { oldPassword: "123", newPassword: "456" };
    provider.requestWithResponse("changepassword", changePasswordReq, res => {
      console.log("changepassword-----------", res);
      if(res.status === 200){
        this.setState({
          changepassword:<span className="rpctest-success">测试通过</span>,
        });
      }else{
        this.setState({
          changepassword:<span className="rpctest-failed">测试未通过</span>,
        });
      }
    });

      setTimeout("",3000)

      let changePasswordReq2 = { oldPassword: "456", newPassword: "123" };
      provider.requestWithResponse("changepassword", changePasswordReq2, res => {
          console.log("changepassword2-----------", res);
          if(res.status === 200){
              this.setState({
                  changepassword:<span className="rpctest-success">测试通过</span>,
              });
          }else{
              this.setState({
                  changepassword:<span className="rpctest-failed">测试未通过</span>,
              });
          }
      });
    //
    //   let importprivateKeyReq = {
    //   privkey: "0xfbb1b73c4f0bda4f67dca266ce6ef42f520fbb98"
    // };
    // provider.requestWithResponse(
    //   "importprivateKey",
    //   importprivateKeyReq,
    //   res => {
    //     console.log("importprivateKey-----------", res);
    //     if(res.status === 200){
    //       this.setState({
    //         importprivateKey:<span className="rpctest-success">测试通过</span>,
    //       });
    //     }else{
    //       this.setState({
    //         importprivateKey:<span className="rpctest-failed">测试未通过</span>,
    //       });
    //     }
    //   }
    // );
    //
    // let lockWalletReq = { password: "123456" };
    // provider.requestWithResponse("lockwallet", lockWalletReq, res => {
    //   console.log("lockwallet-----------", res);
    //   if(res.status === 200){
    //     this.setState({
    //       lockwallet:<span className="rpctest-success">测试通过</span>,
    //     });
    //   }else{
    //     this.setState({
    //       lockwallet:<span className="rpctest-failed">测试未通过</span>,
    //     });
    //   }
    // });
    //
    // let unlockWalletReq = { password: "123456" };
    // provider.requestWithResponse("unlockwallet", unlockWalletReq, res => {
    //   console.log("unlockwallet-----------", res);
    //   if(res.status === 200){
    //     this.setState({
    //       unlockwallet:<span className="rpctest-success">测试通过</span>,
    //     });
    //   }else{
    //     this.setState({
    //       unlockwallet:<span className="rpctest-failed">测试未通过</span>,
    //     });
    //   }
    // });

    let getWalletVersionInfoReq = {};
    provider.requestWithResponse("getwalletversioninfo", getWalletVersionInfoReq, res => {
        console.log("getwalletversioninfo-----------", res);
        if(res.status === 200){
          this.setState({
            getwalletversioninfo:<span className="rpctest-success">测试通过</span>,
          });
        }else{
          this.setState({
            getwalletversioninfo:<span className="rpctest-failed">测试未通过</span>,
          });
        }
      }
    );

    let getWalletSyncProgressReq = {};
    provider.requestWithResponse("getwalletsyncprogress", getWalletSyncProgressReq, res => {
        console.log("getwalletsyncprogress-----------", res);
        if(res.status === 200){
          this.setState({
            getwalletsyncprogress:<span className="rpctest-success">测试通过</span>,
          });
        }else{
          this.setState({
            getwalletsyncprogress:<span className="rpctest-failed">测试未通过</span>,
          });
        }
      }
    );

    // let getAllAssets = { accountName: "zhangsan" };
    // provider.requestWithResponse("getallassets", getAllAssets, res => {
    //   console.log("getallassets-----------", res);
    //   if(res.status === 200){
    //     this.setState({
    //       getallassets:<span className="rpctest-success">测试通过</span>,
    //     });
    //   }else{
    //     this.setState({
    //       getallassets:<span className="rpctest-failed">测试未通过</span>,
    //     });
    //   }
    // });

    let getCoreSyncProgressReq = {};
    provider.requestWithResponse("getcoresyncprogress", getCoreSyncProgressReq, res => {
        console.log("getcoresyncprogress-----------", res);
        if(res.status === 200){
          this.setState({
            getcoresyncprogress:<span className="rpctest-success">测试通过</span>,
          });
        }else{
          this.setState({
            getcoresyncprogress:<span className="rpctest-failed">测试未通过</span>,
          });
        }
      }
    );

      setTimeout("",3000)

    let getSyncProgressReq = {};
    provider.requestWithResponse("getsyncprogress", getSyncProgressReq, res => {
      console.log("getsyncprogress-----------", res);
      if(res.status === 200){
        this.setState({
          getsyncprogress:<span className="rpctest-success">测试通过</span>,
        });
      }else{
        this.setState({
          getsyncprogress:<span className="rpctest-failed">测试未通过</span>,
        });
      }
    });

    // let calcpaymentfeeReq = {
    //     accountName: "zhangsan",
    //     assetName: "gravity",
    //     sendPairs: sendPairs
    // };
    // provider.requestWithResponse("calcpaymentfee", calcpaymentfeeReq, res => {
    //     console.log("calcpaymentfee-----------", res);
    //     if(res.status === 200){
    //         this.setState({
    //             calcpaymentfee:<span className="rpctest-success">测试通过</span>,
    //         });
    //     }else{
    //         this.setState({
    //             calcpaymentfee:<span className="rpctest-failed">测试未通过</span>,
    //         });
    //     }
    // });
    //
    // let calctextfeeReq = { accountName: "zhangsan", text: "hello world" };
    // provider.requestWithResponse("calctextfee", calctextfeeReq, res => {
    //     console.log("calctextfee-----------", res);
    //     if(res.status === 200){
    //         this.setState({
    //             calctextfee:<span className="rpctest-success">测试通过</span>,
    //         });
    //     }else{
    //         this.setState({
    //             calctextfee:<span className="rpctest-failed">测试未通过</span>,
    //         });
    //     }
    // });
    //
    // let calcinvokecontractfeeReq = {
    //     accountName: "zhangsan",
    //     assetName: "gravity",
    //     invokeJson: "Hello invoke!"
    // };
    // provider.requestWithResponse("calcinvokecontractfee", calcinvokecontractfeeReq, res => {
    //     console.log("calctextfee-----------", res);
    //     if(res.status === 200){
    //         this.setState({
    //             calcinvokecontractfee:<span className="rpctest-success">测试通过</span>,
    //         });
    //     }else{
    //         this.setState({
    //             calcinvokecontractfee:<span className="rpctest-failed">测试未通过</span>,
    //         });
    //     }
    // });
    //
    // let calcissueassetfeeReq = {
    //       accountName: "zhangsan",
    //       issueJson: "Hello issueAsset!"
    //   };
    // provider.requestWithResponse("calcissueassetfee", calcissueassetfeeReq, res => {
    //     console.log("calcissueassetfee-----------", res);
    //     if(res.status === 200){
    //         this.setState({
    //             calcissueassetfee:<span className="rpctest-success">测试通过</span>,
    //         });
    //     }else{
    //         this.setState({
    //             calcissueassetfee:<span className="rpctest-failed">测试未通过</span>,
    //         });
    //     }
    // });
    //
    // let calcdeploycontractfeeReq = {
    //     accountName: "zhangsan",
    //     deployJson: "Hello issueAsset!"
    // };
    // provider.requestWithResponse("calcdeploycontractfee", calcdeploycontractfeeReq, res => {
    //     console.log("calcdeploycontractfee-----------", res);
    //     if(res.status === 200){
    //         this.setState({
    //             calcdeploycontractfee:<span className="rpctest-success">测试通过</span>,
    //         });
    //     }else{
    //         this.setState({
    //             calcdeploycontractfee:<span className="rpctest-failed">测试未通过</span>,
    //         });
    //     }
    // });
  }
  render() {

    return <div className="rpctest-area">
      <Button onClick={()=>this.testFeatures()}>功能测试</Button>
      <div className="debug-info">
      <p>
        <span>getblockchaininfo:</span><span>{this.state.getblockchaininfo}</span>
      </p>
      <p>
        <span>getpeerlist:</span><span>{this.state.getpeerlist}</span>
      </p>
      <p>
        <span>getnetworkstatus:</span><span>{this.state.getnetworkstatus}</span>
      </p>
      <p>
        <span>getbalance:</span><span>{this.state.getbalance}</span>
      </p>
      <p>
        <span>listtx:</span><span>{this.state.listtx}</span>
      </p>
      <p>
        <span>sendpayment:</span><span>{this.state.sendpayment}</span>
      </p>
      <p>
        <span>sendtext:</span><span>{this.state.sendtext}</span>
      </p>
      <p>
        <span>invokecontract:</span><span>{this.state.invokecontract}</span>
      </p>
      <p>
        <span>issueasset:</span><span>{this.state.issueasset}</span>
      </p>
      <p> 
        <span>deploycontract:</span><span>{this.state.deploycontract}</span>
      </p>
      <p>
        <span>addaccount:</span><span>{this.state.addaccount}</span>
      </p>
      <p>
        <span>updateaccount:</span><span>{this.state.updateaccount}</span>
      </p>
      <p>
        <span>listaccount:</span><span>{this.state.listaccount}</span>
      </p>
      <p>
        <span>getnewaddress:</span><span>{this.state.getnewaddress}</span>
      </p>
      <p> 
        <span>listuseraddress:</span><span>{this.state.listuseraddress}</span>
      </p>
      <p> 
        <span>rescanwallet:</span><span>{this.state.rescanwallet}</span>
      </p>
      <p>
        <span>changepassword:</span><span>{this.state.changepassword}</span>
      </p>
      <p>
        <span>importprivateKey:</span><span>{this.state.importprivateKey}</span>
      </p>
      <p>
        <span>lockwallet:</span><span>{this.state.lockwallet}</span>
      </p>
      <p>
        <span>unlockwallet:</span><span>{this.state.unlockwallet}</span>
      </p>
      <p> 
        <span>getwalletversioninfo:</span><span>{this.state.getwalletversioninfo}</span>
      </p>
      <p>
        <span>getwalletsyncprogress:</span><span>{this.state.getwalletsyncprogress}</span>
      </p>
      <p>
        <span>getallassets:</span><span>{this.state.getallassets}</span>
      </p>
      <p>
        <span>getcoresyncprogress:</span><span>{this.state.getcoresyncprogress}</span>
      </p>
      <p>
        <span>getsyncprogress:</span><span>{this.state.getsyncprogress}</span>
      </p>
      <p>
          <span>calcpaymentfee:</span><span>{this.state.calcpaymentfee}</span>
      </p>
      <p>
      <span>calctextfee:</span><span>{this.state.calctextfee}</span>
      </p>
      <p>
          <span>calcinvokecontractfee:</span><span>{this.state.calcinvokecontractfee}</span>
      </p>
      <p>
          <span>calcissueassetfee:</span><span>{this.state.calcissueassetfee}</span>
      </p>
      <p>
          <span>calcdeploycontractfee:</span><span>{this.state.calcdeploycontractfee}</span>
      </p>
      </div>
    </div>;
  }
}

export default RPCTestPageView;
