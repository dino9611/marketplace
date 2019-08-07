import React from 'react';
import {connect} from 'react-redux'
import {ChangeHeader,RegLogSucces} from './../../redux/actions'
import Loader from 'react-loader-spinner'
import {InputGroup, InputGroupAddon,Input} from 'reactstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faStore,faMapMarked,faUser,faStoreAlt} from '@fortawesome/free-solid-svg-icons'
import Axios from 'axios'
import {Link,Redirect} from 'react-router-dom'
import { ApiURL } from '../../supports/apiurl';

class JualReg extends React.Component {
    state = {
        error:'',
        loading:false,
      }
    componentDidMount(){
        this.props.ChangeHeader(false)
        document.removeEventListener('scroll', () => {
            var isTop = window.scrollY < 730;
            if (isTop !== this.props.changeHead) {
                this.props.ChangeHeader(isTop)
                console.log(this.props.changeHead)
            }
        })
    }
    onBtnRegisterTokoclick=()=>{
        var kategoritoko= this.refs.category.refs.category.value
        var namatoko=this.refs.toko.refs.toko.value
        var alamattoko=this.refs.alamat.refs.alamat.value
        var id=this.props.location.pathname.split('/')[2]
        console.log(id)
        Axios.post(ApiURL+'/Regjual/'+id,{namatoko,alamattoko,kategoritoko})
        .then((res)=>{
            console.log(res.data[0])
            var penjualid=res.data[0].id
            Axios.put(ApiURL+'/Regjual/'+id,{penjualid})
            .then((res)=>{
                this.props.RegLogSucces(res.data[0])
            })
            .catch((err)=>{
                console.log(err)
            })
            
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    render() {
        if(this.props.LogReg.penjualid!==null&&this.props.LogReg.username===''){
            return <Redirect to='/login'></Redirect>
        }
        if(this.props.LogReg.penjualid!==null){
            return <Redirect to='/'></Redirect>
        }  
        return (
            <div>
                <div className="home kontainer">
                    <div className="mt-5">
                            <div className='row justify-content-center mt-5'>
                                <div className="col-md-6 p-4">
                                    <div className=' px-5 py-5 rounded' square={false}>
                                        <h1 className='text-primary'>Registrasi Penjual</h1>
                                        <InputGroup className='mt-3'>
                                            <InputGroupAddon><FontAwesomeIcon icon={faUser} className='mr-3 mt-2 ml-1 text-primary'/></InputGroupAddon>
                                            <div className='mt-1'>{this.props.LogReg.username}</div>
                                        </InputGroup>
                                        <InputGroup className='mt-3'>
                                            <InputGroupAddon><FontAwesomeIcon icon={faStore} className='mr-2 mt-2 text-primary'/></InputGroupAddon>
                                            <Input type='text' ref='toko' innerRef='toko' placeholder='Nama Toko'/>
                                        </InputGroup>
                                        <InputGroup className='mt-3 '>
                                            <InputGroupAddon><FontAwesomeIcon icon={faMapMarked} className='mr-2 mt-2 text-primary'/></InputGroupAddon>
                                            <Input type='textarea' ref='alamat' innerRef='alamat' placeholder='alamat'/>
                                        </InputGroup>
                                        <InputGroup className='mt-3 mb-5'>
                                            <InputGroupAddon><FontAwesomeIcon icon={faStoreAlt} className='mr-2 mt-2 text-primary'/></InputGroupAddon>
                                            <Input type='select' ref='category' innerRef='category'>
                                                <option value="1">Pertanian</option>
                                                <option value="2">Peternakan</option>
                                                <option value="3">Perikanan</option>
                                            </Input>
                                        </InputGroup>
                                        {
                                            this.state.error===''?null:
                                            <div className='alert alert-danger'>{this.state.error} <span onClick={()=>this.setState({error:''})} style={{fontWeight:'bolder',cursor:'pointer',float:'right'}}>x</span> </div>
                                        }
                                        {
                                            this.state.loading===false?<input type='button' onClick={this.onBtnRegisterTokoclick} className=' btn btn-primary rounded-pill ml-4' value='Register Toko'/>:
                                            <Loader type="ThreeDots" color="#428bca" />
                                        }
                                    </div>

                                </div>
                            </div>
                        
                    </div>
                </div>
            </div>
          );
    }
}
const MapStateToProps=(state)=>{
    return{
        LogReg:state.LogReg
    }
  }  
export default connect(MapStateToProps,{ChangeHeader,RegLogSucces}) (JualReg);