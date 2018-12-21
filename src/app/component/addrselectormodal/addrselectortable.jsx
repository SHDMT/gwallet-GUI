import React, { Component } from "react";
import { Table } from "antd";
import provider from "../../dataproviderclient";
import pipe from "../../tools/pipe";

class AddrSelectorTable extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: "姓名",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "地址",
        dataIndex: "address",
        key: "address"
      },
      {
        title: "备注",
        dataIndex: "note",
        key: "note"
      }
    ];

    this.state = {
      data: []
    };

  }

  componentDidMount(){
    pipe.pipeRegister("refreshaddressselectortable", ()=>this.refreshData());
    this.refreshData();
  }

  componentWillUnmount(){
    pipe.pipeRemove("refreshaddressselectortable", ()=>this.refreshData());
  }

  refreshData() {
    let listUserAddressesReq = {
      accountName: sessionStorage.getItem("account")
    };
    provider.requestWithResponse(
      "listcontactaddress",
      listUserAddressesReq,
      res => {
        if (res.status === 200) {
          this.setState({
            data: res.data
          });
        } else {
          console.log(res.data);
          return;
        }
      }
    );
  }
  render() {
    return (
      <div className="addrselector-table">
        <Table
          onSelectAddress={this.props.handleSelectAddress}
          rowSelection={this.props.rowSelection}
          columns={this.columns}
          dataSource={this.state.data}
          pagination={{ pageSize: 4 }}
          rowKey="id"
        />
      </div>
    );
  }
}

export default AddrSelectorTable;
