import { GET_RATING } from './actionTypes';
import { RATING_API } from '../../constants/endpoints';

export function getRating () {
    return async (dispatch) => {
        const result = await fetch(`${RATING_API}/rating`);

        if (result.data) {
            dispatch({
                type: GET_RATING,
                rating: result.data.rating
            });
        }
    }
}