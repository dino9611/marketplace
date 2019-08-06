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
import {faShoppingCart,faSearch,faBell} from '@fortawesome/free-solid-svg-icons'
import {connect} from 'react-redux'
import {ChangeHeader} from './../redux/actions'

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      search: false,
      isTop:true,
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen

    });
  }

  onSearchChange=()=>{
    if(this.refs.search.value===''){
      this.setState({search:false})
    }else{
      this.setState({search:true})
    }
  }
  render() {
    return (
      <div className={this.props.changeHead?'bg-transparent navbar-posisi':' bg-white navbar-posisi'} onScroll={this.bgnav}>
        <Navbar color="" light expand="xl" className='kontainer px-0' >
          <Link to='/'><NavbarBrand className={this.props.changeHead?'text-white font-weight-bolder ml-2':'text-primary font-weight-bolder ml-2'}>MaSupp</NavbarBrand> </Link>
              <Link to='/cart'>
                <div className={this.props.changeHead?'text-light rounded position-absolute header-cart':'rounded text-primary position-absolute header-cart'}>
                  <FontAwesomeIcon icon={faShoppingCart} className='text-center'></FontAwesomeIcon>
                  <span className={this.props.changeHead?'badge text-primary':'badge text-white '}>0</span>
                </div>
              </Link>
              <Link to='/notif'>
                <div className={this.props.changeHead?'text-light rounded position-absolute header-bell':'rounded text-primary position-absolute header-bell'}>
                  <FontAwesomeIcon icon={faBell} className='text-center'></FontAwesomeIcon>
                  <span className={this.props.changeHead?'badge text-primary':'badge text-light '}>0</span>
                </div>
              </Link>
              <div className='res-search bg-white'>
                <div className={this.props.changeHead?'header-search-top header-search position-absolute p-0 d-flex':' header-search position-absolute p-0 d-flex'}>
                  <div className={this.props.changeHead?'icon-search text-light' :'icon-search text-primary'}>
                    <FontAwesomeIcon icon={faSearch} className=''></FontAwesomeIcon>
                  </div>
                  <input type='search' placeholder='Search...' className={this.props.changeHead?'text-white bg-transparent change':'text-primary '} onChange={this.onSearchChange} ref='search' />
                  <button className={this.props.changeHead?'btn btn-light text-primary' :'btn btn-primary'}><nbsp/>Search</button>
                </div>
              </div>
          <Collapse className={this.props.changeHead?'header-search-top position-absolute header-search search-open':'position-absolute header-search search-open'} isOpen={this.state.search} scrolling  >
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
          </Collapse>
          <NavbarToggler onClick={this.toggle} className={this.props.changeHead?'ml-2 ':'ml-2 bg-primary'} />
          <Collapse isOpen={this.state.isOpen} navbar className='mg-collapse'>
            <Nav className="ml-auto" navbar>
              <NavItem>
                 <Link to='/history'><NavLink className={this.props.changeHead?'text-white':'text-primary'}>Transaksi</NavLink> </Link>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret className={this.props.changeHead?'text-white':'text-primary'}>
                  Options
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                   <Link to='/manageadmin'>Admin</Link>
                  </DropdownItem>
                  <DropdownItem>
                    Option 2
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    logout
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
            
          </Collapse>

        </Navbar>
      </div>
    );
  }
}
const MapStateToProps=(state)=>{
  return{
      changeHead:state.HeaderBg
  }
}
export default connect(MapStateToProps,{ChangeHeader}) (Header);