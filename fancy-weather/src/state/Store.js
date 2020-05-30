import { createStore } from 'redux';
import weatherReducer from './Reducer'

// const store = createStore(weatherReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
const store = createStore(weatherReducer);

export default store;
