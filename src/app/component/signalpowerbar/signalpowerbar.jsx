import React, { Component } from 'react';
import { Icon } from 'antd';

import './layout.css';
class SignalPower extends Component {
    constructor(props) {
        super(props);
        this.state = {
            power : 0
        }
    }

    render() {
        return (
        <div className="signalpower-bar">
                <div className="signalpower power0"></div>
                <div className="signalpower power1"></div>
                <div className="signalpower power2"></div>
                <div className="signalpower power3"></div>
        </div>
        );
    }
}

export default SignalPower;