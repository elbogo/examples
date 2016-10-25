/**
 *   on 2016-10-10.
 */

import React from 'react';
import {connect} from 'react-redux';
import {goBack} from 'react-router-redux'


import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

function VacancyApplyDone({dispatch}) {
    return <Dialog
        open={true}
        modal={true}
        actions={[
            <FlatButton label="OK" primary={true} onClick={() => dispatch(goBack())} />
        ]}
    >
        <h3>Your application request was sent to the contact person of this vacancy</h3>
        <p>You will be contacted as soon as possible</p>
    </Dialog>
}

export default VacancyApplyDone = connect(state => ({



}))(VacancyApplyDone)