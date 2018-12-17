import React, { Component } from "react";
import BalanceCard from "./balancecard";
import { Col, Row } from "antd";
import pulse from '../../tools/pulse';

class BalanceGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assetTotal: 0,
      assetSpendable: 0
    };
    this.updateBalanceFunc = null;
  }

  componentDidMount() {
    this.updateBalanceFunc = (res)=>{
      if (res.status === 500) {
        console.log("ERROR:", res.data);
        return;
      }
      this.setState({
        assetTotal: this.toThousands(
          res.data.balances[0].balanceAsset[0].assetTotal
        ),
        assetSpendable: this.toThousands(
          res.data.balances[0].balanceAsset[0].assetSpendable
        )
      });
    }
    pulse.addPulseListener("balanceupdatepulse", this.updateBalanceFunc);
  }

  componentWillUnmount() {
    pulse.removePulseListener("balanceupdatepulse", this.updateBalanceFunc);
  }

  toThousands = function(num) {
    var result = [],
      counter = 0;
    num = (num || 0).toString().split("");
    for (var i = num.length - 1; i >= 0; i--) {
      counter++;
      result.unshift(num[i]);
      if (!(counter % 3) && i != 0) {
        result.unshift(",");
      }
    }
    return result.join("");
  };
  render() {
    return (
      <div className="balance-group">
        <Row gutter={16}>
          <Col span={12}>
            <BalanceCard
              title="账户余额"
              // balance="0"
              balance={this.state.assetTotal}
            />
          </Col>
          <Col span={12}>
            <BalanceCard
              title="可用余额"
              // balance="0"
              balance={this.state.assetSpendable}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default BalanceGroup;
