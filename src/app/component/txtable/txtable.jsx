import React, { Component } from "react";
import { Table, Spin } from "antd";
import TxDetailModal from "../txdetailmodal/txdetailmodal";
import pulse from "../../tools/pulse";

class TxTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      loading: true,
      listtxdata: { transactions: [] }
    };

    this.updateTxFunc = (res) => {
      if (res.status === 500) {
        console.log(res.data);
        return;
      }
      this.setState({
        listtxdata: res.data,
        loading: false
      });
    };
  }

  showModal = tx => {
    this.setState(
      {
        visible: true,
        txDetails: tx
      },
      function() {
        console.log("交易详情:", this.state.txDetails);
      }
    );
  };

  handleCancel(e) {
    this.setState({
      visible: false
    });
  }
  handleOK(e) {
    console.log(e);
    this.setState({
      visible: false
    });
  }


  componentDidMount() {
    if(this.props.mode === "recent"){
      pulse.addPulseListener("recenttxpulse", this.updateTxFunc);
    }else{
      pulse.addPulseListener("txhistorypulse", this.updateTxFunc);
    }

  }

  componentWillUnmount() {
    if(this.props.mode === "recent"){
      pulse.removePulseListener("recenttxpulse", this.updateTxFunc);
    }else{
      pulse.removePulseListener("txhistorypulse", this.updateTxFunc);
    }
  }

  render() {
    const columns = [
      {
        title: "时间",
        dataIndex: "timeStamps",
        key: "time",
        render: text => {
          return (
            <span>
              {new Date(parseInt(text) * 1000)
                .toLocaleString()
                .replace(/:\d{1,2}$/, " ")}
            </span>
          );
        }
      },
      {
        title: "unit",
        dataIndex: "unitHash",
        key: "address"
      },
      {
        title: "收支",
        dataIndex: "balance",
        key: "balance",
        render: (text, record) => (
          <span
            className={
              text < 0 ? "recordbalance outcome" : "recordbalance income"
            }
          >
            {text}
          </span>
        )
      },
      {
        title: "交易费",
        dataIndex: "fee",
        key: "fee"
      },
      {
        title: "操作",
        key: "action",
        render: (text, record) => (
          <a onClick={() => this.showModal(record)}>查看</a>
        )
      }
    ];

    return (
      <div className="recenttx-table">
        <Spin spinning={this.state.loading} delay={500}>
          <Table
            rowKey={record => record.blockHeight}
            columns={columns}
            dataSource={this.state.listtxdata.transations}
            pagination={this.props.pagination}
          />
        </Spin>
        <TxDetailModal
          visible={this.state.visible}
          handleOK={() => this.handleOK()}
          handleCancel={() => this.handleCancel()}
          txDetails={this.state.txDetails}
        />
      </div>
    );
  }
}

export default TxTable;
