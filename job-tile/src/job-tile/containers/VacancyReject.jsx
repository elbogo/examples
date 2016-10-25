import React, {Component} from 'react';
import {connect} from 'react-redux';
import VacancyRejectView from '../components/VacancyRejectView';

class VacancyReject extends Component {

    render (){
        console.log('Reject this.props: ',this.props)
        return <div>
            <VacancyRejectView
                vacancy={this.props.vacancy}
                rejectVacancy={::this.rejectVacancy}/>
        </div>
    }


    rejectVacancy(e, vacancyId, comment) {
        this.props.dispatch({
            type:'vacancy_reject',
            id: this.props.vacancy.vacancyId,
            comment: comment
        });
        console.log('Reject clicked!', vacancyId)
    }

}

export default connect(state => ({

    vacancy: state.vacancy

}))(VacancyReject)