import { GET_RATING } from './actionTypes';

export default function Rating(state = {}, action) {
    switch (action.type) {
        case GET_RATING: return {
            ...state,
            rating: action.rating
        };

        default: return state;
    }
}