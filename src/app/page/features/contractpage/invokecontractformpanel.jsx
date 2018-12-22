import React, { Component } from "react";
import { Select, Button, Card, Spin, message } from 'antd';
import InvokeParamsBox from './invokeparamsbox';
import InvokeContractConfirmModal from '../../../component/txconfirmmodal/invokeconfirmmodal';

import provider from '../../../dataproviderclient';
import pulse from '../../../tools/pulse';

const Option = Select.Option;
class InvokeContractFormPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            asset: "",
            assetName: "",
            contract: "",
            paramsValue: [],
            paramsName: ["Address", "Amount"],
            globalParamsValue: [],
            globalParamsName: [],
            showPasswordModal: false,
            isSubmitLoading: false,

            spendableAsset: 0,
            contracts: [],
            assetNames: [],
            assetHashes: [],

            loading: true
        }
    }
    componentDidMount() {
        this.updateAssets();
        this.updateBalanceFunc = (res) => this.doUpdateBalance(res);
        this.updateAssetFunc = (res)=>this.doUpdateAssetPulse(res);
        pulse.addPulseListener("assetbalanceupdatepulse", this.updateBalanceFunc);
        pulse.addPulseListener("assetupdatepulse", this.updateAssetFunc);
    }

    componentWillUnmount() {
        pulse.removePulseListener("assetbalanceupdatepulse", this.updateBalanceFunc);
        pulse.removePulseListener("assetupdatepulse", this.updateAssetFunc);
    }

    reset(){
        this.setState({
            paramsValue: [],
            paramsName: ["Address", "Amount"],
            globalParamsValue: [],
            globalParamsName: [],
            showPasswordModal: false,
            isSubmitLoading: false,
        });
    }

    doUpdateBalance(res){
        let asset = sessionStorage.getItem("asset");
        if (res.status === 500) {
            this.setState({
                assetName: asset,
                spendableAsset: 0
            });
            console.log("WARN:", res.data);
            return;
        }
        this.setState({
            assetName: asset,
            spendableAsset: res.data.balances[0].balanceAsset[0].assetSpendable
        });
    }
    doUpdateAssetPulse(res) {
        if (res.status == 200) {
            let assets = res.data.asset;
            this.state.assetNames = [];
            this.state.assetHashes = [];
            for (let key in assets) {
                this.state.assetNames.push(key);
                this.state.assetHashes.push(assets[key]);
            }
        } else {
            console.log(res.data);
        }
    }

    handleChangeValue(target, index, e) {
        if (target === "output") {
            this.state.paramsValue[index] = e.target.value;
            this.setState({
                paramsValue: this.state.paramsValue
            });
        } else {
            this.state.globalParamsValue[index] = e.target.value;
            this.setState({
                globalParamsValue: this.state.globalParamsValue
            });
        }
    }

    handleChangeName(target, index, e) {
        if (target === "output") {
            this.state.paramsName[index] = e.target.value;
            this.setState({
                paramsName: this.state.paramsName
            });
        } else {
            this.state.globalParamsName[index] = e.target.value;
            this.setState({
                globalParamsName: this.state.globalParamsName
            });
        }
    }
    handleUpdateParamsRow(target, isRemove) {
        if (target === "output") {
            if (!isRemove) {
                this.state.paramsName.push("");
                this.state.paramsValue.push("");
            } else {
                this.state.paramsName.pop();
                this.state.paramsValue.pop();
            }
        } else {
            if (!isRemove) {
                this.state.globalParamsName.push("");
                this.state.globalParamsValue.push("");
            } else {
                this.state.globalParamsName.pop();
                this.state.globalParamsValue.pop();
            }
        }

        //rerender
        this.setState({
            paramsName: this.state.paramsName,
            paramsValue: this.state.paramsValue
        });
    }

    handleInvokeContract() {
        this.setState({
            showPasswordModal: false,
        });
        let req = this.buildInvokeParams();
        provider.requestWithResponse("invokecontract", req, res => {
            if (res.status === 200) {
                this.setState({
                    showPasswordModal: false,
                });
                message.success("合约运行成功");
            } else {
                this.setState({
                    showPasswordModal: false,
                });
                message.error("发起合约失败，余额不足或交易数据出错");
                console.error(res.data);
                return;
            }
        });
    }

    checkParams() {
        return true;
    }

    buildInvokeParams() {
        let amount = 0;
        let paramsValue = [];
        let paramsName = [];
        for (let i = 0; i < this.state.paramsName.length; i++) {
            if (this.state.paramsName[i] === "Amount" && !isNaN(parseInt(this.state.paramsValue[i]))) {
                amount = parseInt(this.state.paramsValue[i]);
            }else{
                paramsValue.push(this.state.paramsValue[i]);
                paramsName.push(this.state.paramsName[i]);
            }
        }

        let json = {
            Header: {
                App: 3,
                Version: 1,
                PayloadHash: ""
            },
            Asset: this.state.asset,
            ContractAddr: this.state.contract,
            GlobalParamKey: this.state.globalParamsName,
            GlobalParamValue: this.state.globalParamsValue,
            Outputs: [
                {
                    Amount: amount,
                    Extends: "",
                    OutputParamsKey: paramsName,
                    OutputParamsValue: paramsValue,
                    Restricts: []
                }
            ],
        }
        let req = {
            accountName: sessionStorage.getItem("account"),
            invokeParams: JSON.stringify(json),
            amount: amount
        };
        console.log("invoke json:", req);
        return req;
    }
    handleShowInvokeConfirmContractModal() {
        if (this.checkParams()) {
            let req = this.buildInvokeParams();
            this.setState({
                isSubmitLoading: true
            });
            provider.requestWithResponse("calcinvokecontractfee", req, res => {
                if (res.status === 200) {
                    this.setState({
                        isSubmitLoading: false,
                        showPasswordModal: true,
                        txAmount: 0,
                        txFee: res.data.txBytes
                    });
                } else {
                    this.setState({
                        isSubmitLoading: false,
                    });
                    message.error("发起合约失败，余额不足或交易数据出错");
                    console.log(res.data);
                    return;
                }
            });
        } else {
            console.log(this.state.errCode);
        }
    }

    updateContracts(selectedAsset, updated) {
        provider.requestWithResponse("getallcontractsbyasset", { assetHash: selectedAsset }, res => {
            if (res.status == 200) {
                let selectedContract = "";
                if (res.data.contracts.length > 0) {
                    selectedContract = res.data.contracts[0];
                }
                this.state.asset = selectedAsset;
                this.state.contracts = res.data.contracts;
                this.state.contract = selectedContract.address;
            } else {
                console.log(res.data);
            }
            if (updated) {
                this.setState({
                    loading: false,
                });
            }
        });
    }

    doUpdateAsset(res) {
        if (res.status == 200) {
            let assets = res.data.asset;
            this.state.assetNames = [];
            this.state.assetHashes = [];
            let index = 0;
            for (let key in assets) {
                this.state.assetNames.push(key);
                this.state.assetHashes.push(assets[key]);
                if (index == 0) {
                    this.state.asset = assets[key];
                    this.state.assetName = key;
                    sessionStorage.setItem("asset", key);
                }
                index ++;
            }
            if (this.state.assetHashes.length > 0) {
                let selectedAsset = this.state.assetHashes[0];
                this.updateContracts(selectedAsset, true);
            } else {
                this.setState({
                    loading: false
                });
            }
        } else {
            this.setState({
                loading: false
            });
            console.log(res.data);
        }
    }

    updateAssets() {
        let accountName = sessionStorage.getItem("account");
        provider.requestWithResponse("getallassets", { accountName: accountName }, res => {
            this.doUpdateAsset(res);
        });
    }

    handleCancelInvokeContract() {
        this.setState({
            showPasswordModal: false,
        });
    }

    handleChangeAsset(e, p) {
        let assetName = p.props.children;
        let paramsAccount = {
            accountName: sessionStorage.getItem("account"),
            assetHash: assetName
        };

        this.setState({
            asset: e,
        });
        
        sessionStorage.setItem("asset", assetName);
        this.updateContracts(e, true);
        provider.requestWithResponse("getassetbalance", paramsAccount, res => {
             this.doUpdateBalance(res);
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
                <Spin spinning={this.state.loading}>
                    <Card
                        title="智能合约"
                        bordered={true}
                        className="invokecontract-form-basic-card"
                    >
                        <div className="invokecontract-form-item">
                            <span className="invokecontract-form-title">选择资产：</span>
                            <Select
                                value={this.state.asset}
                                onChange={(e, p) => this.handleChangeAsset(e, p)}
                            >
                                {this.state.assetNames.map((key, index) => (
                                    <Option key={index} value={this.state.assetHashes[index]}>{key}</Option>
                                ))}
                            </Select>&nbsp;&nbsp;&nbsp;&nbsp;可用余额：{this.state.spendableAsset}<span>{this.state.assetName == "Gravity" ? "N" : this.state.assetName}</span>
                        </div>
                        <div className="invokecontract-form-item">
                            <span className="invokecontract-form-title">选择合约：</span>
                            <Select
                                value={this.state.contract}
                                onChange={e => this.handleChangeContract(e)} 
                            >
                                {this.state.contracts.map((key, index) => (
                                    <Option key={index} value={key.address}>{key.name}</Option>
                                ))}
                            </Select>
                        </div>
                    </Card>
                    <div className="invokecontract-form-item">
                        <InvokeParamsBox
                            handleChangeValue={(index, e) => this.handleChangeValue("output", index, e)}
                            handleChangeName={(index, e) => this.handleChangeName("output", index, e)}
                            title="输出参数列表"
                            hasTitle={true}
                            params={this.state.paramsName}
                            paramsValue={this.state.paramsValue}
                            handleUpdateParamsRow={(isRemove) => this.handleUpdateParamsRow("output", isRemove)}
                        />
                    </div>

                    <div className="invokecontract-form-item">
                        <InvokeParamsBox
                            handleChangeValue={(index, e) => this.handleChangeValue("global", index, e)}
                            handleChangeName={(index, e) => this.handleChangeName("global", index, e)}
                            title="全局参数列表"
                            hasTitle={true}
                            params={this.state.globalParamsName}
                            paramsValue={this.state.globalParamsValue}
                            handleUpdateParamsRow={(isRemove) => this.handleUpdateParamsRow("global", isRemove)}
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
                </Spin>
            </div>
        );
    }
}

export default InvokeContractFormPanel;