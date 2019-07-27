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
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faShoppingCart,faSearch} from '@fortawesome/free-solid-svg-icons'
class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      search: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen

    });
  }
  componentDidMount(){
    
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
      <div className='bg-white navbar-posisi' onScroll={this.bgnav}>
        <Navbar color="" light expand="xl" className='kontainer px-0'>
              <div className='rounded text-primary position-absolute header-cart'>
                <FontAwesomeIcon icon={faShoppingCart} className='text-center'></FontAwesomeIcon>
                <span className='badge text-white '>0</span>
              </div>
              <div className=' header-search position-absolute p-0 d-flex'>
                <div className='icon-search'>
                  <FontAwesomeIcon icon={faSearch} className=''></FontAwesomeIcon>
                </div>
                <input type='text' placeholder='Search...' className='text-primary' onChange={this.onSearchChange} ref='search' />
                <button className='btn btn-primary'><nbsp/>Search</button>
              </div>
          <Collapse className='position-absolute header-search search-open' isOpen={this.state.search}  >
           <div className='bg-white pl-1 '>
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
          <NavbarBrand className='text-primary font-weight-bolder' href="/">MaaSupp</NavbarBrand>
          <NavbarToggler onClick={this.toggle} className='' />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/components/">Transaksi</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Options
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    Option 1
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
export default Header;