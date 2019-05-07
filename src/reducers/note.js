import * as types from "../actions/ActionTypes";
import {handleActions} from "redux-actions";

const initialState = {
    userId: undefined,
    noteId: undefined
};

export default handleActions({
    [types.SET_NOTE_ID]: (state, action) => {
        return {...state, noteId : action.payload}
    },
    [types.SET_USER_ID] : (state, action) => {
        return {...state, userId : action.payload}
    }
}, initialState);