import React, { Component } from 'react';

class NavItem extends Component {
    constructor(props){
        super(props);
        this.clickHandler = props.clickhandler;
    }

    render(){
        let selected =this.props.isselected?"navpage-item selected":"navpage-item";
        return (
        <li className={selected} datapageid={this.props.id} onClick={this.clickHandler}>
            <img className="navpage-item-icon" src={this.props.img}/>
            <p className="navpage-item-name">{this.props.name}</p>
        </li>
        );
    }
}

export default NavItem