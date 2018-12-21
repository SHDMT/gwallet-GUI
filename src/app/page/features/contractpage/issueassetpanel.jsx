import React, { Component } from "react";
import BalanceGroup from '../../../component/balancegroup/balancegroup';
import IssueAssetFormPanel from './issueassetformpanel';

import "./layout.css";
class IssueAssetPanel extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="issueasset-panel">
                <BalanceGroup />
                <IssueAssetFormPanel />
            </div>
        );
    }
}

export default IssueAssetPanel;