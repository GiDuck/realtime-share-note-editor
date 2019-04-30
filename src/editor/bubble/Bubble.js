import React, { Component } from 'react';
import "./bubble.css";

class Bubble extends Component{

    componentWillMount() {
        this.setState({
            x : this.props.x,
            y : this.props.y,
            color : this.props.color,
            name : this.props.name
        })
    }

    render() {
        return(<div className="bubble" style={{backgroundColor : this.state.color, left : this.state.x, top : this.state.y}}>{this.state.name + " 가 수정중.."}</div>);
    }
}

export default Bubble;
