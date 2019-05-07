import * as types from "../actions/ActionTypes";
import {handleActions} from "redux-actions";
import {List, Map, fromJS} from "immutable";
const initialState = {
    rows : List([]),
    row : Map({
        noteId : undefined,
        blockId : undefined,
        html : undefined,
        updateDate : new Date()
    })
};

export default handleActions ({
    [types.SET_ROWS] : (state, action) => {
        const rows = fromJS(action.payload);
        return {...state, rows : rows};
     },

    [types.SET_ROW] : (state, action) => {
        let {rows} = state;
        let {row} = action.payload;
        let rowMap = new Map(row);

        let index = rows.findIndex( el => {
            return el.get("blockId") === rowMap.get("blockId")
        });
        console.log(index);
        rows = rows.setIn([index, "html"], rowMap.get("html"));
        return {...state, rows : rows};
    },

    [types.INSERT_ROW] : (state, action) => {
        let {rows} = state;
        let {row} = action.payload;
        let {position} = action.payload;
        let newRows = rows.toJS();
        newRows.splice(position, 0, row);
        return {...state, rows : fromJS(newRows)};
    },

    [types.DELETE_ROW] : (state, action) => {
        const {key} = action.payload;
        let {rows} = state;
        let index = rows.findIndex( el => {
            return el.get("blockId") === key});
        if(index > -1 ) {
            rows = rows.delete(index);
        }else{
            console.error("삭제할 블록이 존재하지 않습니다.");
        }
        return {...state, rows : rows};
    }
}, initialState);