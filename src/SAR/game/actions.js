import io from 'socket.io-client';
import {
    START_GAME,
    CONNECT,
    CONTINUE_GAME,
    DISCONNECT,
    RESTART,
    FINISH,
    SET_MY_CELL, SET_OPPONENT_CELL, OPPONENT_DISCONNECTED
} from './actionTypes';
import { GAME_API } from '../../constants/endpoints';
import { cellState } from '../../constants/enums';
import { getCookie} from "../login/actions";

let socket;

export const connect = () => dispatch => {
    socket = io(GAME_API, {transports: ['websocket'], upgrade: false});


    socket.on('connect', () => dispatch({
        type: CONNECT
    }));

    socket.on('start',  (data) => dispatch({
        type: START_GAME,
        usersElement: data.elem === 0 ? cellState.zero : cellState.cross,
        actionIsAvailable: (data.start === 1)
    }));

    socket.on('oposite disconnect', () => dispatch({
        type: OPPONENT_DISCONNECTED
    }));

    socket.on('action', (data) => dispatch({
        type: SET_OPPONENT_CELL,
        rowIndex: JSON.parse(data).y,
        cellIndex: JSON.parse(data).x
    }));

    socket.on('continue', (data) => {

        data = JSON.parse(data.toString());
        debugger
        dispatch({
            type: CONTINUE_GAME,
            field: data.progress.map(row => {
                return row.map(cell => (cell === 0) ? cellState.zero : (cell === 2 ? cellState.empty : cellState.cross))
            }),
            usersElement: data.elem === 0 ? cellState.zero : cellState.cross,
            actionIsAvailable: (data.start === 1)
        })
    });
};

export const setCellState = (rowIndex, cellIndex ) => {
    socket.emit('action', JSON.stringify({x: cellIndex, y: rowIndex}));
    console.log('ACTION!');
    return({
        type: SET_MY_CELL,
        rowIndex,
        cellIndex
    });
};

export const finishGame = () => {
    socket.emit('finish');
    return({
        type:FINISH
    });
};

export const disconnect = () => ({
    type: DISCONNECT
});

export const restartGame = () => {
    socket.emit('restart');

    return{
        type: RESTART
    };
};
