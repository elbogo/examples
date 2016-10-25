/**
 *   on 2016-10-05.
 */

import {put, fork, select} from 'redux-saga/effects'
import {takeEvery, takeLatest} from 'redux-saga'

import globalConfig from '../globalConfig'
import {fetchOsapiGet, osapiPromise} from '../helpers/fetchHelpers'

function* getViewerRoles(){
    try {

        const response = yield fetchOsapiGet({
            href: globalConfig.serverBaseUrl + '/job/vacancy/roles',
            authz: 'signed'
        });

        const roles = response.content ? JSON.parse(response.content) : [];
        
        const {id, name, resources} = yield osapiPromise(api => api.people.getViewer());
        
        const href = resources.html.ref;
        
        console.log('roles', roles);
        
        yield put({type: 'fetch_roles_success', roles});
        yield put({type: 'fetch_viewer_success', viewer: {id, name, href}});
        yield put({type: 'initial_data_fetched'});

    } catch (err) {
        throw err
    }
}

export default function* viewerSagas(){
    yield fork(takeLatest, 'fetch_roles', getViewerRoles)
}