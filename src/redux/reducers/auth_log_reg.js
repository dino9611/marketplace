
const INITIAL_STATE={id:0,username:'',email:''}

export default(state=INITIAL_STATE,action)=>{
    switch(action.type){
        case 'REG_LOG_SUCCESS':
            return action.payload
        default:
            return state
    }
}