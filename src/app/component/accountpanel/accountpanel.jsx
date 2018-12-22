import React, { Component } from "react";
import { Menu, Dropdown, Avatar, Badge, Icon, message } from "antd";
import PasswordModal from "../passwordmodal/passwordmodal";
import AddAccountModal from "../addaccountmodal/addaccountmodal";
import ChangeAccountModal from "../changeaccountmodal/changeaccountmodal";
import provider from "../../dataproviderclient";

import "./layout.css";

const defaultAccountIcon = "./imgs/default_account_icon.png";
class AccountPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountName: sessionStorage.getItem("account"),
      accountAvatar: defaultAccountIcon,
      hasNotification: false,
      showPasswordModal: false,
      showAddAccountModal: false,
      showChangeAccountModal: false,
      accounts: []
    };
    this.menu = (
      <div className="account-panel-menu-area">
        <Menu selectedKeys={[]}>
          <Menu.Item key="0" onClick={() => this.handleLockWalletClick()}>
            <Icon type="lock" theme="outlined" />
            锁定钱包
          </Menu.Item>
          <Menu.Item key="1" onClick={() => this.handleAddAccountClick()}>
            <Icon type="user-add" theme="outlined" />
            新建账户
          </Menu.Item>
          <Menu.Item key="2" onClick={() => this.handleChangeAccountClick()}>
            <Icon type="team" theme="outlined" />
            切换账户
          </Menu.Item>
          <Menu.Item key="3" onClick={() => this.handleCloseWalletClick()}>
            <Icon type="poweroff" theme="outlined" />
            退出钱包
          </Menu.Item>
        </Menu>
      </div>
    );
  }

  getAccountImage(){
    let selectedAccount = sessionStorage.getItem("account");
    for(let account of this.state.accounts){
      if(account.name === selectedAccount){
        return account.img;
      }
    }
    return defaultAccountIcon;
  }

  componentDidMount() {
    provider.requestWithResponse("listaccount", {}, res => {
      if (res.status === 200) {
        this.state.accounts = res.data;
        let image = this.getAccountImage();
        this.setState({
          accountAvatar:image
        });
      } else {
        console.log("ACCOUNT ERROR:", res.data);
      }
    });
  }
  handleCloseWalletClick() {
    provider.request("closemainwindow");
  }
  handleLockWalletClick() {
    this.setState({
      showPasswordModal: true
    });
  }
  handleUnlockWalletClick() {
    this.setState({
      showPasswordModal: false
    });
    message.success("欢迎回来!");
  }

  handleAddAccountClick() {
    this.setState({
      showAddAccountModal: true
    });
  }
  handleChangeAccountClick() {
    provider.requestWithResponse("listaccount", {}, res => {
      if (res.status === 200) {
        this.setState({
          accounts: res.data,
          showChangeAccountModal: true
        });
      } else {
        console.log("ACCOUNT ERROR:", res.data);
      }
    });
  }

  handleAddAccountOK() {
    this.setState({
      accountName: sessionStorage.getItem("account"),
      showAddAccountModal: false
    });
  }

  handleAddAccountCancel() {
    this.setState({
      showAddAccountModal: false
    });
  }

  handleChangeAccountOK() {
    let image = this.getAccountImage();
    this.setState({
      accountName: sessionStorage.getItem("account"),
      showChangeAccountModal: false,
      accountAvatar: image
    });
  }
  handleChangeAccountCancel() {
    this.setState({
      showChangeAccountModal: false
    });
  }

  render() {
    return (
      <div>
        <Dropdown overlay={this.menu} trigger={["click"]}>
          <div className="account-panel ant-dropdown-link">
            <div className="account-name">{this.state.accountName}</div>
            <div className="account-avatar">
              <Badge dot={this.state.hasNotification}>
                <Avatar size="small" src={this.state.accountAvatar} />
              </Badge>
            </div>
          </div>
        </Dropdown>
        <PasswordModal
          title="请输入你的密码"
          visible={this.state.showPasswordModal}
          handleOK={() => this.handleUnlockWalletClick()}
          isLockWallet={true}
        />
        <AddAccountModal
          visible={this.state.showAddAccountModal}
          handleOK={() => this.handleAddAccountOK()}
          handleCancel={() => this.handleAddAccountCancel()}
        />
        <ChangeAccountModal
          visible={this.state.showChangeAccountModal}
          handleOK={() => this.handleChangeAccountOK()}
          handleCancel={() => this.handleChangeAccountCancel()}
          accounts = {this.state.accounts}
        />
      </div>
    );
  }
}

export default AccountPanel;
