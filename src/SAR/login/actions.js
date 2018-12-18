import { CHECK_LOGIN, LOGIN, LOGIN_SUCCESS, LOGIN_ERROR, REGISTER } from './actionTypes';
import { LOGIN_API } from '../../constants/endpoints';

export const login = (email, pass) => async (dispatch) => {
    dispatch({
        type: LOGIN
    });

   let response = await fetch(`${LOGIN_API}/login`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "password": pass || '123456',
            "username": email || 'egor'
        })
    });

   response = await response.json();
   console.log(response);

    if (response) {
        setCookie('token', response.token);

        dispatch({
            type: LOGIN_SUCCESS
        });

    } else {
        dispatch({
            type: LOGIN_ERROR
        })
    }
};

export const reg = (email, pass) => async (dispatch) => {
    const response = await fetch(`${LOGIN_API}/regisration`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: await JSON.stringify({
            "password": pass,
            "username": email,
            "email": email,
        })
    });
    if (response.status === 204) {
        return {
            type: REGISTER,
            email,
            pass
        };
    }


};

export const checkLogin = () => {
    const cookie = getCookie('token');
    return {
        type: CHECK_LOGIN,
        success: cookie
    }
};

export function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, options) {
    options = options || {};

    let now = new Date();
    now.setDate(now.getDate()+7);

    // if (typeof expires == "number" && expires) {
    //     var d = new Date();
    //     d.setTime(d.getTime() + expires * 1000);
    //     expires = options.expires = d;
    // }
    // if (expires && expires.toUTCString) {
    //     options.expires = expires.toUTCString();
    // }

    value = encodeURIComponent(value);

    var updatedCookie = name + "=" + value + "; " + "expires=" + now.toUTCString();

    for (var propName in options) {
        updatedCookie += "; " + propName;
        var propValue = options[propName];
        if (propValue !== true) {
            updatedCookie += "=" + propValue;
        }
    }

    console.log(updatedCookie);

    document.cookie = updatedCookie;
}

