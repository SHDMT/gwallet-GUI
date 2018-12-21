import React, { Component } from "react";
import { Modal, Button } from "antd";
import AccountAvatarPanel from "./accountavatarpanel";
import provider from "../../dataproviderclient";
import pipe from "../../tools/pipe";

import "./layout.css";
class ChangeAccountModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "default"
    };
  }

  handleOK() {
    pipe.pipeInvoke("refreshhomepageaddress");
    pipe.pipeInvoke("selectpage", 0);
    this.props.handleOK(this.state.selected);
  }

  handleChangeAccount(account) {
    sessionStorage.setItem("account", account);
    this.setState({
      selected: account
    });
  }

  render() {
    let accountName = sessionStorage.getItem("account");
    return (
      <Modal
        title="切换账户"
        visible={this.props.visible}
        closable={false}
        onCancel={this.props.handleCancel}
        footer={[
          <Button key="OK" type="primary" onClick={() => this.handleOK()}>
            确定
          </Button>
        ]}
      >
        <div className="changeaccount-modal-content">
          {this.props.accounts.map((account, index) => (
            <span
              key={index}
              onClick={() => this.handleChangeAccount(account.name)}
            >
              <AccountAvatarPanel
                key={index}
                accountName={account.name}
                selected={accountName === account.name}
                accountImg={account.img}
              />
            </span>
          ))}
        </div>
      </Modal>
    );
  }
}

export default ChangeAccountModal;
