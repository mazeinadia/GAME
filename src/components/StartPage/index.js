import React, { Component } from 'react';
import { connect } from 'react-redux';
import { connect as startGame, disconnect } from '../../SAR/game/actions';
import './styles.css';

class StartPage extends Component {
    componentDidMount() {
        this.props.start();
    }

    render() {
        const { connection} = this.props;

        return (
            <div className="start-page">
                {connection && <h1>Wait for opponent...</h1>}
                {!connection && [
                    <img src='./logo.png' alt="XO-Game" className="logo" key={1}/>,
                    <input type="submit" key={2}
                           className="start-page__btn"
                           value="Start Game"
                           onClick={() => this.props.start()}/>
                ]}
            </div>
        );
    }
}

export default connect(
    state => ({
        connection: state.Game.connection,
        inGame: state.Game.inGame,
    }),
    dispatch => ({
        start: () => dispatch(startGame()),
        exit: () => dispatch(disconnect())
    })
)(StartPage);