import React from 'react';
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {InputGroup, InputGroupAddon,Input} from 'reactstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faLock,faUser,faEnvelope,faCheckSquare} from '@fortawesome/free-solid-svg-icons'
import Axios from 'axios'
class Register extends React.Component {
    state = {
        error:'',
        loading:false,
      }
      onRegisterchange=()=>{
        var password=this.refs.pass.refs.pass.value
        var confirm=this.refs.confirm.refs.confirm.value
        if(confirm!==password){
            this.setState({error:'Password and confirm password must be same'})
        }
        if(confirm===''){
            this.setState({error:''})
        }
        if(confirm===password){
            this.setState({error:''})
        }  
    }
    onBtnRegisterclick=()=>{
        var email=this.refs.email.refs.email.value
        var username=this.refs.username.refs.username.value
        var password=this.refs.pass.refs.pass.value
        var confirm=this.refs.confirm.refs.confirm.value
        if(username===''||password===''||confirm===''||email===''){
            this.setState({error:'Semua Form Harus di Isi'})
        }else{
            if(confirm!==password){
                this.setState({error:'Password and confirm password must be same'})
            }else{
                this.setState({loading:true})
                //ngecek username udah ada atau belum
                Axios.get('http://localhost:2001/cekuser?username='+username)
                .then((res)=>{
                    if(res.data.length>0){
                        this.setState({loading:false})
                        this.setState({error:'username has been taken'})
                    }else{
                        Axios.post('http://localhost:2001/register',{username,password,email,roleid:3})
                        .then((res)=>{
                            console.log(res.data)
                            this.setState({loading:false})

                        })
                        .catch((err)=>{
                            console.log(err);
                        })
                    }
                })
                .catch((err)=>{
                    console.log(err);
                })
            }

        } 
    }
    render() { 
        return (
            <div className='mt-0'>
            <div className="container">
                <div className='row justify-content-center mt-5'>
                    <div className="col-md-6 p-4">
                        <div className=' px-5 py-5 login rounded' square={false}>
                            
                                <h1 className='text-primary'>Register</h1>
                            <InputGroup className='mt-3'>
                                <InputGroupAddon><FontAwesomeIcon icon={faEnvelope} className='mr-2 mt-2 text-primary'/></InputGroupAddon>
                                <Input type='email' ref='email' innerRef='email' placeholder='email/@'/>
                            </InputGroup>
                            <InputGroup className='mt-3'>
                                <InputGroupAddon><FontAwesomeIcon icon={faUser} className='mr-2 mt-2 text-primary'/></InputGroupAddon>
                                <Input type='text' ref='username' innerRef='username' placeholder='username'/>
                            </InputGroup>
                            <InputGroup className='mt-3 mb-3'>
                                <InputGroupAddon><FontAwesomeIcon icon={faLock} className='mr-2 mt-2 text-primary'/></InputGroupAddon>
                                <Input type='password' ref='pass' innerRef='pass' placeholder='password'/>
                            </InputGroup>
                            <InputGroup className='mt-3 mb-3'>
                                <InputGroupAddon><FontAwesomeIcon icon={faCheckSquare} className='mr-2 mt-2 text-primary'/></InputGroupAddon>
                                <Input type='password' ref='confirm' onInput={this.onRegisterchange} innerRef='confirm' placeholder='confirm password'/>
                            </InputGroup>
                            
                            {
                                this.state.error===''?null:
                                <div className='alert alert-danger'>{this.state.error} <span onClick={()=>this.setState({error:''})} style={{fontWeight:'bolder',cursor:'pointer',float:'right'}}>x</span> </div>
                            }
                            {
                                this.state.loading===false?<input type='button' onClick={this.onBtnRegisterclick} className=' btn btn-primary rounded-pill ml-4' value='Register'/>:
                                <Loader type="ThreeDots" color="#428bca" />
                            }
                        </div>
                            <p className='mt-3' style={{fontStyle:'italic'}}>
                                Sudah Punya Akun ?
                                <span style={{fontStyle:'normal',textDecoration:'none'}}><Link to='/login' style={{fontWeight:'bolder',cursor:'pointer',color:'#428bca'}}>Masuk Sekarang</Link></span>
                            </p>
                    </div>
                </div>
            </div>
        </div>
          );
    }
}
 
export default Register;