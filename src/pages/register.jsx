import React from 'react';
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
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
                            
                            <input type="text" ref='email' className=' mt-3 input-data  pl-1' placeholder='Email ex:example@'/>
                            <input type="text" ref='username' className=' mt-3 input-data  pl-1' placeholder='UserName'/>
                            <input type='password' ref='password' className=' mt-3 input-data  pl-1' placeholder='Password'/>
                            <input type="password" onChange={this.onRegisterchange} ref='confirm' className=' mt-3 input-data  pl-1 mb-3' placeholder='Confirm Password'/>
                            {
                                this.state.error===''?null:
                                <div className='alert alert-danger'>{this.state.error} <span onClick={()=>this.setState({error:''})} style={{fontWeight:'bolder',cursor:'pointer',float:'right'}}>x</span> </div>
                            }
                            {
                                this.state.loading===false?<input type='button' onClick={this.onBtnRegisterclick} className=' btn btn-primary rounded-pill' value='Register'/>:
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