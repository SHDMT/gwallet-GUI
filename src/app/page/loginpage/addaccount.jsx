import "./layout.css";
import React, { Component } from "react";
import { Input, Icon, Select } from "antd";

const Option = Select.Option;

class AddAccount extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h2>
          添加<span>账</span>户
        </h2>
        <div>
          <span>钱包密码:</span>
          <Select
            defaultValue="speaccount"
            style={{ width: 200 }}
            onChange={() => this.handleChange()}
          >
            <Option value="speaccount">抗量子账户</Option>
            <Option value="noraccount">普通账户</Option>
          </Select>
        </div>
        <div>
          <span>账户名称:</span>
          <Input
            size="small"
            placeholder="请填写账户名称"
            style={{ width: "200px" }}
          />
        </div>
        <div>
          <span>账户头像:</span>
          <Icon type="user" />
        </div>
      </div>
    );
  }
}

export default AddAccount;
