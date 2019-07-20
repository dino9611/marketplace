import React, { Component } from 'react';
import Carousels from './../components/carousels'
import Jumbo from './../components/jumbotron'
import Iklan from './../components/iklan'
import Slider from 'react-slick'
import Footer from '../components/footer';
class Home extends Component {
    state = {  }
    render()
     {
        return (
            <div className=''>
                <div className=''>
                    <Jumbo/>
                </div>
                <div className='container mt-3 mb-0'>
                    <div className className='row'>
                        <div className='col-md-6 p-5 bg-primary text-white' style={{height:'300px'}}>
                            <h1>ini judul</h1>
                        </div>
                        <div className='col-md-6 p-0 m-0'>
                            <Iklan/>
                        </div>
                    </div>
                </div>
                <div className="container mt-5">
                    <div className="row ">
                        <div className=" text-dark col-md-2 col-6 p-1" >
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
                <div className=''>
                    <Footer/>
                </div>
            </div>
          )
    }
}
 
export default Home;