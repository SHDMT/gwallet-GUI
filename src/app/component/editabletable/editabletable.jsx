import React from "react";
import { Table, Input, InputNumber, Popconfirm, Form } from "antd";

import "./layout.css";

const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
  getInput = () => {
    if (this.props.inputType === "number") {
      return <InputNumber />;
    }
    return <Input />;
  };

  render() {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      ...restProps
    } = this.props;
    return (
      <EditableContext.Consumer>
        {form => {
          const { getFieldDecorator } = form;
          return (
            <td {...restProps}>
              {editing ? (
                <FormItem style={{ margin: 0 }}>
                  {getFieldDecorator(dataIndex, {
                    rules: [
                      {
                        required: true,
                        message: `Please Input ${title}!`
                      }
                    ],
                    initialValue: record[dataIndex]
                  })(this.getInput())}
                </FormItem>
              ) : (
                restProps.children
              )}
            </td>
          );
        }}
      </EditableContext.Consumer>
    );
  }
}

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: this.props.dataSource, editingKey: "" };
    this.columns = this.props.columns;
    this.columns.push({
      title: "操作",
      dataIndex: "operation",
      render: (text, record) => {
        const editable = this.isEditing(record);
        return (
          <div>
            {editable ? (
              <span>
                <EditableContext.Consumer>
                  {form => (
                    <a
                      href="javascript:;"
                      onClick={() => this.save(form, record)}
                      style={{ marginRight: 8 }}
                    >
                      保存
                    </a>
                  )}
                </EditableContext.Consumer>
                <Popconfirm
                  title="是否确认取消?"
                  okText="确定"
                  cancelText="取消"
                  onConfirm={() => this.cancel(record.id)}
                >
                  <a>取消</a>
                </Popconfirm>
              </span>
            ) : (
              <a onClick={() => this.edit(record.id)}>修改</a>
            )}{" "}
            &nbsp;/&nbsp;
            {this.state.data.length >= 1 ? (
              <Popconfirm
                title="是否确认删除?"
                okText="确定"
                cancelText="取消"
                onConfirm={() => this.handleDelete(record)}
              >
                <a href="javascript:;">删除</a>
              </Popconfirm>
            ) : null}
          </div>
        );
      }
    });
  }

  handleAdd(){
    this.props.handleAdd((newData)=>{
      this.state.data.push(newData);

      this.setState({ data: this.state.data});
    });
  }
  handleDelete = record => {
    console.log("record:", record);
    const data = [...this.state.data];
    this.props.handleDelete(record, () => {
      this.setState({ data: data.filter(item => item.id !== record.id) });
    });
  };

  isEditing = record => {
    return record.id === this.state.editingKey;
  };

  edit(key) {
    this.setState({ editingKey: key });
  }

  add(record) {
    const data = [...this.state.data, record];
    this.props.handleDelete(record, () => {
      this.setState({ data: data });
    });
  }

  save(form, key) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const newData = [...this.state.data];
      const index = newData.findIndex(item => key.id === item.id);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row
        });
        this.props.handleUpdate(item, row, () => {
          this.setState({ data: newData, editingKey: "" });
        });
      } else {
        newData.push(row);
        this.setState({ data: newData, editingKey: "" });
      }
    });
  }

  cancel = () => {
    this.setState({ editingKey: "" });
  };

  render() {

    let link = (<a className="editable-table-add-link"
    onClick={() => this.handleAdd()}
    >{this.props.addRowLabel}
    </a>);
    if(this.state.data.length){
    link = <a className="editable-table-add-link"
      onClick={() => this.handleAdd()}
      style={{position:"relative", bottom:50}}
      >{this.props.addRowLabel}
      </a>
    }
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell
      }
    };

    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: "text",
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record)
        })
      };
    });
    return (
      <div className="editable-table">
        <Table
          components={components}
          bordered
          dataSource={this.state.data}
          columns={columns}
          rowClassName="editable-row"
          rowKey={this.props.rowKey}
        />
          {link}
      </div>
    );
  }
}

export default EditableTable;
