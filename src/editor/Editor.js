import React, { Component } from 'react';
import MenuBar from "./menu-bar/MenuBar";
import Flat from "./flat/Flat";
import * as action from "./action.js";
import "./editor.css";
import {Socket} from "./socket.js";


class Editor extends Component{


    componentWillUnmount() {
        this.socket.disconnect();
    }

    componentWillMount() {
        this.menubarRef = React.createRef();
    }

    constructor(props, context) {
        super(props, context);
        this.params = {
            noteId : "note1",
            userId : "giduck" + new Date().getTime()};
        this.socket = new Socket();
        this.params.socketAction = {};
        this.params.cursorAction = {
            saveCaretPosition : {element : undefined, position : 0, rangeObj : undefined},
            saveSelection : action.saveSelection,
            recoverSelection : action.recoverSelection};
        this.params.loaderShow = (size, text) => {
            this.menubarRef.current.showLoader(size, text);
            setTimeout(()=> {
                this.menubarRef.current.dismissLoader();
            } , 3000 )};
        this.socket.init(this.params.noteId, this.params.userId, this);
        this.params.socket = this.socket;

    }

    render() {
        return(
            <div id="editor" className="editor-body">
                <MenuBar {...this.params} ref = {this.menubarRef}/>
                <Flat {...this.params}/>
            </div>
        );
    }

}

export default Editor;