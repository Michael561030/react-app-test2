import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {createStore, applyMiddleware} from 'redux';
import * as serviceWorker from './serviceWorker';
import createSagaMiddleware from 'redux-saga'
import Provider from 'redux-saga'
import reducer, {watchRequest} from './reducer'
import {
    BrowserRouter as Router,
    Route
} from "react-router-dom";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    reducer,
    applyMiddleware(sagaMiddleware));
sagaMiddleware.run(watchRequest);

const action = type => store.dispatch({type});

ReactDOM.render((
    <Provider store={store}><App store={store}/></Provider>
    // <Router>
    //     <Route path='/' component={App}/>
    // </Router>
), document.getElementById('root'));




// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
