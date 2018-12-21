import React, { Component } from "react";
import { Modal, Button, Table } from "antd";
import provider from "../../dataproviderclient";
class NetworkStatusModal extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: "IP",
        dataIndex: "IP",
        key: "IP"
      },
      {
        title: "port",
        dataIndex: "port",
        key: "port"
      }
    ];
    this.state = {
      peers: ""
    };
  }
  componentDidMount() {
    provider.requestWithResponse("getpeerlist", {}, res => {
      if (res.status === 500) {
        console.log("ERROR:", res.data);
        return;
      }
      this.setState({
        peers: res.data
      });
    });
  }

  render() {
    return (
      <Modal
        title={this.props.title}
        visible={this.props.visible}
        closable={false}
        onCancel={this.props.handleOk}
        footer={[
          <Button key="OK" type="primary" onClick={this.props.handleOk}>
            确定
          </Button>
        ]}
      >
        <Table
          rowKey={record => record.IP}
          columns={this.columns}
          dataSource={this.state.peers.peers}
          pagination={{ pageSize: 4 }}
        />
      </Modal>
    );
  }
}

export default NetworkStatusModal;
