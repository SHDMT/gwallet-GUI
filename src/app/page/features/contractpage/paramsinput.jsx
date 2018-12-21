import React, { Component } from "react";
import { Row, Col, Button, Input } from "antd";

class ParamsInput extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="params-input">
        <Row className="params-input-row" gutter={0}>
          <Col span={22}>
            <span className="params-input-key">{this.props.paramName}：</span>
            <Input onChange={this.props.handleChangeValue} placeholder="请输入智能合约参数" value={this.props.paramValue}/>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ParamsInput;
