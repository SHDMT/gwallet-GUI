import React, { Component } from "react";
import AddressTabs from "./addresstabs";
import "./layout.css";

class AddressPageView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="address-area">
        <AddressTabs />
      </div>
    );
  }
}

export default AddressPageView;
