import React, { Component } from 'react';
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
class Iklan extends Component {
    state = {  }
    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay:true
          };
          return (
              <Slider {...settings}>
                <div style={{width:'100%',height:'300px'}}>
                    <img src="https://artikel.pricearea.com/wp-content/uploads/2016/05/syrup-marjan-murah.jpg" alt="1" width='100%' height='300px' />
                </div>
                <div style={{width:'100%',height:'300px'}}>
                    <img src="https://4.bp.blogspot.com/-PrXCutvdVeo/W2lTn-yXvXI/AAAAAAAAAL8/e0KaLa8XSyI_slFl2zjXzfIyjBuduh7IwCLcBGAs/s1600/Iklan%2BDowny%2B-%2BDa%2BDah%2BBau%2B-%2BAnak%2BKecil%2BGendut%2Bdi%2BSekolah.png" alt="1" width='100%' height='300px'/>

                </div>
                <div style={{width:'100%',height:'300px'}}>
                    <img src="https://www.ayobandung.com/images-bandung/post/articles/2019/02/24/45638/rice-3997767_640.jpg" alt="1" width='100%' height='300px'/>
               
                </div>
                <div style={{width:'100%',height:'300px'}}>
                    <img src="https://www.ayobandung.com/images-bandung/post/articles/2019/02/24/45638/rice-3997767_640.jpg" alt="1" width='100%' height='300px'/>
                </div>
                <div style={{width:'100%',height:'300px'}}>
                    <img src="https://www.ayobandung.com/images-bandung/post/articles/2019/02/24/45638/rice-3997767_640.jpg" alt="1" width='100%' height='300px'/>
                </div>
                <div style={{width:'100%',height:'300px'}}>
                    <img src="https://www.ayobandung.com/images-bandung/post/articles/2019/02/24/45638/rice-3997767_640.jpg" alt="1" width='100%' height='300px'/>
                </div>
              </Slider>

          )
    }
}
 
export default Iklan;