import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import ContentEditable from 'react-contenteditable';
import "./row.css"
import * as action from "./action.js";



class Row extends Component{


    constructor(props, context) {
        super(props, context);
        this.contentEditableRef = React.createRef();
    }

    getPosition(){
       return ReactDOM
            .findDOMNode(this.contentEditableRef.current)
            .getBoundingClientRect();
    }

    componentWillMount() {
       this.setState({content : this.props.content});
    }

    render(){
        return(
          <ContentEditable
               id={this.props.rowId}

               className="row"
               innerRef = {this.contentEditableRef}
               html={ this.props.content === undefined ? "" : this.props.content }
               onChange={((e) => {

                   this.cursor = this.props.cursorAction;
                   this.cursor.saveSelection(this.cursor.saveCaretPosition, document.activeElement);

                   const taskTimeInterval = 1000;

                   let timer = setTimeout(()=>{
                       action.onBlurListener(e, this.props);
                   }, taskTimeInterval);

                  if(this.changedTime === undefined) this.changedTime = new Date().getTime();
                  let offsetTime = new Date().getTime() - this.changedTime;

                  if(offsetTime < taskTimeInterval) clearTimeout(timer);
                  else this.changedTime = new Date().getTime();

                  action.onChangeListener(e, this.props);

               })}
               onKeyDown={((e)=>action.onKeyDownListener(e, this.props))}
               onBlur={((e)=> {action.onBlurListener(e, this.props)})}
               

          />
        );
    }
}

export default Row;
