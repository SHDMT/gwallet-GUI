import "./layout.css";
import React, { Component } from "react";
import { Select, Form, Row, Col, Input, message, Icon } from "antd";
import provider from "../../dataproviderclient";
const FormItem = Form.Item;
const Option = Select.Option;

class LoginGravity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validateStatus: "",
      validateHelp: "",
      password: "",
      loginpwd: ""
    };
  }
  render() {
    let passwordErrorInfo = this.props.errorInfo[0];
    return (
      <div className="logingravity">
        <Row>
          <Col span={9}>
            <div className="logingra-title">
              <span>G</span>ravity
            </div>
            <p className="logingra-tro">
              <span>G</span>ravity是一种新型底层
              公有链分布式账本系统。它采用新型的DAG（Directed Acyclic
              Graph）存储和共识方案，以及基于
              DAG的智能合约方案设计，不仅可以实现在
              <span>G</span>ravity网络上交易的快速落账
              以及数据的及时共享，而且可以在该平台上灵活的开发去中心化的应用程序（DApp）。
            </p>
          </Col>
          <Col span={15}>
            <h2 className="logingratitle">
              登录<span>G</span>ravity
            </h2>

            <Row className="logingrapsd">
              <Col span={4} />
              <Col span={4}>
                <span>账号密码：</span>
              </Col>
              <Col span={12}>
                <FormItem
                  hasFeedback
                  validateStatus={passwordErrorInfo.info}
                  help={passwordErrorInfo.help}
                >
                  <Input
                    prefix={
                      <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    onFocus={this.props.foucusImportInput}
                    type="password"
                    size="small"
                    placeholder="请输入登录密码"
                    style={{ width: "200px" }}
                    onChange={this.props.loginPwd}
                  />
                </FormItem>
              </Col>
              <Col span={4} />
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default LoginGravity;
