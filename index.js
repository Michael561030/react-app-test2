import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {createStore, applyMiddleware} from 'redux';
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker';
import createSagaMiddleware from 'redux-saga';
import reducer, {watchRequest} from './reducer'
import {composeWithDevTools} from 'redux-devtools-extension';
import {
    BrowserRouter as Router,
    Route
} from "react-router-dom";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(sagaMiddleware)
    )
);
debugger;
sagaMiddleware.run(watchRequest);

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Route path='/' component={App}/>
        </Router>
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
