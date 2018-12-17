import React, { Component } from "react";
import provider from "../../../dataproviderclient";
import { message, Spin } from "antd";
import ChangePasswordModal from "../../../component/changepasswordmodal/changepasswordmodal";
import ResetWalletModal from "./resetwalletmodal";
class SecuritySetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      changePasswordVisible: false,
      resetWalletVisible: false,
      originpsd: "",
      newpsd: "",
      surenewpsd: "",
      originpsd: "",
      passwordErrorsInfo: [
        { info: "", help: "" },
        { info: "", help: "" },
        { info: "", help: "" }
      ],
      loading: false
    };
  }
  setPasswordErrorInfo(input, help) {
    this.state.passwordErrorsInfo[input].info = "error";
    this.state.passwordErrorsInfo[input].help = help;
    this.setState({
      passwordErrorsInfo: this.state.passwordErrorsInfo
    });
  }
  setPasswordErrorInfoPairs(help) {
    this.state.passwordErrorsInfo[0].info = "error";
    this.state.passwordErrorsInfo[0].help = help[0];
    this.state.passwordErrorsInfo[1].info = "error";
    this.state.passwordErrorsInfo[1].help = help[1];
    this.state.passwordErrorsInfo[2].info = "error";
    this.state.passwordErrorsInfo[2].help = help[2];
    this.setState({
      passwordErrorsInfo: this.state.passwordErrorsInfo
    });
  }
  resetPasswordInfoPairs(help) {
    this.state.passwordErrorsInfo[0].info = "";
    this.state.passwordErrorsInfo[0].help = help[0];
    this.state.passwordErrorsInfo[1].info = "";
    this.state.passwordErrorsInfo[1].help = help[1];
    this.state.passwordErrorsInfo[2].info = "";
    this.state.passwordErrorsInfo[2].help = help[2];
    this.setState({
      passwordErrorsInfo: this.state.passwordErrorsInfo
    });
  }
  foucusResetInput() {
    this.resetPasswordInfoPairs(["", "", ""]);
  }
  foucusImportInput() {
    this.resetPasswordErrorInfo(0, "");
  }

  showModalChangePassword = () => {
    this.setState({
      changePasswordVisible: true
    });
  };
  showModalResetWalle = () => {
    this.setState({
      resetWalletVisible: true
    });
  };
  handleOkPasswordModal = e => {
    const { originpsd, newpsd, surenewpsd } = this.state;
    if (!originpsd) {
      this.setPasswordErrorInfo(0, "原始密码不能为空!");
      return;
    }
    if (!newpsd && !surenewpsd) {
      this.setPasswordErrorInfo(1, "新密码不能为空!");
      this.setPasswordErrorInfo(2, "新密码不能为空!");
      return;
    } else if (newpsd !== surenewpsd) {
      this.setPasswordErrorInfoPairs([
        "",
        "两次输入密码不一致！",
        "两次输入密码不一致！"
      ]);
    } else {
      let resetpwd = { oldPassword: originpsd, newPassword: newpsd };
      provider.requestWithResponse("changepassword", resetpwd, res => {
        console.log("重置密码:", res);
        console.log("传入的参数---", resetpwd);
        if (res.status === 200 && res.data === "success") {
          message.success("修改密码成功！");

          this.setState({
            originpsd: "",
            newpsd: "",
            surenewpsd: "",
            changePasswordVisible: false
          });
        } else {
          this.setState({
            originpsd: "",
            newpsd: "",
            surenewpsd: ""
          });
          this.setPasswordErrorInfo(0, "密码输入错误!");
        }
      });
    }
  };
  handleOkResetWallet = e => {
    this.setState({
      loading: true,
      resetWalletVisible: false
    });
    provider.requestWithResponse("rescanwallet", {}, res => {
      if (res.data.status === "0") {
        this.setState({
          loading: false
        });
        message.success("同步钱包成功！");
      }
    });
  };
  handleCancelPasswordModal = e => {
    this.setState({
      originpsd: "",
      newpsd: "",
      surenewpsd: "",
      changePasswordVisible: false
    });
  };
  handleCancelResetWallet = e => {
    this.setState({
      resetWalletVisible: false
    });
  };
  originPsd(e) {
    this.setState({
      originpsd: e.target.value
    });
  }
  newPsd(e) {
    this.setState({
      newpsd: e.target.value
    });
  }
  sureNewPsd(e) {
    this.setState({
      surenewpsd: e.target.value
    });
  }

  render() {
    return (
      <div className="securitysetting">
        <h3>密码设置</h3>
        <div>
          <a onClick={this.showModalChangePassword}>修改钱包密码</a>
        </div>
        <h3>备份/恢复</h3>
        <div>
          <a>备份钱包</a>
        </div>
        <div>
          <Spin tip="同步钱包中..." spinning={this.state.loading} delay={500}>
            <a onClick={this.showModalResetWalle}>重新同步钱包</a>
          </Spin>
        </div>
        <ChangePasswordModal
          visible={this.state.changePasswordVisible}
          handleOk={() => this.handleOkPasswordModal()}
          handleCancel={() => this.handleCancelPasswordModal()}
          errorInfo={this.state.passwordErrorsInfo}
          originPsd={originpsd => this.originPsd(originpsd)}
          newPsd={newpsd => this.newPsd(newpsd)}
          sureNewPsd={surenewpsd => this.sureNewPsd(surenewpsd)}
          foucusResetInput={() => {
            this.foucusResetInput();
          }}
          originpsdvalue={this.state.originpsd}
          newpsdvalue={this.state.newpsd}
          surenewpsdvalue={this.state.surenewpsd}
        />
        <ResetWalletModal
          visible={this.state.resetWalletVisible}
          handleOk={() => this.handleOkResetWallet()}
          handleCancel={() => this.handleCancelResetWallet()}
        />
      </div>
    );
  }
}

export default SecuritySetting;
