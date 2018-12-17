import React, { Component } from "react";
import { Select, Button, Card } from 'antd';
import ParamsBox from './paramsbox';
import InvokeContractConfirmModal from '../../../component/txconfirmmodal/invokeconfirmmodal';

import provider from '../../../dataproviderclient';

const Option = Select.Option;
class InvokeContractFormPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            asset: "gravity",
            contract: "transfer",
            paramsValue: [],
            paramsName: ["Address", "Amount"],
            showPasswordModal: false,
            isSubmitLoading: false,
        }
    }

    handleChangeValue(index, e) {
        this.state.paramsValue[index] = e.target.value;
        this.setState({
            paramsValue: this.state.paramsValue
        });
    }

    handleInvokeContract() {
        this.setState({
            showPasswordModal: false,
        });
        let req = {
            asset: this.state.asset,
            contract: this.state.contract,
            paramsName: this.state.paramsName,
            paramsValue: this.state.paramsValue
        }
        console.log(req);
    }
    checkParams() {
        return true;
    }
    handleShowInvokeConfirmContractModal() {
        if (this.checkParams()) {
            let req = {
                asset: this.state.asset,
                contract: this.state.contract,
                paramsName: this.state.paramsName,
                paramsValue: this.state.paramsValue
            }
            this.setState({
                isSubmitLoading: true
            });
            provider.requestWithResponse("calcinvokecontractfee", req, res => {
                if (res.status === 200) {
                    let txAmount = this.totalAmount;
                    this.setState({
                        isSubmitLoading: false,
                        showPasswordModal: true,
                        txAmount: txAmount,
                        txFee: res.data.txBytes
                    });
                } else {
                    this.setState({
                        isSubmitLoading: false,
                        showPasswordModal: true,
                        txAmount: 0,
                        txFee: 0
                    });
                    //message.error("发起交易失败，余额不足或交易数据出错");
                    console.log(res.data);
                    return;
                }
            });
        } else {
            console.log(this.state.errCode);
        }
    }

    handleCancelInvokeContract() {
        this.setState({
            showPasswordModal: false,
        });
    }

    handleChangeAsset(e) {
        this.setState({
            asset: e
        });
    }
    handleChangeContract(e) {
        this.setState({
            contract: e
        });
    }

    render() {
        return (
            <div className="invokecontract-form-panel">
                <Card
                    title="智能合约"
                    bordered={true}
                    className="invokecontract-form-basic-card"
                >
                    <div className="invokecontract-form-item">
                        <span className="invokecontract-form-title">选择资产：</span>
                        <Select
                            value={this.state.asset}
                            defaultValue="gravity"
                            onChange={e => this.handleChangeAsset(e)}
                        >
                            <Option value="gravity">Gravity</Option>
                            <Option value="elecoin">EleCoin</Option>
                            <Option value="cryptocat">CryptoCat</Option>
                        </Select>
                    </div>
                    <div className="invokecontract-form-item">
                        <span className="invokecontract-form-title">选择合约：</span>
                        <Select
                            defaultValue="tranfer"
                            value="tranfer"
                            onChange={e => this.handleChangeContract(e)}
                        >
                            <Option value="tranfer">转移资产</Option>
                            <Option value="addition">增发资产</Option>
                            <Option value="combine">合并资产</Option>
                        </Select>
                    </div>
                </Card>
                <div className="invokecontract-form-item">
                    <ParamsBox
                        handleChangeValue={(index, e) => this.handleChangeValue(index, e)}
                        title="参数列表"
                        hasTitle={true}
                        params={this.state.paramsName}
                        paramsValue={this.state.paramsValue}
                    />
                </div>
                <Button loading={this.state.isSubmitLoading} onClick={() => this.handleShowInvokeConfirmContractModal()} className="invokecontract-submit-btn" icon="thunderbolt" type="primary">执行</Button>
                <InvokeContractConfirmModal
                    asset={this.state.asset}
                    contract={this.state.contract}
                    paramsKey={this.state.paramsName}
                    paramsValue={this.state.paramsValue}
                    title="交易确认"
                    txAmount={this.state.txAmount}
                    txFee={this.state.txFee}
                    assetUnit="N"
                    visible={this.state.showPasswordModal}
                    handleOK={() => this.handleInvokeContract()}
                    handleCancel={() => this.handleCancelInvokeContract()}
                />
            </div>
        );
    }
}

export default InvokeContractFormPanel;