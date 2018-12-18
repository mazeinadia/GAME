import React, { Component, PureComponent } from 'react';
import { cellState } from '../../constants/enums';
import Zero from './Zero';
import Cross from './Cross';
import './Cell.css';

export default class Cell extends PureComponent{
    render() {
        let  inside;

        switch(this.props.element){
            case cellState.cross:
                inside = (<Cross/>);
                break;
            case cellState.zero:
                inside = (<Zero/>);
                break;
            default: inside = <div className="empty" onClick={() => this.props.onClick()}/> ;
        }

        return (
            <div className="cell">
                {inside}
            </div>
        );
    }
}