'use strict';

import {createStore, combineReducers} from 'redux';
import formReducer from './Form/FormReducer';

export default createStore(combineReducers({formState: formReducer}));
