import React, { Component } from 'react';

class NavLogo extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="navpage-logo">
                <img className="navpage-logo-icon" src="./imgs/logo.png" /><div className="navpage-logo-title">{this.props.title}</div>
            </div>
        );
    }
}

export default NavLogo