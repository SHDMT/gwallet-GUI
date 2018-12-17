import React, { Component } from "react";
import pulse from "../../tools/pulse";

class InfoLabel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mci: 0,
      height: 0
    };

    this.updateBlockchainInfoFunc = (res) => {
      if (res.status === 500) {
        console.log("ERROR:", res.data);
        return;
      }
      this.setState({
        mci: res.data.currentMCI,
        height: res.data.currentHeight
      });
    }
  }

  componentDidMount() {
    pulse.addPulseListener("blockchaininfopulse", this.updateBlockchainInfoFunc);
  }

  componentWillUnmount() {
    clearInterval(this.intervalObj);
    pulse.removePulseListener("blockchaininfopulse", this.updateBlockchainInfoFunc)
  }

  render() {
    return (
      <ul className="blockchain-info-label text-style-small">
        <li className="blockchain-info-label-mci">
          主链索引: <span>{this.state.mci}</span>
        </li>
        <li className="blockchain-info-label-height">
          区块高度: <span>{this.state.height}</span>
        </li>
      </ul>
    );
  }
}

export default InfoLabel;
