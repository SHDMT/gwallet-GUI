import React, { Component } from "react";
import { Modal, Row, Col, Input } from "antd";

class AddContactModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      address: "",
      note: ""
    };
  }

  handleOK() {
    let data = {
      name: this.state.name,
      address: this.state.address,
      note: this.state.note,
      account: sessionStorage.getItem("account")
    };
    this.setState({
      name: "",
      address: "",
      note: ""
    });
    this.props.handleOk(data);
  }

  handleNameChange(e) {
    this.setState({
      name: e.target.value
    });
  }
  handleAddressChange(e) {
    this.setState({
      address: e.target.value
    });
  }
  handleNoteChange(e) {
    this.setState({
      note: e.target.value
    });
  }

  render() {
    return (
      <div>
        <Modal
          title="新建联系人"
          visible={this.props.visible}
          onOk={() => this.handleOK()}
          onCancel={this.props.handleCancel}
          cancelText="取消"
          okText="确定"
          closable={false}
        >
          <Row>
            <Col span={4} className="gutter-row">
              联系人：
            </Col>
            <Col span={18}>
              <div className="gutter-box">
                <Input
                  placeholder="请输入联系人姓名"
                  onChange={e => this.handleNameChange(e)}
                  value={this.state.name}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={4} className="gutter-row">
              地址：
            </Col>
            <Col span={18}>
              <div className="gutter-box">
                <Input
                  placeholder="请输入联系人转账地址"
                  onChange={e => this.handleAddressChange(e)}
                  value={this.state.address}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={4} className="gutter-row">
              备注：
            </Col>
            <Col span={18}>
              <div className="gutter-box">
                <Input
                  placeholder="请输入备注信息"
                  onChange={e => this.handleNoteChange(e)}
                  value={this.state.note}
                />
              </div>
            </Col>
          </Row>
        </Modal>
      </div>
    );
  }
}

export default AddContactModal;
