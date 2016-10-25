/**
 *   on 2016-10-05.
 */

export const appDefault = {
    initialDataFetched:false
};

export default function viewer(state = appDefault, action){
    switch(action.type){

        case 'initial_data_fetched':
            return{
                ...state,
                initialDataFetched:true
            };

        default:
            return state
    }
}