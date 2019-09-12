const INITIAL_STATE={jumlahcart:null,jumlahnotif:null}

export default(state=INITIAL_STATE,action)=>{
    switch(action.type){
        case 'COUNT_NOTIF_CART':
            return action.payload
        default:
            return state
    }
}