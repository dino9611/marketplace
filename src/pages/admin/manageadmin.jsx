import React from 'react';
import {Nav,TabContent,TabPane,NavItem,NavLink,ModalHeader,ModalBody,ModalFooter,Modal,Table} from 'reactstrap'
import {connect} from 'react-redux'
import {ChangeHeader} from './../../redux/actions'
import classnames from 'classnames'
import querystring from 'query-string'
import Axios from 'axios'
import Numeral from 'numeral'
import { ApiURL } from '../../supports/apiurl';
import Loading from './../../components/loading'
class ManageAdmin extends React.Component {
    state = {
        activeTab: '3',
        confirmpaylist:null,
        imageurlselected:'',
        Modalimage:false,
        Modalkonfirmasi:false,
        ModalCanceledpayment:false,
        paymentid:0,
        paymentuserid:0,
        suksespaymodal:false,
        suksesCancelpayment:false
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
                    className={classnames('text-primary', 'tab-prod',{ active: this.state.activeTab === '3',
                                'font-weight-bolder': this.state.activeTab === '3'})}
                    onClick={() => { this.toggle('3'); }}
                    >
                    Manage transaksi
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId='1' className='px-3 py-1'>
                    <div className="row">
                        <div className="col-md-2 p-1">
                            <div className='bg-primary text-white overflow-auto 'style={{height:'590px'}}>
                                <div style={{height:'150',fontSize:'30px',fontWeight:"bolder",borderBottom:'0.5px solid white'}} className='p-4 mb-1'>
                                    IKLAN
                                </div>
                                <div style={{height:'150',fontSize:'30px',fontWeight:"bolder",borderBottom:'0.5px solid white'}} className='p-4 mb-1'>
                                    Jumbotron
                                </div>
                                <div style={{height:'150',fontSize:'30px',fontWeight:"bolder",borderBottom:'0.5px solid white'}} className='p-4 mb-1'>
                                    about
                                </div>
                            </div>
                        </div>
                        <div className="col-md-10">
                            <div className='bg-light overflow-auto'>

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
            </TabContent>
            </div>
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
        </div>  
        );
    }
}
 
export default connect(null,{ChangeHeader}) (ManageAdmin);