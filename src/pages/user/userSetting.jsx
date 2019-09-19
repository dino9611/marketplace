import React, { Component } from 'react';
import {connect} from 'react-redux'
import {ChangeHeader,RegLogSucces} from './../../redux/actions'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Axios from 'axios'
import {faEdit} from '@fortawesome/free-solid-svg-icons'
import { ApiURL } from '../../supports/apiurl';
import {Link} from 'react-router-dom'
import Loading from '../../components/loading';
import Pagenotfound from './../Pagenotfound'

class UserSetting extends Component {
    state = {
        UserSettingdata:null,
        editalamat:false,
        editpassword:false
    }
    componentDidMount(){
        Axios.get(ApiURL+'/users/userSettings',{
            params:{
                id:this.props.LogReg.id
            }
        }).then((res)=>{
            console.log(res.data)
            this.setState({UserSettingdata:res.data[0]})
        }).catch((err)=>{
            console.log(err)
        })
    }
    onUpdateAlamatClick=()=>{
        Axios.put(ApiURL+'/users/editalamatSetting',{
            alamat:this.refs.alamat.value
        },{
            params:{
                id:this.props.LogReg.id
            }
        }).then((res)=>{
            this.props.RegLogSucces(res.data[0])
            this.setState({UserSettingdata:res.data[0],editalamat:false})
        }).catch((err)=>{
            console.log(err)
        })
    }
    render() { 
        this.props.ChangeHeader(false)
        if(this.props.LogReg.username===''){
            return(<Pagenotfound/>)
        }
        if(this.state.UserSettingdata){
            return (
                <div className='home'>
                    <div className='row justify-content-center'>
                        <div className=" p-5 " style={{border:'2px solid #0275d8',width:'60%'}}>
                            <h3 className='text-primary text-center mb-5'>User Setting</h3>
                            <div className="row mt-2 ml-5 ">
                                <div className="col-4 mt-3 pl-3 text-primary ">
                                    Username
                                </div>
                                <div className="col-4 mt-3">
                                    {this.state.UserSettingdata.username}
                                </div>
                            </div>
                            <div className="row ml-5 mt-5">
                                <div className="col-4 mt-3 pl-3 text-primary">
                                    Status
                                </div>
                                <div className="col-6 mt-3">
                                    {this.state.UserSettingdata.statusver==='verified'?
                                        <span className='text-success'>
                                            Verified
                                        </span>
                                        :
                                        <div>
                                            <span className='text-danger mr-2'>
                                                Belum Verified
                                            </span>
                                            <Link to='/resendverif'>
                                                Klik untuk Verified
                                            </Link>
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className="row ml-5 mt-5">
                                <div className="col-4 mt-3 pl-3 text-primary">
                                    Paswword
                                </div>
                                <div className="col-4 mt-3">
                                    {
                                        this.state.editpassword?
                                        <div>
                                            <input type='text' ref='paslama' placeholder='Old Password' className='form-control' />
                                            <input type='text' ref='pasbaru' placeholder='New Password' className='form-control' />
                                            <button className='mt-1 mr-2 btn-primary btn' >Save</button>
                                            <button onClick={()=>this.setState({editpassword:false})} className='mt-1 btn-light btn'>Cancel</button>
                                        </div>
                                        :
                                        <div>
                                            ***********
                                            <div onClick={()=>this.setState({editpassword:true})} className='pointer-add'>
                                                <FontAwesomeIcon icon={faEdit} className='position-relative' style={{bottom:20,left:98}}/>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className="row ml-5 mt-5">
                                <div className="col-4 mt-3 pl-3 text-primary">
                                    Alamat
                                </div>
                                <div className="col-4 mt-3">
                                    {
                                        this.state.editalamat?
                                        <div>
                                            <textarea ref='alamat' defaultValue={this.state.UserSettingdata.alamat} style={{border:'2px solid grey',height:124,width:394}}/>
                                            <button className='mt-1 mr-2 btn-primary btn' onClick={this.onUpdateAlamatClick} >Save</button>
                                            <button onClick={()=>this.setState({editalamat:false})} className='mt-1 btn-light btn'>Cancel</button>
                                        </div>
                                        :
                                        <div>
                                            <div className='p-1' style={{border:'2px solid grey',height:124,width:394}}>
                                                {this.state.UserSettingdata.alamat?this.state.UserSettingdata.alamat:'alamat tidak ada mohon diisi'}
                                            </div>
                                            <div onClick={()=>this.setState({editalamat:true})} className='pointer-add'>
                                                <FontAwesomeIcon icon={faEdit} className='position-relative' style={{bottom:60,left:398}}/>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
              );
        }
        return <Loading/>
    }
}
const MapStateToProps=(state)=>{
    return{
        changeHead:state.HeaderBg,
        LogReg:state.LogReg
    }
}
export default connect(MapStateToProps,{ChangeHeader,RegLogSucces})(UserSetting);