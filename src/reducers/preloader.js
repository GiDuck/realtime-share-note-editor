import * as types from "../actions/ActionTypes";
import {handleActions} from "redux-actions";

const initialState = {
    isShowLoader : false,
    size : 20,
    text : "saving..."
};

export default handleActions({
        [types.SHOW_PRELOADER]: (state, action) => {
            return {...state, isShowLoader : action.payload};
        }
}, initialState);

