import * as action from "../flat/action";


export function onChangeListener(e, props){
    props.socket.changed(props.rowId, e.currentTarget.innerHTML);
}

export function onKeyDownListener(e, props){

    let keyName = e.key.toUpperCase();
    if(keyName === "ENTER"){
        e.preventDefault();
        props.socket.appendRow(action.uuidGen(), props.position + 1);

    }else if(keyName === "BACKSPACE"){
        let html = e.currentTarget.innerHTML;
        if(html === "<br>" || e.currentTarget.innerHTML.length < 1){
            props.socket.removeRow(props.rowId);
        }
    }else if(keyName === "ARROWUP"){
        moveToUpper(e);
    }else if(keyName === "ARROWDOWN"){
        moveToLower(e);
    }
}

export function onBlurListener(e, props){
    props.socket.blur(props.rowId, (e.currentTarget).innerHTML);
    props.updateRow(props.rowId, (e.currentTarget).innerHTML);
    props.loaderShow(20, "saving...");
}

export function moveToUpper(e){

    let prevNode = (e.target).previousSibling;
    if(prevNode){
        prevNode.focus();
    }

}

export function moveToLower(e){
    let nextNode = (e.target).nextSibling;
    if(nextNode){
        nextNode.focus();

    }
}
