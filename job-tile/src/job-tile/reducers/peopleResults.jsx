export const userPickerResultsDefault = []

export default function userPickerResults (state = userPickerResultsDefault, action){
    switch (action.type){

        case 'user_picker_success':
        
        console.log('user_picker_success');
        
        return {
            ...state,
            ...userPickerResultsDefault
        };

        default:
            return state
    
    }
}