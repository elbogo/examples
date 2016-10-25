/**
 * 
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {push, goBack} from 'react-router-redux'

import resizeMe from './../helpers/resizeMe';

import VacancyApplyView from '../components/VacancyApplyView'

class VacancyApply extends Component {
    componentDidMount() {
        this.props.dispatch({type: 'fetch_vacancy', id: this.props.params.vacancyId})

        resizeMe();
    }

    componentDidUpdate() {
        resizeMe();
    }

    render() {
        return <div>
            <VacancyApplyView

                applyForVacancy={::this.applyForVacancy}
                cancel={::this.cancel}

                {...this.props.vacancy}
            />
            
            {this.props.children}
        </div>
    }

    cancel() {
        this.props.dispatch(goBack())
    }

    applyForVacancy(params) {
        console.log('applyForVacancy', params);

        this.props.dispatch({
            type: 'vacancy_apply',
            vacancyId: this.props.vacancy.vacancyId,
            vacancy: this.props.vacancy,
            viewer: this.props.viewer,
            ...params
        })
    }
}

export default VacancyApply = connect(state => ({

    vacancy: state.vacancy,
    viewer: state.viewer

}))(VacancyApply)