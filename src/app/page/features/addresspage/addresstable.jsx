import React, { Component } from "react";
import { message } from "antd";
import EditableTable from "../../../component/editabletable/editabletable";
import provider from "../../../dataproviderclient";

class AddressTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: undefined
    };
    this.columns = [
      {
        title: "地址",
        dataIndex: "address",
        key: "address"
      },
      {
        title: "备注",
        dataIndex: "note",
        key: "note",
        editable: true
      }
    ];
  }
  componentDidMount() {
    this.refreshData();
  }

  refreshData() {
    let listUserAddressesReq = {
      accountName: sessionStorage.getItem("account")
    };
    provider.requestWithResponse(
      "listuseraddress",
      listUserAddressesReq,
      res => {
        if (res.status === 200) {
          this.setState({ data: res.data });
        } else {
          console.log("ERROR:", res.data);
          return;
        }
      }
    );
  }

  handleUpdate(oldData, newData, updateFunc) {
    let req = {
      id: oldData.id,
      newData: newData
    };
    provider.requestWithResponse("updateuseraddressinfo", req, res => {
      if (res.status === 200) {
        message.success("修改成功!");
        updateFunc();
      } else {
        message.error("修改失败!");
        console.log("ERROR:", res.data);
        return;
      }
    });
  }
  handleDelete(data, updateFunc) {
    provider.requestWithResponse("removeuseraddress", data, res => {
      if (res.status === 200) {
        message.success("删除成功!");
        updateFunc();
      } else {
        message.error("删除失败!");
        console.log("ERROR:", res.data);
        return;
      }
    });
  }

  render() {
    if (this.state.data === undefined) {
      return null;
    } else {
      return (
        <EditableTable
          columns={this.columns}
          dataSource={this.state.data}
          rowKey="id"
          handleUpdate={(oldData, newData, updateFunc) =>
            this.handleUpdate(oldData, newData, updateFunc)
          }
          handleDelete={(data, updateFunc) =>
            this.handleDelete(data, updateFunc)
          }
        />
      );
    }
  }
}

export default AddressTable;
