import React,  { Component } from 'react';
import Loading from './../../components/loading'
import {connect} from 'react-redux'
import {ChangeHeader} from './../../redux/actions'

class Notif extends Component {
    state = {  }
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
    render() { 
        return (
            <div className='mt-5'>
                <h1>ini Notif</h1>
                <Loading/>
            </div>
         );
    }
}
 
export default connect(null,{ChangeHeader}) (Notif);