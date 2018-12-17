import React, { Component } from "react";
import { Modal } from "antd";
// import imgURL from "../../../../../public/imgs/notice_icon.png";

// import provider from "../../../dataproviderclient";

class ResetWalletModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Modal
        visible={this.props.visible}
        onOk={this.props.handleOk}
        onCancel={this.props.handleCancel}
        closable={false}
        cancelText="取消"
        okText="确定"
        width="36%"
      >
        <p style={{ fontSize: "16px" }}>是否确定要重新同步钱包？</p>
      </Modal>
    );
  }
}

export default ResetWalletModal;
