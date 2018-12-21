import React, { Component } from "react";
import { message } from "antd";
import BalanceGroup from "../../../component/balancegroup/balancegroup";
import AddressInfoCard from "./addressinfocard";
import TxTable from "../../../component/txtable/txtable";
import provider from "../../../dataproviderclient";

import "./layout.css";

class HomePageView extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div className="homepage-area">
        <BalanceGroup />
        <AddressInfoCard />
        <TxTable pagination={false} mode="recent"/>
      </div>
    );
  }
}

export default HomePageView;
