import React, { Component } from "react";
import { Tabs } from "antd";
import InvokeContractPanel from './invokecontractpanel';
import IssueAssetPanel from './issueassetpanel';
import DeployContractPanel from './deploycontractpanel';

const TabPane = Tabs.TabPane;
class ContractTabs extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="card-container">
        <Tabs defaultActiveKey="1">
          <TabPane tab="运行合约" key="1">
            <InvokeContractPanel />
          </TabPane>
          <TabPane tab="发行资产" key="2">
            <IssueAssetPanel />
          </TabPane>
          <TabPane tab="部署合约" key="3">
            <DeployContractPanel />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
export default ContractTabs;
