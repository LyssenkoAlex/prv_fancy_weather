import {
    LOCATION
} from "./Actions";



const initialState = {
    language:'RU',
    location:''
};



function directorsRootReducer(state = initialState, action) {

    switch (action.type) {
        case LOCATION :
            return Object.assign({}, state, {location:action.location});
        default:
            return state;
    }
}

export default directorsRootReducer;
