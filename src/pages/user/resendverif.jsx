import React, { Component } from 'react';
import Axios from 'axios'
import {connect} from 'react-redux'
import {ChangeHeader} from './../../redux/actions'
import { ApiURL } from '../../supports/apiurl';

class ResendVerif extends Component {
    componentDidMount(){
        this.props.ChangeHeader(false)
    }
    onBtnResendEmailClick=()=>{
        Axios.post(`${ApiURL}/users/resendemailver`,{
            username:this.props.LogReg.username,
            email:this.props.LogReg.email
        }).then((res)=>{
            console.log(res.data)
            alert('email berhasil')
        }).catch((err)=>{
            console.log(err)
        })
    }
    render() {
        return (
            <div className='home kontainer'>
                <h2>Tolong Diperhatikan</h2>
                <p>Silahkan mengecheck email anda untuk verifikasi account anda</p>
                <p>
                    Bila anda tidak mendapatkan email dari Raja Bajak Laut
                    harap cemas, dan click button dibawah untuk Resend
                </p>
                <input type="button" value="Resend Email" onClick={this.onBtnResendEmailClick} />
            </div>
        )
    }
}

const MapStateToProps=(state)=>{
    return{
        changeHead:state.HeaderBg,
        LogReg:state.LogReg
    }
  }

  export default connect(MapStateToProps,{ChangeHeader}) ( ResendVerif);