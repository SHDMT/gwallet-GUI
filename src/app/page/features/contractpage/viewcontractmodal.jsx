import React, { Component } from "react";
import { Modal } from 'antd';

import "./layout.css";
class ViewContractModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            paramsValue: [],
            paramsName: ["Address", "Amount"],
        }
    }

    handleOK() {
        this.props.handleOK();
    }

    render() {
        if (this.props.contract != null) {
            return (
                <Modal
                    title={this.props.contract.name}
                    visible={this.props.visible}
                    onOk={() => this.handleOK()}
                    onCancel={this.props.handleCancel}
                    closable={false}
                    width={500}
                    className="viewcontract-modal"
                    cancelText="取消"
                    okText="确定"
                >
                    <div className="viewcontract-modal-item">
                        <div>
                            {this.props.contract.params.map((definition, index) =>
                                <div key={index}>{definition.key}: {definition.value}</div>
                            )}
                        </div>
                    </div>
                </Modal>
            );
        }
        return (
            <Modal
                title="无定义智能合约"
                visible={this.props.visible}
                onOk={() => this.handleOK()}
                onCancel={this.props.handleCancel}
                closable={false}
                width={500}
                className="viewcontract-modal"
                cancelText="取消"
                okText="确定"
            >
                <div className="viewcontract-modal-item">
                    无定义智能合约
                    </div>
            </Modal>
        );
    }
}

export default ViewContractModal;