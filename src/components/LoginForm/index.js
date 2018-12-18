import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { reg, login } from '../../SAR/login/actions';
import './styles.css';

class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.email = createRef();
        this.password = createRef();
        this.confirmation = createRef();
    }

    componentDidUpdate() {
        if (this.props.isAuthenticated) {
            this.props.history.push('/')
        }
    }

    render() {
        return(
            <div className="login-form">
                {this.props.isRegistration &&
                    <h1>Registration</h1>
                }
                {this.props.isLogin &&
                <h1>Log in</h1>
                }
                <input className="login-form__field"
                       type="text"
                       ref={this.email}
                       placeholder="E-mail"
                       autoFocus/>
                <input className="login-form__field"
                       type="text"
                       ref={this.password}
                       placeholder="Password"/>
                {this.props.isLogin && [
                    <input type="submit"
                           key={1}
                           className="login-form__btn"
                           onClick={() => this.props.login(
                                this.email.current.value,
                                this.password.current.value)}
                           disabled={this.props.loginInProcess}
                           value={this.props.loginInProcess ? 'Wait...' : 'Log In'}/>,
                    <Link to='/register' key={2}>Register</Link>
                ]}

                {this.props.isRegistration && [
                    <input className="login-form__field"
                           type="text"
                           key={1}
                           ref={this.confirmation}
                           placeholder="Confirm password"/>,
                    <input type="submit"
                           key={2}
                           className="login-form__btn"
                           onClick={() => this.props.reg(
                                this.email.current.value,
                                this.password.current.value,
                                this.confirmation.current.value)}
                           value="Register"/>
                ]}
                {}
            </div>
        )
    }
}

export default connect(
    state => ({
        loginInProcess: state.Login.loginInProcess,
        isAuthenticated: state.Login.isAuthenticated
    }),
    dispatch => ({
        login: (email, pass) => dispatch(login(email, pass)),
        reg: (email, pass, confirm) => (pass === confirm && dispatch(reg(email, pass, confirm)))
    })
)(LoginForm);