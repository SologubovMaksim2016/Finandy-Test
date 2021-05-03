import {applyMiddleware, combineReducers, createStore} from 'redux';
import Reducer from "./redusers/Reduser";
import thunk from 'redux-thunk';

let reducers = combineReducers({
    data: Reducer
})
let store = createStore(reducers, applyMiddleware(thunk));
window.store = store;
export default store;
