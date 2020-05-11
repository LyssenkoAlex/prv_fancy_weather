import {
    CHANGE_LANGUAGE
} from "./Actions";



const initialState = {
    language:'RU'
};



function directorsRootReducer(state = initialState, action) {

    switch (action.type) {
        case CHANGE_LANGUAGE :
            return Object.assign({}, state, {language:'EN'});
        default:
            return state;
    }
}

export default directorsRootReducer;
