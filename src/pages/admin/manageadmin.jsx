import React from 'react';
import {Nav,TabContent,TabPane,NavItem,NavLink,ModalHeader,ModalBody,ModalFooter,Modal,Table,Input,CustomInput} from 'reactstrap'
import {connect} from 'react-redux'
import {ChangeHeader} from './../../redux/actions'
import classnames from 'classnames'
import querystring from 'query-string'
import Axios from 'axios'
import Numeral from 'numeral'
import { ApiURL } from '../../supports/apiurl'
import Loading from './../../components/loading'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEdit} from '@fortawesome/free-solid-svg-icons'

// import Pagenotfound from '../Pagenotfound';
class ManageAdmin extends React.Component {
    state = {
        activeTab: '1',
        confirmpaylist:null,
        imageurlselected:'',
        Modalimage:false,
        Modalkonfirmasi:false,
        ModalCanceledpayment:false,
        paymentid:0,
        paymentuserid:0,
        suksespaymodal:false,
        suksesCancelpayment:false,
        catProd:null,
        catPen:null,
        editCatProd:-1,
        editCatPen:-1,
        editimagehome:false,
        editimagehomefile:undefined,
        editimagehomefilename:'Select Image....',
        editmaintext:false,
        editjumbotron1:false,
        editjumbotron1file:undefined,
        editjumbotron1filename:'Select Image....',
        editjumbotron2:false,
        editjumbotron2file:undefined,
        editjumbotron2filename:'Select Image....',
        Homeimage:null,
        Jumbotron:null,
        iklan:null,
        iklanimagefilename:'Select iklan image...',
        iklanimagefile:undefined,
        Modaliklan:false,
        deleteiklan:-1,
        deletecatpen:-1,
        deletecatprod:-1

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
        if(querystring.parse(this.props.location.search).trans==='conmin'){
            Axios.get(ApiURL+'/transaksi/getAdminconfirmlist')
            .then((res)=>{
                console.log(res.data)
                this.setState({confirmpaylist:res.data})
            }).catch((err)=>{
                console.log(err)
            })
            
        }else{
            Axios.get(ApiURL+'/transaksi/getadminconfirmedlist')
            .then((res)=>{
                console.log(res.data)
                this.setState({confirmpaylist:res.data})
            }).catch((err)=>{
                console.log(err)
            })
        }
        Axios.get(ApiURL+'/admin/getAllcategoies')
        .then((res)=>{
            console.log(res.data)
            this.setState({catPen:res.data.pen,catProd:res.data.prod})
        }).catch((err)=>{
            console.log(err)
        })
        Axios.get(ApiURL+'/admin/getHomedata')
        .then((res)=>{
            console.log(res.data)
            this.setState({Homeimage:res.data.home[0],Jumbotron:res.data.jumbotron,iklan:res.data.iklan})
        }).catch((err)=>{
            console.log(err)
        })
    }
    toggle=(tab)=>{
        if (this.state.activeTab !== tab) {
            this.setState({
              activeTab: tab
            })
        }   
    }
    onBtnKonfirmasipayment=()=>{
        var data={
            userid:this.state.paymentuserid,
            paymentid:this.state.paymentid
        }
        Axios.post(ApiURL+'/transaksi/Postadminconfirmed',data)
        .then((res)=>{
            this.setState({confirmpaylist:res.data,Modalkonfirmasi:false,suksespaymodal:true})
        }).catch((err)=>{
            console.log(err)
        })
    }
    onBtnCanceledPaymenClick=()=>{
        var data={
            userid:this.state.paymentuserid,
            paymentid:this.state.paymentid
        }
        Axios.put(ApiURL+'/transaksi/AdminCanceledPayment',data)
        .then((res)=>{
            this.setState({confirmpaylist:res.data,ModalCanceledpayment:false,suksesCancelpayment:true})
        }).catch((err)=>{
            console.log(err)
        })
    }
    onBtnAddCatpenClick=()=>{
        Axios.post(ApiURL+'/admin/addCatPenCategory',{
            nama:this.refs.PenKat.refs.PenKat.value
        }).then((res)=>{
            this.setState({catPen:res.data.pen,catProd:res.data.prod})
        }).catch((err)=>{
            console.log(err)
        })
    }
    onBtnAddCatprodClick=()=>{
        if(this.refs.PenKatsm.refs.PenKatsm.value!==''){
            Axios.post(ApiURL+'/admin/addCatProdCategory',{
                namacategory:this.refs.ProdKat.refs.ProdKat.value,
                catpenjualid:this.refs.PenKatsm.refs.PenKatsm.value
            }).then((res)=>{
                this.setState({catPen:res.data.pen,catProd:res.data.prod})
            }).catch((err)=>{
                console.log(err)
            })
        }
    }
    onBtnSaveEditCatPenclick=(idpen)=>{
        Axios.put(ApiURL+'/admin/SaveEditCatPenCategory/'+idpen,{
            nama:this.refs.EditPenKat.refs.EditPenKat.value
        }).then((res)=>{
            this.setState({catPen:res.data.pen,catProd:res.data.prod,editCatPen:-1})
        }).catch((err)=>{
            console.log(err)
        })
    }
    onBtnSaveEditCatProdclick=(idprod)=>{
        Axios.put(ApiURL+'/admin/SaveEditCatProdCategory/'+idprod,{
            namacategory:this.refs.editProdKat.refs.editProdKat.value,
            catpenjualid:this.refs.editPenKatsm.refs.editPenKatsm.value
        }).then((res)=>{
            this.setState({catPen:res.data.pen,catProd:res.data.prod,editCatProd:-1})
        }).catch((err)=>{
            console.log(err)
        })
    }
    onDeleteCatPenClick=(idpen)=>{
        Axios.put(ApiURL+'/admin/DeleteCatpen/'+idpen)
        .then((res)=>{
            this.setState({catPen:res.data.pen,catProd:res.data.prod,deletecatpen:-1})
        }).catch((err)=>{
            console.log(err)
        })
    }
    onDeleteCatProdClick=(idprod)=>{
        Axios.put(ApiURL+'/admin/DeleteCatprod/'+idprod)
        .then((res)=>{
            this.setState({catPen:res.data.pen,catProd:res.data.prod,deletecatpen:-1})
        }).catch((err)=>{
            console.log(err)
        })
    }
    onEditimagehomefileChange=(event)=>{
        var file=event.target.files[0]
        if(file){
            this.setState({editimagehomefilename:file.name,editimagehomefile:event.target.files[0]})
        }else{
            this.setState({editimagehomefilename:'Select Image....',editimagehomefile:undefined})
        }
    }
    onjumbotron1homefileChange=(event)=>{
        var file=event.target.files[0]
        if(file){
            this.setState({editjumbotron1filename:file.name,editjumbotron1file:event.target.files[0]})
        }else{
            this.setState({editjumbotron1filename:'Select Image....',editjumbotron1file:undefined})
        }
    }
    onjumbotron2homefileChange=(event)=>{
        var file=event.target.files[0]
        if(file){
            this.setState({editjumbotron2filename:file.name,editjumbotron2file:event.target.files[0]})
        }else{
            this.setState({editjumbotron2filename:'Select Image....',editjumbotron2file:undefined})
        }
    }
    onUpdateEditImagehomeClick=()=>{
        var formData = new FormData()
        var headers = {
            headers: 
            {'Content-Type': 'multipart/form-data'},
            params:{
                id:1
            }
        }
        var data = {

        }
        formData.append('image', this.state.editimagehomefile)
        formData.append('data', JSON.stringify(data))

        Axios.put(ApiURL + "/admin/SaveEditImageHome", formData, headers)
        .then((res) => {
            console.log(res.data)
            this.setState({ editimagehome:false,Homeimage:res.data })
        })
        .catch((err) =>{
            console.log(err)
        })
    }
    onUpdateJumbotronClick=(id)=>{
        var formData = new FormData()
        var headers = {
            headers: 
            {'Content-Type': 'multipart/form-data'},
            params:{
                id
            }
        }
        var data = {

        }
        var image=''
        if(id===1){
            image=this.state.editjumbotron1file
        }else{
            image=this.state.editjumbotron2file
        }
        formData.append('image', image)
        formData.append('data', JSON.stringify(data))

        Axios.put(ApiURL + "/admin/SaveEditJumbotron", formData, headers)
        .then((res) => {
            console.log(res.data)
            if(id===1){
                this.setState({ editjumbotron1:false,Jumbotron:res.data })
            }else{
                this.setState({ editjumbotron2:false,Jumbotron:res.data })
            }
        })
        .catch((err) =>{
            console.log(err)
        })
    }
    onaddIklanfileChange=(event)=>{
        var file=event.target.files[0]
        if(file){
            this.setState({iklanimagefilename:file.name,iklanimagefile:event.target.files[0]})
        }else{
            this.setState({iklanimagefilename:'Select Image....',iklanimagefile:undefined})
        }
    }
    onAddIklanClick=()=>{
        var formData = new FormData()
        var headers = {
            headers: 
            {'Content-Type': 'multipart/form-data'},
        }
        var data = {

        }
        formData.append('image', this.state.iklanimagefile)
        formData.append('data', JSON.stringify(data))

        Axios.post(ApiURL + "/admin/addIklanhome", formData, headers)
        .then((res) => {
            console.log(res.data)
            this.setState({ Modaliklan:false,iklan:res.data })
        })
        .catch((err) =>{
            console.log(err)
        })
    }
    onUpdateMaintext=()=>{
        Axios.put(ApiURL + "/admin/updateMaintext",{
            maintext:this.refs.maintext.value
        })
        .then((res) => {
            console.log(res.data)
            this.setState({ Homeimage:res.data[0],editmaintext:false})
        })
        .catch((err) =>{
            console.log(err)
        })
    }
    onDeleteIklanClick=(id)=>{
        Axios.delete(ApiURL + "/admin/DeleteIklanhome",{
            params:{
                id:id
            }
        })
        .then((res) => {
            console.log(res.data)
            this.setState({ iklan:res.data,deleteiklan:false})
        })
        .catch((err) =>{
            console.log(err)
        })
    }
    renderconfirmpaylist=()=>{
        if(querystring.parse(this.props.location.search).trans==='conmin'){
            return this.state.confirmpaylist.map((item,index)=>{
                return(
                    <tr key={item.id}>
                        <td>{index+1}</td>
                        <td>{item.id}</td>
                        <td><img src={ApiURL+item.image} alt="" width='200' onClick={()=>this.setState({Modalimage:true,imageurlselected:ApiURL+item.image})}/></td>
                        <td>{item.userid}</td>
                        <td>{'Rp.'+Numeral(item.totalharga).format('0,0')}</td>
                        <td><button className='btn btn-primary'onClick={()=>this.setState({Modalkonfirmasi:true,paymentid:item.id,paymentuserid:item.userid})}>Konfirmasi Pembelian</button></td>
                        <td><button className='btn btn-light' onClick={()=>this.setState({ModalCanceledpayment:true,paymentid:item.id,paymentuserid:item.userid})}>Batalkan Transaksi</button></td>
                    </tr>
                )
            })
        }else{
            return this.state.confirmpaylist.map((item,index)=>{
                return(
                    <tr key={item.id}>
                        <td>{index+1}</td>
                        <td>{item.id}</td>
                        <td><img src={ApiURL+item.image} alt="" width='200' onClick={()=>this.setState({Modalimage:true,imageurlselected:ApiURL+item.image})}/></td>
                        <td>{item.userid}</td>
                        <td>{'Rp.'+Numeral(item.totalharga).format('0,0')}</td>
                        <td>Pembayaran sudah Dikonfirmasi</td>
                        <td></td>
                    </tr>
                )
            })
        }
    }
    renderCatpenlist=()=>{
        if(this.state.catPen){
            return this.state.catPen.map((item,index)=>{
                if(this.state.editCatPen===item.id){
                    return(
                    <tr key={item.id}>
                        <td>{index+1}</td>
                        <td><Input type='text' placeholder='Kategori Penjual' defaultValue={item.nama} size='1' ref='EditPenKat' innerRef='EditPenKat'/></td>
                        <td><button className='btn btn-primary' onClick={()=>this.onBtnSaveEditCatPenclick(item.id)}>Save</button></td>
                        <td><button className='btn btn-light' onClick={()=>this.setState({editCatPen:-1})}>Cancel</button></td>
                    </tr>
                    )
                }
                if(this.state.deletecatpen===item.id){
                    return(
                        <tr key={item.id}>
                            <td>{index+1}</td>
                            <td>{item.nama}</td>
                            <td><button className='btn btn-primary' onClick={()=>this.onDeleteCatPenClick(item.id)}>Yes</button></td>
                            <td><button className='btn btn-light'onClick={()=>this.setState({deletecatpen:-1})}>Cancel Delete</button></td>
                        </tr>
                    )
                }
                return(
                    <tr key={item.id}>
                        <td>{index+1}</td>
                        <td>{item.nama}</td>
                        <td><button className='btn btn-primary' onClick={()=>this.setState({editCatPen:item.id})}>Edit</button></td>
                        <td><button className='btn btn-light' onClick={()=>this.setState({deletecatpen:item.id})}>Delete</button></td>
                    </tr>
                )
            })
        }
    }
    renderCatProdlist=()=>{
        if(this.state.catProd){
            return this.state.catProd.map((item,index)=>{
                if(this.state.editCatProd===item.id){
                    return(
                    <tr key={item.id}>
                        <td>{index+1}</td>
                        <td><Input type='text' placeholder='Kategori Produk' defaultValue={item.namacategory} size='1' ref='editProdKat' innerRef='editProdKat'/></td>
                        <td>                                                
                            <Input type='select' ref='editPenKatsm' innerRef='editPenKatsm'>
                                <option value={item.catpenjualid} selected hidden>{item.nama}</option>
                                {this.renderCatpensmalllist()}
                            </Input>
                        </td>
                        <td><button className='btn btn-primary' onClick={()=>this.onBtnSaveEditCatProdclick(item.id)}>Save</button></td>
                        <td><button className='btn btn-light' onClick={()=>this.setState({editCatProd:-1})}>Cancel</button></td>
                    </tr>
                    )
                }
                if(this.state.deletecatprod===item.id){
                    return(
                    <tr key={item.id}>
                        <td>{index+1}</td>
                        <td>{item.namacategory}</td>
                        <td>{item.nama}</td>
                        <td><button className='btn btn-primary' onClick={()=>this.onDeleteCatProdClick(item.id)}>Yes</button></td>
                        <td><button className='btn btn-light' onClick={()=>this.setState({deletecatprod:-1})}> Cancel Delete</button></td>
                    </tr> 
                    )
                }
                return(
                <tr key={item.id}>
                    <td>{index+1}</td>
                    <td>{item.namacategory}</td>
                    <td>{item.nama}</td>
                    <td><button className='btn btn-primary' onClick={()=>this.setState({editCatProd:item.id})}>Edit</button></td>
                    <td><button className='btn btn-light' onClick={()=>this.setState({deletecatprod:item.id})} >Delete</button></td>
                </tr> 
                )
            })
        }
    }
    renderCatpensmalllist=()=>{
        if(this.state.catPen){
            return this.state.catPen.map((item,index)=>{
                return(
                    <option value={item.id} key={index}>{item.nama}</option>
                )
            })
        }
    }
    renderIklanlist=()=>{
        if(this.state.iklan){
            return this.state.iklan.map((item,index)=>{
                if(this.state.deleteiklan===item.id){
                    return(
                        <tr key={item.id}>
                        <td>{index+1}</td>
                        <td><img src={ApiURL+item.iklanimage} alt="" height='120px'/></td>
                        <td><button className='btn btn-primary' onClick={()=>this.onDeleteIklanClick(item.id)}>Yes</button></td>
                        <td><button className='btn btn-light' onClick={()=>this.setState({deleteiklan:-1})} >Cancel Delete</button></td>
                        
                    </tr>
                    )
                }
                return(
                <tr key={item.id}>
                    <td>{index+1}</td>
                    <td><img src={ApiURL+item.iklanimage} alt="" height='120px'/></td>
                    
                    <td><button className='btn btn-primary'>Edit</button></td>
                    <td><button className='btn btn-light' onClick={()=>this.setState({deleteiklan:item.id})} >Delete</button></td>
                    
                </tr>
                )
            })
        }
    }
    render() {
        this.props.ChangeHeader(false)
        if(this.state.confirmpaylist===null||this.state.Homeimage===null){
            return <Loading/>
        }
        return (
        <div>
            <div className="home">
                <Modal isOpen={this.state.Modaliklan} toggle={()=>this.setState({Modaliklan:false,iklanimagefilename:'Select iklan image...',iklanimagefile:undefined})}>
                    <ModalHeader>
                        Add Iklan
                    </ModalHeader>
                    <ModalBody>
                        <CustomInput type='file' id='1' className='overflow-hidden mt-2' label={this.state.iklanimagefilename} onChange={this.onaddIklanfileChange} />
                    </ModalBody>
                    <ModalFooter>
                        <button className='btn btn-success' onClick={this.onAddIklanClick}>Save</button>
                        <button className='btn btn-danger' onClick={()=>this.setState({Modaliklan:false,iklanimagefilename:'Select iklan image...',iklanimagefile:undefined})}>Cancel</button>
                    </ModalFooter>
                </Modal>
            <Nav tabs>
                <NavItem>
                    <NavLink
                    className={classnames('text-primary', 'tab-prod',{ active: this.state.activeTab === '3',
                                'font-weight-bolder': this.state.activeTab === '3'})}
                    onClick={() => { this.toggle('3'); }}
                    >
                    Manage transaksi
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                    className={classnames('tab-prod','text-primary',{ active: this.state.activeTab === '1',
                                        'font-weight-bolder': this.state.activeTab === '1'})}
                    onClick={() => { this.toggle('1'); }}
                    >
                    Manage Home
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                    className={classnames('text-primary', 'tab-prod',{ active: this.state.activeTab === '2',
                                'font-weight-bolder': this.state.activeTab === '2'})}
                    onClick={() => { this.toggle('2'); }}
                    >
                    Manage user
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                    className={classnames('text-primary', 'tab-prod',{ active: this.state.activeTab === '4',
                                'font-weight-bolder': this.state.activeTab === '4'})}
                    onClick={() => { this.toggle('4'); }}
                    >
                    Manage Categories
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId='1' className='px-3 py-1'>
                    <div className="row " >
                        <div className="col-md-6">
                            <div className='mt-2'>
                                <h4 className='text-primary font-weight-bolder'>Home Image</h4>
                                    {this.state.editimagehome?
                                        <div>
                                            <CustomInput type='file' className='overflow-hidden mt-2' label={this.state.editimagehomefilename} onChange={this.onEditimagehomefileChange} />
                                            <button className='mt-1 mr-2 btn-primary btn' onClick={this.onUpdateEditImagehomeClick}>Save</button>
                                            <button onClick={()=>this.setState({editimagehome:false})} className='mt-1 btn-light btn'>Cancel</button>
                                        </div> 
                                    :
                                        <div className=''  style={{border:'2px solid lightgray',height:224,width:324}}>
                                            <img alt='foto-toko' src={ApiURL+this.state.Homeimage.homeimage} height='220px' width='320px'/>
                                            <div onClick={()=>this.setState({editimagehome:true})} className='pointer-add'>
                                                <FontAwesomeIcon icon={faEdit} className='position-relative' style={{bottom:20,left:328}}/>
                                            </div>
                                        </div>
                                
                                    }
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mt-2">
                                <h4 className='text-primary font-weight-bolde'>Main Text</h4>
                                {this.state.editmaintext?
                                    <div>
                                        <textarea ref='maintext' defaultValue={this.state.Homeimage.maintext}  style={{border:'2px solid grey',height:124,width:394}}/>
                                        <button className=' mr-2  btn-primary btn' style={{marginLeft:-150,marginTop:60}} onClick={this.onUpdateMaintext}>Save</button>
                                        <button onClick={()=>this.setState({editmaintext:false})} className=' btn-light btn' style={{marginTop:60}}>Cancel</button>
                                    </div>
                                    :
                            
                                    <div className=" mt-3 ">
                                        <div className='p-1' style={{border:'2px solid grey',height:124,width:394}}>
                                            {this.state.Homeimage.maintext}
                                        </div>
                                        <div onClick={()=>this.setState({editmaintext:true})} className='pointer-add'>
                                            <FontAwesomeIcon icon={faEdit} className='position-relative' style={{bottom:20,left:398}}/>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="mt-2">
                        <h4 className='text-primary font-weight-bolde'>Iklan</h4>
                        <div className="mx-3 overflow-auto">
                            <button className='btn btn-primary' onClick={()=>this.setState({Modaliklan:true})}>Add Iklan</button>
                            <Table className='mt-2 ' striped hover>
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Iklan</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderIklanlist()}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                    <div className="mt-2">
                        <h4 className='text-primary font-weight-bolde'>Jumbotron</h4>
                        <div className="row ">
                            <div className="col-md-1 text-center p-0">
                                1.
                            </div>
                            <div className="col-md-4 p-0">
                                {this.state.editjumbotron1?
                                    <div>
                                        <CustomInput type='file' className='overflow-hidden mt-2' label={this.state.editjumbotron1filename} onChange={this.onjumbotron1homefileChange} />
                                        <button className='mt-1 mr-2 btn-primary btn' onClick={()=>this.onUpdateJumbotronClick(1)} >Save</button>
                                        <button onClick={()=>this.setState({editjumbotron1:false})} className='mt-1 btn-light btn'>Cancel</button>
                                    </div> 
                                :
                                    <div  style={{border:'2px solid lightgray',height:224,width:324}}>
                                        <img alt='foto-toko' src={ApiURL+this.state.Jumbotron[0].jumbotronimage} height='220px' width='320px'/>
                                        <div onClick={()=>this.setState({editjumbotron1:true})} className='pointer-add'>
                                            <FontAwesomeIcon icon={faEdit} className='position-relative' style={{bottom:20,left:328}}/>
                                        </div>
                                    </div>
                                }
                            </div>
                            <div className="col-md-1 text-center p-0">
                                2.
                            </div>
                            <div className="col-md-4  p-0">
                                {this.state.editjumbotron2?
                                    <div>
                                        <CustomInput type='file' className='overflow-hidden mt-2' label={this.state.editjumbotron2filename} onChange={this.onjumbotron2homefileChange} />
                                        <button className='mt-1 mr-2 btn-primary btn' onClick={()=>this.onUpdateJumbotronClick(2)} >Save</button>
                                        <button onClick={()=>this.setState({editjumbotron2:false})} className='mt-1 btn-light btn'>Cancel</button>
                                    </div>
                                    :
                                    <div  style={{border:'2px solid lightgray',height:224,width:324}}>
                                        <img alt='foto-toko' src={ApiURL+this.state.Jumbotron[1].jumbotronimage} height='220px' width='320px'/>
                                        <div onClick={()=>this.setState({editjumbotron2:true})} className='pointer-add'>
                                            <FontAwesomeIcon icon={faEdit} className='position-relative' style={{bottom:20,left:328}}/>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </TabPane>
                <TabPane tabId='2' className='px-3 py-4'>
                    dadadadadasdas
                </TabPane>
                <TabPane tabId='3' className='px-3 py-4'>
                    <div className="mx-1">
                        <a href="http://localhost:3000/manageadmin?trans=conmin">
                            <button className='mr-2 btn btn-primary'disabled={querystring.parse(this.props.location.search).trans==='conmin'?true:false}>Menunggu konfirmasi</button>
                        </a>
                        <a href="http://localhost:3000/manageadmin?trans=konfirmasi">
                            <button className='mr-2 btn btn-primary'disabled={querystring.parse(this.props.location.search).trans==='konfirmasi'?true:false}>Pesanan Dikonfirmasi</button>
                        </a>
                    </div>
                    <Table className='mt-2' striped hover>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>transaksi Id</th>
                                <th>Bukti Pembayaran</th>
                                <th>userid</th>
                                <th>Total Pembayaran</th>
                                <th>{querystring.parse(this.props.location.search).trans==='conmin'?null:'Status'}</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderconfirmpaylist()}
                        </tbody>
                    </Table>
                </TabPane>
                <TabPane tabId='4' className='px-3 py-4'>
                    <div className="mt-2">
                        <h4 className='text-primary font-weight-bolde'>Penjual Kategori</h4>
                        <div className="mx-5 overflow-auto">
                            <Table className='mt-2 ' striped hover>
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Kategori</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderCatpenlist()}
                                    <tr>
                                        <td></td>
                                        <td><Input type='text' placeholder='Kategori' size='1' ref='PenKat' innerRef='PenKat'/></td>
                                        <td><button className='btn btn-primary' onClick={this.onBtnAddCatpenClick}>Add Penjual Kategori</button></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </div>
                    <div className="mt-2">
                        <h4 className='text-primary font-weight-bolde'>Produk Kategori</h4>
                        <div className="mx-5 overflow-auto">
                            <Table className='mt-2 ' striped hover>
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Kategori Produk</th>
                                        <th>Kategori Penjual</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderCatProdlist()}
                                    <tr>
                                        <td></td>
                                        <td><Input type='text' placeholder='Kategori' size='1' ref='ProdKat' innerRef='ProdKat'/></td>
                                        <td>                                                
                                            <Input type='select' ref='PenKatsm' innerRef='PenKatsm'>
                                                <option value="" disabled selected hidden>Pilih Penjual Kategori</option>
                                                {this.renderCatpensmalllist()}
                                            </Input>
                                        </td>
                                        <td><button className='btn btn-primary' onClick={this.onBtnAddCatprodClick}>Add Produk Kategori</button></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </TabPane>
            </TabContent>
            </div>
            {/* Modal Manage Categories */}
            <Modal>

            </Modal>
            {/* Modal Manage Categories */}
            {/* transaksi start */}
            <Modal isOpen={this.state.ModalCanceledpayment} centered toggle={()=>this.setState({ModalCanceledpayment:false})}>
                <ModalHeader>
                    Pembatalan Pembayaran User (user id={this.state.paymentuserid})
                </ModalHeader>
                <ModalBody>
                    Batalkan pembayaran user id ke-{this.state.paymentuserid} dengan payment id={this.state.paymentid}
                </ModalBody>
                <ModalFooter>
                    <button className='btn btn-light' onClick={this.onBtnCanceledPaymenClick}>Batalkan Pembayaran</button>
                    <button className='btn btn-primary' onClick={()=>this.setState({ModalCanceledpayment:false})}>Cancel</button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={this.state.suksesCancelpayment} toggle={()=>this.setState({suksesCancelpayment:false})}>
                <ModalHeader>
                    Status Pembatalan pembayaran dengan id={this.state.paymentid}
                </ModalHeader>
                <ModalBody>
                    Berhasil Batalkan Transaksi
                </ModalBody>
                <ModalFooter>
                    <button className='btn btn-primary' onClick={()=>this.setState({suksesCancelpayment:false})}>OK</button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={this.state.Modalimage} toggle={()=>this.setState({imageurlselected:'',Modalimage:false})} centered contentClassName='bg-transparent'>
                <ModalBody style={{padding:0}} >
                    <img src={this.state.imageurlselected} alt="" width='100%' />
                </ModalBody>
            </Modal>
            <Modal isOpen={this.state.Modalkonfirmasi} toggle={()=>this.setState({Modalkonfirmasi:false})} centered >
                <ModalHeader>
                    Konfirmasi Pembayaran User (user id={this.state.paymentuserid})
                </ModalHeader>
                <ModalBody>
                    Konfirmasi pembayaran dengan nomor pembayaran:{this.state.paymentid} dan nomer user:{this.state.paymentuserid} (Pastikan anda sudah benar dalam pengecekan pembayaran)
                </ModalBody>
                <ModalFooter>
                    <button className='btn btn-primary' onClick={this.onBtnKonfirmasipayment} >Konfirmasi</button>
                    <button className='btn btn-light' onClick={()=>this.setState({Modalkonfirmasi:false})}>Cancel</button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={this.state.suksespaymodal} toggle={()=>this.setState({suksespaymodal:false})}>
                <ModalHeader>
                    Status Konfirmasi
                </ModalHeader>
                <ModalBody>
                    Berhasil konfirmasi pembayaran user dan akan diteruskan ke penjual
                </ModalBody>
                <ModalFooter>
                    <button className='btn btn-primary' onClick={()=>this.setState({suksespaymodal:false})}>OK</button>
                </ModalFooter>
            </Modal>
            {/* transaksi end */}

        </div>  
        );
    }
}
 
export default connect(null,{ChangeHeader}) (ManageAdmin);