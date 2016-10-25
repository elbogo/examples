/**
 * 
 */

import React, {Component} from 'react';
import moment from 'moment';
import {Link} from 'react-router';

//local components
import Throbber from '../Throbber'
import Paging from '../Paging'

//local sub-components
import Panel from './Panel'

//style
import css from './VacanciesListView.css';

export default function VacanciesListView(props) {

    const {
        vacanciesList,
        listLoading,

        count,
        startFrom,
        clickPrev,
        clickNext,
        postVacancy,

        canCreate
    } = props;

    return <div className={css.main}>

        {canCreate() && <div style={{ textAlign: 'right' }}>
            <button onClick={() => postVacancy()}>Post a vacancy</button>
        </div>}

        <Panel {...props}/>

        <div className="list">

            {listLoading && <div className="curtain">
                <Throbber />
            </div>}

            {!!vacanciesList.length && <div>
                <table style={{ width:'100%' }}>
                    <tbody>
                    {vacanciesList.map(listItem => {

                        let action = '';

                        if (!listItem.responses.length) {

                            action = <Link to={`/apply/${listItem.vacancyId}`}>APPLY</Link>

                        } else if (!!listItem.responses.length && !listItem.responses[0].lastAnswerId) {

                            action = <Link>APPLIED</Link>

                        } else {

                            action = <Link>OPEN CHAT</Link>
                        }

                        return <tr key={listItem.vacancyId} className="list-item">
                            <td className="data">

                                <div className="title">
                                    <Link to={`/vacancy/${listItem.vacancyId}`}>{listItem.title}</Link>
                                </div>

                                <div className="city">
                                    {listItem.city}, {listItem.country}
                                </div>

                                <div className="date">
                                    by {moment(listItem.deadline).format('YYYY-MM-DD HH:mm')}
                                </div>
                            </td>
                            <td className="actions">
                                {action}
                            </td>
                        </tr>}
                    )}
                    </tbody>
                </table>
            </div>}

            {!vacanciesList.length && !listLoading && <div style={{ textAlign:'center' }}>
                <h1>The search returned no vacancies. Try another options.</h1>
            </div>}

            <Paging
                currentPageLength={vacanciesList.length}
                {...{clickPrev, clickNext, count, startFrom}}
            />
        </div>
    </div>
}
