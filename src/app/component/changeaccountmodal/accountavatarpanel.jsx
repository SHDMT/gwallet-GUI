import React, { Component } from "react";
import { Avatar, Badge } from "antd";

import "./layout.css";
class AccountAvatarPanel extends Component {
  constructor(props) {
    super(props);
  }
  handleOK() {
    this.props.handleOK();
  }


  render() {
    return (
      <div className="accountavatar-panel">
        <Badge
          status={this.props.selected ? "success" : ""}
          dot={this.props.selected}
          offset={[0, 30]}
        >
          <Avatar src={this.props.accountImg} />
        </Badge>
        <div className="accountavatar-accountname">
          {this.props.accountName}
        </div>
      </div>
    );
  }
}

export default AccountAvatarPanel;
