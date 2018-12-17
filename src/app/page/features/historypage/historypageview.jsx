import React, { Component } from "react";
import TxTable from "../../../component/txtable/txtable";

class HistoryPageView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ""
    };
  }

  render() {
    return (
      <div>
        <TxTable
          pagination={{ pageSize: 13, size: "small" }}
          mode="history"
        />
      </div>
    );
  }
}

export default HistoryPageView;
