/**
 *   on 2016-09-21.
 */

import {put, fork, select} from 'redux-saga/effects'
import {takeEvery, takeLatest} from 'redux-saga'

import {fetchJSON, fetchOsapiGet, URLWithParams} from '../helpers/fetchHelpers'
import {tilePath} from '../helpers/tileProps'


function* getVacanciesListMock(){

    try {
        
        const updateNeeded = yield select(state => state.vacancies.listOutdated);
        
        if (updateNeeded) {
            
            console.log('update needed, fetching')
            
            const list = yield fetchJSON(`${tilePath}/resources/vacancies.json`);

            yield put({type:'fetch_vacancies_success', list})   
        }

    } catch (error) {
        yield put({type:'fetch_vacancies_error', error});
        throw error
    }
}

/**
 * фетч списка вакансий с параметрами
 */
function* getVacanciesList(){
    
    try {

        const state = yield select(state => state.vacancies);
        
        if (state.listOutdated) {
            
            let query = {
                count: state.count,
                offset: state.startFrom,
                sort: state.sortField,
                order: state.sortOrder
            };
            
            if (state.filterCountry) query.country = state.filterCountry;
            if (state.filterCity) query.city = state.filterCity;
            if (state.filterType !== false) query.type = state.filterType;
            if (state.searchString) query.query = state.searchString;

            const result = yield fetchOsapiGet({
                href: URLWithParams('/job/vacancy/search2', query),
                authz: 'signed'
            });

            const list = result.content == '' ? [] : JSON.parse(result.content);

            console.log('vacancies', list)

            yield put({type:'fetch_vacancies_success', list})
        }
        
    } catch (error) {
        yield put({type:'fetch_vacancies_error', error});
        throw error
    }
}

/**
 * Запускает фетч вакансий и списка городов по стране
 *
 * @param action
 */
function* setFilterCountry({country}){
    try {

        const filterCountry = yield select(state => state.vacancies.filterCountry);
        
        if (country != filterCountry) {
            
            yield put({type:'set_filter_country_success', country});
            yield put({type:'fetch_vacancies'});

            const response = yield fetchOsapiGet({
                href: URLWithParams('/job/vacancy/variants2', {column:'city', country}),
                authz: 'signed'
            });

            const cities = response.content == '' ? [] : JSON.parse(response.content);

            yield put({type:'fetch_cities_success', cities})   
        }

    } catch (error) {
        throw error
    }
}

/**
 * устанавливает фильтр и перезагружает список
 *
 * @param action
 */
function* setFilterCity({city}){
    try {

        const filterCity = yield select(state => state.vacancies.filterCity);
        
        if (city != filterCity){
            yield put({type:'set_filter_city_success', city});
            yield put({type:'fetch_vacancies'});   
        }

    } catch (error) {
        throw error
    }
}

/**
 * фетч списка стран
 */
function* getCountriesList(){
    try {

        const result = yield fetchOsapiGet({
            href: URLWithParams('/job/vacancy/variants2', {column: 'country'}),
            authz: 'signed'
        });
        
        const countries = result.content == '' ? [] : JSON.parse(result.content);
        
        yield put({type:'fetch_countries_success', countries})

    } catch (error){
        throw error
    }
}

/**
 * устанавливает новую страницу и перезагружает список
 *
 * @param action
 */
function* setPage(action){
    try {

        const {startFrom, count} = yield select(state => state.vacancies);
        
        let newStartFrom = 0;
        
        switch (action.type){
            case 'vacancies_next_page':
                newStartFrom = startFrom + count;
                break;
            case 'vacancies_prev_page':
                newStartFrom = startFrom - count;
        }
        
        yield put({type:'vacancies_set_page', startFrom: newStartFrom});
        yield put({type:'fetch_vacancies'});

    } catch (error){
        throw error
    }
}

/**
 *
 * @param action
 */
function* setSearchString({searchString}){
    try {

        yield put({type: 'set_search_string_success', searchString})
        yield put({type:'fetch_vacancies'});

    } catch (error){
        throw error
    }
}

/**
 * 
 * @param action
 */
function* setSort({sortField, sortOrder}){
    try {

        yield put({type: 'set_sort_success', sortField, sortOrder});
        yield put({type:'fetch_vacancies'});

    } catch (error){
        throw error
    }
}

/**
 * 
 * @param action
 */
function* setFilterType({vacancyType}){
    try {

        yield put({type: 'set_filter_type_success', vacancyType});
        yield put({type:'fetch_vacancies'});

    } catch (error){
        throw error
    }
}

export default function* vacanciesSagas(){
    yield fork(takeLatest, 'fetch_vacancies', getVacanciesList);
    yield fork(takeLatest, 'fetch_countries', getCountriesList);
    yield fork(takeLatest, 'set_filter_country', setFilterCountry);
    yield fork(takeLatest, 'set_filter_city', setFilterCity);
    yield fork(takeLatest, 'set_filter_type', setFilterType);
    yield fork(takeLatest, 'set_sort', setSort);
    yield fork(takeLatest, 'set_search_string', setSearchString);
    yield fork(takeLatest, 'vacancies_next_page', setPage);
    yield fork(takeLatest, 'vacancies_prev_page', setPage);
}