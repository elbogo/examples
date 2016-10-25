/**
 *   on 2016-09-21.
 */

export const vacanciesDefault = {
    list:[],
    listOutdated:true,
    listLoading:false,
    filterCountry: false,
    filterCompany: false,
    filterCity: false,
    filterType: false,
    filterStatus: false,
    searchString:'',
    countries:[],
    cities:[],
    sortField: 'createDate',
    sortOrder: 'DESC',
    count: 10,
    startFrom: 0,
};

export default function vacancies (state = vacanciesDefault, action){
    switch (action.type){

        case 'fetch_vacancies':
            if (state.listOutdated) {
                return {
                    ...state,
                    listLoading: true
                };   
            } else {
                return state;
            }
        
        case 'fetch_vacancies_success':
            return {
                ...state,
                list: action.list,
                listOutdated: false,
                listLoading: false
            };
        
        case 'set_filter_country_success':
            return {
                ...state,
                listOutdated: true,
                filterCountry: action.country,
                filterCity: false,
                startFrom: vacanciesDefault.startFrom
            };

        case 'set_filter_city_success':
            return {
                ...state,
                listOutdated: true,
                filterCity: action.city,
                startFrom: vacanciesDefault.startFrom
            };
        
        case 'set_filter_type_success':
            return {
                ...state,
                listOutdated: true,
                filterType: action.vacancyType,
                startFrom: vacanciesDefault.startFrom
            };
        
        case 'set_search_string_success':
            return {
                ...state,
                listOutdated: true,
                searchString: action.searchString
            };

        case 'set_sort_success':
            return {
                ...state,
                listOutdated: true,
                sortField: action.sortField,
                sortOrder: action.sortOrder,
            };
        
        case 'fetch_countries_success':
            return {
                ...state,
                countries: action.countries
            };

        case 'vacancies_set_page':
            return {
                ...state,
                startFrom: action.startFrom,
                listOutdated: true,
            };

        case 'fetch_cities_success':
            return {
                ...state,
                cities: action.cities
            };
        
        case 'vacancy_apply_success':
            return {
                ...state,
                listOutdated: true,
            };
        
        default:
            return state
    }
}
