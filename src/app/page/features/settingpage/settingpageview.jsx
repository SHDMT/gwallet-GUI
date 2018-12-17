import React, { Component } from "react";
import provider from "../../../dataproviderclient";
import SettingTabs from "./settingtabs";

class SettingPageView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      content: ""
    };
  }

  handleListAddrClick() {
    let params = {
      accountName: "default",
      text: "Hello World"
    };

    provider.requestWithResponse("sendtext", params, res => {
      console.log(res);
      if (res.status === 500) {
        // message.error("交易发送失败");
        console.log("ERROR:", res.data);
        return;
      }

      this.setState({
        data: res.data
      });
    });
  }

  handleAddAddrClick() {
    let params = {
      name: "New name11",
      address: "123123123123123",
      note: "no note"
    };
    provider.requestWithResponse("getnewaddress", params, res => {
      console.log(res);
      if (res.status === 500) {
        // message.error("获得地址失败");
        console.log("ERROR:", res.data);
        return;
      }
    });
  }

  render() {
    return (
      <div className="setting-area">
        <SettingTabs />
      </div>
    );
  }
}

export default SettingPageView;
