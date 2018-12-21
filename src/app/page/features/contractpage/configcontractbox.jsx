import React, { Component } from "react";
import { Card, Icon, Popconfirm, Spin } from 'antd';
import EditContractModal from './editcontractmodal';
import ViewContractModal from './viewcontractmodal';

import provider from '../../../dataproviderclient';
import pipe from '../../../tools/pipe';

import "./layout.css";
class ConfigContractBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            editContractVisible: false,
            editContractMode: false,
            viewContractVisible: false,
            viewContract: null,
            editContractIndex: 0,
            editContract: {
                name: "",
                address: "",
                paramsName: [],
                paramsValue: [],
            },
            contracts: [],
            contractDefinitions: [],
            editmodalloading:true,
        };

        this.defaultContract = {};
    }

    componentDidMount(){
        this.updateContracts();
        pipe.pipeRegister("refreshconfigcontractcontrollers", () => this.reset());
    }
    componentWillUnmount(){
        pipe.pipeRemove("refreshconfigcontractcontrollers", () => this.reset());
    }
    reset(){
        this.setState({
            editContractVisible: false,
            editContractMode: false,
            viewContractVisible: false,
            viewContract: null,
            editContractIndex: 0,
            editContract: {
                name: "",
                address: "",
                paramsName: [],
                paramsValue: [],
            },
            contracts: [],
            contractDefinitions: [],
        });
    }

    updateContracts() {
        provider.requestWithResponse("getallcontracts", {}, res => {
            if (res.status == 200) {
                this.setState({
                    contracts: res.data.contracts
                });
                if (res.data.contracts.length > 0) {
                    this.defaultContract = res.data.contracts[0];
                    this.updateSelectedContract(this.defaultContract.address);
                }
            } else {
                console.log(res.data);
            }
        });
    }

    updateContraceDefinitions() {
        this.props.updateContract(this.state.contractDefinitions);
    }

    resetEditContractModal() {
        provider.requestWithResponse("contractdetail", { contractHash: this.defaultContract.address }, res => {
            if (res.status == 200) {
                let details = res.data.contractDetail;
                this.setState({
                    editContract: {
                        name: this.defaultContract.name,
                        address: this.defaultContract.address,
                        paramsName: details.paramsKey,
                        paramsValue: [],
                        paramsNote: details.paramsNote,
                        note: details.note
                    }
                });
            } else {
                console.error(res.data);
            }
        });
    }

    handleAddContrctDefinition() {
        for (let i = 0; i < this.state.contractDefinitions.length; i++) {
            if (this.state.contractDefinitions[i].name === this.state.editContract.name) {
                this.state.contractDefinitions[i].name = this.state.editContract.name;
                this.state.contractDefinitions[i].address = this.state.editContract.address;
                this.state.contractDefinitions[i].paramsName = this.state.editContract.paramsName;
                this.state.contractDefinitions[i].paramsValue = this.state.editContract.paramsValue;
                return;
            }
        }
        this.state.contractDefinitions.push({
            name: this.state.editContract.name,
            address: this.state.editContract.address,
            paramsName: this.state.editContract.paramsName,
            paramsValue: this.state.editContract.paramsValue
        });
    }

    handleSubmitEditContractModal(req) {
        if (req.mode == "edit") {
            this.state.contractDefinitions[req.index].name = this.state.editContract.name;
            this.state.contractDefinitions[req.index].address = this.state.editContract.address;
            this.state.contractDefinitions[req.index].paramsName = this.state.editContract.paramsName;
            this.state.contractDefinitions[req.index].paramsValue = this.state.editContract.paramsValue;
        } else {
            this.handleAddContrctDefinition();
        }

        this.setState({
            editContractVisible: false,
            contractDefinitions: this.state.contractDefinitions,
        });
        this.updateContraceDefinitions();
    }

    handleCancelEditContractModal() {
        this.setState({
            editContractVisible: false
        });
    }
    closeViewContract() {
        this.setState({
            viewContractVisible: false
        });
    }
    handleRemoveContract(index) {
        this.state.contractDefinitions.splice(index, 1);
        this.setState({
            contractDefinitions: this.state.contractDefinitions
        });
        this.updateContraceDefinitions();
    }

    handleOpenEditContractModal() {
        this.resetEditContractModal();
        this.setState({
            editContractVisible: true,
            editContractMode: "add",
        });
    }
    handleOpenEditContractModalWithContract(index, contract) {
        this.setState({
            editContractVisible: true,
            editContractMode: "edit",
            editContract: contract
        });
    }

    handleOpenViewContractModal(contract) {
        this.setState({
            viewContract: contract,
            viewContractVisible: true
        });
    }
    handleChangeEditContractParamsValue(index, e) {
        this.state.editContract.paramsValue[index] = e.target.value;
        this.setState({
            editContract: this.state.editContract
        });
    }

    updateSelectedContract(address) {
        provider.requestWithResponse("contractdetail", { contractHash: address }, res => {
            if (res.status == 200) {
                let details = res.data.contractDetail;
                this.state.editContract = {
                    name: details.name,
                    address: address,
                    note: details.note,
                    paramsName: details.paramsKey,
                    paramsValue: [],
                    paramsNote: details.paramsNote
                };
                this.setState({
                    editContract: this.state.editContract,
                    loading: false,
                    editmodalloading: false
                });
            } else {
                console.error(res.data);
                this.setState({
                    loading: false,
                    editmodalloading: false
                });
            }
        });
    }
    handleChangeEditContractName(e) {
        this.setState({
            editmodalloading: true,
        });
        this.updateSelectedContract(e);
    }

    findContractsByAddr(address) {
        for (let i = 0; i < this.state.contracts.length; i++) {
            let c = this.state.contracts[i];
            if (c.address === address) {
                return c;
            }
        }
    }

    render() {
        return (
            <Spin spinning={this.state.loading}>
                <div className="configcontract-box">
                    <Card
                        title="智能合约"
                        bordered={true}
                        className="configcontract-box-outer-card"
                    >
                        <Card
                            className="configcontract-box-inner-card configcontract-box-inner-card-first"
                            style={{ width: 250 }}
                        >
                            <div onClick={() => this.handleOpenEditContractModal()} className="configcontract-box-inner-add">
                                <Icon type="plus" />
                            </div>
                        </Card>

                        {this.state.contractDefinitions.map((definition, index) =>
                            <Card
                                key={index}
                                className="configcontract-box-inner-card"
                                style={{ width: 250 }}
                                title={definition.name}
                                actions={[
                                    <Icon onClick={() => this.handleOpenViewContractModal(definition)} type="eye" />,
                                    <Icon onClick={() => this.handleOpenEditContractModalWithContract(index, definition)} type="edit" />,
                                    <Popconfirm
                                        title="是否确认删除？"
                                        onConfirm={() => this.handleRemoveContract(index)}
                                        icon={<Icon type="question-circle-o"
                                            style={{ color: 'red' }}
                                        />}>
                                        <Icon type="delete" />
                                    </Popconfirm>,
                                ]}>

                                <div className="configcontract-box-inner-content">
                                    {definition.params !== undefined ? definition.params.map((param, index) => {
                                        return <div key={index}>{param.key}:{param.value}</div>
                                    }) : ""}
                                </div>
                            </Card>
                        )}
                    </Card>
                    <EditContractModal
                        loading={this.state.editmodalloading}
                        index={this.state.editContractIndex}
                        mode={this.state.editContractMode}
                        visible={this.state.editContractVisible}
                        contract={this.state.editContract}
                        contracts={this.state.contracts}
                        handleOK={(contract) => this.handleSubmitEditContractModal(contract)}
                        handleCancel={() => this.handleCancelEditContractModal()}
                        handleChangeValue={(index, e) => this.handleChangeEditContractParamsValue(index, e)}
                        handleChangeContractName={(e) => this.handleChangeEditContractName(e)}
                    />
                    <ViewContractModal
                        visible={this.state.viewContractVisible}
                        handleOK={() => this.closeViewContract()}
                        handleCancel={() => this.closeViewContract()}
                        contract={this.state.viewContract}
                    />
                </div>

            </Spin>
        );
    }
}

export default ConfigContractBox;