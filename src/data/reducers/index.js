// combine reducers me permite unir todos los reducers que necesite
import { combineReducers } from 'redux';
import auth from './auth'

// le paso por argumento todos los reducers creados que desee unir
export default combineReducers({
   auth
});