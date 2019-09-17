import React, { Component } from 'react';
import {connect} from 'react-redux'
import {ChangeHeader} from '../../redux/actions'
import {ModalHeader,ModalBody,ModalFooter,Modal,Table} from 'reactstrap'
import querystring from 'query-string'
import Axios from 'axios'
import { ApiURL } from '../../supports/apiurl';
import Loading from '../../components/loading'


class PenjualTransaksi extends Component {
    state = {
        Pentransaksilist:null,
        Produkselected:'',
        Prosesitemid:0,
        ProsesPaymentid:0,
        ProsesUserid:0,
        ModalProses:false,
        ModalCancelProses:false,
        Modalmes:false,
        ModalonSent:false,
        Modalberhasilmes:''
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
        if(querystring.parse(this.props.location.search).stat==='waitingproses'){
            Axios.get(ApiURL+'/transaksi/getMasukpenjualdata',{
                params:{
                    penjualid:this.props.LogReg.penjualid
                }
            }).then((res)=>{
                this.setState({Pentransaksilist:res.data})
            }).catch((err)=>{
                console.log(err)
            })
        }else if(querystring.parse(this.props.location.search).stat==='waitingsent'){
            Axios.get(ApiURL+'/transaksi/getlistOnproses',{
                params:{
                    penjualid:this.props.LogReg.penjualid
                }
            }).then((res)=>{
                this.setState({Pentransaksilist:res.data})
            }).catch((err)=>{
                console.log(err)
            })
        }else{
            Axios.get(ApiURL+'/transaksi/getlistFinished',{
                params:{
                    penjualid:this.props.LogReg.penjualid
                }
            }).then((res)=>{
                this.setState({Pentransaksilist:res.data})
            }).catch((err)=>{
                console.log(err)
            })
        }
    }
    onBtnprosesClick=()=>{
        Axios.put(ApiURL+'/transaksi/PutonProsestransaksi',{
            penjualid:this.props.LogReg.penjualid,
            transaksiid:this.state.Prosesitemid,
            paymentid:this.state.ProsesPaymentid,
            userid:this.state.ProsesUserid
        })
        .then((res)=>{
            this.setState({Modalmes:true,ModalProses:false,Modalberhasilmes:'Proses berhasil ditambahkan ke tabel proses',Pentransaksilist:res.data})
        }).catch((err)=>{
            console.log(err)
        })
    }
    onBtnOnsentClick=()=>{
        Axios.put(ApiURL+'/transaksi/putOnsentTransaksi',{
            penjualid:this.props.LogReg.penjualid,
            transaksiid:this.state.Prosesitemid,
            paymentid:this.state.ProsesPaymentid,
            userid:this.state.ProsesUserid
        })
        .then((res)=>{
            this.setState({Modalmes:true,ModalonSent:false,Modalberhasilmes:'Proses berhasil pesan akan disampaikan ke user bersangkutan',Pentransaksilist:res.data})
        }).catch((err)=>{
            console.log(err)
        })
    }
    onBtnCancelProsesclick=()=>{
        Axios.put(ApiURL+'/transaksi/PutCancelProsesTransaksi',{
            penjualid:this.props.LogReg.penjualid,
            transaksiid:this.state.Prosesitemid,
            paymentid:this.state.ProsesPaymentid,
            userid:this.state.ProsesUserid
        })
        .then((res)=>{
            this.setState({Modalmes:true,ModalCancelProses:false,Modalberhasilmes:`Proses Produk dibatalkan`,Pentransaksilist:res.data})
        }).catch((err)=>{
            console.log(err)
        })
    }
    renderPentransaksiList=()=>{
        if(querystring.parse(this.props.location.search).stat==='waitingproses'){
            return this.state.Pentransaksilist.map((item,index)=>{
                return(
                    <tr key={item.id}>
                        <td>{index+1}</td>
                        <td>{item.nama}</td>
                        <td>{item.quantity}</td>
                        <td>{item.userid}</td>
                        <td>{item.username}</td>
                        <td><button className='btn btn-primary' onClick={()=>this.setState({ModalProses:true,Prosesitemid:item.id,ProsesPaymentid:item.paymentid,Produkselected:item.nama,ProsesUserid:item.userid})}>Proses Pesanan</button></td>
                        <td><button className='btn btn-light' onClick={()=>this.setState({ModalCancelProses:true,Prosesitemid:item.id,ProsesPaymentid:item.paymentid,Produkselected:item.nama,ProsesUserid:item.userid})} >Batalkan Proses</button></td>
                    </tr>
                )
            })
        }else if(querystring.parse(this.props.location.search).stat==='waitingsent'){
            return this.state.Pentransaksilist.map((item,index)=>{
                return(
                    <tr key={item.id}>
                        <td>{index+1}</td>
                        <td>{item.nama}</td>
                        <td>{item.quantity}</td>
                        <td>{item.userid}</td>
                        <td>{item.username}</td>
                        <td>{item.alamat}</td>
                        <td><button className='btn btn-primary' onClick={()=>this.setState({ModalonSent:true,Prosesitemid:item.id,ProsesPaymentid:item.paymentid,Produkselected:item.nama,ProsesUserid:item.userid})}>Kirim Produk</button></td>
                        <td><button className='btn btn-light'>Batalkan Pengiriman</button></td>
                    </tr>
                )
            })
        }else if(querystring.parse(this.props.location.search).stat==='finished'){
            return this.state.Pentransaksilist.map((item,index)=>{
                return(
                    <tr key={item.id}>
                        <td>{index+1}</td>
                        <td>{item.nama}</td>
                        <td>{item.quantity}</td>
                        <td>{item.userid}</td>
                        <td>{item.username}</td>
                        <td>Sudah Sampai pada Customer</td>
                        <td></td>
                    </tr>
                )
            })
        }
    }
    render(){
        this.props.ChangeHeader(false)
        if(this.state.Pentransaksilist===null){
            return <Loading/>
        }
        return (
            <div>
                <div className="mx-3 home">
                    <a href="http://localhost:3000/pentrans?stat=waitingproses">
                        <button className='mr-2 btn btn-primary'disabled={querystring.parse(this.props.location.search).stat==='waitingproses'?true:false}>Menunggu Proses</button>
                    </a>
                    <a href="http://localhost:3000/pentrans?stat=waitingsent">
                        <button className='mr-2 btn btn-primary'disabled={querystring.parse(this.props.location.search).stat==='waitingsent'?true:false}>Menunggu Pengiriman</button>
                    </a>
                    <a href="http://localhost:3000/pentrans?stat=finished">
                        <button className='mr-2 btn btn-primary'disabled={querystring.parse(this.props.location.search).stat==='finished'?true:false}>List Sukses</button>
                    </a>
                </div>
                <Table className='mt-2' striped>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama Produk</th>
                            <th>Jumlah Pesanan</th>
                            <th>User Id</th>
                            <th>Username</th>
                            {querystring.parse(this.props.location.search).stat==='waitingsent'?<th>Alamat Pengiriman</th>:null}
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderPentransaksiList()}
                    </tbody>
                </Table>
                <Modal  isOpen={this.state.ModalCancelProses} toggle={()=>this.setState({ModalCancelProses:false,Prosesitemid:0,ProsesPaymentid:0})}>
                    <ModalHeader>
                        Batalkan Proses
                    </ModalHeader>
                    <ModalBody>
                        Batalkan Proses produk dengan nama {this.state.Produkselected} 
                    </ModalBody>
                    <ModalFooter>
                        <button className='btn btn-primary' onClick={this.onBtnCancelProsesclick}>Ya</button>
                        <button className='btn btn-light' onClick={()=>this.setState({ModalCancelProses:false,Prosesitemid:0,ProsesPaymentid:0})}>Tidak</button>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={this.state.ModalProses} toggle={()=>this.setState({ModalProses:false,Prosesitemid:0,ProsesPaymentid:0})}>
                    <ModalHeader>
                        Proses Pesanan
                    </ModalHeader>
                    <ModalBody>
                        Proses produk dengan nama {this.state.Produkselected} 
                    </ModalBody>
                    <ModalFooter>
                        <button className='btn btn-primary' onClick={this.onBtnprosesClick}>Proses Pesanan</button>
                        <button className='btn btn-light' onClick={()=>this.setState({ModalProses:false,Prosesitemid:0,ProsesPaymentid:0})}>Cancel</button>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={this.state.ModalonSent} toggle={()=>this.setState({ModalonSent:false,Prosesitemid:0,ProsesPaymentid:0})}>
                    <ModalHeader>
                        Kirim Pesanan
                    </ModalHeader>
                    <ModalBody>
                        Kirim produk dengan nama {this.state.Produkselected} 
                    </ModalBody>
                    <ModalFooter>
                        <button className='btn btn-primary' onClick={this.onBtnOnsentClick}>Kirim</button>
                        <button className='btn btn-light' onClick={()=>this.setState({ModalonSent:false,Prosesitemid:0,ProsesPaymentid:0})}>Cancel</button>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={this.state.Modalmes} toggle={()=>this.setState({Modalmes:false})}>
                    <ModalHeader>
                        Info
                    </ModalHeader>
                    <ModalBody>
                        {this.state.Modalberhasilmes}
                    </ModalBody>
                    <ModalFooter>
                        <button className='btn btn-primary'onClick={()=>this.setState({Modalmes:false})}>OK</button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}
const MapStateToProps=(state)=>{
    return{
        changeHead:state.HeaderBg,
        LogReg:state.LogReg
    }
}  
export default connect(MapStateToProps,{ChangeHeader})(PenjualTransaksi);