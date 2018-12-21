import React, { Component } from "react";
import ParmsInput from './paramsinput';
import { Card } from 'antd';

import "./layout.css";
class ParamsBox extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.hasTitle == true) {
            return (
                <div className="params-box">
                    <Card
                        title={this.props.title}
                        bordered={this.props.bordered}
                    >
                        {this.props.params.map((id, index) =>
                            <ParmsInput
                                key={index}
                                paramName={id}
                                paramValue={this.props.paramsValue[index]}
                                handleChangeValue={(e) => this.props.handleChangeValue(index, e)}
                            />
                        )}
                    </Card>
                </div>
            );
        } else {
            return (
                <div className="params-box">
                    {this.props.params.map((id, index) =>
                        <ParmsInput
                            key={index}
                            paramName={id}
                            paramValue={this.props.paramsValue[index]}
                            handleChangeValue={(e) => this.props.handleChangeValue(index, e)}
                        />
                    )}
                </div>
            );
        }

    }
}

export default ParamsBox;