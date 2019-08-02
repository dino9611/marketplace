import React from 'react';
import {Link} from'react-router-dom'
import Loader from 'react-loader-spinner'
import {InputGroup, InputGroupAddon,Input} from 'reactstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faLock,faUser} from '@fortawesome/free-solid-svg-icons'
class Login extends React.Component {
    state = {
        error:'',
        loading:false,
      }
    render() { 
        return (
            <div className='mt-0'>
                {/* {this.changeBg()} */}
                <div className="kontainer ">
                    <div className='row justify-content-center mt-5'>
                        <div className="col-md-6 p-5 ">
                            <div className='px-5 py-5 login' square={false} classes=''>
                                <h1>LOGIN</h1>
                                <InputGroup className='mb-3 '>
                                    <InputGroupAddon><FontAwesomeIcon icon={faUser} className='mr-2 mt-2 text-primary'/></InputGroupAddon>
                                    <Input ref='' innerRef='' type='text' placeholder='username'/>
                                </InputGroup>
                                <InputGroup className='mt-3 mb-3'>
                                    <InputGroupAddon><FontAwesomeIcon icon={faLock} className='mr-2 mt-2 text-primary'/></InputGroupAddon>
                                    <Input type='password' placeholder='password' />
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
 
export default Login;