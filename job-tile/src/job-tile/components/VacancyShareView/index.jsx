import React, {Component} from 'react';
import {Link} from 'react-router';
import css from './VacancyShare.css'
import {initOsapiPicker} from './../../helpers/fetchHelpers'

import TextField from 'material-ui/TextField';

export default class VacancyShareView extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            userId: '',
            userName: ''
        }
    }

    render() {

        const {userId,userName} = this.state


        console.log('USerId: ', userId)

        const { vacancy, shareVacancy } = this.props

        return <div className={css.VacancyShare}>
            <div className="overlay"></div>
            <div className="popup">
                <header>Share vacancy</header>
                <section>
                    <TextField
                        hintText="Select user to share"
                        floatingLabelText="Select user to share"
                        value={userName}
                        onFocus={ (e) => { this.onUserChange(e); }}
                    />
                </section>
                <button onClick={ () => { shareVacancy(userId); } } >Send</button>
                <Link to={`/vacancy/${vacancy.vacancyId}`}>Cancel</Link>
            </div>
        </div>

    }


    onUserChange(reactEvent){

        initOsapiPicker().then( user => {
            console.log('USIR: ', user)
            this.setState({
                userId: user.id,
                userName: user.displayName,
            }, () => console.log('state', this.state));
        })


    }
}
