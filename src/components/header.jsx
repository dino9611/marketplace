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
import {ChangeHeader,LogOutSuccess,RegLogSucces} from './../redux/actions'

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
      countcart:0
    };
  }
  componentDidMount(){
    Axios.get(ApiURL+'/cart/getcountcart/'+this.props.LogReg.id)
    .then((res)=>{
        console.log(res.data)
        this.setState({countcart:res.data.jumlahcart})
    }).catch((err)=>{
      console.log(err)
    })
  }
  // componentDidUpdate(){
  //   Axios.get(ApiURL+'/cart/getcountcart/'+this.props.LogReg.id)
  //   .then((res)=>{
  //       console.log(res.data)
  //       this.setState({countcart:res.data.jumlahcart})
  //   }).catch((err)=>{
  //     console.log(err)
  //   })
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
    localStorage.removeItem('login')
    this.props.LogOutSuccess()
    console.log(this.props.LogReg)
  }
  
  render() {
    return (
      <div className={this.props.changeHead?'bg-transparent navbar-posisi':' bg-white navbar-posisi'} onScroll={this.bgnav}>
        <Navbar color="" light expand="xl" className='kontainer px-0' >
          <NavbarBrand href='http://localhost:3000/' className={this.props.changeHead?'text-white font-weight-bolder ml-2':'text-primary font-weight-bolder ml-2'} >MaSupp</NavbarBrand>
              {this.props.LogReg.username===''?
              null
              :
              <div>

                <Link to={'/cart'}>
                  <div className={this.props.changeHead?'text-light rounded position-absolute header-cart':'rounded text-primary position-absolute header-cart'}>
                    <FontAwesomeIcon icon={faShoppingCart} className='text-center'></FontAwesomeIcon>
                    <span className={this.props.changeHead?'badge text-primary':'badge text-white '}>{this.state.countcart}</span>
                  </div>
                </Link>
                <Link to='/notif'>
                  <div className={this.props.changeHead?'text-light rounded position-absolute header-bell':'rounded text-primary position-absolute header-bell'}>
                    <FontAwesomeIcon icon={faBell} className='text-center'></FontAwesomeIcon>
                    <span className={this.props.changeHead?'badge text-primary':'badge text-light '}>0</span>
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
                  <Link to={'/search?prod='+this.state.searchtext+'&page=1'} >
                    <button  className={this.props.changeHead?'btn btn-light text-primary searchbtn ' :'btn btn-primary searchbtn'}>
                      Search
                      </button>
                      
                  </Link>
                </div>
              </div>
          {/* <Collapse className={this.props.changeHead?'header-search-top position-absolute header-search search-open':'position-absolute header-search search-open'} isOpen={this.state.search} scrolling  >
           <div className={this.props.changeHead?'bg-transparent text-light pl-1 overflow-auto ':'bg-white pl-1 overflow-auto '} style={{height:'200px'}}>
             <ul>
                <li>sdadasdas</li>
                <li>sdadasdas</li>
                <li>sdadasdas</li>
                <li>sdadasdas</li>
                <li>sdadasdas</li>
                <li>sdadasdas</li>   <li>sdadasdas</li>
                <li>sdadasdas</li>
                <li>sdadasdas</li>
                <li>sdadasdas</li>
                <li>sdadasdas</li>
                <li>sdadasdas</li>   <li>sdadasdas</li>
                <li>sdadasdas</li>
                <li>sdadasdas</li>
                <li>sdadasdas</li>
                <li>sdadasdas</li>
                <li>sdadasdas</li>   <li>sdadasdas</li>
                <li>sdadasdas</li>
                <li>sdadasdas</li>
                <li>sdadasdas</li>
                <li>sdadasdas</li>
                <li>sdadasdas</li>
             </ul>
            </div>
          </Collapse> */}
          {this.props.LogReg.username===''?null:<NavbarToggler onClick={this.toggle} className={this.props.changeHead?'ml-2 ':'ml-2 bg-primary'} ></NavbarToggler>}
              {this.props.LogReg.username===''?
              <Nav className='ml-md-auto ml-1' >
                  <NavItem>
                    <Link to='/register'>
                      <button className={this.props.changeHead?'mr-2 mt-1  btn btn-store border-white text-white' :'mr-2 mt-1 btn btn-primary'}style={{fontSize:'12px'}}>Join Now!</button>
                    </Link>
                  </NavItem>
                  <NavItem>
                    <Link to='login'>
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
                          <DropdownItem>
                          <Link to={'/manageadmin?trans=conmin'}>Admin</Link>
                          </DropdownItem>
                          {this.props.LogReg.statusver==='Unverified'?
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
                          <DropdownItem onClick={this.onlogout}>
                            <Link to='/'>Logout</Link>
                          </DropdownItem>
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
      LogReg:state.LogReg
  }
}
export default connect(MapStateToProps,{ChangeHeader,LogOutSuccess,RegLogSucces}) (Header);