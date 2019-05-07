import * as types from "../actions/ActionTypes";
import {handleActions} from "redux-actions";

const initialState = {
    socket : undefined
};

export default handleActions({
    [types.SET_SOCKET]: (state, action) => {
        return {...state, socket : action.payload};
    }
}, initialState);

