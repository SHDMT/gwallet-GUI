import React, { Component } from 'react';
import {Progress} from 'antd';

import './layout.css';
class LoadingPageView extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
        <div className="loading-page">
            Loading...
        </div>
        );
    }
}

export default LoadingPageView;