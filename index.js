import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {
    BrowserRouter as Router,
    Route
} from "react-router-dom";

ReactDOM.render((

    <Router>
        <Route path='/' component={App}/>
        {/*<Route path='/All' component={App}/>*/}
        {/*<Route path='/home&kitchen' component={App}/>*/}
        {/*<Route path='/sports&outdoors' component={App}/>*/}
        {/*<Route path='/health&personalcare' component={App}/>*/}
        {/*<Route path='/babyproducts' component={App}/>*/}
    </Router>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
