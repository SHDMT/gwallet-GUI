import React, { Component } from "react";
import { Card } from "antd";
import PaymentAddrInput from "./paymentaddrinput";
import AddrSelectorModal from "../../component/addrselectormodal/addrselectormodal";

import pipe from "../../tools/pipe";
import "./layout.css";
class PaymentAddrBox extends Component {
  constructor(props) {
    super(props);
    this.currentID = 1;
    this.state = {
      paymentAddrs: [0],
      showPasswordModal: false,
      paymentAddrsValue: { 0: "" },
      paymentAmountValue: { 0: 1 },
      addrbookPaymentID: 0
    };

  }
  
  componentDidMount(){
    pipe.pipeRegister("refreshtxcontrollers", () => this.reset());
  }
  componentWillUnmount(){
    pipe.pipeRemove("refreshtxcontrollers", () => this.reset());
  }

  reset(){
    this.setState({
      paymentAddrs: [0],
      paymentAddrsValue: { 0: "" },
      paymentAmountValue: { 0: 1 },
      addrbookPaymentID: 0
    });
  }
  //移除输入框
  handleRemovePaymentAddr(id) {
    this.state.paymentAddrs.splice(this.state.paymentAddrs.indexOf(id), 1);
    delete this.state.paymentAddrsValue[id];
    delete this.state.paymentAmountValue[id];
    this.setState({
      paymentAddrs: this.state.paymentAddrs,
      paymentAddrsValue: this.state.paymentAddrsValue,
      paymentAmountValue: this.state.paymentAmountValue
    });

    let data = this.createNewSendPairsAndAmount();
    this.props.txdetail(data.totalAmount, data.sendPairs);
  }

  handleOpenAddressbook(id) {
    pipe.pipeInvoke("refreshaddressselectortable");
    this.setState({
      showPasswordModal: true,
      addrbookPaymentID: id
    });
  }

  handleAddressbookCancel() {
    this.setState({
      showPasswordModal: false
    });
  }

  handleAddressbookOK(id, address) {
    this.state.paymentAddrsValue[id] = address;
    this.setState({
      showPasswordModal: false,
      paymentAddrsValue: this.state.paymentAddrsValue,
      paymentAmountValue: this.state.paymentAmountValue
    });
    this.handleOnFormChange();
  }

  handleOnFormChange() {
    let data = this.createNewSendPairsAndAmount();
    this.props.txdetail(data.totalAmount, data.sendPairs);
  }

  createNewSendPairsAndAmount() {
    let sendPairs = new Map();
    let totalAmount = 0;

    for (let i = 0; i < this.state.paymentAddrs.length; i++) {
      let id = this.state.paymentAddrs[i];
      if(isNaN(Number(this.state.paymentAmountValue[id]))){
        continue;
      }
      sendPairs.set(
        this.state.paymentAddrsValue[id].trim(),
        this.state.paymentAmountValue[id]
      );
      totalAmount = totalAmount + parseInt(this.state.paymentAmountValue[id]);
      
    }
    return { sendPairs: sendPairs, totalAmount: totalAmount };
  }
  handleAddpaymentClick() {
    let id = this.currentID;
    this.state.paymentAddrs.push(id);
    this.state.paymentAddrsValue[id] = "";
    this.state.paymentAmountValue[id] = 1;
    this.setState({
      paymentAddrs: this.state.paymentAddrs,
      paymentAddrsValue: this.state.paymentAddrsValue,
      paymentAmountValue: this.state.paymentAmountValue
    });
    this.currentID++;
  }

  handleChangeAddressValue(id, e) {
    this.state.paymentAddrsValue[id] = e.target.value;
    this.setState({
      paymentAddrsValue: this.state.paymentAddrsValue
    });
    this.handleOnFormChange();
  }
  handleChangeAmountValue(id, e) {
    this.state.paymentAmountValue[id] = e;
    if(this.state.paymentAmountValue[id] === "" || isNaN(Number(this.state.paymentAmountValue[id]))){
      this.state.paymentAmountValue[id] = 0;
    }
    this.setState({
      paymentAmountValue: this.state.paymentAmountValue
    });
    this.handleOnFormChange();
  }

  render() {
    return (
      <div className="paymentaddr-box">
        <Card title={this.props.title} bordered={true}>
          {this.state.paymentAddrs.map((id, index) => (
            <PaymentAddrInput
              addressValue={this.state.paymentAddrsValue[id]}
              amountValue={this.state.paymentAmountValue[id]}
              onChangeAddressValue={e => this.handleChangeAddressValue(id, e)}
              onChangeAmountValue={e => this.handleChangeAmountValue(id, e)}
              assetUnit={this.props.assetUnit}
              removePaymentHandler={() => this.handleRemovePaymentAddr(id)}
              addressbookHandler={() => this.handleOpenAddressbook(id)}
              key={id}
              paymentID={id}
              errCode={
                this.props.errCode != null && this.props.errCode.index === index
                  ? this.props.errCode
                  : null
              }
            />
          ))}
        </Card>
        <div className="paymentaddr-box-extra">
          <a onClick={() => this.handleAddpaymentClick()} href="#">
            +&nbsp;转账地址
          </a>
        </div>
        <AddrSelectorModal
          paymentID={this.state.addrbookPaymentID}
          title="通讯录"
          visible={this.state.showPasswordModal}
          handleOK={(id, address) => this.handleAddressbookOK(id, address)}
          handleCancel={() => this.handleAddressbookCancel()}
        />
      </div>
    );
  }
}

export default PaymentAddrBox;
