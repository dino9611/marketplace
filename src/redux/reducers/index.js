import {combineReducers} from 'redux'
import HeaderBG from './HeaderBG'
import LogReg from './auth_log_reg'

export default combineReducers({
    HeaderBg:HeaderBG,
    LogReg:LogReg
})