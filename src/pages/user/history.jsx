import React from 'react';
import {connect} from 'react-redux'
import {ChangeHeader} from './../../redux/actions'
import {Table,
    Modal,ModalHeader,ModalBody,ModalFooter,CustomInput
} from 'reactstrap'
import { ApiURL } from '../../supports/apiurl';
import Axios from 'axios'
import Loading from './../../components/loading'
import Numeral from 'numeral'
import querystring from 'query-string'

class History extends React.Component {
    state = {
        waitingpaymentlist:null,
        modalDetail:false,
        Detaillist:[],
        currenthal:'',
        editUploadPayname:'Select Image...',
        editUplaodPayfile:undefined,
        modalupload:false,
        uploadid:0,
        suksespaymodal:false,
        waktusekarang:null
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
        var query=querystring.parse(this.props.location.search)
        console.log(query.stat)
        if(querystring.parse(this.props.location.search).stat==='waiting'){
            Axios.get(ApiURL+'/transaksi/getwaitingpayment/'+this.props.LogReg.id)
            .then((res)=>{
                console.log(res.data)
                if(res.data.length!==0){
                    var d=new Date(res.data[0].tglexp).getTime()
                    console.log(d)
                    console.log(Date.now())
                    window.setInterval(()=>this.setState({waktusekarang:Date.now()}),1000)
                    
                }
                this.setState({waitingpaymentlist:res.data,})
            })
            .catch((err)=>{
                console.log(err)
            })
        }else if(querystring.parse(this.props.location.search).stat==='waitcon'){
            Axios.get(ApiURL+'/transaksi/getwaitingpaymentadmin/'+this.props.LogReg.id)
            .then((res)=>{
                console.log(res.data)
                this.setState({waitingpaymentlist:res.data,})
            })
            .catch((err)=>{
                console.log(err)
            })
        }else if(querystring.parse(this.props.location.search).stat==='konfirmasi'){
            Axios.get(ApiURL+'/transaksi/getAdminConfirmedPayment/'+this.props.LogReg.id)
            .then((res)=>{
                console.log(res.data)
                this.setState({waitingpaymentlist:res.data,})
            })
            .catch((err)=>{
                console.log(err)
            })
        }

    }
    onClickDetails=(idpayment)=>{
        Axios.get(ApiURL+'/transaksi/getDetailsaftercheckout',{params:{
            userid:this.props.LogReg.id,
            paymentid:idpayment
        }})
        .then((res)=>{
            console.log(res.data)
            this.setState({Detaillist:res.data,modalDetail:true})
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    onChangeEditUploadpay=(e)=>{
        if(e.target.files[0]){
            this.setState({editUploadPayname:e.target.files[0].name,editUplaodPayfile:e.target.files[0]})
        }else{
            this.setState({editUploadPayname:'Select Image...',editUplaodPayfile:undefined})
        }
    }
    onClickUpload=(paymentid)=>{
        console.log(paymentid)
        var formData = new FormData()
        var headers = {
            headers: 
            {'Content-Type': 'multipart/form-data'}
        }

        var data = {
            status:'konfirmasi Admin'
        }
        formData.append('image', this.state.editUplaodPayfile)
        formData.append('data', JSON.stringify(data))
        Axios.put(ApiURL+'/transaksi/editUploadPay/'+paymentid+'?userid='+this.props.LogReg.id,formData,headers)
        .then((res)=>{
            this.setState({waitingpaymentlist:res.data,modalupload:false,editUploadPayname:'Select Image...',editUplaodPayfile:undefined,suksespaymodal:true})
        }).catch((err)=>{

        })
    }
    renderpaymentlist=()=>{
        if(querystring.parse(this.props.location.search).stat==='waitcon'){
            if(this.state.waitingpaymentlist.length===0){
                return(
                <tr>
                    <td colSpan='5' rowSpan='10'>
                        <div style={{height:'400px',fontSize:'36px'}}className='justify-content-center d-flex align-items-center'>
                            <div className='pointer-add'>
                                Tidak ada transaksi
                            </div>
                        </div>
                    </td>
                </tr>
                )
            }
            return this.state.waitingpaymentlist.map((item,index)=>{
                return (
                    <tr key={item.id}>
                        <td>{index+1}</td>
                        <td>{item.id}</td>
                        <td>{'Rp.'+Numeral(item.totalharga).format('0,0')}</td>
                        <td><button className='btn btn-primary' onClick={()=>this.onClickDetails(item.id)}>Details</button></td>
                        <td>Menunggu konfirmasi admin</td>
                    </tr>
                )
            })
        }else if(querystring.parse(this.props.location.search).stat==='konfirmasi'){
            if(this.state.waitingpaymentlist.length===0){
                return(
                <tr>
                    <td colSpan='5' rowSpan='10'>
                        <div style={{height:'400px',fontSize:'36px'}}className='justify-content-center d-flex align-items-center'>
                            <div className='pointer-add'>
                                Tidak ada transaksi
                            </div>
                        </div>
                    </td>
                </tr>
                )
            }
            return this.state.waitingpaymentlist.map((item,index)=>{
                return (
                    <tr key={item.id}>
                        <td>{index+1}</td>
                        <td>{item.id}</td>
                        <td>{'Rp.'+Numeral(item.totalharga).format('0,0')}</td>
                        <td><button className='btn btn-primary' onClick={()=>this.onClickDetails(item.id)}>Details</button></td>
                        <td>Pembayaran sudah dikonfirmasi oleh admin</td>
                    </tr>
                )
            })
        }
        if(this.state.waitingpaymentlist.length===0){
            return(
            <tr>
                <td colSpan='5' rowSpan='10'>
                    <div style={{height:'400px',fontSize:'36px'}}className='justify-content-center d-flex align-items-center'>
                        <div className='pointer-add'>
                            Tidak ada transaksi
                        </div>
                    </div>
                </td>
            </tr>
            )
        }
        return this.state.waitingpaymentlist.map((item,index)=>{
            return (
                <tr key={item.id}>
                    <td>{index+1}</td>
                    <td>{item.id}</td>
                    <td>{'Rp.'+Numeral(item.totalharga).format('0,0')}</td>
                    {/* <td>{item.status}</td> */}
                    <td><button className='btn btn-primary' onClick={()=>this.onClickDetails(item.id)}>Details</button></td>
                    <td><button className='btn btn-light'onClick={()=>this.setState({uploadid:item.id,modalupload:true})} >Upload Payment</button></td>
                    <td>{new Date(item.tglexp).getTime()-this.state.waktusekarang<=1?'Waktu habis':Numeral(new Date(item.tglexp).getTime()-this.state.waktusekarang).divide(1000).format('00:00:00')}</td>
                </tr>
            )
        })
    }
    rendermodalDetails=()=>{
        return this.state.Detaillist.map((item,index)=>{
            return(
            <tr key={item.id}>
                <th>{index+1}</th>
                <th>{item.nama}</th>

                <th>{item.quantity}</th>
                <th>{'Rp.'+Numeral(item.harga*item.quantity).format('0,0')}</th>
            </tr>
            )
        })

    }
    rendertotalhargacart=()=>{
        var totalhargacart=0
        this.state.Detaillist.forEach(element => {
            totalhargacart+=element.harga*element.quantity
        })
        return totalhargacart
    }
    render() {
        this.props.ChangeHeader(false)
        if(this.state.waitingpaymentlist===null){
            return(
                <Loading/>
                )
            }
        return (
            <div className='home '>
                <div className="mx-3 mb-3">
                    <a href="http://localhost:3000/history?stat=waiting">
                        <button className='mr-2 btn btn-primary'disabled={querystring.parse(this.props.location.search).stat==='waiting'||'waitcon'||'konfiramsi'?true:false}>Data Pembayaran</button>
                    </a>
                    <a href='http://localhost:3000/transusers?stat=proses'>
                        <button className='mr-2 btn btn-primary'>Data Pesanan</button>
                    </a>
                </div>
                <div className="mx-3">
                    <a href="http://localhost:3000/history?stat=waiting">
                        <button className='mr-2 btn btn-primary'style={{fontSize:12}} disabled={querystring.parse(this.props.location.search).stat==='waiting'?true:false}>Upload Pembayaran</button>
                    </a>
                    <a href="http://localhost:3000/history?stat=waitcon">
                        <button className='mr-2 btn btn-primary' style={{fontSize:12}} disabled={querystring.parse(this.props.location.search).stat==='waitcon'?true:false}>Menunggu Konfirmasi Admin</button>
                    </a>
                    <a href="http://localhost:3000/history?stat=konfirmasi">
                        <button className='mr-2 btn btn-primary' style={{fontSize:12}} disabled={querystring.parse(this.props.location.search).stat==='konfirmasi'?true:false}>Pembayaran dikonfirmasi</button>
                    </a>
                </div>
                <div className="mx-5">
                    <Table className='mt-2' striped hover>
                        <thead>
                            {querystring.parse(this.props.location.search).stat!=='waiting'?
                            <tr>
                                <th>No</th>
                                <th>transaksi Id</th>
                                <th>Total Pembayaran</th>
                                {/* <th>status</th> */}
                                <th>Details</th>
                                <th>status</th>
                                
                            </tr>
                            :
                            <tr>
                                <th>No</th>
                                <th>transaksi Id</th>
                                <th>Total Pembayaran</th>
                                {/* <th>status</th> */}
                                <th>Details</th>
                                <th></th>
                                <th>Timer</th>
                            </tr>
                            
                        }
                        </thead>
                        <tbody>
                            {this.renderpaymentlist()}
                        </tbody>
                    </Table>

                </div>
                <Modal isOpen={this.state.modalDetail} centered toggle={()=>this.setState({modalDetail:false})} scrollable>
                    <ModalHeader>
                        Detail Pembelian
                    </ModalHeader>
                    <ModalBody>
                    <Table className='mt-0' striped hover>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Nama produk</th>
                                <th>Quantity</th>
                                <th>Total harga</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.rendermodalDetails()}
                        </tbody>
                        <tfoot>
                            <tr>
                                <th></th>
                                <th></th>
                                <th>Total Pembayaran</th>
                                <th>{'Rp.'+Numeral(this.rendertotalhargacart()).format('0,0')}</th>
                            </tr>
                        </tfoot>
                    </Table>
                    </ModalBody>
                    <ModalFooter>
                        <button className='btn btn-primary' style={{width:'100px'}} onClick={()=>this.setState({modalDetail:false})} >OK</button>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={this.state.modalupload} toggle={()=>this.setState({modalupload:false,editUploadPayname:'Select Image...',editUplaodPayfile:undefined})} centered >
                    <ModalHeader>
                        Upload Pembayaran
                    </ModalHeader>
                    <ModalBody>
                        <CustomInput id='inputbayar' type='file' className='overflow-hidden mt-2' label={this.state.editUploadPayname} onChange={this.onChangeEditUploadpay}/>
                    </ModalBody>
                    <ModalFooter>
                        <button className='btn btn-primary'onClick={()=>this.onClickUpload(this.state.uploadid)}>Upload Pembayaran</button>
                        <button className='btn btn-light' onClick={()=>this.setState({modalupload:false,editUploadPayname:'Select Image...',editUplaodPayfile:undefined})}>Cancel</button>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={this.state.suksespaymodal} toggle={()=>this.setState({suksespaymodal:false})}>
                    <ModalHeader>
                        Status Pembayaran
                    </ModalHeader>
                    <ModalBody>
                        Berhasil Upload Pembayaran menunggu konfirmasi Admin
                    </ModalBody>
                    <ModalFooter>
                        <button className='btn btn-primary' onClick={()=>this.setState({suksespaymodal:false})}>OK</button>
                    </ModalFooter>
                </Modal>
            </div>
          );
    }
}
const MapStateToProps=(state)=>{
    return{
        changeHead:state.HeaderBg,
        LogReg:state.LogReg
    }
} 
export default connect(MapStateToProps,{ChangeHeader}) (History);