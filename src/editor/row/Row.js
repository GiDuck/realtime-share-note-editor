import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import ContentEditable from 'react-contenteditable';
import "./row.css"
import * as action from "./rowModule.js";
import Bubble from "../bubble/Bubble";



class Row extends Component{

    constructor(props, context) {
        super(props, context);
        this.rowRef = React.createRef();
        this.props.contextStore[this.props.rowId] = this;

    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
            return nextState.updateContentFlag;
    }


    componentWillMount() {
        this.setState({content : this.props.content, changedTime : undefined, bubble : undefined, updateContentFlag : false});
    }

    getPositionInfo(){
        return ReactDOM
            .findDOMNode(this)
            .getClientRects();
    }

    executeArchivingAfterTimeOff(e, timeInterval){

        if(!this.state.changedTime) {
            this.setState({changedTime : new Date().getTime()});
        }

        let timeDiff = new Date().getTime() - this.state.changedTime;
        if(timeDiff > timeInterval) {
            action.onBlurListener(e, this.props);
            this.props.DefaultAction.showPreloader(true);
            setTimeout(()=> this.props.DefaultAction.showPreloader(false), 2000);
            this.setState({changedTime : new Date().getTime()});

        }

    }

    _createBubble = (x, y, userName, color) => {
        return <Bubble x={x} y={y} userName={userName} color={color}/>
    }


    render(){
        return(
            <div>
                  <ContentEditable
                       id={this.props.rowId}
                       className="row"
                       innerRef = {this.rowRef}
                       html={ !this.state.content ? "" : this.state.content }
                       onChange={((e) => {
                           //this.executeArchivingAfterTimeOff(e, 1000);
                           action.onChangeListener.call(this, e, this.props);

                       })}
                       onKeyDown={((e)=>action.onKeyDownListener.call(this, e, this.props))}
                       onBlur={((e)=> {action.onBlurListener.call(this, e, this.props)})}
                       onMouseUp= {(e)=>{action.onMouseDownListener.call(this, this.props)}}
                  />
                { this.state.bubble ? this._createBubble(this.state.bubble.x, this.state.bubble.y, this.state.bubble.userName, this.state.bubble.color) : undefined }
            </div>
        );
    }

}




export default Row;
