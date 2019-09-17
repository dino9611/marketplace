import React, { Component } from 'react';
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
// import Fade from 'react-reveal/Fade'
class Iklan extends Component {
    state = {  }
    render() {
        const settings = {
            className:'center',
            centerPadding: "60px",
            // centerMode:true,
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay:true
          };
          return (
              <div className="iklan">
                <Slider {...settings}>
                    {this.props.children}
                </Slider>
              </div>

          )
    }
}
 
export default Iklan;