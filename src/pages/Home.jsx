import React, { Component } from 'react';
// import Carousels from './../components/carousels'
import Jumbo from './../components/jumbotron'
import Iklan from './../components/iklan'
import {Link} from 'react-router-dom'
// import Slider from 'react-slick'
import Footer from '../components/footer';
import Fade from 'react-reveal/Fade'
import {connect} from 'react-redux'
import {ChangeHeader} from './../redux/actions'
// import Header from './../components/header'
class Home extends Component {
    state = {
        
      }
    componentDidMount(){
        this.props.ChangeHeader(true)
        console.log(this.props.changeHead)
        document.addEventListener('scroll', () => {
            var isTop = window.scrollY < 730;
            if (isTop !== this.props.changeHead) {
                this.props.ChangeHeader(isTop)
                // console.log(isTop)
            }
        });
    }

    render(){
        // if(this.props.LogReg.)
        return (
            <div className=''>
                {/* <Header top={this.state.isTop} /> */}
                <Fade >
                    <div className='' >
                        <img src="https://static01.nyt.com/images/2017/09/25/dining/bonebrothchickenstock/bonebrothchickenstock-articleLarge.jpg" alt="" width='100%' height='740px'/>
                        <div className='home-hitam d-flex justify-content-center align-items-center'>
                            <div className='home-caption d-flex justify-content-center align-items-center text-center text-white'>
                                    Marketplace product pertanian terkece Se-Konohagakure
                            </div>
                        </div>
                    </div>
                    <div className='kontainer mt-2 mb-0'>
                    
                        <div className='row'>
                            <div className='col-md-6 order-md-1 order-2 p-5 bg-primary text-white' style={{height:'300px'}}>
                                <h1>ini judul</h1>
                            </div>
                            <div className='col-md-6 order-md-2  order-1 p-0 m-0'>
                                <Iklan/>
                            </div>
                        </div>
                    </div>
                    <div className="kontainer ">
                        <div className="row ">
                            <div className=" text-dark col-md-2 col-6 p-1" >
                                <Link to='/detailprod'>
                                    <div className="card bg-light" style={{height:'300px'}}>
                                        <img src="https://www.ayobandung.com/images-bandung/post/articles/2019/02/24/45638/rice-3997767_640.jpg" alt="1" width='100%'/>
                                        ke detail roid 
                                    </div>
                                </Link>
                            </div>
                            <div className=" text-dark col-md-2 col-6  p-1" >
                                <div className="card bg-light" style={{height:'300px'}}>
                                    <img src="https://www.ayobandung.com/images-bandung/post/articles/2019/02/24/45638/rice-3997767_640.jpg" alt="1" width='100%'/> 
                                </div>
                            </div>
                            <div className=" text-dark col-md-2 col-6  p-1" >
                                <div className="card bg-light" style={{height:'300px'}}>
                                    <img src="https://www.ayobandung.com/images-bandung/post/articles/2019/02/24/45638/rice-3997767_640.jpg" alt="1" width='100%'/> 
                                </div>
                            </div>
                            <div className=" text-dark col-md-2 col-6  p-1" >
                                <div className="card bg-light" style={{height:'300px'}}>
                                    <img src="https://www.ayobandung.com/images-bandung/post/articles/2019/02/24/45638/rice-3997767_640.jpg" alt="1" width='100%'/> 
                                </div>
                            </div>
                            <div className=" text-dark col-md-2 col-6  p-1" >
                                <div className="card bg-light" style={{height:'300px'}}>
                                    <img src="https://www.ayobandung.com/images-bandung/post/articles/2019/02/24/45638/rice-3997767_640.jpg" alt="1" width='100%'/> 
                                </div>
                            </div>
                            <div className="text-dark col-md-2 col-6  p-1" >
                                <div className="card bg-light" style={{height:'300px'}}>
                                    <img src="https://www.ayobandung.com/images-bandung/post/articles/2019/02/24/45638/rice-3997767_640.jpg" alt="1" width='100%'/> 
                                    saddasd
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='mr-3'>
                        <Jumbo/>
                    </div>
                </Fade>
                <div className=''>
                    <Footer/>
                </div>
            </div>
          )
    }
}
const MapStateToProps=(state)=>{
    return{
        changeHead:state.HeaderBg,
        LogReg:state.LogReg
    }
}
export default connect(MapStateToProps,{ChangeHeader})(Home);