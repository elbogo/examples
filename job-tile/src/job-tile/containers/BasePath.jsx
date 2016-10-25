/**
 *   on 2016-09-05.
 */

import React from 'react';
import {connect} from 'react-redux';

import {hasRole} from '../helpers/rolesManager'
import Throbber from '../components/Throbber'

function BasePath ({children, prefetched}) {

    const hasRight = hasRole('seeker') || hasRole('hr') || hasRole('moderator');

    return <div>
        {!prefetched && <Throbber />}
        {(prefetched && hasRight) && children}
        {(prefetched && !hasRight) && <h1>You don't have access to this page</h1>}
    </div>
}

export default BasePath = connect(state => ({
    prefetched: state.app.initialDataFetched,
}))(BasePath)
