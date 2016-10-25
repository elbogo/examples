import React, {Component} from 'react';
import {connect} from 'react-redux';
import VacancyShareView from '../components/VacancyShareView';

class VacancyShare extends Component {

    render (){
        return <div>
            <VacancyShareView
                vacancy={this.props.vacancy}
                shareVacancy={::this.shareVacancy}/>
        </div>
    }


    shareVacancy(userId) {
        this.props.dispatch({
            type:'vacancy_share',
            vacancyId: this.props.vacancy.vacancyId,
            userId: userId
        });
        console.log('Share clicked!', userId)
    }

}

export default connect(state => ({

    vacancy: state.vacancy

}))(VacancyShare)