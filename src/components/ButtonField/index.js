import React, { Component } from 'react';
import { connect } from 'react-redux';
import {press} from '../../SAR/game/actions';
import './styles.css';

class ButtonField extends Component {
    render() {
        const { user, lostConnection, msg, win, press } = this.props;

        return(
            <div className="page">
                {!lostConnection && <div className="game">
                    {(win === true || msg) && [
                        <h1 className="title" key={1}>You are Winner</h1>,
                        <p className="news" key={2}>{msg}</p>
                    ]}
                    {win === false &&
                        <h1 className="title">You are Looser</h1>}
                    {win === undefined && [
                        <h1 className="title" key={1}>{'Your opponent is ' + user}</h1>,
                        <div className="btn" key={2} onClick={() => press()}>
                            PRESS ME
                        </div>
                    ]}
                </div>}
                {lostConnection &&
                    <h1 className="result" key={1}>Your opponent disconnect</h1>}
                    {/*<div className="select" key={2}>*/}
                        {/*<div>Wait</div>*/}
                        {/*<div>End game</div>*/}
                    {/*</div>*/}

            </div>
        );
    }
}

export default connect(
    state => ({
        lostConnection: state.Game.lostConnection,
        msg: state.Game.msg,
        user: state.Game.user,
        win: state.Game.win,
    }),
    dispatch => ({
        press: () => dispatch(press())
    })
)(ButtonField);