import React, { Component } from 'react';
import SyncProcessor from './syncprocessor';
import NetStatusLabel from './netstatuslabel';
import InfoLabel from './infolabel';

require('./layout.css');

class StatebarPageView extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
        <div className="statebar-area">
            <SyncProcessor />
            <NetStatusLabel />
            <InfoLabel />
        </div>
        );
    }
}

export default StatebarPageView;