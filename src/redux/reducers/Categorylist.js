const INITIAL_STATE=[]

export default(state=INITIAL_STATE,action)=>{
    switch(action.type){
        case 'LIST_CATEGORY':
            return action.payload
        default:
            return state
    }
}
