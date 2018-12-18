import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getRating } from '../../SAR/rating/actions';
import './styles.css';

class Rating extends Component {
    componentDidMount() {
        this.props.getRating();
    }

    render() {
        const rating = this.props.rating;
        return(
            <div className="rating">
                {rating && rating.length &&
                    <div className="record-container">
                        <div className="username">Username</div>
                        <div className="wins">Wins</div>
                        <div className="looses">Looses</div>
                    </div>
                }
                {rating && rating.length &&
                    rating.map((record, index) => (
                        <div className="record-container" key={index}>
                            <div className="username">{record.username}</div>
                            <div className="wins">{record.wins}</div>
                            <div className="looses">{record.looses}</div>
                        </div>
                    ))
                }
                {rating && rating.length === 0 &&
                    <h1>We have no rating yet</h1>
                }
                {rating === undefined &&
                    <h1>Rating is loading ...</h1>
                }
            </div>
        )
    }
}

export default connect(
    state => ({rating: state.Rating.rating}),
    dispatch => ({
        getRating: () => dispatch(getRating()),
    })
)(Rating);