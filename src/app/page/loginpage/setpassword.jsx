import "./layout.css";
import React, { Component } from "react";
import { Input, Form, Icon, Row, Col } from "antd";
// import provider from "../../dataproviderclient";
const FormItem = Form.Item;
class SetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validateStatus: "",
      validateHelp: "",
      help: "",
      iptValue: "",
      sureValue: ""
    };
  }
  render() {
    let passwordErrorInfo = this.props.errorInfo[0];
    let surePasswordErrorInfo = this.props.errorInfo[1];
    return (
      <div className="setPsd">
        <h2>
          设置<span>密</span>码
        </h2>
        <div className="setpsdinput">
          <div className="walletpsd">
            <Row>
              <Col span={6} />
              <Col span={3}>
                <span>钱包密码:</span>
              </Col>
              <Col span={8}>
                <FormItem
                  hasFeedback
                  validateStatus={passwordErrorInfo.info}
                  help={passwordErrorInfo.help}
                >
                  <Input
                    onFocus={this.props.foucusResetInput}
                    prefix={
                      <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    type="password"
                    size="small"
                    placeholder="请输入钱包密码"
                    style={{ width: "200px" }}
                    value={this.props.passwordValue}
                    onChange={this.props.onPasswordValueChange}
                  />
                </FormItem>
              </Col>
              <Col span={6} />
            </Row>
          </div>
          <div className="surepsd">
            <Row>
              <Col span={6} />
              <Col span={3}>
                <span>确认密码:</span>
              </Col>
              <Col span={8}>
                <FormItem
                  hasFeedback
                  validateStatus={surePasswordErrorInfo.info}
                  help={surePasswordErrorInfo.help}
                >
                  <Input
                    onFocus={this.props.foucusResetInput}
                    prefix={
                      <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    type="password"
                    size="small"
                    placeholder="请再次确认密码"
                    style={{ width: "200px" }}
                    value={this.props.sureValue}
                    onChange={this.props.onSureValueChange}
                  />
                </FormItem>
              </Col>
              <Col span={6} />
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

export default SetPassword;
