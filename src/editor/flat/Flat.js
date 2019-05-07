import React, {Component} from 'react';
import "./flat.css";
import Row from "../row/Row";
import * as action from "./flatModule.js";
import * as rowActions from "../../actions/rowActions";
import * as defaultActions from "../../actions/defaultActions";

import {bindActionCreators} from 'redux';
import {connect} from "react-redux";


class Flat extends Component {

    componentDidMount(){
        this.getDocument();
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextProps.row.rows.size !== this.props.row.rows.size;
    }

    componentWillMount() {
        let {socket} = this.props.socket;
        socket.receiveChanged(this);
        socket.receiveAppendRow(this);
        socket.receiveRemoveRow(this);
        this.flatRef = React.createRef();
        this.contextStore = {};
    }


    getDocument = async () => {
                        // 문서의 모든 행을 가지고 옴
                        const result = await fetch("http://192.168.0.60:3001/getDocument/" + this.props.note.noteId);
                        const resultObj = await result.json();

                        if (resultObj === null) {
                            console.warn("문서 존재 안함");
                        } else if(resultObj.content.length < 1){
                            let {socket} = this.props.socket;
                            let newRowId = action.uuidGen();
                            socket.forwardAppendRow(newRowId, 0);

                        } else {
                            this.props.RowActions.setRows(resultObj.content);
                        }
    }

    _createRow = (rowId, content, index) => {
            return <Row {...this.props} rowId={rowId} content={content} key={ rowId } position = {index} contextStore = {this.contextStore}/>
    };



    render() {
        const {rows} = this.props.row;
        return (
            <div id="flat" className="flat" ref = {this.flatRef}>

                {
                     rows && rows.size > 0 ? rows.map((v, i) => this._createRow(v.get("blockId"), v.get("html"), i)) : undefined
                }

            </div>
        );
    }

}

export default connect(
    (state)=>({...state}),
    (dispatch)=>({
        DefaultAction:  bindActionCreators(defaultActions, dispatch),
        RowActions : bindActionCreators(rowActions, dispatch)}))(Flat);
