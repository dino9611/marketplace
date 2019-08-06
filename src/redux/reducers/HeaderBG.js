const INITIAL_STATE=true

export default(state=INITIAL_STATE,action)=>{
    switch(action.type){
        case 'HEADER_CHANGE':
            return action.payload
        default:
            return state
    }
}