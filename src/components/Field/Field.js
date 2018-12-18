import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCellState } from '../../SAR/game/actions';
import { cellState } from '../../constants/enums';
import Cell from '../Cell/Cell';
import './Field.css';

class Field extends Component {
    render() {
        const { actionIsAvailable, setCellState, field, usersElement, lostConnection, prize } = this.props;

        const fieldElements = field ? field.map((row, rowIndex) => (
            <div className="row" key={rowIndex}>
                {row.map((cell, cellIndex) => (
                    <Cell element={cell}
                          key={rowIndex.toString() + cellIndex}
                          onClick={() => (actionIsAvailable && cell === cellState.empty) ?
                              setCellState(rowIndex, cellIndex, usersElement) :
                              null}/>
                ))}
            </div>
        )) : null;

        return(
            <div className="page">
                {!lostConnection && <div className="game">
                    {actionIsAvailable && <h1 className="title">YOUR TURN</h1>}
                    {!actionIsAvailable && <h1 className="title">WAIT!</h1>}
                    <div className="field">
                        {fieldElements}
                    </div>
                </div>}
               {lostConnection && [
                    <h1 className="result" key={1}>Your opponent disconnect</h1>,
                    <div className="select" key={2}>
                        <div>Wait</div>
                        <div>End game</div>
                    </div>
                ]}
            </div>
        );
    }
}

export default connect(
    state => ({
        actionIsAvailable: state.Game.actionIsAvailable,
        field: state.Game.field,
        usersElement: state.usersElement
    }),
    dispatch => ({
        setCellState: (rowIndex, cellIndex, newCellState) => dispatch(setCellState(rowIndex, cellIndex, newCellState))
    })
)(Field);