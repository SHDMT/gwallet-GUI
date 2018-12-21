import React, { Component } from "react";
import { message } from "antd";
import EditableTable from "../../../component/editabletable/editabletable";
import provider from "../../../dataproviderclient";
import AddContactModal from "./addcontactmodal";

class ContactTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddContactModal: false
    };
    this.handleAddSubmit = null;
    this.columns = [
      {
        title: "姓名",
        dataIndex: "name",
        key: "name",
        editable: true
      },
      {
        title: "地址",
        dataIndex: "address",
        key: "address",
        editable: false
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
    let listUserAddressesReq = {
      accountName: sessionStorage.getItem("account")
    };
    provider.requestWithResponse(
      "listcontactaddress",
      listUserAddressesReq,
      res => {
        if (res.status === 200) {
          this.setState({
              data: res.data,
              length: res.data.length
            });
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
      address: oldData.address,
      newData: newData
    };
    console.log("old:", oldData);
    provider.requestWithResponse("updatecontactaddress", req, res => {
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
    console.log("old:", data);
    provider.requestWithResponse("deletecontactaddress", data, res => {
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
  handleAdd(updateFunc) {
    this.handleAddSubmit = updateFunc
    this.setState({
      showAddContactModal: true
    });
  }
  handleAddContactOK(newData) {
    this.setState({
      showAddContactModal: false
    });
    provider.requestWithResponse("addcontactaddress", newData, res => {
      if (res.status === 200) {
        this.handleAddSubmit(res.data);
        message.success("添加成功!");
      } else {
        message.error("添加失败!");
        console.log("ERROR:", res.data);
        return;
      }
    });
  }
  handleAddContactCancel() {
    this.setState({
      showAddContactModal: false
    });
  }

  render() {
    if (this.state.data === undefined) {
      return null;
    } else {
      return (
        <div>
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
            addRowLabel="+ 新联系人"
            handleAdd={(updateFunc) => this.handleAdd(updateFunc)}
          />
          <AddContactModal
            visible={this.state.showAddContactModal}
            handleOk={newData => this.handleAddContactOK(newData)}
            handleCancel={() => this.handleAddContactCancel()}
          />
        </div>
      );
    }
  }
}

export default ContactTable;
