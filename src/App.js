import React, { Component } from 'react';
import LoginForm from './components/LoginForm/index';
import Game from './components/Game/index';
import Rating from './components/Rating/index';
import './App.css';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './SAR/reducer';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';


const store = createStore(reducer, {}, applyMiddleware(thunk));


class App extends Component {
  componentDidMount () {
        //store.dispatch(checkLogin());
  }

  render() {
    return (
        <Provider store={store}>
            <Router>
                <Switch>
                    <Route path="/" exact render={(props) =>
                    <Game {...props}/>}/>
                    }/>
                    <Route path="/login" render={(props) => <LoginForm isLogin {...props}/>}/>
                    <Route path="/register" render={() => <LoginForm isRegistration/>}/>
                    <Route path="/rating" component={Rating}/>
                </Switch>
            </Router>
        </Provider>
    );
  }
}

export default App;
