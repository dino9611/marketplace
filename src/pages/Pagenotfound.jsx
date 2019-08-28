import React from 'react';
import {connect} from 'react-redux'
import {ChangeHeader} from './../redux/actions'
import {Link} from 'react-router-dom'

class Pagenotfound extends React.Component {
    state = {  }

    componentDidMount(){
        this.props.ChangeHeader(false)
    }
    render() { 
        return (
      <div id="notfound">
        <div className="notfound">
            <div className="notfound-404">
            <h1>404</h1>
            </div>
            <h2>Oops, The Page you are looking for can't be found!</h2>

            <Link to='/' style={{textDecoration:'none'}}>
                <span className="arrow mt-3" />Return To Homepage
                
            </Link>
        </div>
    </div>
          );
    }
}
const MapStateToProps=(state)=>{
    return{
        LogReg:state.LogReg
    }
  }   
export default connect(MapStateToProps,{ChangeHeader}) (Pagenotfound);