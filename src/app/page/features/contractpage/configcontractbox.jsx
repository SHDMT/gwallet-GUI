import React, { Component } from "react";
import { Card, Icon, Popconfirm } from 'antd';
import EditContractModal from './editcontractmodal';
import ViewContractModal from './viewcontractmodal';

import pipe from '../../../tools/pipe';

import "./layout.css";
class ConfigContractBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editContractVisible: false,
            editContractMode: false,
            viewContractVisible: false,
            viewContract: null,
            editContractIndex: 0,
            editContract: {
                name: "transfer",
                params: [
                    {key:"Address", value:""},
                    {key:"Amount", value:""},
                ],
            },

            contractDefinitions: [
            //     {
            //     name: "transfer",
            //     params: []
            // }, {
            //     name: "addition",
            //     params: [
            //         { key: "author", value: "123123123" }
            //     ]
            // }
            ]
        };
    }

    updateContraceDefinitions(){
        this.props.updateContract(this.state.contractDefinitions);
    }
    resetEditContractModal(){
        this.setState({
            editContract: {
            name: "transfer",
            params: [
                {key:"Address", value:""},
                {key:"Amount", value:""},
            ],
        }});
    }
    handleSubmitEditContractModal(req) {
        
        if(req.mode == "edit"){
            this.state.contractDefinitions[req.index].name = this.state.editContract.name;
            this.state.contractDefinitions[req.index].params = this.state.editContract.params;
        }else{
            this.state.contractDefinitions.push({
                name: this.state.editContract.name,
                params: this.state.editContract.params
            });
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
    closeViewContract(){
        this.setState({
            viewContractVisible: false
        });
    }
    handleRemoveContract(index){
        this.state.contractDefinitions.splice(index, 1);
        this.setState({
            contractDefinitions:this.state.contractDefinitions
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
    handleOpenEditContractModalWithContract(index, contract){
        this.setState({
            editContractVisible: true,
            editContractMode: "edit",
            editContract: contract
        });
    }

    handleOpenViewContractModal(contract){
        this.setState({
            viewContract: contract,
            viewContractVisible: true
        });
    }
    handleChangeEditContractParamsValue(index, e){
        this.state.editContract.params[index].value = e.target.value;
        this.setState({
            editContract: this.state.editContract
        });
    }
    handleChangeEditContractName(e){
        this.state.editContract.name = e;
        this.setState({
            editContract: this.state.editContract
        });
    }

    render() {
        return (
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
                            <Icon onClick={()=>this.handleOpenViewContractModal(definition)} type="eye" />, 
                            <Icon onClick={()=>this.handleOpenEditContractModalWithContract(index, definition)} type="edit" />, 
                            <Popconfirm 
                                title="是否确认删除？" 
                                onConfirm={()=>this.handleRemoveContract(index)} 
                                icon={<Icon type="question-circle-o" 
                                style={{ color: 'red' }} 
                                />}>
                                <Icon type="delete" />
                            </Popconfirm>,
                            ]}>
                        
                            <div className="configcontract-box-inner-content">
                                {definition.params.map((param, index) =>{
                                    return <div key={index}>{param.key}:{param.value}</div>
                                })}
                            </div>
                        </Card>
                    )}
                </Card>
                <EditContractModal
                    index={this.state.editContractIndex}
                    mode={this.state.editContractMode}
                    visible={this.state.editContractVisible}
                    contract={this.state.editContract}
                    handleOK={(contract) => this.handleSubmitEditContractModal(contract)}
                    handleCancel={() => this.handleCancelEditContractModal()}
                    handleChangeValue={(index, e)=> this.handleChangeEditContractParamsValue(index, e)}
                    handleChangeContractName={(e) => this.handleChangeEditContractName(e)}
                />
                <ViewContractModal
                    visible={this.state.viewContractVisible}
                    handleOK={() => this.closeViewContract()}
                    handleCancel={() => this.closeViewContract()}
                    contract={this.state.viewContract}
                />
            </div>
        );
    }
}

export default ConfigContractBox;