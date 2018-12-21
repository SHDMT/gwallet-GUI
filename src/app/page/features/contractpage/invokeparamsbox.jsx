import React, { Component } from "react";
import { Card, Row, Col, Input } from 'antd';

import "./layout.css";
class InvokeParamsBox extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="params-box">
                <Card
                    title={this.props.title}
                    bordered={this.props.bordered}
                >
                    {this.props.params.map((id, index) =>
                        <div className="params-input" key={index}>
                            <Row className="params-input-row" gutter={0}>
                                <Col span={4}>
                                    <Input onChange={(e) => this.props.handleChangeName(index, e)} placeholder="参数名" value={id} />
                                </Col>
                                <Col span={20}>
                                    <Input onChange={(e) => this.props.handleChangeValue(index, e)} placeholder="请输入智能合约参数值" value={this.props.paramsValue[index]} />
                                </Col>
                            </Row>
                        </div>
                    )}
                </Card>
                <a href="#" onClick={() => this.props.handleUpdateParamsRow(false)}>+参数</a>&nbsp;&nbsp;&nbsp;&nbsp;
                <a href="#" onClick={() => this.props.handleUpdateParamsRow(true)}>-参数</a>
            </div>
        );

    }
}

export default InvokeParamsBox;