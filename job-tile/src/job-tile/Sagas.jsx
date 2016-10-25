/**
 *   on 2016-09-21.
 */

import vacanciesSagas from './actions/vacancies'
import vacancySagas from './actions/vacancy'
import viewerSagas from './actions/viewer'
import createNewVacancySagas from './actions/createVacancy'
import editVacancySagas from './actions/editVacancy'
import initUserPickerSagas from './actions/initUserPicker'

export default function* Sagas (){
    yield [
        vacanciesSagas(),
        vacancySagas(),
        viewerSagas(),
        createNewVacancySagas(),
        editVacancySagas(),
        initUserPickerSagas()
    ]
}
