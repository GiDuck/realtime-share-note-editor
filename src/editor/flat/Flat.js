import React, {Component} from 'react';
import "./flat.css";
import Row from "../row/Row";
import * as action from "./action.js";
import Bubble from "../bubble/Bubble";

class Flat extends Component {

    componentWillMount() {

        this.setState({
            rows: [],
            bubbles : []
        });

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.cursor = this.props.cursorAction;
        this.cursor.recoverSelection(this.cursor.saveCaretPosition, document.activeElement);
    }

    componentDidMount(){

            this.getDocument().then(()=>{

            this.props.socketAction.changed = (userName, blockId, data) => {


                    let rows = this.state.rows;
                    let rowIndex = rows.findIndex(el => {
                        return el.blockId === blockId
                    });
                    if (rowIndex > -1) {

                        if (this.props.userId === userName) {
                            rows[rowIndex].html = data;
                        } else if (this.props.userId !== userName) {

                            rows[rowIndex].html = data;

                            (async () => {

                                await (() => this.setState({rows: rows}))();

                                let positionObj = this.refs[blockId].getPosition();
                                console.dir(positionObj);
                                let newBubbles = this.state.bubbles;
                                let bubbleObj = {
                                    id: blockId,
                                    x: positionObj.left,
                                    y: positionObj.top,
                                    name: userName,
                                    color: action.getRandomColor(),
                                    removeMyself: (time, _callback) => {
                                        setTimeout(() => {
                                            return _callback.apply();
                                        }, time);
                                    }
                                };

                                let index = newBubbles.findIndex((el) => {
                                    return el.id === blockId
                                });
                                if (index < 0 || newBubbles.length < 1) {
                                    newBubbles.push(bubbleObj);
                                    bubbleObj.removeMyself(3000, async (index) => {
                                        newBubbles.splice(index, 1);
                                        this.setState({bubbles: newBubbles});
                                    });
                                    this.setState({bubbles: newBubbles});
                                }


                            })();

                        }
                    }

            }

            this.props.socketAction.appendRow = (noteId, userId, blockId, position) =>{
                        let newRows = this.state.rows;
                        console.dir(newRows);
                        newRows.splice(position, 0, {position : position, blockId : blockId, content : ""});
                        console.dir(newRows);
                        (async () => {
                            await this.setState({rows : newRows});
                            if(userId === this.props.userId){
                                let blockRef = this.refs[blockId].contentEditableRef.current;
                                blockRef.focus();
                             }else{
                                this.cursor = this.props.cursorAction;
                                this.cursor.recoverSelection(this.cursor.saveCaretPosition, document.activeElement);
                            }
                        })();
            }

            this.props.socketAction.removeRow = (noteId, userId, blockId) => {
                        let rows = this.state.rows;
                        let index = rows.findIndex(el=> {return el.blockId === blockId});
                        rows.splice(index, 1);
                        this.setState({rows : rows});
            }

        });

            this.updateRow = (blockId, html) => {
                        let rows = this.state.rows;
                        let index = rows.findIndex(el => {return blockId === el.blockId});
                        if(index < 0 ) return;
                        rows[index].html = html;
                        this.setState({rows : rows});
        }

    }




    getDocument = async () => {
                        // 문서의 모든 행을 가지고 옴
                        const result = await fetch("http://192.168.0.60:3001/getDocument/" + this.props.noteId);
                        const resultObj = await result.json();


                        if (resultObj === null) {
                            alert("문서 존재 안함");
                        } else if(resultObj.content.length < 1){

                            let newRowId = action.uuidGen();
                            this.props.socket.appendRow(newRowId, 0);

                        } else {

                            this.setState({rows : resultObj.content});
                        }
    }

    _createRow = (rowId, content, key) => {
                        return <Row {...this.props} rowId={rowId} content={content} key={key} position = {key}
                                    ref={rowId} updateRow = {this.updateRow}/>
    };

    _createBubble = (x, y, name, color, key) =>{
                        return <Bubble x = {x} y = {y} name = {name} color = {color} key={key}/>
    }


    render() {
        return (
            <div id="flat" className="flat">

                {
                    this.state.bubbles.map((v, i) => this._createBubble(v.x, v.y, v.name, v.color, i))
                }

                {
                  this.state.rows.map((v, i) => this._createRow(v.blockId, v.html, i))
                }
            </div>
        );
    }

}

export default Flat;
