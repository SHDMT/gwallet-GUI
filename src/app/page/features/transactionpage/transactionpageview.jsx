import React, { Component } from "react";
import BalanceGroup from "../../../component/balancegroup/balancegroup";
import PaymentAddrBox from "../../../component/paymentaddrbox/paymentaddrbox";
import TxFeeLabel from "../../../component/txfeeLabel/txfeelabel";
import provider from "../../../dataproviderclient";
import { message, Button } from "antd";
import PaymentConfirmModal from "../../../component/txconfirmmodal/paymentconfirmmodal";

import pipe from "../../../tools/pipe";
import "./layout.css";

class TransactionPageView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPasswordModal: false,
      errCode: null,
      targetAddress:[],
      txAmount: 0,
      txFee: 0,
      isSubmitLoading: false
    };
    this.sendPairs = new Map();
    this.totalAmount = 0;
  }

  checkSendPairs() {
    let paymentAddrsValue = Array.from(this.sendPairs.keys());
    let paymentAmountValue = Array.from(this.sendPairs.values());

    if (this.sendPairs.size < 1) {
      this.setState({
        errCode: {
          index: 0,
          input: 100,
          text: "转账信息不能为空!"
        }
      });
      return false;
    }

    for (let i = 0; i < this.sendPairs.size; i++) {
      if (paymentAddrsValue[i] === undefined) {
        this.state.errCode = {
          index: i,
          input: 0,
          text: "地址信息不能为空!"
        };

        this.setState({
          errCode: this.state.errCode
        });
        return false;
      }
      if (paymentAmountValue[i] === undefined || paymentAmountValue[i] === "") {
        this.state.errCode = {
          index: i,
          input: 1,
          text: "金额不能为空!"
        };
        this.setState({
          errCode: this.state.errCode
        });
        return false;
      }
      //如果地址格式不正确,暂时只做最简单的判断，不为空
      if (paymentAddrsValue[i].trim().length < 1) {
        this.state.errCode = {
          index: i,
          input: 0,
          text: "地址信息不能为空!"
        };
        this.setState({
          errCode: this.state.errCode
        });
        return false;
      }
    }
    this.state.errCode = null;
    return true;
  }
  handleSendClick() {
    if (this.checkSendPairs()) {
      let paymentAddrsValue = Array.from(this.sendPairs.keys());
      let paymentAmountValue = Array.from(this.sendPairs.values());

      let calcpaymentfeeReq = {
        accountName: sessionStorage.getItem("account"),
        addresses: paymentAddrsValue,
        amounts: paymentAmountValue
      };
      this.setState({
        isSubmitLoading: true
      });
      provider.requestWithResponse("calcpaymentfee", calcpaymentfeeReq, res => {
        if (res.status === 200) {
          let txAmount = this.totalAmount;
          this.setState({
            isSubmitLoading: false,
            showPasswordModal: true,
            targetAddress:paymentAddrsValue,
            txAmount:txAmount,
            txFee:res.data.txBytes
          });
        } else {
          this.setState({
            isSubmitLoading: false,
          });
          message.error("发起交易失败，余额不足或交易数据出错");
          console.log(res.data);
          return;
        }
      });
    } else {
      console.log(this.state.errCode);
    }
  }
  handleOK() {
    let paymentAddrsValue = Array.from(this.sendPairs.keys());
    let paymentAmountValue = Array.from(this.sendPairs.values());

    let sendPaymentsReq = {
      accountName: sessionStorage.getItem("account"),
      addresses: paymentAddrsValue,
      amounts: paymentAmountValue
    };
    this.setState({
      showPasswordModal: false,
      errCode: null
    });
    provider.requestWithResponse("sendpayment", sendPaymentsReq, res => {
      if (res.status === 200) {
        message.success("交易成功!");
        console.log(res.data);
        this.reset();
      } else {
        console.log(res.data);
        message.error("交易失败!");
        return;
      }
    });
  }

  reset() {
    pipe.pipeInvoke("refreshtxcontrollers");
  }
  handleCancel() { 
    this.setState({
      showPasswordModal: false
    });
  }
  txfee(totalAmount, sendPairs) {
    this.sendPairs = sendPairs;
    this.totalAmount = totalAmount
  }

  render() {
    return (
      <div className="transaction-area">
        <BalanceGroup />
        <PaymentAddrBox
          title="转账地址"
          assetUnit="N"
          txdetail={(data, sendPairs) => {
            this.txfee(data, sendPairs);
          }}
          errCode={this.state.errCode}
        />
        <Button
          icon="pay-circle"
          onClick={() => this.handleSendClick()}
          className="transaction-send-btn"
          type="primary"
          loading={this.state.isSubmitLoading}
        >
          交易
        </Button>
        <PaymentConfirmModal
          target={this.state.targetAddress}
          title="交易确认"
          txAmount={this.state.txAmount}
          txFee={this.state.txFee}
          assetUnit="N"
          visible={this.state.showPasswordModal}
          handleOK={() => this.handleOK()}
          handleCancel={() => this.handleCancel()}
        />
      </div>
    );
  }
}

export default TransactionPageView;
