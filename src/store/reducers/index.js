// redux Stuff.
import { combineReducers } from 'redux';

// Different App Reducers.
import login from './login';
import system from './system';
import monitoring from './monitoring';

export default combineReducers({
    login,
    system,
    monitoring
})