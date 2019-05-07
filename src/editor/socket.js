import socketIo from 'socket.io-client'
import * as flatAction from "../editor/flat/flatModule.js"
import * as rowAction from "../editor/flat/flatModule.js"

export class Socket{
    address = "http://192.168.0.60:3001/";
    socket;
    noteId;
    userId;


    init(noteId, userId, context) {
        // 소켓 연결
        this.socket = socketIo.connect(this.address);
        this.socket.emit("joinRoom", noteId);
        this.noteId = noteId;
        this.userId = userId;
    }


    forwardChange(blockId, text){
        //데이터 변경시 서버로 데이터 전송 및 브로드캐스팅
        this.socket.emit("changed", this.noteId, this.userId, blockId, text);
    }

    forwardAppendRow(blockId, position){
        //행 추가시 서버로 데이터 전송 및 브로드캐스팅
        this.socket.emit("appendRow", this.noteId, this.userId, blockId, position);
    }

    forwardRemoveRow(blockId){
        //행 삭제시 서버로 데이터 전송 및 브로드캐스팅
        this.socket.emit("removeRow", this.noteId, this.userId, blockId);

    }

    forwardBlur(blockId, text){
        //사용자가 작성을 마치고 포커스를 잃으면 서버에 알려주어 데이터를 DB에 저장할 수 있도록 함
        this.socket.emit("blur", this.noteId, this.userId, blockId, text);

    }

    sync(){
        //사용자가 입력이 없으면 최신 문서 정보와 동기화 시키기 위한 작업
    }

    disconnect(){
        //사용자가 나갈때 채팅방 나가기
        this.socket.emit("leaveRoom", this.noteId);
    }

    receiveChanged(context){

        this.socket.on("changed", (noteId, userName, blockId, str) => {
            rowAction.changed.call(context,userName, blockId, str);
        });
    }

    receiveAppendRow(context){

        this.socket.on("appendRow", (noteId, userId, blockId, position) => {
            flatAction.appendRow.call(context, noteId, userId, blockId, position);
        });
    }

    receiveRemoveRow(context){

        this.socket.on("removeRow", (noteId, userId, blockId) => {
            flatAction.removeRow.call(context, noteId, userId, blockId);
        });

    }


}


