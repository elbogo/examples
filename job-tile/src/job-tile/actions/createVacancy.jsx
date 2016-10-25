import {put, fork} from 'redux-saga/effects'
import {push} from 'react-router-redux'
import {takeLatest} from 'redux-saga'
import {fetchOsapiPost} from '../helpers/fetchHelpers'
import globalConfig from '../globalConfig'
import * as alerts from '../helpers/jiveNativeAlerts'

import thematics from './../hardcodedData/thematics';
import positionTypes from './../hardcodedData/positionType';

export function* createNewVacancy(action){

    try {
        console.log('action create: ', action, thematics)

        action.currentVacancy.type = positionTypes.findIndex( (type,i) =>{ return type.name == action.currentVacancy.type })
        action.currentVacancy.thematic =  thematics.findIndex( (thematic,i) =>{ return thematic.name == action.currentVacancy.thematic })

        const result = yield fetchOsapiPost({
                href: globalConfig.serverBaseUrl + '/job/vacancy/create',
                headers: { 'Content-Type' : ['application/json'] },
                body: action.currentVacancy,
                authz: 'signed'
            });

        console.log('result of create: ', result)

        if (result.status === 201) {
            yield put(push('/'));
            alerts.successAlert('Vacancy was created.')
            yield put({type:'create_new_vacancy_success', result});
        } else {
            alerts.errorAlert('Error: Vacancy was not created.')
            yield put({type: 'create_new_vacancy_error', error});
        }




    } catch (error) {
        yield put({type: 'create_new_vacancy_error', error});
        throw(error)
    }
}

export default function* createNewVacancySagas(){
    yield fork(takeLatest, 'create_new_vacancy', createNewVacancy)
}
