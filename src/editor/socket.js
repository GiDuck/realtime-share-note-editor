import socketIo from 'socket.io-client'

export class Socket{
    address = "http://192.168.0.60:3001/";
    socket;
    noteId;
    userId;

    init(noteId, userId, context) {
        // 소켓 연결
        this.socket = socketIo.connect(this.address);
        this.socket.emit("joinRoom", noteId);
        this.receive(context);
        this.noteId = noteId;
        this.userId = userId;
    }

    changed(blockId, text){
        //데이터 변경시 서버로 데이터 전송 및 브로드캐스팅
        this.socket.emit("changed", this.noteId, this.userId, blockId, text);
    }

    appendRow(blockId, position){
        //행 추가시 서버로 데이터 전송 및 브로드캐스팅
        this.socket.emit("appendRow", this.noteId, this.userId, blockId, position);
    }

    removeRow(blockId){
        //행 삭제시 서버로 데이터 전송 및 브로드캐스팅
        this.socket.emit("removeRow", this.noteId, this.userId, blockId);

    }

    blur(blockId, text){
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

    receive(context){

        this.socket.on("changed", (noteId, userName, blockId, str) => {

           context.params.socketAction.changed(userName, blockId, str)

        });

        this.socket.on("appendRow", (noteId, userId, blockId, position) => {

            context.params.socketAction.appendRow(noteId, userId, blockId, position);

        });

        this.socket.on("removeRow", (noteId, userId, blockId) => {

            context.params.socketAction.removeRow(noteId, userId, blockId);

        });

    }



}