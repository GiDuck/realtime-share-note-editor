import React, {Component} from 'react';
import MenuBar from "./menu-bar/MenuBar";
import Flat from "./flat/Flat";
import * as action from "./editorModule.js";
import "./editor.css";
import {Socket} from "./socket.js";
import PreLoader from "./preloader/PreLoader";
import {bindActionCreators} from 'redux';
import {connect} from "react-redux";
import * as defaultAction from "../actions/defaultActions"
import Cursor from "./cursor";



class Editor extends Component {


    componentWillUnmount() {
        this.socket.disconnect();
    }


    constructor(props, context) {
        super(props, context);

        let userId = "giduck" + new Date().getTime();
        let noteId = "note1";

        props.DefaultAction.setUserId(userId);
        props.DefaultAction.setNoteId(noteId);
        props.DefaultAction.setCursor(new Cursor());

        let socket = new Socket();
        socket.init(noteId, userId, this);
        props.DefaultAction.setSocket(socket);
    }

    render() {
        return (
           <div>
               {this.props.preloader.isShowLoader ? this.initLoader(this.props.preloader.size, this.props.preloader.text) : undefined}
               <div id="editor" className="editor-body">
                    <MenuBar {...this.params}/>
                    <Flat {...this.params}/>
                </div>
            </div>
        );
    }


    initLoader(size, text) {
        if (typeof size !== "number" || size < 1)
            throw Error("loader에 지정하는 단위는 반드시 정수여야 합니다.");
        return <PreLoader size={size} text={text}/>
    }


}

export default connect(
    (state) => ({...state}),
    (dispatch) => ({
        DefaultAction : bindActionCreators(defaultAction, dispatch)
    })
)(Editor);

