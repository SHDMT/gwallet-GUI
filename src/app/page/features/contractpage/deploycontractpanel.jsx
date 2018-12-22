import React, { Component } from "react";
import { Button, Upload, Icon, message } from 'antd';
import BalanceGroup from '../../../component/balancegroup/balancegroup';
import DeployContractConfirmModal from '../../../component/txconfirmmodal/deployconfirmmodal';

import provider from '../../../dataproviderclient';
import "./layout.css";

class DeployContractPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPasswordModal: false,
            contracts: {},
            fileList: [],
            txFee: 0,
            txAmount: 0,
            isSubmitLoading: false
        };
    }

    reset(){
        this.setState({
            contracts: {},
            fileList: [],
            txFee: 0,
            txAmount: 0
        });
    }
    uploadRequest(info) {
        provider.requestWithResponse("readfile", { file: info.file.path }, (res) => {
            if (res.status == 200) {
                info.onSuccess();

            } else {
                info.onError();
            }
        });
    }
    handleDeployContract(){
        let req = {
            accountName: sessionStorage.getItem("account"),
            deployParams: this.state.contracts.code
        }
        provider.requestWithResponse("deploycontract", req, res=>{
            if(res.status == 200){
                this.setState({
                    showPasswordModal: false,
                });
                message.success("部署合约成功");
                this.reset();
            }else{
                this.setState({
                    showPasswordModal: false,
                });
                message.error("部署合约失败，余额不足或交易数据出错");
                console.error(res.data);
                return;
            }
        });

        this.setState({
            showPasswordModal: false
        });

    }
    handleCancelDeployContract(){
        this.setState({
            showPasswordModal: false
        });
    }

    handleSubmitDeployContract() {
        this.setState({
            isSubmitLoading: true
        });

        let path = this.state.fileList[0].originFileObj.path;
        let name = this.state.fileList[0].name;
        provider.requestWithResponse("readfile", { file: path }, (res) => {
            if (res.status == 200) {
                this.state.contracts = {
                    name: name,
                    path: path,
                    code: res.data
                };
                let req = {
                    accountName: sessionStorage.getItem("account"),
                    deployParams: res.data
                }
                provider.requestWithResponse("calcdeploycontractfee", req, res=>{
                    if(res.status == 200){
                        this.setState({
                            isSubmitLoading: false,
                            showPasswordModal: true,
                            txAmount: 0,
                            txFee: res.data.txBytes
                        });
                    }else{
                        this.setState({
                            isSubmitLoading: false,
                        });
                        message.error("部署合约失败，余额不足或交易数据出错");
                        console.error(res.data);
                        return;
                    }
                    
                });
                
            } else {
                console.log(res.data);
            }
        });

    }
    render() {
        return (
            <div className="deploycontract-panel">
                <BalanceGroup />
                <div className="deploycontract-upload-item">
                    <Upload
                        name="file"
                        multiple={true}
                        accept='json'
                        customRequest={(info) => this.uploadRequest(info)}
                        onChange={(info) => {
                                this.setState({
                                    fileList: info.fileList
                                });
                                if (info.file.status === 'done') {
                                    message.success(`${info.file.name} file uploaded successfully`);
                                } else if (info.file.status === 'error') {
                                    message.error(`${info.file.name} file upload failed.`);
                                }
                            }
                        }

                    >
                    {this.state.fileList.length >= 1 ? null : ( 
                        <Button>
                            <Icon type="upload" /> 上传智能合约文件
                        </Button>
                    )}
                       
                    </Upload>
                </div>
                <Button loading={this.state.isSubmitLoading} onClick={() => this.handleSubmitDeployContract()} className="deploycontract-submit-btn" icon="form" type="primary">部署</Button>

                <DeployContractConfirmModal
                    contracts={this.state.contracts}
                    code={this.state.code}
                    title="交易确认"
                    txAmount={this.state.txAmount}
                    txFee={this.state.txFee}
                    assetUnit="N"
                    visible={this.state.showPasswordModal}
                    handleOK={() => this.handleDeployContract()}
                    handleCancel={() => this.handleCancelDeployContract()}
                />
            </div >
        );
    }
}

export default DeployContractPanel;