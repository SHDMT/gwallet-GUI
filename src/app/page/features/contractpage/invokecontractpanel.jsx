import React, { Component } from "react";
import BalanceGroup from '../../../component/balancegroup/balancegroup';
import InvokeContractFormPanel from './invokecontractformpanel';

import "./layout.css";
// const Option = Select.Option;
class InvokeContractPanel extends Component {
    render() {
        return (
            <div className="invokecontract-panel">
                {/* <Select className="invokecontract-balanceasset" defaultValue="gravity">
                    <Option value="gravity">Gravity</Option>
                    <Option value="elecoin">EleCoin</Option>
                    <Option value="cryptocat">CryptoCat</Option>
                </Select> */}
                <BalanceGroup />
                <InvokeContractFormPanel />
            </div>
        );
    }
}

export default InvokeContractPanel;