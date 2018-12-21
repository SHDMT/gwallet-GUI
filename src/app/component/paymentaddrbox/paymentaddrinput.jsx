import React, { Component } from "react";
import { Row, Col, Button, Input, Form, InputNumber } from "antd";

const FormItem = Form.Item;
class PaymentAddrInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: ""
    };
    this.status = [{ status: "", help: "" }, { status: "", help: "" }];
  }
  render() {
    if (this.props.errCode != null) {
      if (this.props.errCode.input === 100) {
        this.status[0].status = "error";
        this.status[0].help = this.props.errCode.text;
        this.status[1].status = "error";
        this.status[1].help = this.props.errCode.text;
      } else {
        this.status[this.props.errCode.input].status = "error";
        this.status[this.props.errCode.input].help = this.props.errCode.text;
      }
    } else {
      this.status = [{ status: "", help: "" }, { status: "", help: "" }];
    }
    return (
      <div className="paymentaddr-input">
        <Row className="paymentaddr-input-row" gutter={10}>
          <Button
            onClick={this.props.addressbookHandler}
            className="paymentaddr-input-btn"
            shape="circle"
            icon="book"
          />
          <Button
            onClick={this.props.removePaymentHandler}
            className="paymentaddr-input-btn"
            type="danger"
            shape="circle"
            icon="delete"
          />
          <Col span={15}>
            <FormItem
              hasFeedback
              validateStatus={this.status[0].status}
              help={this.status[0].help}
            >
              <Input
                placeholder="转账地址"
                onChange={this.props.onChangeAddressValue}
                value={this.props.addressValue}
              />
            </FormItem>
          </Col>
          <Col span={5}>
            <FormItem
              hasFeedback
              validateStatus={this.status[1].status}
              help={this.status[1].help}
            >
              <InputNumber
                style={{ width: "100%" }}
                placeholder="金额"
                onChange={this.props.onChangeAmountValue}
                value={this.props.amountValue}
                min={1}
              />
            </FormItem>
          </Col>
          <Col span={1}>
            <h3 className="paymentaddr-input-unit">{this.props.assetUnit}</h3>
          </Col>
        </Row>
      </div>
    );
  }
}

export default PaymentAddrInput;
