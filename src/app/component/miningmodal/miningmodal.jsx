import React, { Component } from "react";
import { Button, Input, Form, Modal, Icon, message } from "antd";
import provider from "../../dataproviderclient";

let FormItem = Form.Item;
class MiningModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      server: "",
      validateStatus: "",
      validateHelp: ""
    };
  }

  
  componentDidMount() {
    provider.requestWithResponse("getminingserver", null, (res)=>{
      this.state.server=res.data[0].value;
    });
  }

  handleIpChange(value) {
    this.setState({
      server: value
    });
  }

  handleLogin(){
    provider.requestWithResponse("openminingserver", {url: this.state.server}, (res)=>{
      if(res.status == 500){
        message.error("启动挖矿程序失败，请输入正确服务器地址");
      }
      this.props.handleOk();
    });
  }

  render() {
    return (
      <Modal
        title={this.props.title}
        visible={this.props.visible}
        closable={false}
        onCancel={this.props.handleOk}
        footer={[
          <Button key="OK" type="primary" onClick={()=>this.handleLogin()}>
            登陆
          </Button>
        ]}
      >
        <div className="card-container">
          <FormItem
            hasFeedback
            validateStatus={this.state.validateStatus}
            help={this.state.validateHelp}
            style={{ marginBottom: "0px" }}
          >
            <Input
              value={this.state.server}
              prefix={<Icon type="global" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="text"
              placeholder="请输入挖矿服务器地址"
              onChange={e => {
                this.handleIpChange(e.target.value);
              }}
            />
          </FormItem>
        </div>
      </Modal>
    );
  }
}

export default MiningModal;
