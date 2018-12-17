import React, { Component } from "react";
import { Modal, Button, Row, Col } from "antd";

class TxDetailModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unitType: ""
    };
  }
 
  render() {
    if (this.props.txDetails === undefined) {
      return null;
    } else {
      return (
        <Modal
          title="交易详情"
          visible={this.props.visible}
          onOk={this.props.handleOK}
          onCancel={this.props.handleCancel}
          closable={false}
          footer={[
            <Button key="OK" type="primary" onClick={this.props.handleOK}>
              确定
            </Button>
          ]}
        >
          <div>
            <Row>
              <Col span={4}>交易ID：</Col>
              <Col span={20}>{this.props.txDetails.unitHash}</Col>
            </Row>
            <Row>
              <Col span={4}>交易时间：</Col>
              <Col span={20}>
                {new Date(parseInt(this.props.txDetails.timeStamps) * 1000)
                  .toLocaleString()
                  .replace(/:\d{1,2}$/, " ")}
              </Col>
            </Row>
            <Row>
              <Col span={4}>转账人：</Col>
              <Col span={20}>
                {this.props.txDetails.msgDetails.map((value, index) => {
                  return value.inputs.map((value, index) => {
                    return <div key={index}>{value.address}</div>;
                  });
                })}
              </Col>
            </Row>
            <Row>
              <Col span={4}>收款人：</Col>
              <Col span={20}>
                {this.props.txDetails.msgDetails.map((value, index) => {
                  return value.outputs.map((value, index) => {
                    return <div key={index}>{value.address}</div>;
                  });
                })}
              </Col>
            </Row>
            <Row>
              <Col span={4}>接收/发送：</Col>
              <Col span={20}>
                {this.props.txDetails.state === "1" ? "接收" : "发送"}
              </Col>
            </Row>
            <Row>
              <Col span={4}>交易类型：</Col>
              <Col span={20}>
                {!this.props.txDetails.unitType
                  ? "普通交易"
                  : this.props.txDetails.unitType}
              </Col>
            </Row>
            <Row>
              <Col span={4}>交易金额：</Col>
              <Col span={20}>
                {this.props.txDetails.msgDetails.map((value, index) => {
                  var sum = 0;
                  var length = value.inputs.length;
                  return value.inputs.map((value, index) => {
                    sum = sum + parseInt(value.amount);
                    if (length === index + 1) {
                      return <span key={index}>{sum}</span>;
                    }
                  });
                })}
              </Col>
            </Row>
            <Row>
              <Col span={4}>交易费：</Col>
              <Col span={20}>{this.props.txDetails.fee}</Col>
            </Row>
          </div>
        </Modal>
      );
    }
  }
}

export default TxDetailModal;
