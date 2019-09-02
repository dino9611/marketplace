import React from 'react';
import {connect} from 'react-redux'
import {ChangeHeader} from './../../redux/actions'
import {Table,
    Modal,ModalHeader,ModalBody,ModalFooter
} from 'reactstrap'
import Axios from 'axios'
import { ApiURL } from '../../supports/apiurl';
import Numeral from 'numeral'
import Loading from './../../components/loading'

// import {Redirect} from 'react-router-dom'

class Cart extends React.Component {
    state = {
        cartlist:null,
        jumlahorder:[],
        deletemodal:false,
        modaldeleteindex:-1,
        checkoutmodal:false,
        payedmodal:false
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

        Axios.get(ApiURL+'/cart/getcart/'+this.props.LogReg.id)
        .then((res)=>{
            console.log(res.data)
            this.setState({cartlist:res.data,jumlahorder:res.data})
        }).catch((err)=>{
            console.log(err)
        })
    }
    onOrderChange=(e)=>{
        if(e.target.value.length<=5){
            this.setState({jumlahorder:e.target.value})
            if(e.target.value<=0){
                this.setState({jumlahorder:1})
            }
            
        }
    }
    onMinuscartlistquantity=(index,id)=>{
        var cartlistnew=this.state.cartlist
        cartlistnew[index].quantity-=1
        console.log(cartlistnew[index].quantity)
        Axios.put(ApiURL+'/cart/updateqty',{
            quantity:cartlistnew[index].quantity,
            id:id
        }).then((res)=>{
            console.log(res.data)
            this.setState({cartlist:cartlistnew})

        }).catch((err)=>{
            console.log(err)
        })
    }
    onPlususcartlistquantity=(index,id)=>{
        var cartlistnew=this.state.cartlist
        cartlistnew[index].quantity+=1
        console.log(cartlistnew[index].quantity)
        Axios.put(ApiURL+'/cart/updateqty',{
            quantity:cartlistnew[index].quantity,
            id:id
        }).then((res)=>{
            console.log(res.data)
            this.setState({cartlist:cartlistnew})
        }).catch((err)=>{
            console.log(err)
        })
    }
    OnBtndeletecart=(itemid)=>{
        Axios.delete(ApiURL+'/cart/deletecart/'+itemid+'?userid='+this.props.LogReg.id)
        .then((res)=>{
            this.setState({cartlist:res.data,modaldeleteindex:-1,deletemodal:false})
        }).catch((err)=>{
            console.log(err)
        })
    }
    onBtnPayClick=()=>{
        var data={
            cart:this.state.cartlist,
            totalharga:this.rendertotalhargacart()

        }
        Axios.put(ApiURL+'/transaksi/aftercheckout/'+this.props.LogReg.id,data)
        .then((res)=>{
            console.log(res.data)
            this.setState({cartlist:res.data,cpayedmodal:true,checkoutmodal:false})
        }).catch((err)=>{
            console.log(err)
        })
    }
    rendercartlist=()=>{
        if(this.state.cartlist.length===0){
            return(<div>tidak ada barang di cart silahkan belanja</div>)
        }
        return this.state.cartlist.map((item,index)=>{
            return(
            <tr key={item.id}>
                <td>{index+1}</td>
                <td>{item.nama}</td>
                <td>{item.namatoko}</td>
                <td><img src={ApiURL+item.image} alt="" width='200'/></td>
                <td>
                    {item.quantity===1?
                    <button className=' btn  btn-primary font-weight-bold py-0'  disabled  style={{fontSize:'12px'}}>-</button>:
                    <button className=' btn  btn-primary font-weight-bold py-0' style={{fontSize:'12px'}}onClick={()=>this.onMinuscartlistquantity(index,item.id)}>-</button>
                    }
                    
                    <input type="number" value={item.quantity} onChange={this.onOrderChange} className='text-center input-beli'/>
                    <button className=' btn  btn-primary font-weight-bold py-0' style={{fontSize:'12px'}} onClick={()=>this.onPlususcartlistquantity(index,item.id)}>+</button>
                </td>
                <td>{'Rp.'+Numeral(item.harga*item.quantity).format('0,0.00')}</td>
                <td><button className='btn btn-danger' onClick={()=>this.setState({deletemodal:true,modaldeleteindex:index})}>delete</button></td>
            </tr>
            )
        })
    }
    rendermodaldelete=()=>{
        if(this.state.modaldeleteindex!==-1){
            var id=this.state.cartlist[this.state.modaldeleteindex].id
            return(
                <div>
                    <ModalHeader>
                        delete cart
                    </ModalHeader>
                    <ModalBody>
                        <div style={{height:'100px'}}>
                            apakah anda yakin ingin menghapus {this.state.cartlist[this.state.modaldeleteindex].nama}?
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button className='btn btn-success' onClick={()=>this.OnBtndeletecart(id)} >Yes</button>
                        <button className='btn btn-danger' onClick={()=>this.setState({deletemodal:false,modaldeleteindex:-1})}>No</button>
                    </ModalFooter>
                </div>
            )
        }
    }
    rendermodalallCheckout=()=>{
        return this.state.cartlist.map((item,index)=>{
            return(
            <tr key={item.id}>
                <th>{index+1}</th>
                <th>{item.nama}</th>
                <th>{item.namatoko}</th>
                <th>{item.quantity}</th>
                <th>{'Rp.'+Numeral(item.harga*item.quantity).format('0,0.00')}</th>
            </tr>
            )
        })

    }
    
    rendertotalhargacart=()=>{
        var totalhargacart=0
        this.state.cartlist.forEach(element => {
            totalhargacart+=element.harga*element.quantity
        })
        return totalhargacart
    }
    render() {
        this.props.ChangeHeader(false)
        if(this.state.cartlist===null){
            return(
                <Loading/>
            )
        }

        return (
            <div className='home' >
                <Table className='home' striped hover>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama produk</th>
                            <th>Nama Toko</th>
                            <th>foto produk</th>
                            <th>Quantity</th>
                            <th>Total harga</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.rendercartlist()}
                    </tbody>
                </Table>
                <div className="d-flex justify-content-end mr-5">
                    <button className='btn btn-primary' onClick={()=>this.setState({checkoutmodal:true})}>Checkout all</button>
                </div>
                <Modal centered isOpen={this.state.deletemodal} toggle={()=>this.setState({deletemodal:false,modaldeleteindex:-1})}>
                        {this.rendermodaldelete()}
                </Modal>
                <Modal centered isOpen={this.state.checkoutmodal} toggle={()=>this.setState({checkoutmodal:false})} scrollable>
                    <ModalHeader >
                        List Checkout
                    </ModalHeader>
                    <ModalBody>
                        <Table className='mt-0' striped hover>
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Nama produk</th>
                                    <th>Nama Toko</th>
                                    <th>Quantity</th>
                                    <th>Total harga</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.rendermodalallCheckout()}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th>Total Belanja</th>
                                    <th>{'Rp.'+Numeral(this.rendertotalhargacart()).format('0,0.00')}</th>
                                </tr>
                                
                            </tfoot>
                        </Table>
                    </ModalBody>
                    <ModalFooter>
                        <button className='btn btn-primary' onClick={this.onBtnPayClick} >Pay</button>
                        <button className='btn btn-light' onClick={()=>this.setState({checkoutmodal:false})}>Cancel</button>
                    </ModalFooter>
                </Modal>
                <Modal>
                    <ModalBody isOpen={this.state.payedmodal} toggle={()=>this.setState({payedmodal:false})}>
                        SUDAH BAYAR
                    </ModalBody>
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
export default connect(MapStateToProps,{ChangeHeader}) (Cart);