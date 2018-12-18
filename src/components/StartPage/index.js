import React, { Component } from 'react';
import { connect } from 'react-redux';
import { connect as startGame, restartGame, disconnect } from '../../SAR/game/actions';
import '../Field/Field';
import './styles.css';
import Field from "../Field/Field";

class StartPage extends Component {
    componentDidMount() {
        this.props.start();
    }

    render() {
        const { connection, inGame, winner, restart, exit, prize } = this.props;

        if (inGame) {
            return (<Field/>)
        }

        return (
            <div className="start-page">
                {connection && <h1>Wait for opponent...</h1>}
                {winner === true && [
                    <h1 className="result" key={1}>You are WINNER!</h1>,
                    <p key={2} className="prize-text">{prize}</p>,
                    <input type="submit" key={3} className="restart" onClick={() => restart()} value="New game"/>,
                    <div key={4} className="exit" onClick={() => exit()}>Exit</div>
                ]}
                {winner === false && <h1 className="result">You are LOSER!</h1>}
                {!connection && winner === undefined && [
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
        field: state.Game.field,
        inGame: state.Game.inGame,
        winner: state.Game.winner,
        prize: state.Game.prize
    }),
    dispatch => ({
        start: () => dispatch(startGame()),
        restart: () => dispatch(restartGame()),
        exit: () => dispatch(disconnect())
    })
)(StartPage);