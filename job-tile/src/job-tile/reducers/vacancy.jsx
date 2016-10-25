/**
 *   on 2016-09-21.
 */

export const vacancyDefault = {
    
};

export const currentVacancyDefault = {
    title: "",
    city: "",
    country: "",
    company: "",
    thematic: "",
    type: "",
    deadline: "",
    contactPersonId: "",
    contactPersonName: "",
    contactPersonPhone: "",
    contactPersonEmail: "",
    companyDescription: "",
    responsibilities: "",
    requirements: "",
    offer: "",
    howtoapply: ""
}

export default function vacancy (state = vacancyDefault, action){
    switch (action.type){

        case 'fetch_vacancy_success':
            return {
                ...state,
                ...action.vacancy
            };
        
        case 'vacancy_clear':
            return vacancyDefault;



        case 'change_current_vacancy_title':
            console.log('title!!!');
            return {
                ...state,
                title: action.value
            };

        case 'change_current_vacancy_city':
            return {
                ...state,
                city: action.value
            };

        case 'change_current_vacancy_company':
            return {
                ...state,
                company: action.value
            };

        case 'change_current_vacancy_country':
            return {
                ...state,
                country: action.value
            };

        case 'change_current_vacancy_thematic':
            return {
                ...state,
                thematic: action.value
            };

        case 'change_current_vacancy_type':
            return {
                ...state,
                type: action.value
            };

        case 'change_current_vacancy_deadline':
            return {
                ...state,
                deadline: action.value
            };

        case 'change_current_vacancy_contactPersonId':
            console.log('id')
            return {
                ...state,
                contactPersonId: action.value
            };

        case 'change_current_vacancy_contactPersonName':
            console.log('name')

            return {
                ...state,
                contactPersonName: action.value
            };

        case 'change_current_vacancy_contactPersonPhone':
            console.log('phone')
            return {
                ...state,
                contactPersonPhone: action.value
            };

        case 'change_current_vacancy_contactPersonEmail':
            console.log('email')
            return {
                ...state,
                contactPersonEmail: action.value
            };

        case 'change_current_vacancy_companyDescription':
            return {
                ...state,
                companyDescription: action.value
            };

        case 'change_current_vacancy_responsibilities':
            return {
                ...state,
                responsibilities: action.value
            };

        case 'change_current_vacancy_responsibilities':
            return {
                ...state,
                responsibilities: action.value
            };

        case 'change_current_vacancy_requirements':
            return {
                ...state,
                requirements: action.value
            };

        case 'change_current_vacancy_offer':
            return {
                ...state,
                offer: action.value
            };

        case 'change_current_vacancy_howtoapply':
            return {
                ...state,
                howtoapply: action.value
            };


        case 'create_current_vacancy_success':

            console.log('new vacancy success')

            return {
                ...state,
                ...currentVacancyDefault
            };

        case 'update_current_vacancy_success':

            console.log('update vacancy success')

            return {
                ...state,
                ...action.vacancy
            };

        default:
            return state
    }
}
