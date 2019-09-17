import React from 'react';
import Footer from './../components/footer'
import {Nav,TabContent,TabPane,NavItem,NavLink,Modal,ModalBody,ModalFooter} from 'reactstrap'
import classnames from 'classnames'
import Fade from 'react-reveal/Fade'
import Axios from 'axios'
import {connect} from 'react-redux'
import {ChangeHeader,CountCartnotif} from './../redux/actions'
import { ApiURL } from '../supports/apiurl';
import Loading from './../components/loading'
import {Link} from 'react-router-dom'
import Numeral from 'numeral'


class DetailProd extends React.Component {
    state = {
        activeTab: '1',
        jumlahorder:1,
        proddata:null,
        loginfo:false,
        penjualsama:false,
        modalinfo:false,
        infoisi:'',
        isialamat:false
      }
    componentDidMount(){
        this.props.ChangeHeader(false)
        var id=this.props.location.pathname.split('/')[2]

        Axios.get(`${ApiURL}/product/getproductdetail/${id}`)
        .then((res)=>{
            console.log(res.data)
            document.removeEventListener('scroll', () => {
                var isTop = window.scrollY < 730;
                if (isTop !== this.props.changeHead) {
                    this.props.ChangeHeader(isTop)
                    // console.log(this.props.changeHead)
                }
            })

            this.setState({proddata:res.data})
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
    toggle=(tab)=>{
        if (this.state.activeTab !== tab) {
            this.setState({
              activeTab: tab
            })
        }   
    }
    onBtnAddToCart=()=>{
        if(this.props.LogReg.username===''){
            this.setState({modalinfo:true,infoisi:'Anda harus Login dahulu'})
        }else if(this.props.LogReg.alamat===null){
            this.setState({modalinfo:true,infoisi:'Anda harus Lengkapi data dahulu',isialamat:true})
        }
        else if(this.state.proddata.penjualid===this.props.LogReg.penjualid){
            this.setState({loginfo:true,penjualsama:true})
        }else{
            const token=localStorage.getItem('token')
            const headers={
                headers:{
                    'Authorization':`Bearer ${token}`
                }
            }
            var data={
                userid:this.props.LogReg.id,
                productid:this.state.proddata.id,
                penjualid:this.state.proddata.penjualid,
                quantity:this.state.jumlahorder
            }
            Axios.post(`${ApiURL}/cart/addtocart`,data,headers)
            .then((res)=>{
                console.log(res.data)
                this.props.CountCartnotif(this.props.LogReg.id)
                this.setState({loginfo:true})
            }).catch((err)=>{
                console.log(err)
            })

        }
    }
    render() {
        this.props.ChangeHeader(false)
        if(this.state.proddata===null){
            return(
                <Loading/>
            )
        }
        return (
            <div>
                <Modal isOpen={this.state.modalinfo} toggle={()=>this.setState({modalinfo:false,infoisi:false,isialamat:false})} className='text-primary font-weight-bolder' centered>
                    {/* <ModalHeader className=''>
                        <div className='btn btn-danger rounded-circle text-center flex-end' onClick={()=>this.setState({modalinfo:false})}>X</div>
                    </ModalHeader> */}
                    <ModalBody style={{height:'100px',alignSelf:'center',justifySelf:'center'}}>
                        {this.state.infoisi}
                    </ModalBody>
                    <ModalFooter className="pt-2">
                        {this.state.isialamat?
                            <Link to='/userset'>
                                <input type='button' value='User Settings'className='btn btn-primary rounded-pill' style={{width:'150px'}} onClick={()=>this.setState({modalinfo:false,infoisi:false,isialamat:false})} />
                            </Link>
                            :
                            
                            <Link to='/login'>
                                <input type='button' value='Login'className='btn btn-primary rounded-pill' style={{width:'100px'}} onClick={()=>this.setState({modalinfo:false,infoisi:false,isialamat:false})} />
                            </Link>
                            
                        }
                        <input type='button' value='Cancel'className='btn btn-primary rounded-pill' style={{width:'100px'}} onClick={()=>this.setState({modalinfo:false,infoisi:false,isialamat:false})} />
                    </ModalFooter>
                </Modal>
                <Modal isOpen={this.state.loginfo} toggle={()=>this.setState({loginfo:false,penjualsama:false})} className='text-primary font-weight-bolder' centered>
                    {/* <ModalHeader className=''>
                        <div className='btn btn-danger rounded-circle text-center flex-end' onClick={()=>this.setState({loginfo:false})}>X</div>
                    </ModalHeader> */}
                    <ModalBody style={{height:'100px',alignSelf:'center',justifySelf:'center'}}>
                        {this.state.penjualsama?'Anda tidak bisa membeli barang anda sendiri':'Product Berhasil masuk ke Cart'}
                    </ModalBody>
                    <ModalFooter className="pt-2">
                        <input type='button' value='OK'className='btn btn-primary rounded-pill' style={{width:'100px'}} onClick={()=>this.setState({loginfo:false,penjualsama:false})} />
                    </ModalFooter>
                </Modal>
                <Fade>
                    <div className='home kontainer' >
                        <div className="row ">
                            <div className="col-md-3 p-0" >
                                <div style={{height:'400px'}} className='card bg-light p-0' >
                                    <img src={ApiURL+this.state.proddata.image} alt="" height='100%' width='100%'/>
                                </div>
                            </div>
                            <div className="col-md-6 p-0 ">
                                <div style={{ height:'400px'}} className='card bg-light px-5 py-2' >
                                    <h3 className='mb-5'>{this.state.proddata.nama}/{this.state.proddata.satuanorder}</h3>
                                    <div className="row mb-4">
                                        <div className="col-3 px-4 py-0" style={{fontSize:'15px'}}>
                                            <div className='mb-4' >Harga</div>
                                            <div className='mb-4'>Total order</div>
                                            <div className='mb-4 pt-2'>Stock</div>
                                        </div>
                                        <div className="col-9 px-0 py-0" style={{fontSize:'15px'}}>
                                            <div className='mb-4'>{'Rp.'+Numeral(this.state.proddata.harga).format('0,0')} </div>
                                            <div className='mb-4 '>
                                                {this.state.jumlahorder===1?
                                                <button className=' btn  btn-primary font-weight-bold py-0'  disabled  style={{fontSize:'12px'}}>-</button>:
                                                <button className=' btn  btn-primary font-weight-bold py-0' style={{fontSize:'12px'}}onClick={()=>this.setState({jumlahorder:this.state.jumlahorder-1})}>-</button>
                                                }
                                                
                                                <input type="number" value={this.state.jumlahorder} onChange={this.onOrderChange} className='text-center input-beli'/>
                                                <button className=' btn  btn-primary font-weight-bold py-0' style={{fontSize:'12px'}} onClick={()=>this.setState({jumlahorder:this.state.jumlahorder+1})}>+</button>
                                            </div>
                                            <div className='mb-4  pt-2'>{this.state.proddata.stok}</div>
                                        </div>
                                    </div>
                                    <div style={{fontSize:21,fontWeight:'bolder',color:'#0275d8'}}>{'Rp.'+Numeral(this.state.proddata.harga*this.state.jumlahorder).format('0,0.00')}</div>
                                    <div className="d-flex justify-content-start mt-5">
                                        <button className='btn btn-primary rounded ' onClick={this.onBtnAddToCart}>add to cart</button>
                                        <button className='btn btn-primary rounded ml-4'>add to wishlist</button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 p-5">
                                <div style={{ height:'200px'}} className='card bg-light px-3 py-3' >
                                    <center>
                                        <Link to={'/detailtoko/'+this.state.proddata.penjualid} style={{textDecoration:'none'}}>
                                            
                                            <img  src={ApiURL+this.state.proddata.imageprofile} alt="" height='60px' width='60px'/>
                                            <div className='p-1 text-dark' >{this.state.proddata.namatoko}</div>
                                        </Link>
                                    </center>
                                    <div className="row ">
                                        <div className="col-6 border-dark pt-2" style={{borderRight:'0.5px solid grey',height:'70px'}}>
                                            <center>
                                                terjual <br/>
                                                20000
                                            </center>
                                        </div>
                                        <div className="col-6 pt-2">
                                            <center>
                                                transaksi <br/>
                                                200000
                                            </center>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-9 pt-1 px-0 pb-1">
                                <div className="card bg-light overflow-auto " style={{height:'400px'}}>
                                <Nav tabs>
                                    <NavItem>
                                        <NavLink
                                        className={classnames('tab-prod','text-primary',{ active: this.state.activeTab === '1',
                                                            'font-weight-bolder': this.state.activeTab === '1'})}
                                        onClick={() => { this.toggle('1'); }}
                                        >
                                        Informasi Product
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                        className={classnames('text-primary', 'tab-prod',{ active: this.state.activeTab === '2',
                                                    'font-weight-bolder': this.state.activeTab === '2'})}
                                        onClick={() => { this.toggle('2'); }}
                                        >
                                        Ulasan
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                                <TabContent activeTab={this.state.activeTab}>
                                    <TabPane tabId='1' className='px-3 py-4'>
                                            {this.state.proddata.informasiproduct}
                                    </TabPane>
                                    <TabPane tabId='2' className='px-3 py-4'>
                                        dadadadadasdas
                                    </TabPane>
                                </TabContent>
                                </div>
                            </div>
                            <div className="col-md-3">
                            </div>
                        </div>
                    </div>
                </Fade>
                <Footer/>

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
export default connect(MapStateToProps,{ChangeHeader,CountCartnotif}) (DetailProd);