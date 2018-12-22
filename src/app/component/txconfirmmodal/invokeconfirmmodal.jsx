import React, { Component } from "react";
import { Form, Icon, Input, Modal, Button, Divider } from "antd";
import provider from "../../dataproviderclient";
import './layout.css';

const FormItem = Form.Item;
class InvokeContractConfirmModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validateStatus: "",
      validateHelp: "",
      password: ""
    };
  }

  handleOK() {
    let params = { password: this.state.password };
    provider.requestWithResponse("checkpassword", params, (res) => {
      if (res.status === 200 && res.data === "success") {
        this.setState(
          {
            validateStatus: "success",
            validateHelp: "密码验证成功!"
          },
          () => {
            this.props.handleOK();
            this.setState({
              validateStatus: "",
              validateHelp: "",
              password: ""
            });
          }
        );
      } else {
        this.setState({
          validateStatus: "error",
          validateHelp: "密码输入错误!",
          password: ""
        });
      }
    });
  }

  handleCancel() { }

  handlePasswordChange(v) {
    this.setState({
      password: v
    });
  }
  render() {
    let account = sessionStorage.getItem("account");
    let footer = (
      <div>
        <Button key="Cancel" onClick={this.props.handleCancel}>
          取消
        </Button>
        <Button key="OK" type="primary" onClick={() => this.handleOK()}>
          确定
        </Button>
      </div>
    );
    
    return (
      <Modal
        title={this.props.title}
        visible={this.props.visible}
        onOk={() => this.handleOK()}
        onCancel={this.props.handleCancel}
        closable={false}
        maskClosable={false}
        footer={footer}
      >
        <div className="paymentconfirm-modal-content">
          <div className="paymentconfirm-label-item first">
            <span className="paymentconfirm-label-item-title">发起账户：</span><span className="paymentconfirm-label-value">{account}</span>
          </div>
          <div className="paymentconfirm-label-item">
            <span className="paymentconfirm-label-item-title">使用资产：</span><span className="paymentconfirm-label-value">{this.props.asset}</span>
          </div>
          <div className="paymentconfirm-label-item">
            <span className="paymentconfirm-label-item-title">运行合约：</span><span className="paymentconfirm-label-value">{this.props.contract}</span>
          </div>
          <div className="paymentconfirm-label-item">
            <span className="paymentconfirm-label-item-title paymentconfirm-label-item-addrtitle">运行参数：</span>
            <div className="paymentconfirm-label-value">
              {this.props.paramsKey.map((key, index) => (
                <div key={index}>[{key}]&nbsp;&nbsp;{this.props.paramsValue[index]}</div>
              ))}
            </div>
          </div>
          <div className="paymentconfirm-label-item">
            <span className="paymentconfirm-label-item-title">交易费：</span><span className="paymentconfirm-label-value">{this.props.txFee}</span>{this.props.assetUnit}
          </div>
          <div className="paymentconfirm-label-item">
            <span className="paymentconfirm-label-item-title">总计：</span><span className="paymentconfirm-label-value paymentconfirm-label-totalamount">{this.props.txAmount + this.props.txFee}</span>{this.props.assetUnit}
          </div>
          <Divider />
          <div className="paymentconfirm-label-item-title paymentconfirm-password-title">
            支付密码：
            </div>
          <FormItem
            hasFeedback
            validateStatus={this.state.validateStatus}
            help={this.state.validateHelp}
            style={{ float: "left" }}
          >
            <Input
              value={this.state.password}
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="请输入您的密码"
              onChange={e => {
                this.handlePasswordChange(e.target.value);
              }}
            />
          </FormItem>

        </div>

      </Modal>
    );
  }
}

export default InvokeContractConfirmModal;
