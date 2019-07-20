import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Header from './components/header'
import Home from './pages/Home'
import {Route} from 'react-router-dom'

class App extends React.Component {
  state = {  }
  render() { 
    return (
    <div >
        <Header/>
        <Route path='/' component={Home} exact/>
    </div>  
    )
    ;
  }
}
 
export default App;



