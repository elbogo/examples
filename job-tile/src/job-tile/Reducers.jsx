/**
 *   on 2016-09-21.
 */

import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import app from './reducers/app'
import vacancies from './reducers/vacancies'
import vacancy from './reducers/vacancy'
import viewer from './reducers/viewer'

export default combineReducers({
    app,
    vacancies,
    vacancy,
    viewer,
    routing: routerReducer
})
