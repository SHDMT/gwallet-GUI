import React, { Component } from "react";
import { Card, Input, Button, Col, Row, message } from "antd";
import provider from "../../../dataproviderclient";
import pipe from "../../../tools/pipe";

class AddressInfoCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      copying: false,
      gettingNewAddr: false,
      visible: false
    };
  }

  componentDidMount() {
    pipe.pipeRegister("refreshhomepageaddress", ()=>this.updateAddress());
    this.updateAddress();
  }
  componentWillUnmount(){
    pipe.pipeRemove("refreshhomepageaddress", ()=>this.updateAddress());
  }

  updateAddress(callback) {
    provider.requestWithResponse("getnewaddress", { account: sessionStorage.getItem("account") }, (res) => {
      if (res.status === 200) {
        this.setState({
          address: res.data.address
        });
      }else{
        message.error("获取地址失败!");
      }
      if (callback != null) {
        callback();
      }
    });
  }

  handleCopy() {
    this.setState({
      copying: true
    });
    setTimeout(() => {
      provider.requestWithResponse("copytoclipboard", { text: this.state.address }, (res) => {
        if (res.status === 200) {
          message.success("地址复制成功!");
        } else {
          message.error("地址复制失败!");
        }
        this.setState({
          copying: false
        });
        }
      );
    }, 200);
  }

  handleGetNewAddr() {
    this.setState({
      gettingNewAddr: true
    });
    setTimeout(() => {
      this.updateAddress(() => {
        this.setState({
          gettingNewAddr: false
        });
      });
    }, 200);
  }
  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleCancel(e) {
    this.setState({
      visible: false
    });
  }
  handleOK(e) {
    console.log(e);
    this.setState({
      visible: false
    });
  }
  render() {
    return (
      <div className="addressinfo-container">
        <Card
          className="addressinfo-card"
          title={<span onClick={this.showModal}>账户信息</span>}
        >
          <Row gutter={16}>
            <Col span={20}>
              <Input placeholder="您的地址" value={this.state.address} />
            </Col>
            <Col className="addressinfo-control" span={4}>
              <Button
                onClick={() => this.handleCopy()}
                className="addressinfo-control-btn"
                shape="circle"
                icon="copy"
                loading={this.state.copying}
              />
              <Button
                onClick={() => this.handleGetNewAddr()}
                className="addressinfo-control-btn"
                type="primary"
                shape="circle"
                icon="redo"
                loading={this.state.gettingNewAddr}
              />
            </Col>
          </Row>
        </Card>
      </div>
    );
  }
}

export default AddressInfoCard;
