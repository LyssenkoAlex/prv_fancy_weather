import { createStore } from 'redux';
import directorsRootReducer from './Reducer'

const store = createStore(directorsRootReducer);

export default store;
