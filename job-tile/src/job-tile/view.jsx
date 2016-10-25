/**
 *   on 2016-09-05.
 */

import 'babel-polyfill';
import 'isomorphic-fetch'

import jive from "jive";

// 3rd party modules
import React from 'react';
import {render} from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import {Router, IndexRedirect, createMemoryHistory} from 'react-router';
import {syncHistoryWithStore, routerMiddleware} from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import themePallete from './themePallete';

// Our redux modules
import {DevTools} from './helpers/reduxDevTools'

import Routes from './Routes';
import Reducers from './Reducers';
import Sagas from './Sagas'

//Our other modules
import {pushHistoryToParent, getCurrentPath, parentHashAvailable} from './helpers/historyHeplers'
import {initRolesManager} from './helpers/rolesManager'

// mode
const DEV = process.env.NODE_ENV === 'development';
const PROD = process.env.NODE_ENV === 'production';

// Making redux
const memoryHistory = createMemoryHistory();

const sagaMiddleware = createSagaMiddleware();

let middleware = applyMiddleware(
    sagaMiddleware,
    routerMiddleware(memoryHistory)
);

if (DEV) {
    middleware = compose(middleware, DevTools.instrument())
}

const store = createStore(Reducers, middleware);

const history = syncHistoryWithStore(memoryHistory, store);

sagaMiddleware.run(Sagas);

// Managing history interchange with parent

if (parentHashAvailable()) {
    const currentPath = getCurrentPath();

    if (currentPath) {
        history.push(currentPath)
    }

    parent.$j(parent).on('hashchange', e => history.push(e.fragment));

    history.listen(location => pushHistoryToParent(location));
}

initRolesManager(store.getState);

store.dispatch({type:'fetch_roles'});

jive.tile.onOpen(config => {
    try {

        render(
            <div style={{ minHeight:600 }}>
                <MuiThemeProvider muiTheme={getMuiTheme(themePallete)}>
                    <Provider store={store}>
                        <div>
                            <Router history={history}>
                                {Routes}
                            </Router>

                            {process.env.NODE_ENV === 'development' && <DevTools />}
                        </div>
                    </Provider>
                </MuiThemeProvider>
            </div>,

            document.querySelector('#main')
        )

    } catch (err) {
        throw(err)
    }
});
