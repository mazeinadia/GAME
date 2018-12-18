import React, { Component } from 'react';
import { connect } from 'react-redux';
import ButtonField from '../ButtonField/index';
import StartPage from '../StartPage/index'
import { checkLogin } from '../../SAR/login/actions';

class Game extends Component {
    componentDidMount() {
        this.props.checkLogin();
    }

    componentDidUpdate () {
        if (this.props.isAuthenticated === false) {
            this.props.history.push('/login')
        }
    }


    render() {
        const { inGame } = this.props;
        if (inGame) {
            return <ButtonField/>
        } else {
            return <StartPage/>
        }
    }
}

export default connect(
    state => ({
        inGame: state.Game.inGame,
        win: state.Game.win,
        isAuthenticated: state.Login.isAuthenticated
    }),
    dispatch => ({checkLogin: () => dispatch(checkLogin())})
)(Game);