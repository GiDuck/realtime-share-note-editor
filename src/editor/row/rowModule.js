import * as action from "../flat/flatModule";
import {getRandomColor} from "../editorModule";

/*export function changed(userName, blockId, data) {

    let newRow = {
        noteId : this.props.note.noteId,
        blockId : blockId,
        html : data,
        updateDate : new Date()
    };

    if(blockId === this.props.rowId && userName !== this.props.note.userId){
        let clientRect = this.getPositionInfo();
        const relativeTop = clientRect.top;
        const scrolledTopLength = window.pageYOffset;
        const absoluteTop = scrolledTopLength + relativeTop;

        let bubble = {
            x : clientRect.left,
            y : absoluteTop,
            userName : userName,
            color : getRandomColor(),
            removeMyself : setTimeout(()=>{
                this.setState({bubble : false});
            }, 3000)
        };

        this.setState({content : data, bubble : bubble});
        this.props.RowActions.setRow({row : newRow});


    }else if(blockId === this.props.rowId && userName === this.props.note.userId){

/!*       let {rows} = this.props.row;
        let index = rows.findIndex(el => {return el.get("blockId") === this.props.rowId});
        if(index > -1){
           rows.setIn([0, "html"], data);
           this.props.row.rows = rows;
        }*!/
        this.props.RowActions.setRow({row : newRow});
    }



}*/

export function onChangeListener(e, props){
    let {socket} = props.socket;
    socket.forwardChange(props.rowId, e.currentTarget.innerHTML);
}

export function onKeyDownListener(e, props){

    let keyName = e.key.toUpperCase();
    let {socket} = props.socket;

    if(keyName === "ENTER"){
        e.preventDefault();
        socket.forwardAppendRow(action.uuidGen(), props.position + 1);

    }else if(keyName === "BACKSPACE"){
        let html = e.currentTarget.innerHTML;
        if(html === "<br>" || e.currentTarget.innerHTML.length < 1){
            moveToUpper(e);
            socket.forwardRemoveRow(props.rowId);
        }
    }else if(keyName === "ARROWUP"){
        moveToUpper(e);
    }else if(keyName === "ARROWDOWN"){
        moveToLower(e);
    }
}

export function onMouseDownListener(props){
    let {cursor} = props.cursor;
    cursor.saveSelection(this.rowRef.current);
}

export function onBlurListener(e, props){
    let {socket} = props.socket;
    socket.forwardBlur(props.rowId, (e.currentTarget).innerHTML);
}

export function moveToUpper(e){

    let prevNode = (e.target.parentNode).previousSibling;
    if(prevNode){
        prevNode.childNodes[0].focus();
    }

}

export function moveToLower(e){
    let nextNode = (e.target.parentNode).nextSibling;
    if(nextNode){
        nextNode.childNodes[0].focus();

    }
}
