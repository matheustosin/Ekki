import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './pages/Home'
import Contact from './pages/Contact'
import Extract from './pages/Extract'

function Routes() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Home} />
            <Route path="/contact" component={Contact} />
            <Route path="/extract" component={Extract} />
        </BrowserRouter>
    )
}

export default Routes;