
const INITIAL_STATE={id:0,username:'',email:'',penjualid:null}

export default(state=INITIAL_STATE,action)=>{
    switch(action.type){
        case 'REG_LOG_SUCCESS':
            return action.payload
        case 'LOGOUT_SUCCESS' :
            return INITIAL_STATE
        default:
            return state
    }
}