import Game from './game/reducer';
import Login from './login/reducer';
import Rating from './rating/reducer';
import { combineReducers } from 'redux'

export default combineReducers({
    Game,
    Login,
    Rating
});