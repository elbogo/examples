/**
 *   on 2016-10-05.
 */

import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import osapi from 'jive/osapi';

import css from './VacancyApplyView.css'

export default class VacancyApplyView extends Component {

    constructor() {
        super();

        this.state = {
            comment: '',
            cvURL: '',
            cvFile: '',
            cvJiveDocId: ''
        }
    }

    render() {

        const {
            comment,
            cvURL,
            cvFile,
            cvJiveDocId
        } = this.state;

        const {
            title,

            applyForVacancy,
            cancel
        } = this.props;

        return <div className={css.main}>
            <div className="header">
                Apply for a vacancy «{title}»
            </div>

            <div className="cv">
                <h2>Attach Curriculum Vitae</h2>

                <div className="column center" style={{width: '28.6%'}}>
                    {/*<div>
                        <input
                            type="file"
                            style={{ padding: 5, background: '#fff'}}
                        />
                    </div>
                    <div className="label">
                        From your computer
                    </div>*/}
                </div>

                <div className="column center" style={{width: '7%'}}>
                    {/*or*/}
                </div>

                <div className="column center" style={{width: '28.6%'}}>
                    <div>
                        <input
                            type="text"
                            style={{ width: 230, padding: 5}}
                            value={cvURL}
                            onChange={::this.onURLChange}
                        />
                    </div>
                    <div className="label">
                        From web
                    </div>
                </div>

                {/*<div className="column center" style={{width: '7%'}}>
                 or
                 </div>

                 <div className="column center" style={{width: '28.6%'}}>
                 <div>
                 <button
                 onClick={::this.summonDocPicker}
                 style={{margin:0, width: 230, padding: 6}}
                 >Pick document</button>
                 </div>
                 <div className="label">
                 From this community
                 </div>
                 </div>*/}
            </div>

            <div className="comment">
                <TextField
                    floatingLabelText="Add accompanying letter"
                    multiLine={true}
                    value={comment}
                    onChange={::this.onCommentChange}
                    style={{ width:'100%' }}
                />
            </div>

            <div className="actions">
                <button
                    disabled={(!cvFile && !cvURL && !cvJiveDocId) || !this.isURL(cvURL)}
                    onClick={() => applyForVacancy({...this.state})}
                >Apply</button>

                <button onClick={() => cancel()}>Cancel</button>
            </div>
        </div>
    }

    isURL(url){
        return !!url.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi)
    }

    summonDocPicker() {
        osapi.jive.corev3.search.requestPicker({
            excludeContent: false,
            excludePlaces: true,
            excludePeople: true,
            success: function (data) {
                console.log('doc: ', data);
            },
            error: function (error) {
                throw error
            }
        });
    }

    onCommentChange(evt, value) {
        this.setState({
            comment: value
        })
    }

    onURLChange(evt) {
        this.setState({
            cvURL: evt.target.value
        })
    }
}