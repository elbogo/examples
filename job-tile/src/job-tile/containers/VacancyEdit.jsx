import React, {Component} from 'react';
import VacancyCreateView from '../components/VacancyCreateView';
import {connect} from 'react-redux';
import resizeMe from './../helpers/resizeMe';

import {editVacancy} from '../actions/editVacancy'
import {openUserPicker} from '../actions/initUserPicker'


class VacancyEdit extends Component {

    componentDidMount() {

        this.requestData();

        resizeMe()
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.params.vacancyId != this.props.params.vacancyId) {
            this.requestData()
        }
    }
    
    
    render() {

        let { currentVacancy } = this.props;

        console.log('current vacancy: ', currentVacancy, this.props)

        return <div>
            <VacancyCreateView 
                currentVacancy={currentVacancy} 
                currentVacancyOnChange={::this.currentVacancyOnChange}
                initUserPicker={::this.initUserPicker} 
                vacancyAction={::this.updateVacancy} 
                action={'edit'}/>
        </div>
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

    updateVacancy(){
        console.log('editVacancy');

        this.props.dispatch({
            type:'edit_vacancy', currentVacancy: this.props.currentVacancy
        });
    }

    requestData(){
        this.props.dispatch({
            type:'fetch_vacancy',
            id: this.props.params.vacancyId
        });
    }
}

export default connect(state => ({
    currentVacancy: state.vacancy,    // this are props of VacancyEdit class
    userPickerResults: state.userPickerResults
}))(VacancyEdit)