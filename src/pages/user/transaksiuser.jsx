import React from 'react';
import {connect} from 'react-redux'
import {ChangeHeader} from './../../redux/actions'
import {Table,
    Modal,ModalHeader,ModalBody,ModalFooter
} from 'reactstrap'
import { ApiURL } from '../../supports/apiurl';
import Axios from 'axios'
import Loading from './../../components/loading'
import querystring from 'query-string'

class TransaksiUser extends React.Component {
    state = {
        TransaksiList:null,
        ModalSampai:false,
        Modalmes:false,
        Modalberhasilmes:'',
        Transaksiid:0,
        transaksiprodname:''
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
        if(querystring.parse(this.props.location.search).stat==='waiting'){
            Axios.get(ApiURL+'/transaksi/getpesananBelumproses/'+this.props.LogReg.id)
            .then((res)=>{
                console.log(res.data)
                this.setState({TransaksiList:res.data})
            })
        }else if(querystring.parse(this.props.location.search).stat==='proses'){
            Axios.get(ApiURL+'/transaksi/getpesananonProsess/'+this.props.LogReg.id)
            .then((res)=>{
                console.log(res.data)
                this.setState({TransaksiList:res.data})
            }).catch((err)=>{
                console.log(err)
            })
        }else if(querystring.parse(this.props.location.search).stat==='dikirim'){
            Axios.get(ApiURL+'/transaksi/getpesananOnSent/'+this.props.LogReg.id)
            .then((res)=>{
                console.log(res.data)
                this.setState({TransaksiList:res.data})
            }).catch((err)=>{
                console.log(err)
            })
        }else if(querystring.parse(this.props.location.search).stat==='finish'){
            Axios.get(ApiURL+'/transaksi/getPesananFinished/'+this.props.LogReg.id)
            .then((res)=>{
                console.log(res.data)
                this.setState({TransaksiList:res.data})
            }).catch((err)=>{
                console.log(err)
            })
        }

    }
    onBtnPesananSampai=()=>{
        var data={
            userid:this.props.LogReg.id,
            transaksiid:this.state.Transaksiid
        }
        Axios.put(ApiURL+'/transaksi/PutStatusPesananSampai',data)
        .then((res)=>{
            this.setState({TransaksiList:res.data,Modalmes:true,Modalberhasilmes:'Berhasil mengupdate data',ModalSampai:false})
        }).catch((err)=>{
            console.log(err)
        })
    }
    renderTransaksilist=()=>{
        if(querystring.parse(this.props.location.search).stat==='waiting'){
            return this.state.TransaksiList.map((item,index)=>{
                return(
                <tr key={item.id}>
                    <td>{index+1}</td>
                    <td>{item.nama}</td>
                    <td>{item.quantity}</td>
                    <td>{item.penjualid}</td>
                    <td>{item.namatoko}</td>
                    {item.status==='admin confirmed'?<td>Pembayaran sudah dikonfirmasi admin, menunggu proses dari penjual</td>:<td>Pembayaran belum dikonfirmasi oleh admin</td>}
                    <td></td>
                </tr>
                )
            })
        }else if(querystring.parse(this.props.location.search).stat==='proses'){
            return this.state.TransaksiList.map((item,index)=>{
                return(
                <tr key={item.id}>
                    <td>{index+1}</td>
                    <td>{item.nama}</td>
                    <td>{item.quantity}</td>
                    <td>{item.penjualid}</td>
                    <td>{item.namatoko}</td>
                    <td>Pesanan sedang di proses oleh Penjual</td>
                    <td></td>
                </tr>
                )
            })
        }else if(querystring.parse(this.props.location.search).stat==='dikirim'){
            return this.state.TransaksiList.map((item,index)=>{
                return(
                <tr key={item.id}>
                    <td>{index+1}</td>
                    <td>{item.nama}</td>
                    <td>{item.quantity}</td>
                    <td>{item.penjualid}</td>
                    <td>{item.namatoko}</td>
                    <td>Pesanan sudah dikirim oleh penjual Jika barang sudah sampai mohon klik sudah tombol sampai</td>
                    <td><button className='btn btn-primary' style={{fontSize:11}} onClick={()=>this.setState({ModalSampai:true,Transaksiid:item.id,transaksiprodname:item.nama})} >Pesanan Sampai</button></td>
                </tr>
                )
            })
        }else if(querystring.parse(this.props.location.search).stat==='finish'){
            return this.state.TransaksiList.map((item,index)=>{
                return(
                <tr key={item.id}>
                    <td>{index+1}</td>
                    <td>{item.nama}</td>
                    <td>{item.quantity}</td>
                    <td>{item.penjualid}</td>
                    <td>{item.namatoko}</td>
                    <td>Pesanan sudah Sampai</td>
                    <td></td>
                </tr>
                )
            })
        }    
    }    
    render() {
        this.props.ChangeHeader(false)
        if(this.state.TransaksiList===null){
            return <Loading/>
        }  
        return (
            <div className='home'>
                <div className="mx-3 mb-3">
                    <a href="http://localhost:3000/history?stat=waiting">
                        <button className='mr-2 btn btn-primary'>Data Pembayaran</button>
                    </a>
                    <a href='http://localhost:3000/transusers'>
                        <button className='mr-2 btn btn-primary' disabled={querystring.parse(this.props.location.search).stat==='proses'||'dikirim'||'finish'||'waiting'?true:false}>Data Pesanan</button>
                    </a>
                </div>
                <div className='mx-3 mb-2'>
                    <a href="http://localhost:3000/transusers?stat=waiting">
                        <button className='mr-2 btn btn-primary' style={{fontSize:12}}  disabled={querystring.parse(this.props.location.search).stat==='waiting'?true:false}>Pesanan belum diproses</button>
                    </a>
                    <a href="http://localhost:3000/transusers?stat=proses">
                        <button className='mr-2 btn btn-primary' style={{fontSize:12}}  disabled={querystring.parse(this.props.location.search).stat==='proses'?true:false}>Pesanan diproses</button>
                    </a>
                    <a href="http://localhost:3000/transusers?stat=dikirim">
                        <button className='mr-2 btn btn-primary' style={{fontSize:12}}  disabled={querystring.parse(this.props.location.search).stat==='dikirim'?true:false}>Sedang Dikirim</button>
                    </a>
                    <a href="http://localhost:3000/transusers?stat=finish">
                        <button className='mr-2 btn btn-primary' style={{fontSize:12}}  disabled={querystring.parse(this.props.location.search).stat==='finish'?true:false}>Pesanan sampai</button>
                    </a>
                </div>
                <Table className='' striped>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama Produk</th>
                            <th>Jumlah Pesanan</th>
                            <th>Penjual id</th>
                            <th>Nama Toko</th>
                            <th>Status barang</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderTransaksilist()}
                    </tbody>
                </Table>
                <Modal isOpen={this.state.ModalSampai} toggle={()=>this.setState({ModalSampai:false})}>
                    <ModalHeader>
                        Konfirmasi Pesanan sampai
                    </ModalHeader>
                    <ModalBody>
                        Apakah kamu yakin produk dengan nama {this.state.transaksiprodname} sudah sampai
                    </ModalBody>
                    <ModalFooter>
                        <button className='btn btn-primary' onClick={this.onBtnPesananSampai} >Ya</button>
                        <button className='btn btn-light' onClick={()=>this.setState({ModalSampai:false})}>Tidak</button>
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
          );
    }
}

const MapStateToProps=(state)=>{
    return{
        changeHead:state.HeaderBg,
        LogReg:state.LogReg
    }
} 
 
export default connect(MapStateToProps,{ChangeHeader}) (TransaksiUser);


