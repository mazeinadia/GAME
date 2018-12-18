import { CHECK_LOGIN, REGISTER, LOGIN, LOGIN_SUCCESS, LOGIN_ERROR } from './actionTypes';

export default function Login (state = {
    isAuthenticated: undefined,
    isRegistered: false,
    loginInProcess: false
}, action) {
    console.log(action.type);
    switch (action.type) {
        case REGISTER: return {
            ...state,
            isRegistered: true
        };

        case LOGIN: return {
            ...state,
            loginInProcess: true
        };

        case LOGIN_SUCCESS: return {
            ...state,
            isAuthenticated: true,
            loginInProcess: false
        };

        case LOGIN_ERROR: return {
            ...state,
            loginInProcess: false
        };

        case CHECK_LOGIN: return {
            ...state,
            isAuthenticated: action.success
        };

        default: return state;
    }
}