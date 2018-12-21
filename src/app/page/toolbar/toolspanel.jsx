import React, { Component } from "react";
import { Tooltip, Icon } from "antd";
import provider from "../../dataproviderclient";
import NetwrokStatusModal from "../../component/networkstatusmodal/networkstatusmodal";
import MiningModal from "../../component/miningmodal/miningmodal";

class ToolsPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalState: [false, false]
    };
  }

  handleOpenModal(id) {
    let modalState = this.state.modalState;
    modalState[id] = true;
    this.setState({
      modalState: modalState
    });
  }
  handleCloseModal(id) {
    let modalState = this.state.modalState;
    modalState[id] = false;
    this.setState({
      modalState: modalState
    });
  }

  handleMiningClick(){
  }
  handleDAGExplorerClick() {
    provider.request("openblockexplorer");
  }
  handleHelpClick() {
    provider.request("openhelp");
  }
  render() {
    return (
      <ul className="tools-panel">
        {/* <Tooltip placement="bottom" title="用户信息">
          <li
            onClick={() => this.handleOpenModal(0)}
            className="tools-panel-item"
          >
            <Icon type="user" />
          </li>
        </Tooltip> */}
        <Tooltip placement="bottom" title="挖矿程序">
          <li
            onClick={() => this.handleOpenModal(0)}
            className="tools-panel-item"
          >
            <Icon type="robot" />
          </li>
        </Tooltip>

        <Tooltip placement="bottom" title="区块链浏览器">
          <li
            onClick={() => this.handleDAGExplorerClick()}
            className="tools-panel-item"
          >
            <Icon type="compass" />
          </li>
        </Tooltip>
        <Tooltip placement="bottom" title="网络状态">
          <li
            onClick={() => this.handleOpenModal(1)}
            className="tools-panel-item"
          >
            <Icon type="cloud" />
          </li>
        </Tooltip>
        {/* <Tooltip placement="bottom" title="财务统计">
                    <li onClick={() => this.handleOpenModal(2)} className="tools-panel-item"><Icon type="pie-chart" /></li>
                </Tooltip> */}
        <Tooltip placement="bottom" title="帮助">
          <li
            onClick={() => this.handleHelpClick()}
            className="tools-panel-item"
          >
            <Icon type="question-circle" />
          </li>
        </Tooltip>

        <NetwrokStatusModal
          handleOk={() => this.handleCloseModal(1)}
          title="连接节点"
          visible={this.state.modalState[1]}
        />
       
        <MiningModal
          handleOk={() => this.handleCloseModal(0)}
          title="挖矿服务器"
          visible={this.state.modalState[0]}
        />
      </ul>
    );
  }
}

export default ToolsPanel;
