import React, { Component } from 'react';
import "./bubble.css";

class Bubble extends Component{

    render() {
        let userName = this.props.userName;
        if(userName.length > 8){
            userName = userName.slice(0, 8) + ".. 가 수정 중";
        }
        return(
            <div className="bubble"
                 style={{backgroundColor : this.props.color, left : this.props.x, top : this.props.y}}>
            {userName}
            </div>);
    }
}

export default Bubble;
