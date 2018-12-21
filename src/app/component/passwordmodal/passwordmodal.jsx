import React, { Component } from "react";
import { Form, Icon, Input, Modal, Button } from "antd";
import provider from "../../dataproviderclient";

const FormItem = Form.Item;
class PasswordModal extends Component {
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

  handleCancel() {}

  handlePasswordChange(v) {
    this.setState({
      password: v
    });
  }
  render() {
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
    if (this.props.isLockWallet) {
      footer = (
        <div>
          <Button key="OK" type="primary" onClick={() => this.handleOK()}>
            解锁
          </Button>
        </div>
      );
    }
    return (
      <Modal
        title={this.props.title}
        visible={this.props.visible}
        onOk={() => this.handleOK()}
        onCancel={this.props.isLockWallet ? () => {} : this.props.handleCancel}
        closable={false}
        maskClosable={false}
        footer={footer}
      >
        <FormItem
          hasFeedback
          validateStatus={this.state.validateStatus}
          help={this.state.validateHelp}
        >
          <Input
            value={this.state.password}
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            type="password"
            placeholder="请输入你的密码"
            onChange={e => {
              this.handlePasswordChange(e.target.value);
            }}
          />
        </FormItem>
      </Modal>
    );
  }
}

export default PasswordModal;
