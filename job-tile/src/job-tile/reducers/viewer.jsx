/**
 *   on 2016-10-05.
 */

export const viewerDefault = {
    roles:[]
};

export default function viewer(state = viewerDefault, action){
    switch(action.type){
        
        case 'fetch_roles_success':
            return{
                ...state,
                roles: action.roles
            };
        
        case 'fetch_viewer_success':
            return {
                ...state,
                ...action.viewer
            };
        
        default:
            return state
    }
}