import React from 'react';
import {Nav,TabContent,TabPane,NavItem,NavLink} from 'reactstrap'
import {connect} from 'react-redux'
import {ChangeHeader} from './../../redux/actions'
import classnames from 'classnames'
class ManageAdmin extends React.Component {
    state = {
        activeTab: '1'
      }
    componentDidMount(){
        this.props.ChangeHeader(false)
        document.removeEventListener('scroll', () => {
            var isTop = window.scrollY < 730;
            if (isTop !== this.props.changeHead) {
                this.props.ChangeHeader(isTop)
                console.log(this.props.changeHead)
            }
        });
    }
    toggle=(tab)=>{
        if (this.state.activeTab !== tab) {
            this.setState({
              activeTab: tab
            })
        }   
    }
    render() { 
        return (
        <div>
            <div className="home">
            <Nav tabs>
                <NavItem>
                    <NavLink
                    className={classnames('tab-prod','text-primary',{ active: this.state.activeTab === '1',
                                        'font-weight-bolder': this.state.activeTab === '1'})}
                    onClick={() => { this.toggle('1'); }}
                    >
                    Manage Home
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                    className={classnames('text-primary', 'tab-prod',{ active: this.state.activeTab === '2',
                                'font-weight-bolder': this.state.activeTab === '2'})}
                    onClick={() => { this.toggle('2'); }}
                    >
                    Manage user
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                    className={classnames('text-primary', 'tab-prod',{ active: this.state.activeTab === '3',
                                'font-weight-bolder': this.state.activeTab === '3'})}
                    onClick={() => { this.toggle('3'); }}
                    >
                    Manage transaksi
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId='1' className='px-3 py-1'>
                    <div className="row">
                        <div className="col-md-2 p-1">
                            <div className='bg-primary text-white overflow-auto 'style={{height:'590px'}}>
                                <div style={{height:'150',fontSize:'30px',fontWeight:"bolder",borderBottom:'0.5px solid white'}} className='p-4 mb-1'>
                                    IKLAN
                                </div>
                                <div style={{height:'150',fontSize:'30px',fontWeight:"bolder",borderBottom:'0.5px solid white'}} className='p-4 mb-1'>
                                    Jumbotron
                                </div>
                                <div style={{height:'150',fontSize:'30px',fontWeight:"bolder",borderBottom:'0.5px solid white'}} className='p-4 mb-1'>
                                    about
                                </div>
                            </div>
                        </div>
                        <div className="col-md-10">
                            <div className='bg-light overflow-auto'>

                            </div>
                        </div>
                    </div>
                </TabPane>
                <TabPane tabId='2' className='px-3 py-4'>
                    dadadadadasdas
                </TabPane>
                <TabPane tabId='3' className='px-3 py-4'>
                    hgjhfj fgf
                </TabPane>
            </TabContent>
            </div>
        </div>  
        );
    }
}
 
export default connect(null,{ChangeHeader}) (ManageAdmin);