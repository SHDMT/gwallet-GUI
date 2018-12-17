import React, { Component } from "react";
import { Input, Card, Button } from 'antd';
import PaymentAddrBox from '../../../component/paymentaddrbox/paymentaddrbox';
import ConfigContractBox from './configcontractbox'

import IssueConfirmModal from '../../../component/txconfirmmodal/issueconfirmmodal';

import provider from "../../../dataproviderclient";
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
            txFee: 0
        }
        this.paymentAddrsValue = [];
        this.paymentAmountValue = [];
        this.sendPairs = null;
        this.totalAmount = 0;
        this.contracts = []
    }

    txfee(totalAmount, sendPairs) {
        this.paymentAddrsValue = Array.from(sendPairs.keys());
        this.paymentAmountValue = Array.from(sendPairs.values());
        this.totalAmount = totalAmount;

        let calcpaymentfeeReq = {
            accountName: sessionStorage.getItem("account"),
            addresses: this.paymentAddrsValue,
            amounts: this.paymentAmountValue
        };
        console.log(calcpaymentfeeReq)
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
        let issueAssetReq = {
            assetName: this.state.assetName,
            assetAmount: this.state.assetAmount,
            assetNote: this.state.assetNote,
            assetUnit: this.state.assetUnit,
            paymentAddrValue: this.paymentAddrsValue,
            paymentAmountValue: this.paymentAmountValue,
            totalAmount: this.totalAmount,
            contracts: this.contracts
        }
        console.log(issueAssetReq);
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
            showPasswordModal: true
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
                        <Input onChange={(e) => this.handleChangeAssetName(e)} className="issueasset-form-input" placeholder="请输入资产名称" />
                    </div>
                    <div className="issueasset-form-item">
                        <span className="issueasset-form-title">资产总额：</span>
                        <Input onChange={(e) => this.handleChangeAssetAmount(e)} className="issueasset-form-input" placeholder="请输入资产总额" />
                    </div>
                    <div className="issueasset-form-item">
                        <span className="issueasset-form-title">资产单位：</span>
                        <Input value={this.state.assetUnit} className="issueasset-form-input" placeholder="请输入资产单位" />
                    </div>
                    <div className="issueasset-form-item">
                        <span className="issueasset-form-title issueasset-form-title-note">简介：</span>
                        <TextArea onChange={(e) => this.handleChangeAssetNote(e)} placeholder="请输入资产简介" rows={4} />
                    </div>
                </Card>
                <PaymentAddrBox title="资产分配" assetUnit="N"
                    txdetail={(data, sendPairs) => {
                        this.txfee(data, sendPairs);
                    }} />
                <ConfigContractBox updateContract={(contracts) => this.updateContract(contracts)} />
                <Button onClick={() => this.handleShowIssueConfirmContractModal()} className="issueasset-submit-btn" icon="bank" type="primary">发行</Button>

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