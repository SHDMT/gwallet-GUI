import React, { Component } from "react";
import { Modal } from "antd";
import AddrSelectorTable from "./addrselectortable";

class AddrSelectorModal extends Component {
  constructor(props) {
    super(props);
    this.selectedAddress = "";
    this.rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.selectedAddress = selectedRows[0].address;
      },
      type: "radio",
      columnTitle: "#"
    };
  }
  handleOK() {
    this.props.handleOK(this.props.paymentID, this.selectedAddress);
  }
  handleSelectAddress(address) {
    this.selectedAddress = address;
  }

  render() {
    return (
      <Modal
        title={this.props.title}
        visible={this.props.visible}
        onOk={() => this.handleOK()}
        onCancel={this.props.handleCancel}
        closable={false}
        width={800}
        paymentID={this.props.paymentID}
        cancelText="取消"
        okText="确认"
      >
        <AddrSelectorTable rowSelection={this.rowSelection} />
      </Modal>
    );
  }
}

export default AddrSelectorModal;
