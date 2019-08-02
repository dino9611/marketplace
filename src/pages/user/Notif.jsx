import React,  { Component } from 'react';
import Loading from './../../components/loading'


class Notif extends Component {
    state = {  }
    render() { 
        return (
            <div className='mt-5'>
                <h1>ini Notif</h1>
                <Loading/>
            </div>
         );
    }
}
 
export default Notif;