import React, { Component } from "react";
import { Select } from "antd";
const Option = Select.Option;

class SelectLanguage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      status: 1
    };
  }
  handleChange(value) {
    console.log(`selected ${value}`);
  }
  render() {
    return (
      <div className="select-language">
        <div className="gravity-title">
          <span>G</span>ravity
        </div>
        <p className="loginIntro">
          欢迎使用<span>G</span>
          ravity官方钱包，下面将进行一系列初始化操作，为了您的账户安全，请按照流程耐心操作!
        </p>
        <div>
          <span className="pr_6">选择语言:</span>
          <Select
            defaultValue="chinese"
            style={{ width: 120 }}
            onChange={() => this.handleChange()}
          >
            <Option value="chinese">简体中文</Option>
            <Option value="english">English</Option>
          </Select>
        </div>
      </div>
    );
  }
}

export default SelectLanguage;
