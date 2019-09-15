import React from 'react';
import {connect} from 'react-redux'
import {ChangeHeader} from './../redux/actions'
import {Nav,TabContent,TabPane,NavItem,NavLink} from 'reactstrap'
import classnames from 'classnames'
import Loading from './../components/loading'
import { ApiURL } from '../supports/apiurl';
import {Link} from 'react-router-dom'
import Footer from './../components/footer'
import Numeral from 'numeral'
import Axios from 'axios';

class DetailToko  extends React.Component {
    state = {
        activeTab: '1',
        datatoko:null,
        listproduct:[]
      }
    componentDidMount(){
        this.props.ChangeHeader(false)
        var id=this.props.location.pathname.split('/')[2]
        Axios.get(`${ApiURL}/penjual/penjualdetail/${id}`)
        .then((res)=>{
            console.log(res.data)
            this.setState({datatoko:res.data})
        })
        Axios.get(`${ApiURL}/product/getproductpen/${id}`)
        .then((res1)=>{
            console.log(res1.data)
            this.setState({listproduct:res1.data})
        })
        document.removeEventListener('scroll', () => {
            var isTop = window.scrollY < 730;
            if (isTop !== this.props.changeHead) {
                this.props.ChangeHeader(isTop)
                console.log(this.props.changeHead)
            }
        });
    }
    componentWillReceiveProps(){
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
    renderlistproduct=()=>{
        return this.state.listproduct.map((item)=>{
            return(
                <div className=" text-dark col-md-3 col-6 p-2" >
                    <Link to={'/detailprod/'+item.id} style={{textDecoration:'none'}}>
                        <div className="card bg-light" style={{height:'450px',fontSize:'18px'}}>
                            <img src={`${ApiURL+item.image}`} alt={item.id} width='100%' height='275px'/>
                            <div className='mt-1 font-weight-bolder px-3 text-dark'>
                            {item.nama}/{item.satuanorder}
                            </div>
                            <div className="row px-4  mt-5">
                                <div className="col-3 p-1">
                                    <div className="rounded-pill bg-primary  text-center text-white" style={{fontSize:'10px'}}>{item.namacategory}</div>
                                </div>
                            </div>
                            <div className='mt-3 text-primary font-weight-bold px-3' style={{fontSize:'22px'}}>
                                {'Rp.'+Numeral(item.harga).format('0,0')}    
                            </div> 
                            </div>
                    </Link>
                </div>
            )
        })
    }
    render() {
        this.props.ChangeHeader(false)
        if(this.state.datatoko===null){
            return(
                <Loading/>
            )
        } 
        return (
        <div>
            <div className="home kontainer">
                <div className="row ">
                    <div className="col-md-9 p-0 ">
                        <div style={{ height:'450px'}} className='card bg-light ' >
                            <img src={ApiURL+this.state.datatoko.imagebackground} alt="toko-profile-banner" height='200px'/>
                            <div className="px-2 row">
                                <div className='  col-2 pl-3 py-0 pr-0'>
                                    <div className="detail-profile ">
                                        <img src={ApiURL+this.state.datatoko.imageprofile} width='100%' height='150px' alt=""/>
                                    </div>
                                </div>
                                <div className="col-10">
                                    <h1>{this.state.datatoko.namatoko}</h1>
                                </div>
                            </div>
                            <div className='margin-toko px-2'>
                                {this.state.datatoko.abouttoko}

                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 p-5">
                        <div style={{ height:'200px'}} className='card bg-light px-3 py-3' >
                            <center>
                                <img src={ApiURL+this.state.datatoko.imageprofile} alt="" height='60px' width='60px'/>
                                <div className='p-1' >{this.state.datatoko.namatoko}</div>
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
                    <div className="col-md-12 pt-1 px-0 pb-1">
                        <div className="card ">
                        <Nav tabs>
                            <NavItem>
                                <NavLink
                                className={classnames('tab-prod','text-primary',{ active: this.state.activeTab === '1',
                                                    'font-weight-bolder': this.state.activeTab === '1'})}
                                onClick={() => { this.toggle('1'); }}
                                >
                                All Product
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                className={classnames('text-primary', 'tab-prod',{ active: this.state.activeTab === '2',
                                            'font-weight-bolder': this.state.activeTab === '2'})}
                                onClick={() => { this.toggle('2'); }}
                                >
                                Toko Profile
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={this.state.activeTab}>
                            <TabPane tabId='1' className='px-3 py-4'>
                                {/* ini list produk */}
                            <div className="row ">
                                {this.renderlistproduct()}
                            </div>
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
export default connect(MapStateToProps,{ChangeHeader}) (DetailToko);;