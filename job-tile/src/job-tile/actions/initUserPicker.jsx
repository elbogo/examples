import {put, fork} from 'redux-saga/effects'
import {takeLatest} from 'redux-saga'
import {initOsapiPicker} from '../helpers/fetchHelpers'
import globalConfig from '../globalConfig'



export function* openUserPicker(action){

    try {
        const result = yield initOsapiPicker();

        const personEmailField = result.emails.find( email =>  { return email.jive_label === 'Email' } );
        const personPhone = result.phoneNumbers ? result.phoneNumbers.find( phone =>  { return phone.type === 'work' } ).value : ''

        yield put({type:'change_current_vacancy_contactPersonId', value: result.id});
        yield put({type:'change_current_vacancy_contactPersonName', value: result.displayName});
        yield put({type:'change_current_vacancy_contactPersonPhone', value: personPhone});
        yield put({type:'change_current_vacancy_contactPersonEmail', value: !!personEmailField ? personEmailField.value : ''});

        yield put({type:'user_picker_success', result});


    } catch (error) {
        yield put({type: 'init_user_picker_error', error});
        throw(error)
    }
}

export default function* initUserPickerSagas(){
    yield fork(takeLatest, 'init_user_picker', openUserPicker)
}
