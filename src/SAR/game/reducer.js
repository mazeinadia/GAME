import {
    CONNECT,
    CONTINUE_GAME,
    SET_MY_CELL, SET_OPPONENT_CELL,
    SET_FIELD,
    RESTART,
    OPPONENT_DISCONNECTED,
    START_GAME, DISCONNECT,
    FINISH
} from './actionTypes';

import { cellState } from '../../constants/enums';

const DefaultState = {
    actionIsAvailable: false,
    field: [
        [cellState.empty, cellState.empty, cellState.empty],
        [cellState.empty, cellState.empty, cellState.empty],
        [cellState.empty, cellState.empty, cellState.empty]
    ],
    lostConnection: false,
    connection: false,
    inGame: false,
};

export default function Game(state = DefaultState, action) {

    switch (action.type) {
        case CONNECT: return {
            connection: true
        };

        case SET_MY_CELL: return {
            ...state,
            field: state.field.map((row, rowIndex) =>
                rowIndex === action.rowIndex ? (row.map((cell, cellIndex) =>
                    cellIndex === action.cellIndex ? state.usersElement : cell))
                    : row),
            actionIsAvailable:false
        };

        case SET_OPPONENT_CELL:
            console.log('opponent act with ' + action.rowIndex + action.cellIndex);
            console.log(((cellState.cross === state.usersElement) ? cellState.zero : cellState.cross));
            return {
            ...state,
            field: state.field.map((row, rowIndex) =>
                rowIndex === action.rowIndex ? (row.map((cell, cellIndex) =>
                        cellIndex === action.cellIndex ?
                            ((cellState.cross === state.usersElement) ? cellState.zero : cellState.cross)
                            : cell))
                    : row),
            actionIsAvailable: true
        };

        case START_GAME:
            console.log('start with ' + action.usersElement + ' ' + action.actionIsAvailable);
            return ({
            ...state,
            connection: false,
            usersElement: action.usersElement,
            actionIsAvailable: action.actionIsAvailable,
            field:  [
                [cellState.empty, cellState.empty, cellState.empty],
                [cellState.empty, cellState.empty, cellState.empty],
                [cellState.empty, cellState.empty, cellState.empty]
            ],
            inGame: true
        });

        case SET_FIELD: return {
            ...state,
            field: action.field
        };

        case CONTINUE_GAME:
            console.log('elem' + action.usersElement);
            console.log(action.actionIsAvailable);
            return {
            ...state,
            usersElement: action.usersElement,
            actionIsAvailable: action.actionIsAvailable,
            field: action.field,
            lostConnection: false,
            connection: false,
            inGame:true
        };

        case OPPONENT_DISCONNECTED: return {
            ...state,
            actionIsAvailable: false,
            lostConnection: true
        };

        case DISCONNECT: return {
            lostConnection: false,
            field: [],
            actionIsAvailable: false,
            connection: false,
            inGame: false
        };

        case FINISH: return {
            winner: true,
            lostConnection: false,
            inGame: false
        };

        case RESTART: return {
            winner: undefined,
            lostConnection: false,
            inGame: false
        };

        default: return state;
    }
}