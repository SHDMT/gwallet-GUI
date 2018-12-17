import React, { Component } from "react";
import { Col, Row, message, Icon } from "antd";

import "./layout.css";
import "./style.css";
const props = {
  name: "file",
  action: "//jsonplaceholder.typicode.com/posts/",
  headers: {
    authorization: "authorization-text"
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} 钱包导入成功`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} 钱包导入失败.`);
    }
  }
};
class SetAndReWallet extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="createwallet-panel">
        <div className="createwallet-panel-content">
          <Row gutter={24}>
            <Col span={3} />
            <Col span={8}>
              <div
                className="createwallet-panel-item"
                onClick={this.props.clickCreWallet}
              >
                <h1 style={{ fontSize: 60 }}>
                  <Icon type="wallet" />
                </h1>
                <h3>新建钱包</h3>
                <p>
                  创建<span>G</span>ravity数字钱包，
                  <span>G</span>ravity数字钱包可以帮助您方便地管理
                  <span>G</span>ravity账户，
                  新建钱包时需要输入密码，该密码会被用于锁定钱包。
                  <span>G</span>
                  ravity数字钱包还为您提供进行转账交易，余额查询等功能。
                </p>
              </div>
            </Col>
            <Col span={2} />
            <Col span={8}>
              <div
                className="createwallet-panel-item"
                onClick={this.props.clickReWallet}
              >
                <h1 style={{ fontSize: 60 }}>
                  <Icon type="cloud-download" />
                </h1>
                <h3>恢复钱包</h3>
                <p>
                  恢复<span>G</span>ravity数字钱包，
                  <span>G</span>
                  ravity数字钱包提供了恢复钱包功能，以方便用户便捷
                  地转移钱包账户到其他设备。当转移或登陆其他设备时，
                  用户只需提供创建钱包时分配给用户的钱包种子，即可完成
                  <span>G</span>ravity数字钱包的迁移。
                </p>
              </div>
            </Col>
            {/* <Col span={6}>
              <div
                className="createwallet-panel-item"
                onClick={this.props.clickReWallet}
              >
                <h1 style={{ fontSize: 60 }}>
                  <Icon type="download" />
                </h1>
                <h3>导入钱包</h3>
                <p>
                  导入<span>G</span>ravity数字钱包，
                  <span>G</span>
                  ravity数字钱包提供了导入钱包功能，以方便用户便捷
                  地转移钱包账户到其他设备。当转移或登陆其他设备时，
                  用户只需提供创建钱包时分配给用户的钱包种子，即可完成
                  <span>G</span>ravity数字钱包的迁移。
                </p>
              </div>
            </Col> */}
            <Col span={3} />
          </Row>
        </div>
        {/* <Row>
          <Col span={24}>
            <Card
              title={<span onClick={this.props.clickCreWallet}>创建钱包</span>}
              bordered={false}
            >
              <p>
                创建<span>G</span>ravity数字钱包，
                <span>G</span>ravity数字钱包可以帮助您方便地管理
                <span>G</span>ravity账户，
                新建钱包时需要输入密码，该密码会被用于锁定钱包。
                <span>G</span>
                ravity数字钱包还为您提供进行转账交易，余额查询等功能。
                我们会随机生成用于产生和恢复钱包的种子并呈现给您。请您务必保
                管好
                <span>G</span>ravity钱包的密码和种子。
              </p>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Card
              title={<span onClick={this.props.clickReWallet}>恢复钱包</span>}
              bordered={false}
            >
              <p>
                恢复<span>G</span>ravity数字钱包，
                <span>G</span>
                ravity数字钱包提供了恢复钱包功能，以方便用户便捷
                地转移钱包账户到其他设备。当转移或登陆其他设备时，
                用户只需提供创建钱包时分配给用户的钱包种子，即可完成
                <span>G</span>ravity数字钱包的迁移。
              </p>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Card
              title={
                <div>
                  <span onClick={this.props.clickReWallet}></span>
                  <Upload {...props}>
                    <Button>
                      <Icon type="upload" />
                      导入钱包
                    </Button>
                  </Upload>
                </div>
              }
              bordered={false}
            >
              <p>
                导入<span>G</span>ravity数字钱包，
                <span>G</span>
                ravity数字钱包提供了导入钱包功能，以方便用户便捷
                地转移钱包账户到其他设备。当转移或登陆其他设备时，
                用户只需提供创建钱包时分配给用户的钱包种子，即可完成
                <span>G</span>ravity数字钱包的迁移。
              </p>
            </Card>
          </Col>
        </Row> */}
      </div>
    );
  }
}

export default SetAndReWallet;
