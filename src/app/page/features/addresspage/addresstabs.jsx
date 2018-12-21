import React, { Component } from "react";
import { Tabs, message, Icon, Input, InputNumber, Form } from "antd";
// import DeleteRemindModal from "../../../component/deleteremindmodal/deleteremindmodal";
import ContactTable from "./contacttable";
import AddressTable from "./addresstable";

const TabPane = Tabs.TabPane;

class AddressTabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      length: 0,
      data: "",
      editingKey: "",
      visible: false,
      id: ""
    };
  }
  componentDidMount() {}
  render() {
    return (
      <div className="card-container">
        <Tabs defaultActiveKey="1">
          <TabPane tab="通讯录" key="1">
            <ContactTable />
          </TabPane>
          <TabPane tab="我的地址" key="2">
            <AddressTable />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default AddressTabs;
