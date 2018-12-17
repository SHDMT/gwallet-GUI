import "./layout.css";
import React, { Component } from "react";
import { Input, Form } from "antd";
const { TextArea } = Input;
const FormItem = Form.Item;
class ImportSeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      importseed: ""
    };
  }
  handelChange(e) {
    this.setState(
      {
        importseed: e.target.value.replace(/(^\s*)|(\s*$)/g, "")
      },
      function() {
        const { importseed } = this.state;
        console.log("获取去掉空格的输入的种子", importseed);
        this.props.importSeed(importseed);
      }
    );
  }
  render() {
    let passwordErrorInfo = this.props.errorInfo[0];
    return (
      <div className="importseed">
        <h2>
          钱<span>包</span>种子
        </h2>
        <p>
          下面展示的是钱包的种子，种子是用于恢复钱包的唯一方法。如果您不慎遗忘钱包密码
          或者钱包文件被损坏，您可以通过种子恢复钱包。钱包创建后，种子将被彻底销毁，
          任何人都无法通过操纵您的钱包获取种子。因此，请您将种子妥善记录下来，并保存到最安全的地方。
        </p>
        <FormItem
          hasFeedback
          validateStatus={passwordErrorInfo.info}
          help={passwordErrorInfo.help}
        >
          <TextArea
            onFocus={this.props.foucusImportInput}
            placeholder="请输入钱包种子..."
            autosize={{ minRows: 8, maxRows: 8 }}
            onChange={this.handelChange.bind(this)}
          />
        </FormItem>
      </div>
    );
  }
}

export default ImportSeed;
