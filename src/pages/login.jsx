import React from 'react';
import {Link,Redirect} from'react-router-dom'
import Loader from 'react-loader-spinner'
import {InputGroup, InputGroupAddon,Input} from 'reactstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faLock,faUser} from '@fortawesome/free-solid-svg-icons'
import Axios from 'axios'
import {connect} from 'react-redux'
import {ChangeHeader,RegLogSucces} from './../redux/actions'
import { ApiURL } from '../supports/apiurl';
class Login extends React.Component {
    state = {
        error:'',
        loading:false,
      }
    componentDidMount(){
        this.props.ChangeHeader(false)
        console.log(this.props.changeHead)
        document.addEventListener('scroll', () => {
            var isTop = window.scrollY < 730;
            if (isTop !== this.props.changeHead) {
                this.props.ChangeHeader(isTop)
                // console.log(isTop)
            }
        });
    }
      onBtnLoginclick=()=>{
        this.setState({loading:true})        
        var username=this.refs.username.refs.username.value
        var password=this.refs.pass.refs.pass.value
        // var checkemail=username.split('').filter(val=>val==='@')[0]
        if(username===''||password===''){
            this.setState({error:'there are something missing in form'})
        }else{
            Axios.post(ApiURL+'/users/login',{
                username,password
            })
            .then((res)=>{
                console.log(res.data)
                if(res.data.status==='error'){
                    this.setState({error:res.data.error,loading:false})
                }
                else{
                    localStorage.setItem('terserah',res.data.data[0].username)
                    localStorage.setItem('token',res.data.token)
                    this.props.RegLogSucces(res.data.data[0])
                }
            })
            .catch((err)=>{
                this.setState({loading:false})
                console.log(err)
            })
        }
    }
    render() {
        this.props.ChangeHeader(false)
        document.addEventListener('scroll', () => {
            var isTop = window.scrollY < 730;
            if (isTop !== this.props.changeHead) {
                this.props.ChangeHeader(isTop)
                // console.log(isTop)
            }
        });
        if(this.props.LogReg.username!==''){
            return (<Redirect to='/'></Redirect>)
        }
        return (
            <div className='mt-0'>
                {/* {this.changeBg()} */}
                <div className="kontainer ">
                    <div className='row justify-content-center mt-5'>
                        <div className="col-md-6 p-5 ">
                            <div className='px-5 py-5 login' square='false' classes=''>
                                <h1 className='text-primary'>LOGIN</h1>
                                <InputGroup className='mb-3 '>
                                    <InputGroupAddon addonType='append'><FontAwesomeIcon icon={faUser} className='mr-2 mt-2 text-primary'/></InputGroupAddon>
                                    <Input ref='username' innerRef='username' type='text' placeholder='username'/>
                                </InputGroup>
                                <InputGroup className='mt-3 mb-3'>
                                    <InputGroupAddon addonType='prepend'><FontAwesomeIcon icon={faLock} className='mr-2 mt-2 text-primary'/></InputGroupAddon>
                                    <Input ref='pass' innerRef='pass' type='password' placeholder='password' />
                                </InputGroup>
                                
                                
                                {
                                    this.state.error===''?null:
                                    <div className='alert alert-danger mt-3'>{this.state.error} <span onClick={()=>this.setState({error:''})} style={{fontWeight:'bolder',cursor:'pointer',float:'right'}}>x</span></div>
                                }
                                {
                                    this.state.loading===false?<input type='button' onClick={this.onBtnLoginclick} className=' btn btn-primary rounded-pill ml-4' value='Login'/>:
                                    <Loader type="ThreeDots" color="#428bca" />
                                }
                            </div>
                                <p className=' mt-3' style={{fontStyle:'italic'}}>
                                    Belum Punya Akun ?
                                    <span style={{fontStyle:'normal'}}><Link to='/register' style={{fontWeight:'bolder',cursor:'pointer',color:'#428bca'}}>Daftar Sekarang</Link></span>
                                </p>
                        </div>
                    </div>
                </div>
            </div>
          );
    }
}
const MapStateToProps=(state)=>{
    return{
        LogReg:state.LogReg,
        changeHead:state.HeaderBg
    }
  }  
export default connect(MapStateToProps,{ChangeHeader,RegLogSucces}) (Login);