/**
 *   on 2016-10-07.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux'

let getState;

function initRolesManager(gs){
    getState = gs;
}

function hasRole (role){
    if (typeof getState == 'function'){
        const roles = getState().viewer.roles;
        
        if (roles.indexOf(role) != -1){
            return true;
        }
        
        return false;
    }
    
    return false;
}

function IfRole(props){

    let testsPassed = true;

    const {is, isNot, children, roles} = props;

    if (props.is && roles.indexOf(is) == -1){
        testsPassed = false;
    }

    if (props.isNot && roles.indexOf(isNot) != -1){
        testsPassed = false;
    }

    if (testsPassed) {
        return <div>{children}</div>
    } else {
        return null
    }
}

IfRole = connect(state => ({

    roles: state.viewer.roles

}))(IfRole);

export { IfRole, initRolesManager, hasRole }