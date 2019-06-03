import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom'
import { Routes } from './routes.js'
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/css/main.css';

ReactDOM.render(
    <Router>
        <Routes/>
    </Router>,
    document.getElementById('root')
);
serviceWorker.unregister();
