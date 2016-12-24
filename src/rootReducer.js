import { combineReducers } from 'redux';
import MapReducer from './reducers/mapReducer';

const reducers = {
    map: MapReducer,
};

const rootReducer = combineReducers(reducers);

export default rootReducer;
