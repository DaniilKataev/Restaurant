import React from 'react';
import {MainPage, CartPage, ItemPage} from '../pages';
import {Switch, Route} from 'react-router';
import AppHeader from '../app-header';

import Background from './food-bg.jpg';

const App = () => {
    return (
        <div style={{background: `url(${Background}) center center/cover no-repeat`}} className="app">
            <AppHeader/>
            <Switch>
                <Route exact component={MainPage} path="/"/>
                <Route exact component={CartPage} path="/basket"/>
                <Route component={ItemPage} path="/:id"/>
            </Switch>
        </div>
    )
}

export default App;