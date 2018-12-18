import {
    CONNECT,
    CONTINUE_GAME,
    WIN,
    LOST,
    PRESS,
    START_GAME,
    DISCONNECT
} from './actionTypes';

import { cellState } from '../../constants/enums';

const DefaultState = {
    lostConnection: false,
    connection: false,
    inGame: false,
    pressed: false,
};

export default function Game(state = DefaultState, action) {

    switch (action.type) {
        case CONNECT: return {
            connection: true,
        };

        case PRESS: return {
            ...state,
            pressed: true
        };

        case WIN:
            console.log('opponent act with ' + action.rowIndex + action.cellIndex);
            return {
                ...state,
                win: true,
                msg: 'hi'//action.news
        };

        case START_GAME:
            console.log('start with ' + action.user );
            return ({
                ...state,
                connection: false,
                pressed: false,
                inGame: true,
                user: action.user,
                win: undefined
        });

        case LOST: return {
            ...state,
            win: false
        };

        case CONTINUE_GAME:
            console.log('elem' + action.usersElement);
            console.log(action.actionIsAvailable);
            return {
            ...state,
                pressed: false,
                lostConnection: false,
                connection: false,
                inGame:true
        };

        case DISCONNECT: return {
            pressed: false,
            win: undefined,
            connection: false,
            inGame: false
        };

        default: return state;
    }
}