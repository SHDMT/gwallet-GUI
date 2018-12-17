import React, { Component } from "react";
import pulse from "../../tools/pulse";
class NetStatusLabel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      networkLabel: <span className="networkstate-bad">离线</span>
    };

    this.updateNetStatusLabelFunc = (res) => this.updateNetStatus(res);
  }

  updateNetStatus(res) {
    if (res.status === 200) {
      let score = res.data.score;
      if (score === 0) {
        this.setState({
          networkLabel: <span className="networkstate-bad">离线</span>
        });
      } else if (score < 30) {
        this.setState({
          networkLabel: <span className="networkstate-bad">较差</span>
        });
      } else if (score >= 30 && score < 60) {
        this.setState({
          networkLabel: <span className="networkstate-medium">一般</span>
        });
      } else {
        this.setState({
          networkLabel: <span className="networkstate-good">良好</span>
        });
      }
    } else {
      console.log("ERROR:", res.data);
      this.setState({
        networkLabel: <span className="networkstate-bad">离线</span>
      });
      return;
    }
  }

  componentDidMount() {
    pulse.addPulseListener("networkstatuspulse", this.updateNetStatusLabelFunc);
  }

  componentWillUnmount() {
    pulse.removePulseListener("networkstatuspulse", this.updateNetStatusLabelFunc);
  }

  render() {
    return (
      <div className="netstatus-label text-style-small">
        <span>网络状况：{this.state.networkLabel}</span>
      </div>
    );
  }
}

export default NetStatusLabel;
