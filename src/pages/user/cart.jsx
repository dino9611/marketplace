import React from 'react';
import {connect} from 'react-redux'
import {ChangeHeader} from './../../redux/actions'
import {Redirect} from 'react-router-dom'

class Cart extends React.Component {
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
        // if(this.props.LogReg.id===0){
        //    return <Redirect to='/'></Redirect>
        // } 
        return (
            <div className='mt-5' >
                <h1>ini cart</h1>
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
export default connect(MapStateToProps,{ChangeHeader}) (Cart);