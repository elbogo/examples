/**
 *   on 2016-09-21.
 */

import {put, fork, select} from 'redux-saga/effects'
import {takeEvery, takeLatest} from 'redux-saga'
import {goBack, push} from 'react-router-redux'

import globalConfig from '../globalConfig'
import {fetchJSON, fetchOsapiGet, fetchOsapiPost, osapiPromise} from '../helpers/fetchHelpers'
import * as alerts from '../helpers/jiveNativeAlerts'
import {tilePath} from '../helpers/tileProps'
import applicationBody from '../helpers/applicationBody'


export function* getVacancyMock(action) {
    try {

        const loadedVacancyId = yield select(state => state.vacancy.vacancyId || false);

        if (!loadedVacancyId || loadedVacancyId != action.id) {

            yield put({type: 'vacancy_clear'});

            const allVacancies = yield fetchJSON(`${tilePath}/resources/vacancies.json`);

            const targetVacancy = allVacancies.filter(vacancy => vacancy.vacancyId == action.id);

            if (targetVacancy.length) {
                yield put({type: 'fetch_vacancy_success', vacancy: targetVacancy[0]})
            } else {
                yield put({type: 'fetch_vacancy_error', error: 'no vacancy found with id ' + action.id})
            }
        }

    } catch (error) {
        yield put({type: 'fetch_vacancy_error', error});
        throw(error)
    }
}

/**
 * gets vacancy details, contact person object
 *
 * @param action
 */
export function* getVacancy(action) {
    try {

        const loadedVacancyId = yield select(state => state.vacancy.vacancyId || false);

        if (!loadedVacancyId || loadedVacancyId != action.id) {
            
            yield put({type: 'vacancy_clear'});

            const response = yield fetchOsapiGet({
                href: globalConfig.serverBaseUrl + '/job/vacancy/' + action.id,
                authz: 'signed'
            });

            const targetVacancy = JSON.parse(response.content);

            console.log('targetVacancy', targetVacancy.contactPersonId, {...targetVacancy});
            
            const contactPerson = yield osapiPromise(api => api.people.get({id: targetVacancy.contactPersonId}));

            if (!contactPerson.error) {
                targetVacancy.contactPerson = contactPerson;    
            } else {
                console.info('contact person fetch error:', contactPerson.error);
                targetVacancy.contactPerson = {
                    name: {
                        formatted: 'Unknown' 
                    }
                }
            }

            yield put({type: 'fetch_vacancy_success', vacancy: targetVacancy})
        }

    } catch (error) {
        yield put({type: 'fetch_vacancy_error', error});
        throw error
    }
}


export function* approveVacancy(action) {
    try {

        console.log('appproving');

        const response = yield fetchOsapiGet({
            href: globalConfig.serverBaseUrl + '/job/vacancy/approve/' + action.id,
            authz: 'signed'
        });

        console.log('approve response: ', response);

        if (response.status === 200) {
            yield put(push('/vacancy/' + action.id));
            alerts.successAlert('Vacancy was approved successfully')
        } else {
            alerts.errorAlert('Error: Vacancy was not approved.')
        }


    } catch (error) {
        yield put({type: 'vacancy_approve_error', error});
        alerts.errorAlert('Error: Vacancy was not approved.');
        throw error
    }
}

export function* rejectVacancy(action) {

    console.log('actin: ', action);
    try {

        console.log('action: ', action);

        const response = yield fetchOsapiGet({
            href: globalConfig.serverBaseUrl + '/job/vacancy/reject/' + action.id + '?comment=' + action.comment,
            authz: 'signed'
        });

        console.log('reject response: ', response);

        if (response.status === 200) {
            yield put(push('/vacancy/' + action.id));
            alerts.successAlert('Vacancy was rejected')
        } else {
            yield put({type: 'vacancy_reject_error', error});
            alerts.errorAlert('Error: Vacancy was not rejected.')
        }

    } catch (error) {
        yield put({type: 'vacancy_reject_error', error});
        alerts.errorAlert('Error: Vacancy was not rejected.');
        throw error
    }
}

export function* shareVacancy(action) {

    console.log('share actin: ', action);
    try {

        console.log('action: ', action);

        const response = yield fetchOsapiGet({
            href: globalConfig.serverBaseUrl + '/job/vacancy/share/' + action.vacancyId + '?userId=' + action.userId,
            authz: 'signed'
        });

        console.log('reject response: ', response);

        if (response.status === 200) {
            yield put(push('/vacancy/' + action.id));
            alerts.successAlert('Vacancy was shared')
        } else {
            yield put({type: 'vacancy_reject_error', error});
            alerts.errorAlert('Error: Vacancy was not shared.')
        }

    } catch (error) {
        yield put({type: 'vacancy_reject_error', error});
        alerts.errorAlert('Error: Vacancy was not shared.');
        throw error
    }
}

function* applyVacancy(action) {
    try {
        
        const body = {
            vacancyId: action.vacancyId,
            text: applicationBody(action)
        };

        if (action.cvFile) body.file = action.cvFile;
        if (action.cvURL) body.cvUrl = action.cvURL;
        if (action.cvJiveDocId) body.documentId = action.cvJiveDocId;

        yield fetchOsapiPost({
            href: globalConfig.serverBaseUrl + '/job/vacancy/apply/' + action.vacancyId,
            authz: 'signed',
            headers: { 'Content-Type' : ['application/json'] },
            body
        });
        
        yield put({type:'vacancy_apply_success'});
        yield put(push(`/apply/${action.vacancyId}/done`))

    } catch (error) {
        throw error
    }
}

export default function* vacancySagas() {
    yield fork(takeLatest, 'fetch_vacancy', getVacancy);
    yield fork(takeLatest, 'vacancy_approve', approveVacancy);
    yield fork(takeLatest, 'vacancy_reject', rejectVacancy);
    yield fork(takeLatest, 'vacancy_share', shareVacancy);
    yield fork(takeLatest, 'vacancy_apply', applyVacancy);
}
