import React, { Component } from 'react';
import Navbar from './Navbar';
import 'semantic-ui-css/semantic.min.css';
import '../index.css';
import { BrowserRouter, Route } from 'react-router-dom'
import EventsList from './EventsList';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Home from './Home';


class App extends Component {
    render() {
        return (
            <BrowserRouter>
            <div>
                <Navbar />
                <Route exact path="/" component={Home} />
                <Route exact path="/search/" component={EventsList} />
            </div>
            </BrowserRouter>
        );
    }
}

export default connect(null, actions)(App);