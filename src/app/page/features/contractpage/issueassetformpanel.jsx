import React, { Component } from "react";
import { Input, Card, Button, message } from 'antd';
import PaymentAddrBox from '../../../component/paymentaddrbox/paymentaddrbox';
import ConfigContractBox from './configcontractbox'

import IssueConfirmModal from '../../../component/txconfirmmodal/issueconfirmmodal';
import provider from '../../../dataproviderclient';
import pipe from '../../../tools/pipe';

import "./layout.css";
const { TextArea } = Input;
class IssueAssetFormPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            assetName: "",
            assetAmount: "",
            assetUnit: "",
            assetNote: "",
            showPasswordModal: false,
            txAmount: 0,
            txFee: 0,
            isSubmitLoading: false
        }
        this.paymentAddrsValue = [];
        this.paymentAmountValue = [];
        this.sendPairs = null;
        this.totalAmount = 0;
        this.contracts = []
    }

    reset(){
        this.setState({
            assetName: "",
            assetAmount: "",
            assetUnit: "",
            assetNote: "",
            showPasswordModal: false,
            txAmount: 0,
            txFee: 0,
            isSubmitLoading: false
        });
        
        pipe.pipeInvoke("refreshtxcontrollers");
        pipe.pipeInvoke("refreshconfigcontractcontrollers");
    }

    txfee(totalAmount, sendPairs) {
        this.paymentAddrsValue = Array.from(sendPairs.keys());
        this.paymentAmountValue = Array.from(sendPairs.values());
        this.totalAmount = totalAmount;
    }

    buildIssueParams(){
        let contracts = [];
        for(let i = 0; i < this.contracts.length; i ++){
            contracts.push({
                Address: this.contracts[i].address,
                ParamsKey: this.contracts[i].paramsName,
                ParamsValue: this.contracts[i].paramsValue,
            });
        }
        let json = {
            Meta: {
                Header: {
                    App: 4,
                    Version: 1,
                    PayloadHash: ""
                },
                Name: this.state.assetName,
                Cap: parseInt(this.state.assetAmount),
                FixedDenominations: false,
                AllocationAddr: this.paymentAddrsValue,
                AllocationAmount: this.paymentAmountValue,
                Contracts: contracts
            },
            Note: this.state.assetNote
        };
        let req = {
            accountName: sessionStorage.getItem("account"),
            issueParams: JSON.stringify(json)
        }
        return req;
    }

    handleChangeAssetName(e) {
        this.setState({
            assetName: e.target.value,
            assetUnit: e.target.value
        });
    }

    handleChangeAssetAmount(e) {
        this.setState({
            assetAmount: e.target.value
        });
    }

    handleChangeAssetUnit(e) {
        this.setState({
            assetUnit: e.target.value
        });
    }

    handleChangeAssetNote(e) {
        this.setState({
            assetNote: e.target.value
        });
    }

    handleIssueAsset() {
        let req = this.buildIssueParams();
        provider.requestWithResponse("issueasset", req, res=>{
            if(res.status == 200){
                this.setState({
                    showPasswordModal: false,
                });
                message.success("资产发行成功");
                this.reset();
            }else{
                this.setState({
                    showPasswordModal: false,
                });
                message.error("发行资产失败，余额不足或交易数据出错");
                console.error(res.data);
                return;
            }
        });

        this.setState({
            showPasswordModal: false
        });
    }
    handleCancleIssueAsset(){
        this.setState({
            showPasswordModal: false
        });
    }

    handleShowIssueConfirmContractModal(){
        this.setState({
            isSubmitLoading: true
        });

        let req = this.buildIssueParams();
        provider.requestWithResponse("calcissueassetfee", req, res=>{
            if(res.status == 200){
                this.setState({
                    isSubmitLoading: false,
                    showPasswordModal: true,
                    txAmount: res.data.txBytes,
                    txFee: res.data.txBytes
                });
            }else{
                this.setState({
                    isSubmitLoading: false,
                });
                message.error("发行资产失败，余额不足或交易数据出错");
                console.error(res.data);
                return;
            }
        });
    }

    updateContract(contracts) {
        this.contracts = contracts;
    }

    render() {
        return (
            <div className="issueasset-form-panel">
                <Card
                    title="基本信息"
                    bordered={true}
                    className="issueasset-form-basic-card"
                >
                    <div className="issueasset-form-item">
                        <span className="issueasset-form-title">资产名称：</span>
                        <Input value={this.state.assetName} onChange={(e) => this.handleChangeAssetName(e)} className="issueasset-form-input" placeholder="请输入资产名称" />
                    </div>
                    <div className="issueasset-form-item">
                        <span className="issueasset-form-title">资产总额：</span>
                        <Input value={this.state.assetAmount} onChange={(e) => this.handleChangeAssetAmount(e)} className="issueasset-form-input" placeholder="请输入资产总额" />
                    </div>
                    <div className="issueasset-form-item">
                        <span className="issueasset-form-title">资产单位：</span>
                        <Input value={this.state.assetUnit} className="issueasset-form-input" placeholder="请输入资产单位" />
                    </div>
                    <div className="issueasset-form-item">
                        <span className="issueasset-form-title issueasset-form-title-note">简介：</span>
                        <TextArea value={this.state.assetNote} onChange={(e) => this.handleChangeAssetNote(e)} placeholder="请输入资产简介" rows={4} />
                    </div>
                </Card>
                <PaymentAddrBox title="资产分配" assetUnit="N"
                    txdetail={(data, sendPairs) => {
                        this.txfee(data, sendPairs);
                    }} />
                <ConfigContractBox updateContract={(contracts) => this.updateContract(contracts)} />
                <Button loading={this.state.isSubmitLoading} onClick={() => this.handleShowIssueConfirmContractModal()} className="issueasset-submit-btn" icon="bank" type="primary">发行</Button>

                <IssueConfirmModal
                    assetName={this.state.assetName}
                    assetUnitName={this.state.assetUnit}
                    assetAmount={this.state.assetAmount}
                    assetNote={this.state.assetNote}
                    contracts={this.contracts}
                    addresses={this.paymentAddrsValue}
                    amounts={this.paymentAmountValue}
                    title="交易确认"
                    txAmount={this.state.txAmount}
                    txFee={this.state.txFee}
                    assetUnit="N"
                    visible={this.state.showPasswordModal}
                    handleOK={() => this.handleIssueAsset()}
                    handleCancel={() => this.handleCancleIssueAsset()}
                />
            </div>
        );
    }
}

export default IssueAssetFormPanel;