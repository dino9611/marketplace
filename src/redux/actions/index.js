import Axios from 'axios'
import { ApiURL } from '../../supports/apiurl';


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
export const CountCartnotif=(idusers)=>{
    return (dispatch)=>{
        Axios.get(ApiURL+'/cart/getcountcart/'+idusers)
        .then((res1)=>{
            Axios.get(ApiURL+'/cart/getcountNotif/'+idusers)
            .then((res2)=>{
                dispatch({type:'COUNT_NOTIF_CART',payload:{jumlahcart:res1.data.jumlahcart,jumlahnotif:res2.data.jumlahnotif}})
            }).catch((err)=>{
                console.log(err)
            })
        }).catch((err)=>{
            console.log(err)
        })
    }
}
export const Categorylistload=()=>{
    return(dispatch)=>{
        Axios.get(ApiURL+'/admin/getAllcategoies')
        .then((res)=>{
            dispatch({type:'LIST_CATEGORY',payload:res.data.prod})
        }).catch((err)=>{
            console.log(err)
        })
    }
}