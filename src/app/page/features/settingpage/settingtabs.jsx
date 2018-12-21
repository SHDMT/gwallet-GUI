import "./layout.css";
import React, { Component } from "react";

import SecuritySetting from "./securitysetting";
import VersionInfo from "./versioninfor";
import { Tabs } from "antd";
const TabPane = Tabs.TabPane;

class SettingTabs extends Component {

  render() {
    return (
      <div className="card-container">
        <Tabs>
          <TabPane tab="安全设置" key="1">
            <SecuritySetting />
          </TabPane>
          <TabPane tab="版本信息" key="2">
            <VersionInfo />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default SettingTabs;
