import React, { Component } from 'react';

class PageContainer extends Component{
    constructor(props){
        super(props);
        this.pages = [];
        for (const [k, v] of props.pages.entries()) {
            this.pages.push(v);
        }
    }

    render(){
        let selectedPage = this.props.selected;
        return (
            <div className="pagecontainer-area">
                {this.pages.map((entry, index)=>{
                    let showPage = selectedPage == index?"":"none";
                    if(entry.refresh){
                        if(selectedPage == index){
                            return <div key={index}>{entry.obj}</div>;
                        }else{
                            return null;
                        }
                    }
                    return (
                        <div key={index} style={{display:showPage}}>
                            {entry.obj}
                        </div>
                    )
                })}
            </div>
        );
    }
}

export default PageContainer;