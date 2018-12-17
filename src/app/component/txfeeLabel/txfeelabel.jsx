import React, { Component } from 'react';

import './layout.css';
class TxFeeLabel extends Component{
    constructor(props){
        super(props);
        this.state = {
            content:""
        }
    }

    render(){
        return (
            <div className="txfee-label">
                <p className="txfee-label-item">
                    <span className="txfee-label-item-title">消息尺寸:</span><span className="txfee-label-amount">{this.props.txSize}</span>{this.props.assetUnit}
                </p>
                <p className="txfee-label-item">
                    <span className="txfee-label-item-title">交易费:</span><span className="txfee-label-amount">{this.props.txFee}</span>{this.props.assetUnit}
                </p>
                <p className="txfee-label-item">
                    <span className="txfee-label-item-title">总计:</span><span className="txfee-label-amount">{this.props.txTotal}</span>{this.props.assetUnit}
                </p>
            </div>
        );
    }
}

export default TxFeeLabel;