import * as types from "../actions/ActionTypes";
import {createAction} from "redux-actions";

export const setRows = createAction(types.SET_ROWS);
export const setRow = createAction(types.SET_ROW);
export const deleteRow = createAction(types.DELETE_ROW);
export const insertRow = createAction(types.INSERT_ROW);
