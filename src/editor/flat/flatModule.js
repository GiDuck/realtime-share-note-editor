import * as action from "../editorModule";
import {getRandomColor} from "../editorModule";

export function uuidGen() {
    function randomGen() {
        return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
    }

    let uuid = "";
    for (let i = 0; i < 4; ++i) {
        uuid += randomGen();
        if (i < 3) {
            uuid += "-";
        }
    }
    return uuid;


}


export function changed(userName, blockId, data) {
    const nowContext = this.contextStore[blockId];
    let newRow = {
        noteId : this.props.note.noteId,
        blockId : blockId,
        html : data,
        updateDate : new Date()
    };


    if(userName !== this.props.note.userId){
       let clientRect = nowContext.getPositionInfo();
        const relativeTop = clientRect.top;
        const scrolledTopLength = window.pageYOffset;
        const absoluteTop = scrolledTopLength + relativeTop;

        let bubble = {
            x : clientRect.left,
            y : absoluteTop,
            userName : userName,
            color : getRandomColor(),
            removeMyself : setTimeout(()=>{
                nowContext.setState({bubble : false});
            }, 3000)
        };
        nowContext.setState({content : data, bubble : bubble, updateContentFlag : true});

    }else{
        nowContext.setState({content : data, updateContentFlag : false});
    }

    this.props.RowActions.setRow({row : newRow});


}


export function appendRow(noteId, userId, blockId, position) {

    let row = {
    noteId : noteId,
    blockId : blockId,
    html : "",
    updateDate : new Date()};
    this.props.RowActions.insertRow({row : row, position : position});

    if (userId === this.props.note.userId) {
        let appendNode = this.flatRef.current.childNodes[position].childNodes[0];
        if(appendNode){
            appendNode.focus();
        }
    }
}

export function removeRow(noteId, userId, blockId) {

    this.props.RowActions.deleteRow({key: blockId});
    this.contextStore[blockId] = undefined;
    delete this.contextStore[blockId];
}


