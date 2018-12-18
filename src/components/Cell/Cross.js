import React from 'react';

export default function Cross ({color}) {
    return (
        <div className="cross" style={{color: color}}>
            <div className="slash"/>
            <div className="slash back"/>
        </div>
    );
}