import React from 'react';
import Axios from 'axios'
import queryString from 'query-string'
import { ApiURL } from '../../supports/apiurl';
import {connect} from 'react-redux'
import {ChangeHeader,RegLogSucces} from './../../redux/actions'
import {Link} from 'react-router-dom'


class Verified extends React.Component {
    state = {
        laoding:true,
        status:'Unverified',

      }
    componentDidMount(){
        this.props.ChangeHeader(false)
        var params=queryString.parse(this.props.location.search)
        console.log(params)
        var username=params.username
        var password=params.password
        Axios.put(`${ApiURL}/users/verifikasiemail`,{
            username,password
        }).then((res)=>{
            console.log(res.data)
            this.props.RegLogSucces(res.data[0])
            this.setState({status:'berhasil'})
            console.log(this.props.LogReg)
        }).catch((err)=>{
            console.log(err)
            this.setState({status:'gagal'})
        })
    }
    render() { 
        if(this.state.status==='berhasil'){
            return (
                <div className='home'>
                    <center>
                        <h1>email anda sukses terverifikasi</h1>
                        <h1>Selamat bergabung di Roli</h1>
                        <Link to='/' style={{textDecoration:'none'}}>
                            <span className="arrow mt-3" />Return To Homepage
                
                        </Link>
                    </center>
                </div>
              );
        }else if(this.state.status==='gagal'){
            return(
                <div className='home'>
                    <center>
                        <h1>Gagal memverifikasi email anda</h1>
                        <h1>mohon refresh kembali</h1>

                    </center>
                </div>
            )
        }
        return(
        <div className='home'>
            <center>
                <h1>sedang memverifikasi</h1>

            </center>
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
export default connect(MapStateToProps,{ChangeHeader,RegLogSucces}) ( Verified);