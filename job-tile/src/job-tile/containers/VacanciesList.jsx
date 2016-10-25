/**
 *   on 2016-09-05.
 */

import React, {Component} from 'react';
import {Link} from 'react-router'
import {push} from 'react-router-redux'
import {connect} from 'react-redux'

import resizeMe from '../helpers/resizeMe';
import {hasRole} from '../helpers/rolesManager'

import VacanciesListView from '../components/VacanciesListView'

class VacanciesList extends Component {

    componentDidMount() {

        this.props.dispatch({
            type:'fetch_vacancies'
        });

        this.props.dispatch({
            type:'fetch_countries'
        });

        resizeMe()
    }


    componentDidUpdate() {
        resizeMe();
    }

    render() {
        
        const { dispatch } = this.props;
        
        return <div>
            <VacanciesListView
                setFilterCountry={country => dispatch({type:'set_filter_country', country})}
                
                setFilterCity={city => dispatch({type:'set_filter_city', city})}
                
                setSearchString={searchString => dispatch({type: 'set_search_string', searchString})}
                
                setSort={(sortField, sortOrder) => dispatch({type:'set_sort', sortField, sortOrder})}
                
                clickNext={() => dispatch({type: 'vacancies_next_page'})}
                
                clickPrev={() => dispatch({type: 'vacancies_prev_page'})}

                setFilterType={vacancyType => dispatch({type: 'set_filter_type', vacancyType})}

                postVacancy={() => dispatch(push('/create'))}
                
                canCreate={::this.canCreate}
                
                {...this.props} 
            />
        </div>
    }

    canCreate(){
        return hasRole('moderator') || hasRole('hr')
    }
}

export default connect(state => ({

    vacanciesList: state.vacancies.list,
    listLoading: state.vacancies.listLoading,
    listOutdated: state.vacancies.listOutdated,
    filterCountry: state.vacancies.filterCountry,
    filterCity: state.vacancies.filterCity,
    filterType: state.vacancies.filterType,
    countries: state.vacancies.countries,
    cities: state.vacancies.cities,
    count: state.vacancies.count,
    startFrom: state.vacancies.startFrom,
    sortField: state.vacancies.sortField,
    sortOrder: state.vacancies.sortOrder,
    
}))(VacanciesList)
