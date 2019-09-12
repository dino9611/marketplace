import {combineReducers} from 'redux'
import HeaderBG from './HeaderBG'
import LogReg from './auth_log_reg'
import Countcartnotif from './Countnotifcart'

export default combineReducers({
    HeaderBg:HeaderBG,
    LogReg:LogReg,
    Countcartnotif
})