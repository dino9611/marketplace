import React from 'react';
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {InputGroup, InputGroupAddon,Input} from 'reactstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faLock,faUser,faEnvelope,faCheckSquare} from '@fortawesome/free-solid-svg-icons'
class Register extends React.Component {
    state = {
        error:'',
        loading:false,
      }
    render() { 
        return (
            <div className='mt-0'>
            <div className="container">
                <div className='row justify-content-center mt-5'>
                    <div className="col-md-6 p-4">
                        <div className=' px-5 py-5 login' square={false}>
                            
                                <h1>Register</h1>
                            <InputGroup className='mt-3'>
                                <InputGroupAddon><FontAwesomeIcon icon={faEnvelope} className='mr-2 mt-2 text-primary'/></InputGroupAddon>
                                <Input type='text' placeholder='email/@'/>
                            </InputGroup>
                            <InputGroup className='mt-3'>
                                <InputGroupAddon><FontAwesomeIcon icon={faUser} className='mr-2 mt-2 text-primary'/></InputGroupAddon>
                                <Input type='text' placeholder='username'/>
                            </InputGroup>
                            <InputGroup className='mt-3 mb-3'>
                                <InputGroupAddon><FontAwesomeIcon icon={faLock} className='mr-2 mt-2 text-primary'/></InputGroupAddon>
                                <Input type='password' placeholder='password'/>
                            </InputGroup>
                            <InputGroup className='mt-3 mb-3'>
                                <InputGroupAddon><FontAwesomeIcon icon={faCheckSquare} className='mr-2 mt-2 text-primary'/></InputGroupAddon>
                                <Input type='password' placeholder='confirm password'/>
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