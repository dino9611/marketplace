import React, { Component } from 'react';
import {connect} from 'react-redux'
import {ChangeHeader} from './../../redux/actions'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {CustomInput} from 'reactstrap'
import Axios from 'axios'
import {faEdit} from '@fortawesome/free-solid-svg-icons'
import { ApiURL } from '../../supports/apiurl';
import Loading from '../../components/loading';

class PenjualSetting extends Component {
    state = {
        editImageFilePenjualProfileName:'Select Image....',
        editImagePenjualProfileFile:undefined,
        editImageFileBgName:'Select Image....',
        editImageBgFile:undefined,
        editfotoprofile:false,
        editbgprofile:false,
        editabout:false,
        editalamat:false,
        Sellersettingsdata:null
    }
    componentDidMount(){
        Axios.get(ApiURL+'/penjual/penjualdetail/'+this.props.LogReg.penjualid)
        .then((res)=>{
            console.log(res.data)
            this.setState({Sellersettingsdata:res.data})
        }).catch((err)=>{
            console.log(err)
        })
    }
    onEditFileFotoProfileChange=(event)=>{
        var file=event.target.files[0]
        if(file){
            this.setState({editImageFilePenjualProfileName:file.name,editImagePenjualProfileFile:event.target.files[0]})
        }else{
            this.setState({editImageFilePenjualProfileName:'Select Image....',editImagePenjualProfileFile:undefined})
        }
    }
    onUpdateEditFotoProfileClick=()=>{
        var formData = new FormData()
        var headers = {
            headers: 
            {'Content-Type': 'multipart/form-data'},
            params:{
                id:this.props.LogReg.penjualid
            }
        }
        var data = {

        }
        formData.append('image', this.state.editImagePenjualProfileFile)
        formData.append('data', JSON.stringify(data))

        Axios.put(ApiURL + "/penjual/editFotoProfile", formData, headers)
        .then((res) => {
            console.log(res.data)
            this.setState({ editfotoprofile:false,Sellersettingsdata:res.data })
        })
        .catch((err) =>{
            console.log(err)
        })
    }
    onEditBgProfileChange=(event)=>{
        var file=event.target.files[0]
        if(file){
            this.setState({editImageFileBgName:file.name,editImageBgFile:event.target.files[0]})
        }else{
            this.setState({editImageFileBgName:'Select Image....',editImageBgFile:undefined})
        }
    }
    onUpdateBgProfileClick=()=>{
        var formData = new FormData()
        var headers = {
            headers: 
            {'Content-Type': 'multipart/form-data'},
            params:{
                id:this.props.LogReg.penjualid
            }
        }
        var data = {

        }
        formData.append('image', this.state.editImageBgFile)
        formData.append('data', JSON.stringify(data))

        Axios.put(ApiURL + "/penjual/editBgProfile", formData, headers)
        .then((res) => {
            console.log(res.data)
            this.setState({ editbgprofile:false,Sellersettingsdata:res.data })
        })
        .catch((err) =>{
            console.log(err)
        })
    }
    onAboutUpdateClick=()=>{
        let abouttoko=this.refs.tokoabout.value
        Axios.put(ApiURL + "/penjual/editAbouttoko",
        {
            abouttoko
        }, 
        {
            params:{
                    id:this.props.LogReg.penjualid
                }
        })
        .then((res) => {
            console.log(res.data)
            this.setState({ editabout:false,Sellersettingsdata:res.data })
        })
        .catch((err) =>{
            console.log(err)
        })
    }
    onAlamatUpdateClick=()=>{
        let alamattoko=this.refs.alamattoko.value
        Axios.put(ApiURL + "/penjual/editAlamattoko",
        {
            alamattoko
        }, 
        {
            params:{
                    id:this.props.LogReg.penjualid
                }
        })
        .then((res) => {
            console.log(res.data)
            this.setState({ editalamat:false,Sellersettingsdata:res.data })
        })
        .catch((err) =>{
            console.log(err)
        })
    }
    render() {
        this.props.ChangeHeader(false)
        if(this.state.Sellersettingsdata){
            return (
                <div className='home'>
                    <div className='row justify-content-center'>
                        <div className=" p-5 " style={{border:'2px solid #0275d8',width:'60%'}}>
                            <h3 className='text-primary text-center mb-5'>Seller Setting</h3>
                            <div className="row mt-2 ml-5 ">
                                <div className="col-4 mt-3 pl-3 text-primary ">
                                    Foto Profil Toko
                                </div>
                                <div className="col-4">
                                    {
                                        this.state.editfotoprofile?
                                        <div>
                                            <CustomInput type='file' className='overflow-hidden mt-2' label={this.state.editImageFilePenjualProfileName} onChange={this.onEditFileFotoProfileChange} />
                                            <button className='mt-1 mr-2 btn-primary btn' onClick={this.onUpdateEditFotoProfileClick}>Save</button>
                                            <button onClick={()=>this.setState({editfotoprofile:false})} className='mt-1 btn-light btn'>Cancel</button>
                                        </div> 
                                        :
                                        <div  style={{border:'2px solid lightgray',height:64,width:64,}}>
                                            <img alt='foto-toko' src={ApiURL+this.state.Sellersettingsdata.imageprofile} height='60px' width='60px'/>
                                            <div onClick={()=>this.setState({editfotoprofile:true})} className='pointer-add'>
                                                <FontAwesomeIcon  icon={faEdit}  className='position-relative' style={{bottom:40,left:65}}/>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className="row ml-5 mt-5">
                                <div className="col-4 mt-5 pl-3 text-primary">
                                    Background Toko
                                </div>
                                <div className="col-4">
                                    {
                                        this.state.editbgprofile?
                                        <div>
                                            <CustomInput type='file' className='overflow-hidden mt-4 ' label={this.state.editImageFileBgName} onChange={this.onEditBgProfileChange} />
                                            <button className='mt-1 mr-2 btn-primary btn' onClick={this.onUpdateBgProfileClick}>Save</button>
                                            <button onClick={()=>this.setState({editbgprofile:false})} className='mt-1 btn-light btn'>Cancel</button>
                                        </div> 
                                        :
                                        <div  style={{border:'2px solid lightgray',height:124,width:224}}>
                                            <img alt='foto-toko' src={ApiURL+this.state.Sellersettingsdata.imagebackground} height='120px' width='220px'/>
                                            <div onClick={()=>this.setState({editbgprofile:true})} className='pointer-add'>
                                                <FontAwesomeIcon icon={faEdit} className='position-relative' style={{bottom:60,left:228}}/>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className="row ml-5 mt-5">
                                <div className="col-4 mt-5 pl-3 text-primary">
                                    About toko
                                </div>
                                <div className="col-4">
                                    {
                                        this.state.editabout?
                                        <div>
                                            <textarea ref='tokoabout' defaultValue={this.state.Sellersettingsdata.abouttoko} style={{border:'2px solid grey',height:124,width:394}}/>
                                            <button className='mt-1 mr-2 btn-primary btn' onClick={this.onAboutUpdateClick}>Save</button>
                                            <button onClick={()=>this.setState({editabout:false})} className='mt-1 btn-light btn'>Cancel</button>
                                        </div>
                                        :
                                        <div>
                                            <div className='p-1' style={{border:'2px solid grey',height:124,width:394}}>
                                                {this.state.Sellersettingsdata.abouttoko}
                                            </div>
                                            <div onClick={()=>this.setState({editabout:true})} className='pointer-add'>
                                                <FontAwesomeIcon icon={faEdit} className='position-relative' style={{bottom:60,left:398}}/>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className="row ml-5 mt-5">
                                <div className="col-4 mt-5 pl-3 text-primary">
                                    Alamat Toko
                                </div>
                                <div className="col-4">
                                    {
                                        this.state.editalamat?
                                        <div>
                                            <textarea ref='alamattoko' defaultValue={this.state.Sellersettingsdata.alamattoko} style={{border:'2px solid grey',height:124,width:394}}/>
                                            <button className='mt-1 mr-2 btn-primary btn' onClick={this.onAlamatUpdateClick}>Save</button>
                                            <button onClick={()=>this.setState({editalamat:false})} className='mt-1 btn-light btn'>Cancel</button>
                                        </div>
                                        :
                                        <div>
                                            <div className='p-1' style={{border:'2px solid grey',height:124,width:394}}>
                                                {this.state.Sellersettingsdata.alamattoko}
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
export default connect(MapStateToProps,{ChangeHeader}) (PenjualSetting);