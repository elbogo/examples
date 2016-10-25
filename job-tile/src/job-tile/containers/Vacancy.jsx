/**
 * 
 */

import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux'
import {push} from 'react-router-redux'

import VacancyView from '../components/VacancyView'
import resizeMe from './../helpers/resizeMe';
import {hasRole} from '../helpers/rolesManager'

class Vacancy extends Component {


    componentDidMount() {
        
        this.requestData();

        resizeMe()
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.params.vacancyId != this.props.params.vacancyId) {
            this.requestData()
        }
    }
    
    componentDidUpdate(){
        resizeMe()
    }

    render() {
        
        const {dispatch, vacancy, viewer} = this.props;
        const {vacancyId} = vacancy;
        const canView = this.canView();

        return <div>
            {canView && <VacancyView 
                vacancy={vacancy}
                viewer={viewer}
                
                approve={() => dispatch({type:'vacancy_approve', id: vacancyId})}
                reject={() => dispatch(push(`/vacancy/${vacancyId}/reject`))}
                apply={() => dispatch(push(`/apply/${vacancyId}`))}
                openVacancy={() => dispatch({type:'open_vacancy', id: vacancyId})}
                closeVacancy={() => dispatch({type:'close_vacancy', id: vacancyId})}
                deleteVacancy={() => dispatch({type:'delete_vacancy', id: vacancyId})}
                
                canDelete={::this.canDelete}
                canEdit={::this.canEdit}
                canApproveReject={::this.canApproveReject}
                canApply={::this.canApply}
            />}
            
            {!canView && <div>
                <h1>You don't have access to this page</h1>
            </div>}

            <div><Link to='/'>Home</Link></div>
            <div className="children">{this.props.children}</div>
        </div>
    }
    
    requestData(){
        this.props.dispatch({
            type:'fetch_vacancy',
            id: this.props.params.vacancyId
        });
    }

    approveVacancy(e, vacancyId) {
        this.props.dispatch({
            type:'vacancy_approve',
            id: vacancyId
        });
    }

    authorOrContact(){
        const {authorId, contactPersonId} = this.props.vacancy;
        const {viewer} = this.props;

        return viewer.id == authorId || viewer.id == contactPersonId
    }
    
    canDelete(){
        return hasRole('moderator')
    }
    
    canEdit(){
        return hasRole('moderator') || (hasRole('hr') && this.authorOrContact())
    }

    canView(){
        const published = ['approved', 'closed'].indexOf(this.props.vacancy.status) != -1;
        const canEdit = hasRole('hr') && this.authorOrContact();
        
        return hasRole('moderator') || published || canEdit
    }
    
    canApproveReject(){
        return hasRole('moderator')
    }
    
    canApply(){
        
        const {responses, status} = this.props.vacancy;
        const isApproved = !!status && status.toLowerCase() == 'approved';
        
        return hasRole('seeker') && !responses.length && isApproved
    }
    
}

export default connect(state => ({
    
    vacancy: state.vacancy,
    viewer: state.viewer
    
}))(Vacancy)
