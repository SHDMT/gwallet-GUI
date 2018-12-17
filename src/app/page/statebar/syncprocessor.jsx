import React, { Component } from "react";
import { Progress } from "antd";
import pulse from "../../tools/pulse";

class SyncProcessor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0
    };

    this.updateSyncProcessorFunc = (res) => {
      if (res.status === 500) {
        console.log("ERROR:", res.data);
        return;
      }
      this.setState({
        value: res.data
      });
    }
  }

  componentDidMount() {
    pulse.addPulseListener("syncprogresspulse", this.updateSyncProcessorFunc);
  }

  componentWillUnmount() {
    pulse.removePulseListener("syncprogresspulse", this.updateSyncProcessorFunc);
  }

  render() {
    return (
      <div className="sync-processor">
        <Progress status="active" percent={this.state.value} size="small" />
      </div>
    );
  }
}

export default SyncProcessor;
