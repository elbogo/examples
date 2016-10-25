import React, {Component} from 'react';
import {Link} from 'react-router';
import css from './VacancyReject.css'

import TextField from 'material-ui/TextField';

export default class VacancyRejectView extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            comment: ''
        }
    }

    render() {

        const {comment} = this.state

        const { vacancy, rejectVacancy } = this.props

        return <div className={css.VacancyReject}>
            <div className="overlay"></div>
            <div className="popup">
                <header>You are about to reject publication of the vacancy</header>
                <section>
                    <TextField
                        hintText="Hint Text"
                        floatingLabelText="Floating Label Text"
                        value={comment}
                        onChange={ (e) => { this.onCommentChange(e); }}
                    />
                </section>
                <button onClick={ () => { console.log('click on send'); rejectVacancy(comment); } } >Send</button>
                <Link to={`/vacancy/${vacancy.vacancyId}`}>Cancel</Link>
            </div>
        </div>

    }


    onCommentChange(reactEvent){

        this.setState({
            comment: reactEvent.target.value
        }, () => console.log('state', this.state));
    }
}
