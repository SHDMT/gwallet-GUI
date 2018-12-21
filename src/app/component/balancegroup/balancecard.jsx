import React, { Component } from 'react';
import { Card } from 'antd';

class BalanceCard extends Component{
    constructor(props){
        super(props);
        this.state = {
            content:""
        }
    }

    render(){
        return (
            <Card
                title={this.props.title}
                bordered={true}
            >
                <h2>{this.props.balance}&nbsp;&nbsp;&nbsp;N</h2>
            </Card>
        );
    }
}

export default BalanceCard;