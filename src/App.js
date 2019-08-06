import React from 'react';
// import logo from './logo.svg';
import './App.css';
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
import {Route} from 'react-router-dom'

class App extends React.Component {
  state = {
      isTop:true,
    }
  render() { 
    return (
    <div >
        <Header/>
        <Route path='/' component={Home} exact/>
        <Route path='/cart' component={Cart}/>
        <Route path='/history' component={History}/>
        <Route path='/search' component={Seacrh}/>
        <Route path='/register' component={Register}/>
        <Route path='/login' component={Login}/>
        <Route path='/jualanku' component={Managepenjual}/>
        <Route path='/manageadmin' component={ManageAdmin}/>
        <Route path='/notif' component={Notif}/>
        <Route path='/detailprod' component={Detailprod}/>
        <Route path='/detailtoko' component={DetailToko}/>
    </div>  
    )
    ;
  }
}
 
export default App;



