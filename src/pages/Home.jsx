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
import Numeral from 'numeral'
// import Header from './../components/header'
import Axios from 'axios'
import { ApiURL } from '../supports/apiurl';
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Loading from '../components/loading';

class Home extends Component {
    state = {
        listallproduct:[],
        Homeimage:null,
        Jumbotron:null,
        iklan:null,
      }
    componentDidMount(){
        this.props.ChangeHeader(true)
        console.log(this.props.changeHead)
        Axios.get(`${ApiURL}/product/getallproducthome`)
        .then((res)=>{
            this.setState({listallproduct:res.data})
        }).catch((err)=>{
            console.log(err)
        })
        Axios.get(ApiURL+'/admin/getHomedata')
        .then((res)=>{
            this.setState({Homeimage:res.data.home[0],Jumbotron:res.data.jumbotron,iklan:res.data.iklan})
        }).catch((err)=>{
            console.log(err)
        })
        document.addEventListener('scroll', () => {
            var isTop = window.scrollY < 730;
            if (isTop !== this.props.changeHead) {
                this.props.ChangeHeader(isTop)
                // console.log(isTop)
            }
        })
    }
    renderallproduct=()=>{
        return this.state.listallproduct.map((item)=>{
            return(
                <div className=" text-dark p-1" key={item.id}>
                    <Link to={'/detailprod/'+item.id} style={{textDecoration:'none'}}>
                        <div className="card bg-light" style={{height:'320px',fontSize:'17px'}}>
                            <img src={`${ApiURL+item.image}`} alt={item.id} height='150px' width='100%'/>
                            <div className='mt-1 font-weight-bolder px-3 text-dark' style={{height:80,fontSize:16}}>
                                {item.nama}/{item.satuanorder}
                            </div>
                            <div className="row px-4 ">
                                <div className="col-6 p-1">
                                    <div className="rounded-pill py-1 bg-primary  text-center text-white" style={{fontSize:'10px'}}>{item.namacategory}</div>
                                </div>
                            </div>
                            <div className='mt-1 text-primary font-weight-bold px-3' style={{fontSize:'16px'}}>
                                {'Rp.'+Numeral(item.harga).format('0,0')}    
                            </div> 
                        </div>
                    </Link>
                </div>
            )
        })
    }
    renderIklanlist=()=>{
        if(this.state.iklan){
            return this.state.iklan.map((item,index)=>{
                return(
                <div style={{width:'100%',height:'300px'}} >
                    <img src={ApiURL+item.iklanimage} alt="1" width='100%' height='300px' />
                </div>
                )
            })
        }
    }
    render(){
        const settings = {
            className:'center',
            centerPadding: "60px",
            // centerMode:true,
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 6,
            slidesToScroll: 1,
            autoplay:true,
            responsive: [
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                  }
                },
                {
                  breakpoint: 600,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                  }
                },
                {
                  breakpoint: 480,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                  }
                }
              ]
          };
        if(this.state.Homeimage===null){
            return <Loading/>
        }
        return (
            <div className=''>
                <Fade >
                    <div className='' >
                        <img src={ApiURL+this.state.Homeimage.homeimage} alt="gambar home" width='100%' height='740px'/>
                        <div className='home-hitam d-flex justify-content-center align-items-center'>
                            <div className='home-caption d-flex justify-content-center align-items-center text-center text-white'>
                                    Marketplace product pertanian terkece Se-Konohagakure
                            </div>
                        </div>
                    </div>
                    <div className='kontainer mt-2 mb-0'>
                        <div className='row'>
                            <div className='col-md-6 order-md-1 order-2 p-5 bg-primary text-white' style={{height:'300px'}}>
                                <h3 className='mt-3'>{this.state.Homeimage.maintext}</h3>
                            </div>
                            <div className='col-md-6 order-md-2  order-1 p-0 m-0'>
                                <Iklan>
                                    {this.renderIklanlist()}
                                </Iklan>
                            </div>
                        </div>
                    </div>
                    <div style={{marginLeft:'5.5%',marginRight:"5.5%"}}>
                        <Slider {...settings}>
                            {this.renderallproduct()}
                        </Slider>  
                    </div>
                    <div className='mr-3 mt-4'>
                        <Jumbo jumbo1={ApiURL+this.state.Jumbotron[0].jumbotronimage} jumbo2={ApiURL+this.state.Jumbotron[1].jumbotronimage}/>
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