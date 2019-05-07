import preloader from "./preloader";
import row from "./row";
import socket from "./socket";
import note from "./note";
import cursor from "./cursor";



import {combineReducers} from "redux";

export default combineReducers({
    preloader, row, socket, note, cursor
})
