import React from 'react';
import {Link} from'react-router-dom'
import Loader from 'react-loader-spinner'

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
                                <input type="text" ref='username' className=' mt-3 input-data pl-1' placeholder='UserName/Email ex:example@'/>
                
                                <input type='password' ref='password' className='mt-3 input-data pl-1 mb-3' placeholder='Password'/>
                                
                                {
                                    this.state.error===''?null:
                                    <div className='alert alert-danger mt-3'>{this.state.error} <span onClick={()=>this.setState({error:''})} style={{fontWeight:'bolder',cursor:'pointer',float:'right'}}>x</span></div>
                                }
                                {
                                    this.state.loading===false?<input type='button' onClick={this.onBtnLoginclick} className=' btn btn-primary rounded-pill' value='Login'/>:
                                    <Loader type="ThreeDots" color="#428bca" />
                                }
                            </div>
                                <p className='mt-3' style={{fontStyle:'italic'}}>
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