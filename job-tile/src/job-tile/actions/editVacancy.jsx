import {put, fork} from 'redux-saga/effects'
import {push} from 'react-router-redux'

import {takeLatest} from 'redux-saga'
import {fetchOsapiPost} from '../helpers/fetchHelpers'
import globalConfig from '../globalConfig'
import * as alerts from '../helpers/jiveNativeAlerts'

import thematics from './../hardcodedData/thematics';
import positionTypes from './../hardcodedData/positionType';

export function* editVacancy(action){

    try {

        console.log('action edit: ', action);
        console.log('positionTypes: ', positionTypes);
        console.log('thematics: ', thematics);

        console.log('action.currentVacancy.type: ', action.currentVacancy.type);
        console.log('action.currentVacancy.thematic: ', action.currentVacancy.thematic);

        if( typeof parseInt(action.currentVacancy.type) == 'number' && typeof parseInt(action.currentVacancy.thematic) == 'number'){
            console.log('NUM')

        }else{
            action.currentVacancy.type = positionTypes.findIndex( (type,i) =>{ return type.name == action.currentVacancy.type })
            action.currentVacancy.thematic =  thematics.findIndex( (thematic,i) =>{ return thematic.name == action.currentVacancy.thematic })
        }

        console.log('1action.currentVacancy.type: ', action.currentVacancy.type);
        console.log('1action.currentVacancy.thematic: ', action.currentVacancy.thematic);


        const result = yield fetchOsapiPost({
                href: globalConfig.serverBaseUrl + '/job/vacancy/update',
                headers: { 'Content-Type' : ['application/json'] },
                body: action.currentVacancy,
                authz: 'signed'
            });

        console.log('update result: ', result)
        if (result.status === 200) {
            const updated = JSON.parse(result.content);
            yield put(push(`/vacancy/${updated.vacancyId}`));
            alerts.successAlert('Vacancy was updated.')
            yield put({type:'update_current_vacancy_success', vacancy: updated });
        } else {
            alerts.errorAlert('Error: Vacancy was not created.')
            yield put({type: 'edit_vacancy_error', error});
        }



    } catch (error) {
        yield put({type: 'edit_vacancy_error', error});
        throw(error)
    }
}

export default function* createNewVacancySagas(){
    yield fork(takeLatest, 'edit_vacancy', editVacancy)
}
