import React, { Component } from "react";
import { Modal, Button, Row, Col, Input, Form, Icon } from "antd";
import "./layout.css";
const FormItem = Form.Item;
class ChangePasswordModal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let passwordErrorInfo = this.props.errorInfo[0];
    let newPasswordErrorInfo = this.props.errorInfo[1];
    let surePasswordErrorInfo = this.props.errorInfo[2];
    return (
      <Modal
        title="修改密码"
        visible={this.props.visible}
        onOk={this.props.handleOk}
        onCancel={this.props.handleCancel}
        closable={false}
        cancelText="取消"
        okText="确定"
      >
        <div className="changepwdmodal">
          <Row>
            <Col span={4} className="gutter-row">
              原密码：
            </Col>
            <Col span={18}>
              <div className="gutter-box">
                <FormItem
                  hasFeedback
                  validateStatus={passwordErrorInfo.info}
                  help={passwordErrorInfo.help}
                >
                  <Input
                    type="password"
                    onFocus={this.props.foucusResetInput}
                    prefix={
                      <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="请输入原密码"
                    size="small"
                    onChange={this.props.originPsd}
                    value={this.props.originpsdvalue}
                  />
                </FormItem>
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={4} className="gutter-row">
              新密码：
            </Col>
            <Col span={18}>
              <div className="gutter-box">
                <FormItem
                  hasFeedback
                  validateStatus={newPasswordErrorInfo.info}
                  help={newPasswordErrorInfo.help}
                >
                  <Input
                    type="password"
                    onFocus={this.props.foucusResetInput}
                    prefix={
                      <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="请输入新密码"
                    size="small"
                    onChange={this.props.newPsd}
                    value={this.props.newpsdvalue}
                  />
                </FormItem>
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={4} className="gutter-row">
              确认密码：
            </Col>
            <Col span={18}>
              <div className="gutter-box">
                <FormItem
                  hasFeedback
                  validateStatus={surePasswordErrorInfo.info}
                  help={surePasswordErrorInfo.help}
                >
                  <Input
                    type="password"
                    onFocus={this.props.foucusResetInput}
                    prefix={
                      <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="请再次输入新密码"
                    size="small"
                    onChange={this.props.sureNewPsd}
                    value={this.props.surenewpsdvalue}
                  />
                </FormItem>
              </div>
            </Col>
          </Row>
        </div>
      </Modal>
    );
  }
}

export default ChangePasswordModal;
