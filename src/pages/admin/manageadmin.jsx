import React from 'react';
import {Nav,TabContent,TabPane,NavItem,NavLink,ModalHeader,ModalBody,ModalFooter,Modal,Table,Input} from 'reactstrap'
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
        activeTab: '4',
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
        catPen:null
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
                return(
                    <tr key={item.id}>
                        <td>{index+1}</td>
                        <td>{item.nama}</td>
                        <td><button className='btn btn-primary'>Edit</button></td>
                        <td><button className='btn btn-light'>Delete</button></td>
                    </tr>
                )
            })
        }
    }
    renderCatProdlist=()=>{
        if(this.state.catProd){
            return this.state.catProd.map((item,index)=>{
                return(
                <tr key={item.id}>
                    <td>{index+1}</td>
                    <td>{item.namacategory}</td>
                    <td>{item.nama}</td>
                    <td><button className='btn btn-primary'>Edit</button></td>
                    <td><button className='btn btn-light'>Delete</button></td>
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
    render() {
        this.props.ChangeHeader(false)
        if(this.state.confirmpaylist===null){
            return <Loading/>
        } 
        return (
        <div>
            <div className="home">
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
                                <div className=''  style={{border:'2px solid lightgray',height:224,width:324}}>
                                    <img alt='foto-toko' src={'http://localhost:2001/product/images/home-foto.jpg'} height='220px' width='320px'/>
                                    <div onClick={()=>this.setState({editbgprofile:true})} className='pointer-add'>
                                        <FontAwesomeIcon icon={faEdit} className='position-relative' style={{bottom:20,left:328}}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mt-2">
                                <h4 className='text-primary font-weight-bolde'>Main Text</h4>
                                <div className=" mt-3 ">
                                    <div className='p-1' style={{border:'2px solid grey',height:124,width:394}}>
                                        dsadadadad
                                    </div>
                                    <div onClick={()=>this.setState({editabout:true})} className='pointer-add'>
                                        <FontAwesomeIcon icon={faEdit} className='position-relative' style={{bottom:20,left:398}}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-2">
                        <h4 className='text-primary font-weight-bolde'>Iklan</h4>
                        <div className="mx-3 overflow-auto">
                            <button className='btn btn-primary'>Add Iklan</button>
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
                                    <tr>
                                        <td>1</td>
                                        <td><img src="http://localhost:2001/product/images/home-foto.jpg" alt="" height='120px'/></td>
                                        <td><button className='btn btn-primary'>Edit</button></td>
                                        <td></td>
                                    </tr>
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
                                <div  style={{border:'2px solid lightgray',height:224,width:324}}>
                                    <img alt='foto-toko' src={'http://localhost:2001/product/images/home-foto.jpg'} height='220px' width='320px'/>
                                    <div onClick={()=>this.setState({editbgprofile:true})} className='pointer-add'>
                                        <FontAwesomeIcon icon={faEdit} className='position-relative' style={{bottom:20,left:328}}/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-1 text-center p-0">
                                2.
                            </div>
                            <div className="col-md-4  p-0">
                                <div  style={{border:'2px solid lightgray',height:224,width:324}}>
                                    <img alt='foto-toko' src={'http://localhost:2001/product/images/home-foto.jpg'} height='220px' width='320px'/>
                                    <div onClick={()=>this.setState({editbgprofile:true})} className='pointer-add'>
                                        <FontAwesomeIcon icon={faEdit} className='position-relative' style={{bottom:20,left:328}}/>
                                    </div>
                                </div>
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