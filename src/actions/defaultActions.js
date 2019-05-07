import * as types from "../actions/ActionTypes";
import {createAction} from "redux-actions";


export const showPreloader = createAction(types.SHOW_PRELOADER);
export const setSocket = createAction(types.SET_SOCKET);
export const setNoteId = createAction(types.SET_NOTE_ID);
export const setUserId = createAction(types.SET_USER_ID);
export const setCursor = createAction(types.SET_CURSOR);
