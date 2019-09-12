import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faInstagram,faFacebookF,faYoutube,faTwitter} from '@fortawesome/free-brands-svg-icons'
import Fade from 'react-reveal/Fade'


class Footer extends React.Component {
    state = {  }
    render() { 
        return (
            <div className='bg-footer pt-5 mg-bawah '>
                <Fade top>
                    <div className=" res-kon">
                        <div className="row">
                            <div className="col-md-4 col-12 mb-3">
                                <h5 className='text-primary font-weight-bolder mb-3'>Roli</h5>
                                <FontAwesomeIcon icon={faInstagram} style={{fontSize:'30px'}} className='mr-3 footer-icon'/>
                                <FontAwesomeIcon icon={faFacebookF} style={{fontSize:'30px'}} className='mr-3 footer-icon' />
                                <FontAwesomeIcon icon={faYoutube} style={{fontSize:'30px'}} className='mr-3 footer-icon' />
                                <FontAwesomeIcon icon={faTwitter} style={{fontSize:'30px'}} className='mr-3 footer-icon' />
                            </div>
                            <div className="col-md-4 col-6 mb-5 ">
                                <div className="mb-3">
                                    <h6>Info</h6>
                                </div>
                                <div className="mb-4 heading-dalam">
                                    Product
                                    <br/>
                                    Program
                                    <br/>
                                    Blog
                                    <br/>
                                </div>
                                <div className="mb-3 ">
                                    <h6>Help</h6>
                                </div>
                                <div className=" heading-dalam ">
                                    Kebijakan privasi
                                    <br/>
                                    Syarat dan Ketentuan
                                    <br/>
                                    Media kit
                                    <br/>
                                </div>
                            </div>
                            <div className="col-md-4 col-6 mb-5 ">
                                <div className="mb-3 ">
                                    <h6>Kontak</h6>
                                </div>
                                <div className=" heading-dalam ">
                                    Butuh bantuan ? Hubungi kami: 
                                    <br/>
                                    Senin-Jumat 09.00-17.00 
                                    <br/>
                                    help@maSupp.com
                                    <br/>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fade>
            </div>
          );
    }
}
 
export default Footer;