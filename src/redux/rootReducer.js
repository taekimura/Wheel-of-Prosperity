import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import wheelReducer from './wheel/wheel.reducer';

export default combineReducers({
    user: userReducer,
    wheel: wheelReducer
});