import React, { Component } from 'react';
import { connect } from 'react-redux';
import Field from '../Field/Field';
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
            return <Field/>
        } else {
            return <StartPage/>
        }
    }
}

export default connect(
    state => ({
        inGame: state.Game.inGame,
        isAuthenticated: state.Login.isAuthenticated
    }),
    dispatch => ({checkLogin: () => dispatch(checkLogin())})
)(Game);