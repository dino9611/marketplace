import React from 'react';
import Footer from './../components/footer'
import {Nav,TabContent,TabPane,NavItem,NavLink} from 'reactstrap'
import classnames from 'classnames'
import Fade from 'react-reveal/Fade'
import {connect} from 'react-redux'
import {ChangeHeader} from './../redux/actions'

class DetailProd extends React.Component {
    state = {
        activeTab: '1',
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
       
        console.log(this.props.changeHead)
    }
    toggle=(tab)=>{
        if (this.state.activeTab !== tab) {
            this.setState({
              activeTab: tab
            })
        }   
    }
    render() {
        this.props.ChangeHeader(false) 
        return (
            <div>
                <Fade>
                    <div className='home kontainer' >
                        <div className="row ">
                            <div className="col-md-3 p-0" >
                                <div style={{height:'400px'}} className='card bg-light p-0' >
                                    <img src="https://ecs7.tokopedia.net/img/cache/700/product-1/2017/4/10/17182546/17182546_3ba76881-816b-4811-a0e4-56774f14239f_2048_1365.jpg" alt="" height='100%' width='100%'/>
                                </div>
                            </div>
                            <div className="col-md-6 p-0 ">
                                <div style={{ height:'400px'}} className='card bg-light px-5 py-2' >
                                    <h3 className='mb-5'>Nama product</h3>
                                    <div className="row">
                                        <div className="col-3 px-4 py-0" style={{fontSize:'15px'}}>
                                            <div className='mb-4' >Harga</div>
                                            <div className='mb-4' >Minimal Pembelian</div>
                                            <div className='mb-4'>Total order</div>
                                            <div className='mb-4 pt-2'>Stock</div>
                                        </div>
                                        <div className="col-9 px-0 py-0" style={{fontSize:'15px'}}>
                                            <div className='mb-4'>asdadasdad</div>
                                            <div className='mb-4 pt-2 '>asdadasdad</div>
                                            <div className='mb-4 pt-3'><input type="number" name="" id="" className='text-center'/></div>
                                            <div className='mb-4'>asdadasdad</div>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-start mt-3">
                                        <button className='btn btn-primary rounded '>add to cart</button>
                                        <button className='btn btn-primary rounded ml-4'>add to wishlist</button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 p-5">
                                <div style={{ height:'200px'}} className='card bg-light px-3 py-3' >
                                    <center>
                                        <img  src="https://ecs7.tokopedia.net/img/cache/700/product-1/2017/4/10/17182546/17182546_3ba76881-816b-4811-a0e4-56774f14239f_2048_1365.jpg" alt="" height='60px' width='60px'/>
                                        <div className='p-1' >nama toko</div>
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
                                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam 
                                        tempore voluptatibus officiis eaque distinctio nemo qui ab quidem 
                                        voluptas alias. Minima, eaque labore! Natus non reprehenderit temporibus 
                                        quisquam sint earum!
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
        changeHead:state.HeaderBg
    }
  } 
export default connect(MapStateToProps,{ChangeHeader}) (DetailProd);