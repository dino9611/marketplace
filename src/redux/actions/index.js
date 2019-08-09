
export const ChangeHeader =(bole)=>{
    return{
        type:'HEADER_CHANGE',
        payload:bole
    }
}
export const RegLogSucces =(bole)=>{
    return{
        type:'REG_LOG_SUCCESS',
        payload:bole
    }
}
export const LogOutSuccess=()=>{
    return{
        type:'LOGOUT_SUCCESS'
    }
}