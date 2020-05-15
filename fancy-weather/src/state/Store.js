import { createStore } from 'redux';
import weatherReducer from './Reducer'

const store = createStore(weatherReducer);

export default store;
