import React, { Component } from "react";
import { message, Row, Col } from "antd";
import provider from "../../../dataproviderclient";

class VersionInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    console.log("获取版本信息：========");
    provider.requestWithResponse("getversioninfo", {}, res => {
      console.log("获取版本信息：", res);
      if (res.status == 200) {
        this.setState({
          coreVersion: res.data.coreVersion.version,
          netType: res.data.coreVersion.netType,
          gwalletVersion: res.data.walletVersion.gwalletVersion
        });
      } else {
        message.error("ERROR:" + res.data);
        return;
      }
    });
  }
  render() {
    return (
      <div>
        <Row gutter={16} style={{ paddingBottom: "6px" }}>
          <Col span={6}>
            <span>网络：</span>
            <span>{this.state.netType === 1 ? "主网" : "其他"}</span>
          </Col>
        </Row>
        <Row gutter={16} style={{ paddingBottom: "6px" }}>
          <Col span={6}>
            <span>Core版本：</span>
            <span>v{this.state.coreVersion}.0</span>
          </Col>
        </Row>
        <Row gutter={16} style={{ paddingBottom: "6px" }}>
          <Col span={6}>
            <span>Wallet版本：</span>
            <span>v{this.state.gwalletVersion}.0</span>
          </Col>
        </Row>
        <Row gutter={16} style={{ paddingBottom: "6px" }}>
          <Col span={6}>
            <span>GUI版本：</span>
            <span>v1.0</span>
          </Col>
        </Row>
      </div>
    );
  }
}

export default VersionInfo;
