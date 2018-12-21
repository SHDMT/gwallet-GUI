import "./layout.css";
import React, { Component } from "react";
import { message } from "antd";
import provider from "../../dataproviderclient";
// const { ipcMain, app } = require("electron");

class WalletSeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seed: ""
    };
  }
  componentDidMount() {
    provider.requestWithResponse("createwallet", {}, res => {
      if (res.status === 200) {
        this.setState(
          {
            seed: res.data
          },
          function() {
            const { seed } = this.state;
            console.log("钱包生成的种子", seed);
            this.props.getSeed(seed);
          }
        );
      } else {
        message.error("获取种子失败!");
      }
    });
  }
  render() {
    return (
      <div className="walletseed">
        <h2>
          钱<span>包</span>种子
        </h2>
        <p>
          下面展示的是钱包的种子，种子是用于恢复钱包的唯一方法。如果您不慎遗忘钱包密码
          或者钱包文件被损坏，您可以通过种子恢复钱包。钱包创建后，种子将被彻底销毁，
          任何人都无法通过操纵您的钱包获取种子。因此，请您将种子妥善记录下来，并保存到最安全的地方。
        </p>
        <p
          style={{
            width: "100%",
            height: "150px",
            border: "1px solid #c3c3c3",
            borderRadius: "6px",
            padding: "6px"
          }}
        >
          {this.state.seed}
        </p>
      </div>
    );
  }
}

export default WalletSeed;
