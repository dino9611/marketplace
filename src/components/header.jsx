import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
import {Link} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faShoppingCart,faSearch,faBell,faStore,faUser} from '@fortawesome/free-solid-svg-icons'
import {connect} from 'react-redux'
import {ChangeHeader,LogOutSuccess,RegLogSucces,CountCartnotif,Categorylistload} from './../redux/actions'

import Axios from 'axios'
import { ApiURL } from '../supports/apiurl';
// import { ApiURL } from '../supports/apiurl';


class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      search: false,
      searchtext:'',
      isTop:true,
      createstore:true,
      countcart:0,
      changeCat:0
    };
  }
  componentDidMount(){

      this.props.CountCartnotif(this.props.LogReg.id)
      this.props.Categorylistload()
      Axios.put(ApiURL+'/transaksi/UpdateOvertime',{},{
        params:{
            userid:this.props.LogReg.id
        }
      })
      .then((res)=>{
          console.log(res.data)
      }).catch((err)=>{
        console.log(err)
      })
  }
  // componentDidUpdate(){
  //   this.props.CountCartnotif(this.props.LogReg.id)    
  // }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen

    });
  }

  onSearchChange=()=>{
    if(this.refs.search.value===''){
      this.setState({search:false})
    }else{
      this.setState({search:true,searchtext:this.refs.search.value})
    }
  }
  
  oncreatestorechange=()=>{
    if(this.props.LogReg.penjualid!==null&&this.props.LogReg.username!==''){
      this.setState({createstore:true})
    }else{
      this.setState({createstore:false})
    }
    console.log(this.state.createstore)
  }
  onlogout=()=>{
    localStorage.removeItem('terserah')
    localStorage.removeItem('token')
    this.props.LogOutSuccess()
    console.log(this.props.LogReg)
  }
  renderCatProdlist=()=>{
    if(this.props.Categorylist.length!==0){
      return this.props.Categorylist.map((item,index)=>{
        return (
          <option value={item.id} key={index}>{item.namacategory}</option>
        )
      })
    }
  }
  render() {
    return (
      <div className={this.props.changeHead?'bg-transparent navbar-posisi':' bg-white navbar-posisi'} onScroll={this.bgnav}>
        <Navbar color="" light expand="xl" className='kontainer px-0 bg-transparent' >
          <NavbarBrand href='http://localhost:3000/' className={this.props.changeHead?'text-white font-weight-bolder ml-2':'text-primary font-weight-bolder ml-2'} >Roli</NavbarBrand>
              {this.props.LogReg.username===''?
              null
              :
              <div>

                <Link to={'/cart'}>
                  <div className={this.props.changeHead?'text-light rounded position-absolute header-cart':'rounded text-primary position-absolute header-cart'}>
                    <FontAwesomeIcon icon={faShoppingCart} className='text-center'></FontAwesomeIcon>
                    <span className={this.props.changeHead?'badge text-primary':'badge text-white '}>{this.props.jumlahcartnotif.jumlahcart}</span>
                  </div>
                </Link>
                <Link to='/notif'>
                  <div className={this.props.changeHead?'text-light rounded position-absolute header-bell':'rounded text-primary position-absolute header-bell'}>
                    <FontAwesomeIcon icon={faBell} className='text-center'></FontAwesomeIcon>
                    <span className={this.props.changeHead?'badge text-primary':'badge text-light '}>{this.props.jumlahcartnotif.jumlahnotif}</span>
                  </div>
                </Link>
              </div>
            
            
              }
              {this.props.LogReg.penjualid!==null&&this.props.LogReg.username!==''?
                    <Link to={'/manageproduct'}>
                    <div className={this.props.changeHead?'text-light rounded position-absolute header-icon-store':'rounded text-primary position-absolute header-icon-store'}>
                      <FontAwesomeIcon icon={faStore}></FontAwesomeIcon>
                    </div>
                  </Link>

                  :
                    <Link to={'/jualreg'}>
                    <div className={this.props.changeHead?'text-light rounded position-absolute header-store':'rounded text-primary position-absolute header-store'}>
                      <button className={this.props.changeHead?'btn btn-store border-white mt-1  text-white':'mt-1 btn btn-primary '} style={{fontSize:'12px'}}>Create Store</button>
                    </div>
                  </Link>
              }
              
              <div className='res-search bg-white'>
                <div className={this.props.changeHead?'header-search-top header-search position-absolute p-0 d-flex':' header-search position-absolute p-0 d-flex'}>
                  <div className={this.props.changeHead?'icon-search text-light' :'icon-search text-primary'}>
                    <FontAwesomeIcon icon={faSearch} className=''></FontAwesomeIcon>
                  </div>
                  <input type='search' placeholder='Search...' className={this.props.changeHead?'text-white bg-transparent change':'text-primary '} onChange={this.onSearchChange} ref='search' />
                  <a href={"http://localhost:3000/search?prod="+this.state.searchtext+'&page=1&cat='+this.state.changeCat}>
                    <button  className={this.props.changeHead?'bg-transparent  searchbtn  btnborder' :' btn-primary searchbtn1'}>
                      Search
                    </button>
                  </a>
                </div>
              </div>
              <div className='bg-transparent'>
                <select ref='category' className={this.props.changeHead?' header-category header-category-color':'header-category1 header-category-color1 '} onChange={()=>this.setState({changeCat:this.refs.category.value})} >
                  
                    <option value="" disabled selected hidden>Pilih Kategori</option>
                    <option value='0' >Semua Produk</option>
                    {this.renderCatProdlist()}
                  
                </select>
              </div>
          {this.props.LogReg.username===''?null:<NavbarToggler onClick={this.toggle} className={this.props.changeHead?'ml-2 ':'ml-2 bg-primary'} ></NavbarToggler>}
              {this.props.LogReg.username===''?
              <Nav className='ml-md-auto ml-1' >
                  <NavItem>
                    <Link to='/register'>
                      <button className={this.props.changeHead?'mr-2 mt-1  btn btn-store border-white text-white' :'mr-2 mt-1 btn btn-primary'}style={{fontSize:'12px'}}>Join Now!</button>
                    </Link>
                  </NavItem>
                  <NavItem>
                    <Link to='/login'>
                      <button className={this.props.changeHead?'btn mt-1 btn btn-store border-white text-white' :'mt-1 btn btn-primary'} style={{fontSize:'12px'}}>Sign In</button>
                    </Link>
                  </NavItem>
              </Nav>
                :
                <Collapse isOpen={this.state.isOpen} navbar className='mg-collapse'>
                  <Nav className="ml-auto" navbar>
                      <NavItem>
                       <NavLink href='http://localhost:3000/history?stat=waiting' className={this.props.changeHead?'text-white ml-md-0 ml-3':'ml-md-0 text-primary ml-3'}>Transaksi</NavLink>
                      </NavItem>
                      <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav className={this.props.changeHead?'text-white ml-md-0 ml-3':'ml-md-0 text-primary ml-3'}>
                          <FontAwesomeIcon icon={faUser}/><span className='ml-2'>{this.props.LogReg.username}</span>
                        </DropdownToggle>
                        <DropdownMenu right>
                          {this.props.LogReg.roleid===2||this.props.LogReg.roleid===1?

                            <DropdownItem>
                              <Link to={'/manageadmin?trans=conmin'}>Admin</Link>
                            </DropdownItem>

                            :
                            null
                          }
                          {
                            this.props.LogReg.penjualid?
                            <DropdownItem>
                              <Link to={'/penjualsetting'}>Seller Settings</Link>
                            </DropdownItem>
                            :
                            null
                          }
                            <DropdownItem>
                              <Link to={'/userset'}>Users Settings</Link>
                            </DropdownItem>
                          {this.props.LogReg.statusver==='unverified'?
                        <Link to='/resendverif'>
                          <DropdownItem>
                            <span style={{color:'red'}}> belum verified</span>
                          </DropdownItem> 
                        
                        </Link>     
                          :
                          <DropdownItem>
                            <span style={{color:'green'}}>verified </span> 
                          </DropdownItem>
                        
                        
                        }
                     
                          <DropdownItem divider />
                          <a href="http://localhost:3000/" onClick={this.onlogout}>
                            <DropdownItem onClick={this.onlogout}>
                                LogOut
                            </DropdownItem>
                          </a>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                  </Nav>
                  </Collapse> 
                  
              
              }
            
          

        </Navbar>
      </div>
    );
  }
}
const MapStateToProps=(state)=>{
  return{
      changeHead:state.HeaderBg,
      LogReg:state.LogReg,
      jumlahcartnotif:state.Countcartnotif,
      Categorylist:state.Categorylist
  }
}
export default connect(MapStateToProps,{ChangeHeader,LogOutSuccess,RegLogSucces,CountCartnotif,Categorylistload}) (Header);