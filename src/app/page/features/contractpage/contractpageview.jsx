import React, { Component } from "react";
import ContractTabs from "./contracttabs";

import "./layout.css";

class ContractPageView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="contract-area">
        <ContractTabs />
      </div>
    );
  }
}

export default ContractPageView;
