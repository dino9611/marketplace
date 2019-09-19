import React from 'react';
// import logo from './logo.svg';
import './App.css';
import {Route,Switch} from 'react-router-dom'
import {ApiURL} from './supports/apiurl'
import {connect} from 'react-redux'
import {ChangeHeader,RegLogSucces} from './redux/actions'
import Axios from 'axios'
import Loading from './components/loading'
import Header from './components/header'
import Home from './pages/Home'
import Cart from './pages/user/cart'
import History from './pages/user/history'
import Login from './pages/login'
import Managepenjual from './pages/penjual/managepenjual'
import ManageAdmin from './pages/admin/manageadmin'
import Register from './pages/register'
import Seacrh from './pages/search'
import Notif from './pages/user/Notif'
import Detailprod from './pages/detailproduct'
import DetailToko from './pages/detailtoko'
import JualReg from './pages/penjual/jualregister'
import Verified from './pages/user/verified'
import Pagenotfound from './pages/Pagenotfound'
import ResendVerif from './pages/user/resendverif'
import Search from './pages/search'
import Transaksipenjual from './pages/penjual/transaksipenjual';
import Transaksiuser from './pages/user/transaksiuser';
import PenjualSetting from './pages/penjual/penjualSetting'
import userSetting from './pages/user/userSetting';


class App extends React.Component {
  state = {
      loading:true
    }
  componentDidMount(){
    var username=localStorage.getItem('terserah')
    
    if(username!==null){
      Axios.get(ApiURL+'/users/cekuser?username='+username)
      .then((res)=>{
          console.log(res.data)
          this.props.RegLogSucces(res.data.data[0])
          localStorage.setItem('token',res.data.token)
          this.setState({loading:false})
          console.log(this.props.LogReg)
      })
      .catch((err)=>{
        console.log(err)
      })
      // Axios.put(ApiURL+'/transaksi/UpdateOvertime',{},{
      //   params:{
      //       userid:this.props.LogReg.id
      //   }
      // })
      // .then((res)=>{
      //     console.log(res.data)
      // }).catch((err)=>{
      //   console.log(err)
      // })
    }else{
      this.setState({loading:false})
    }

  }
  render() {
    if(this.state.loading) {
      return <Loading/>
    }
    return (
    <div >
        <Header/>
        <Switch>
          <Route path='/' component={Home} exact/>
          <Route path='/cart' component={Cart}/>
          <Route path='/history' component={History}/>
          <Route path='/search' component={Seacrh}/>
          <Route path='/register' component={Register}/>
          <Route path='/login' component={Login}/>
          <Route path='/manageproduct' component={Managepenjual}/>
          <Route path='/manageadmin' component={ManageAdmin}/>
          <Route path='/notif' component={Notif}/>
          <Route path='/detailprod' component={Detailprod}/>
          <Route path='/detailtoko' component={DetailToko}/>
          <Route path='/jualreg' component={JualReg}/>
          <Route path='/verified' component={Verified}/>
          <Route path='/resendverif' component={ResendVerif}/>
          <Route path='/search' component={Search}/>
          <Route path='/pentrans' component={Transaksipenjual}/>
          <Route path='/transusers' component={Transaksiuser}/>
          <Route path='/penjualsetting' component={PenjualSetting}/>
          <Route path='/userset' component={userSetting}/>
          <Route path='/*' component={Pagenotfound}/>
        </Switch>
    </div>  
    )
    ;
  }
}
const MapStateToProps=(state)=>{
  return{
      LogReg:state.LogReg
  }
}  
export default connect(MapStateToProps,{ChangeHeader,RegLogSucces})(App);



