/**
 * 
 */

import React, {Component} from 'react';
import VacancyCreateView from '../components/VacancyCreateView';
import {connect} from 'react-redux';
import resizeMe from './../helpers/resizeMe';

import {createNewVacancy} from '../actions/createVacancy'
import {openUserPicker} from '../actions/initUserPicker'


class VacancyCreate extends Component {

    componentDidMount() {
        console.log('createVacancy mounted');
        resizeMe();
    }

    currentVacancyOnChange(fieldName,value){
        console.log('currentVacancyOnChange');
        this.props.dispatch({
            type:'change_current_vacancy_'+fieldName, fieldName: fieldName, value: value
        });
    }

    initUserPicker(){
        console.log('will dispatch init picker action')
        this.props.dispatch({
            type:'init_user_picker'
        });
    }

    createVacancy(){
        console.log('createVacancy');

        this.props.dispatch({
            type:'create_new_vacancy', currentVacancy: this.props.currentVacancy
        });
    }

    render() {

        let { currentVacancy } = this.props;


        console.log('current: ', currentVacancy)

        return <div>
            <VacancyCreateView
                currentVacancy={currentVacancy}
                currentVacancyOnChange={::this.currentVacancyOnChange}
                initUserPicker={::this.initUserPicker}
                vacancyAction={::this.createVacancy}
                action={'create'}
            />
        </div>
    }
}

export default connect(state => ({
    currentVacancy: state.vacancy,    // this are props of VacancyCreate class
    userPickerResults: state.userPickerResults
}))(VacancyCreate)
