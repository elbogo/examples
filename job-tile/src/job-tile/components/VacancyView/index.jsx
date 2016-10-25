/**
 *   on 2016-09-20.
 */

import React from 'react';
import css from './VacancyView.css'
import {Link} from 'react-router';

import MaterialFont from '../MaterialFont'
import thematics from '../../hardcodedData/thematics'
import types from '../../hardcodedData/positionType'

export default function VacancyView({
    vacancy,
    viewer,

    approve,
    reject,
    closeVacancy,
    openVacancy,
    deleteVacancy,
    apply,

    canDelete,
    canEdit,
    canApproveReject,
    canApply
}) {
    const {
        vacancyId,
        title,
        city,
        country,
        company,
        type,
        status,
        deadline,
        contactPerson,
        contactPersonEmail,
        contactPersonPhone,
        companyDescription,
        howtoapply,
        thematic,
        offer,
        requirements,
        responsibilities,

    } = vacancy;

    const isApproved = !!status && status.toLowerCase() == 'approved';

    return <div className={css.VacancyView}>
        <div className="curtain"></div>
        
        <MaterialFont />

        <div className="admin-actions" style={{ position:'absolute', zIndex:100 }}>
            {canEdit() && <span>
                <Link to={`edit/${vacancyId}`}><i className="material-icons">&#xE150;</i> Edit</Link>

                {status == 'open' && <a onClick={() => closeVacancy()}><i className="material-icons">&#xE899;</i> Close vacancy</a>}
                {status == 'closed' && <a onClick={() => openVacancy()}><i className="material-icons">&#xE898;</i> Open vacancy</a>}

            </span>}

            {canDelete() && <a onClick={() => deleteVacancy()}><i className="material-icons">&#xE14C;</i> Delete</a> }
        </div>


        {!!vacancyId && <div className="body">
            <div className="header">
                <h1>{title}</h1>
            </div>

            <div className="properties">
                <div className="line1">
                    <div className="property">
                        <h4>Application deadline</h4>
                        <p>{deadline}</p>
                    </div>

                    <div className="property">
                        <h4>Country</h4>
                        <p>{country}</p>
                    </div>

                    <div className="property">
                        <h4>City</h4>
                        <p>{city}</p>
                    </div>
                </div>

                <div className="line2">
                    <div className="property">
                        <h4>Company</h4>
                        <p>{company}</p>
                    </div>

                    <div className="property">
                        <h4>Position type</h4>
                        <p>{types[parseInt(type ,10)].name}</p>
                    </div>

                    <div className="property">
                        <h4>Thematic field</h4>
                        <p>{thematics[parseInt(thematic ,10)].name}</p>
                    </div>
                </div>

                <div className="line3">
                    <h3>Contact person</h3>

                    <div className="property">
                        <h4>Name</h4>
                        <p>{contactPerson.name.formatted}</p>
                    </div>

                    <div className="property">
                        <h4>e-mail</h4>
                        <p>{contactPersonEmail}</p>
                    </div>

                    <div className="property">
                        <h4>Telephone number</h4>
                        <p>{contactPersonPhone}</p>
                    </div>
                </div>
            </div>

            <div className="descriptions">
                <h2>Job description</h2>

                <div className="descr">
                    <h4>Company description</h4>
                    <p>{companyDescription}</p>
                </div>

                <div className="descr">
                    <h4>Your responsibilities</h4>
                    <p>{responsibilities}</p>
                </div>

                <div className="descr">
                    <h4>Job requirements</h4>
                    <p>{requirements}</p>
                </div>

                <div className="descr">
                    <h4>Our offer</h4>
                    <p>{offer}</p>
                </div>

                <div className="descr">
                    <h4>How to apply</h4>
                    <p>{howtoapply}</p>
                </div>
            </div>

            <div className="controls">
                { canApply() && <button onClick={() => apply()}>Apply</button> }
                { canApproveReject() && !isApproved && <button onClick={() => approve()}>Approve</button> }
                { canApproveReject() && <button onClick={() => reject()}>Reject</button>}
                <Link to="/">Close</Link>
            </div>
        </div>}
    </div>
}