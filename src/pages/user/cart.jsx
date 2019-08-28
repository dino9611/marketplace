import React from 'react';
import {connect} from 'react-redux'
import {ChangeHeader} from './../../redux/actions'
import {Table,Modal,ModalHeader,ModalBody,ModalFooter} from 'reactstrap'
import Axios from 'axios'
import { ApiURL } from '../../supports/apiurl';
import Numeral from 'numeral'
import Loading from './../../components/loading'
// import {Redirect} from 'react-router-dom'

class Cart extends React.Component {
    state = {
        cartlist:null,
        jumlahorder:[],
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
    onMinuscartlistquantity=(index)=>{
        var cartlistnew=this.state.cartlist
        cartlistnew[index].quantity-=1
        this.setState({cartlist:cartlistnew})
    }
    onPlususcartlistquantity=(index)=>{
        var cartlistnew=this.state.cartlist
        cartlistnew[index].quantity+=1
        this.setState({cartlist:cartlistnew})
    }
    rendercartlist=()=>{
        return this.state.cartlist.map((item,index)=>{
            return(
            <tr key={item.id}>
                <td>{index+1}</td>
                <td>{item.nama}</td>
                <td><img src={ApiURL+item.image} alt="" width='200'/></td>
                <td>
                    {item.quantity===1?
                    <button className=' btn  btn-primary font-weight-bold py-0'  disabled  style={{fontSize:'12px'}}>-</button>:
                    <button className=' btn  btn-primary font-weight-bold py-0' style={{fontSize:'12px'}}onClick={()=>this.onMinuscartlistquantity(index)}>-</button>
                    }
                    
                    <input type="number" value={item.quantity} onChange={this.onOrderChange} className='text-center input-beli'/>
                    <button className=' btn  btn-primary font-weight-bold py-0' style={{fontSize:'12px'}} onClick={()=>this.onPlususcartlistquantity(index)}>+</button>
                </td>
                <td>{'Rp.'+Numeral(item.harga*item.quantity).format('0,0.00')}</td>
                <td><button className='btn btn-danger'>delete</button></td>
            </tr>
            )
        })
    }
    render() {
        this.props.ChangeHeader(false)
        if(this.state.cartlist===null){
            return(
                <Loading/>
            )
        } 
        return (
            <div className='mt-5' >
                <Table className='mt-5' striped hover>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Nama produk</th>
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