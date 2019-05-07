import * as types from "../actions/ActionTypes";
import {handleActions} from "redux-actions";

const initialState = {
    cursor : undefined,
    focusNode : undefined
};

export default handleActions({
    [types.SET_CURSOR]: (state, action) => {
        return {...state, cursor : action.payload};
    }
}, initialState);
