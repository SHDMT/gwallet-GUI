import React, { Component } from "react";
import { Modal, Select, Upload, Input, Icon, message, Form } from "antd";
import provider from "../../dataproviderclient";

import "./layout.css";
const Option = Select.Option;
const FormItem = Form.Item;
class AddAccountModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previewVisible: true,
      previewImage: "",
      fileList: [],
      loading: false,
      accountName: "",
      accountType: "normal",
      accountNameStatus: "",
      accountNameHelp: ""
    };
  }

  checkAccountParams() {
    if (this.state.accountName === undefined || this.state.accountName === "") {
      this.setState({
        accountNameStatus: "error",
        accoutnNameHelp: "账户名称不能为空"
      });
      return false;
    }
    this.setState({
      accountNameStatus: "",
      accoutnNameHelp: ""
    });
    return true;
  }

  handleOK() {
    if (!this.checkAccountParams()) {
      return;
    }
    this.setState({
      previewImage: "",
      fileList: [],
      accountName: "",
      accountType: "normal",
      accountNameStatus: "",
      accountNameHelp: ""
    });
    this.props.handleOK();
    let req = {
      accountName: this.state.accountName,
      accountType: this.state.accountType === "normal" ? 0 : 1,
      accountImage:
        this.state.fileList.length === 0
          ? "./imgs/default_account_icon.png"
          : this.state.fileList[0].name
    };
    provider.requestWithResponse("addaccount", req, res => {
      if (res.status === 200) {
        message.success("添加账户成功!");
      } else {
        message.error("添加账户失败！");
        console.log("err:", res.data);
      }
    });
  }

  uploadRequest(info) {
    this.setState({ loading: true });

    let sourceFile = info.file.path;
    let fileSplit = info.file.name.split(".");
    let suffix = fileSplit[fileSplit.length - 1];
    let fileName =
      "img/" + Math.floor(Math.random() * 1000000000000000) + "." + suffix;
    let params = {
      sourceFile: sourceFile,
      targetFile: fileName
    };
    provider.requestWithResponse("copyfiletouserdata", params, res =>
      this.handleUploadedImage(res, info)
    );
  }

  handleUploadedImage(res, info) {
    if (res.status === 200) {
      info.onSuccess();
      this.state.fileList = [
        {
          uid: "0",
          name: res.data,
          status: "done",
          url: res.data
        }
      ];
      this.setState({
        fileList: this.state.fileList
      });
    } else {
      info.OnError(res.data);
    }
  }
  handleDeleteImage() {
    this.setState({
      fileList: [],
      loading: false
    });
  }

  handleChangeAccountName(e) {
    let value = e.target.value;
    this.setState({
      accountName: value
    });
  }

  handleChangeAccountType(value) {
    this.setState({
      accountType: value
    });
  }

  render() {
    return (
      <Modal
        title="新建账户"
        visible={this.props.visible}
        onOk={() => this.handleOK()}
        onCancel={this.props.handleCancel}
        closable={false}
        width={500}
        className="addaccount-modal"
        cancelText="取消"
        okText="确定"
      >
        <div className="addaccount-modal-item">
          账户名称：
          <FormItem
            hasFeedback
            validateStatus={this.state.accountNameStatus}
            help={this.state.accountNameHelp}
          >
            <Input
              style={{ width: 200 }}
              placeholder="请输入账户名称"
              onChange={e => this.handleChangeAccountName(e)}
              value={this.state.accountName}
            />
          </FormItem>
        </div>
        <div className="addaccount-modal-item">
          账户类型：
          <FormItem hasFeedback>
            <Select
              defaultValue="ecdsa"
              style={{ width: 150 }}
              value={this.state.accountType}
              onChange={e => this.handleChangeAccountType(e)}
            >
              <Option value="normal">普通账户</Option>
              <Option value="postquantum">抗量子账户</Option>
            </Select>
          </FormItem>
        </div>
        <div className="addaccount-modal-item addaccount-modal-upload">
          <Upload
            listType="picture-card"
            fileList={this.state.fileList}
            customRequest={info => this.uploadRequest(info)}
            onChange={() => this.handleDeleteImage()}
          >
            {this.state.fileList.length >= 1 ? null : (
              <Icon type={this.state.loading ? "loading" : "plus"} />
            )}
          </Upload>
        </div>
      </Modal>
    );
  }
}

export default AddAccountModal;
