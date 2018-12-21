import React, { Component } from 'react';
import AccountPanel from '../../component/accountpanel/accountpanel';
import ToolsPanel from './toolspanel';

require('./layout.css');
class ToolbarPageView extends Component{
    constructor(props){
        super(props);
        this.state = {
            locked: false
        }
    }

    handleLockClick(){
        this.lockWallet(!this.state.locked);
        this.setState({
            locked: !this.state.locked
        });
    }
    render(){
        return <div className="toolbar-area">
                <div className="toolbar-item toolbar-item-account-panel">
                    <AccountPanel />
                </div>
                <div className="toolbar-item toolbar-item-tools-panel">
                    <ToolsPanel />
                </div>
        </div>;
    }
}

export default ToolbarPageView;