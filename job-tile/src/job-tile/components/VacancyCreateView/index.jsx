import React, {Component} from 'react';
import {Link} from 'react-router';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import countries from '../../hardcodedData/countries';
import thematics from '../../hardcodedData/thematics';
import positionTypes from '../../hardcodedData/positionType';

import classNames from 'classnames';
import * as objectHelpers from '../../helpers/objectHelpers.jsx'
import css from './VacancyCreate.css'
// Needed for onTouchTap
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
export default class VacancyCreateView extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        const {currentVacancy, currentVacancyOnChange, vacancyAction, initUserPicker , action} = this.props;
        
        const {
            title,
            type,
            thematic,
            city,
            country,
            company,
            deadline,
            companyDescription,
            contactPerson,
            contactPersonEmail,
            contactPersonPhone,
            requirements,
            responsibilities,
            offer,
            howtoapply
        } = currentVacancy;

        console.log('deadline: ', deadline)

        const deadlineDate  = !!deadline ? new Date(deadline) : null;
        console.log(parseInt(type),parseInt(thematic))


        const typeValue = isNaN(parseInt(type)) ? type : positionTypes[parseInt(type)].name;
        const thematicValue = isNaN(parseInt(thematic)) ? thematic : thematics[parseInt(thematic)].name;

        console.log(typeValue,thematicValue)

        console.log('deadlineDate : ', deadlineDate );

        const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactPersonEmail);

        const hasEmpty = objectHelpers.hasEmptyFields(currentVacancy);

        const disabled = hasEmpty || !emailValid;

        let contactPersonName = ''

        if(!!currentVacancy.contactPersonName){
            contactPersonName = currentVacancy.contactPersonName
        }else if(!!contactPerson){
            contactPersonName = contactPerson.displayName
        };


        console.log('validation: ', hasEmpty, emailValid, currentVacancy)
        console.log('disabled: ', disabled)

        const createButtonClassName = classNames({create: true, disabled: disabled})

        const countryItems = [];
        countries.map((country, i) => {
            countryItems.push(<MenuItem value={country.name} key={i} primaryText={country.name}/>);
        })

        const thematicItems = [];
        thematics.map((thematic, i) => {
            thematicItems.push(<MenuItem value={thematic.name} key={i} primaryText={thematic.name}/>);
        })

        const positionTypeItems = [];
        positionTypes.map((positionType, i) => {
            positionTypeItems.push(<MenuItem value={positionType.name} key={i} primaryText={positionType.name}/>);
        })

        const mainTitle = action == 'edit' ? 'edit vacancy' : 'post new vacancy';
        const actionTitle = action == 'edit' ? 'Update' : 'Create';


        return <div className={css.VacancyCreate}>
            <div className="curtain"></div>

            <div className="body">
                <div className="header">
                    <h1>{mainTitle}</h1>
                </div>

                <div className="properties">
                    <div className="line0">
                        <div className="property wide">

                            <TextField hintText="Type in text" floatingLabelText="Title"
                                       fullWidth={true}
                                       value={title}
                                       onChange={ e => { currentVacancyOnChange('title',e.target.value); } }/>
                        </div>
                    </div>
                    <div className="line1">
                        <div className="property">

                            <DatePicker hintText="Type in text" floatingLabelText="Application deadline" autoOk={true} value={deadlineDate}
                                        onChange={ (a,date) => { console.log(123, date); currentVacancyOnChange('deadline',date.getTime()); } }/>
                        </div>
                        <div className="property">

                            <SelectField onChange={ (event, index, value) => { console.log(event, index, value); currentVacancyOnChange('type',value); } }
                                         maxHeight={200} hintText="Select position type"
                                         value={typeValue}
                                         floatingLabelText="Position type">
                                {positionTypeItems}
                            </SelectField>
                        </div>
                        <div className="property wide">

                            <TextField hintText="Type in text" floatingLabelText="Company" fullWidth={true} value={company}
                                       onChange={ e => { currentVacancyOnChange('company',e.target.value); } }/>
                        </div>
                        <div className="property wide">

                            <SelectField onChange={ (event, index, value) => { currentVacancyOnChange('thematic',value); } }
                                         fullWidth={true} maxHeight={200} hintText="Select thematic"
                                         value={thematicValue}
                                         floatingLabelText="Thematic field">
                                {thematicItems}
                            </SelectField>
                        </div>

                    </div>

                    <div className="line2">

                        <div className="property">

                            <SelectField onChange={ (event, index, value) => { currentVacancyOnChange('country',value); } }
                                         maxHeight={200}
                                         hintText="Select country"
                                         value={country}
                                         floatingLabelText="Country">
                                {countryItems}
                            </SelectField>
                        </div>

                        <div className="property">

                            <TextField hintText="Type in text"
                                       floatingLabelText="City"
                                       value={city}
                                       onChange={ e => { currentVacancyOnChange('city',e.target.value); } }/>
                        </div>


                    </div>

                    <div className="line3">
                        <h3>Contact person</h3>

                        <div className="property">

                            <TextField hintText="Type in text"
                                       floatingLabelText="Name"
                                       value={contactPersonName}
                                       onFocus={ initUserPicker }/>
                        </div>


                        <div className="property wide">

                            <TextField hintText="Type in text" floatingLabelText="e-mail" fullWidth={true}
                                       value={contactPersonEmail}
                                       onChange={ e => { currentVacancyOnChange('contactPersonEmail',e.target.value); } }/>
                        </div>

                        <div className="property wide">

                            <TextField hintText="Type in text" floatingLabelText="Telephone number" fullWidth={true}
                                       value={contactPersonPhone}
                                       onChange={ e => { currentVacancyOnChange('contactPersonPhone',e.target.value); } }/>
                        </div>
                    </div>
                </div>

                <div className="descriptions">
                    <h2>Job description</h2>
                    <div className="descr">
                        <TextField
                            hintText="Type in text"
                            floatingLabelText="Company description"
                            multiLine={true}
                            rows={2}
                            fullWidth={true}
                            value={companyDescription}
                            onChange={ e => { currentVacancyOnChange('companyDescription',e.target.value); } }
                        />
                    </div>
                    <div className="descr">
                        <TextField
                            hintText="Type in text"
                            floatingLabelText="Your responsibilities"
                            fullWidth={true}
                            value={responsibilities}
                            onChange={ e => { currentVacancyOnChange('responsibilities',e.target.value); } }
                        />
                    </div>
                    <div className="descr">
                        <TextField
                            hintText="Type in text"
                            floatingLabelText="Job requirements"
                            fullWidth={true}
                            value={requirements}
                            onChange={ e => { currentVacancyOnChange('requirements',e.target.value); } }
                        />
                    </div>
                    <div className="descr">
                        <TextField
                            hintText="Type in text"
                            floatingLabelText="Our offer"
                            fullWidth={true}
                            value={offer}
                            onChange={ e => { currentVacancyOnChange('offer',e.target.value); } }
                        />
                    </div>
                    <div className="descr">
                        <TextField
                            hintText="Type in text"
                            floatingLabelText="How to apply"
                            fullWidth={true}
                            value={howtoapply}
                            onChange={ e => { currentVacancyOnChange('howtoapply',e.target.value); } }
                        />
                    </div>
                </div>


                <footer>
                    { hasEmpty && <div className="alert">
                        fill all fields before submitting a vacancy
                    </div>}
                    { !hasEmpty && !emailValid && <div className="alert">
                        E-mail is not valid
                    </div>}
                    <div className="form-buttons">
                        <div className={createButtonClassName}
                             onClick={ !disabled ? vacancyAction : () => { console.log('field are empty: ', currentVacancy); return false; }}>
                            {actionTitle}
                        </div>
                        <div className="cancel"><Link to='/'>Cancel</Link></div>
                    </div>
                </footer>
            </div>
        </div>
    }
}
