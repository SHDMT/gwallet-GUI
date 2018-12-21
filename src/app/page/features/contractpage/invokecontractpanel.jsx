import React, { Component } from "react";
import BalanceGroup from '../../../component/balancegroup/balancegroup';
import InvokeContractFormPanel from './invokecontractformpanel';

import "./layout.css";
// const Option = Select.Option;
class InvokeContractPanel extends Component {
    render() {
        return (
            <div className="invokecontract-panel">
                <BalanceGroup />
                <InvokeContractFormPanel />
            </div>
        );
    }
}

export default InvokeContractPanel;