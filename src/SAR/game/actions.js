import io from 'socket.io-client';
import {
    START_GAME,
    CONNECT,
    CONTINUE_GAME,
    DISCONNECT,
    WIN,
    LOST,
    PRESS
} from './actionTypes';
import { GAME_API } from '../../constants/endpoints';

let socket;

export const connect = () => dispatch => {
    socket = io(GAME_API, {transports: ['websocket'], upgrade: false});


    socket.on('connect', () => dispatch({
        type: CONNECT
    }));

    socket.on('start',  (data) => dispatch({
        type: START_GAME,
        user: data
    }));

    socket.on('win', (data) => dispatch({
        type: WIN,
        //news: JSON.parse(data)
    }));

    socket.on('lost', () => dispatch({
        type: LOST
    }));

    socket.on('continue', (data) => {
        dispatch({
            type: CONTINUE_GAME,
            user: data
        })
    });
};

export const press = () => {
    socket.emit('press');
    console.log('PRESS!');
    return({
        type: PRESS
    });
};

export const disconnect = () => ({
    type: DISCONNECT
});
