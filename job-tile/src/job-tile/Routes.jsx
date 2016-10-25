/**
 *   on 2016-09-05.
 */

import React from 'react';

import {Route, IndexRoute} from 'react-router';

import BasePath from './containers/BasePath'
import VacanciesList from './containers/VacanciesList'
import Vacancy from './containers/Vacancy'
import VacancyCreate from './containers/VacancyCreate'
import VacancyEdit from './containers/VacancyEdit'
import VacancyApply from './containers/VacancyApply'
import VacancyApplyDone from './containers/VacancyApplyDone'
import VacancyReject from './containers/VacancyReject'
import VacancyShare from './containers/VacancyShare'


export default (
    <Route path="/" component={BasePath}>
        <IndexRoute component={VacanciesList}/>
        <Route path="vacancy/:vacancyId" component={Vacancy}>
            <Route path="reject" component={VacancyReject}/>
            <Route path="share" component={VacancyShare}/>
        </Route>
        <Route path="create" component={VacancyCreate}/>
        <Route path="edit/:vacancyId" component={VacancyEdit}/>
        <Route path="apply/:vacancyId" component={VacancyApply}>
            <Route path="done" component={VacancyApplyDone}/>
        </Route>
    </Route>
)
