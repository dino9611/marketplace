import React,  { Component } from 'react';
import Loading from './../../components/loading'
import {connect} from 'react-redux'
import {ChangeHeader,CountCartnotif} from './../../redux/actions'
import Axios from 'axios';
import {Table,
} from 'reactstrap'
import { ApiURL } from '../../supports/apiurl';
class Notif extends Component {
    state = {
        NotifList:null,
        limit:10
      }
    componentDidMount(){
        this.props.ChangeHeader(false) 
        document.removeEventListener('scroll', () => {
            var isTop = window.scrollY < 730;
            if (isTop !== this.props.changeHead) {
                this.props.ChangeHeader(isTop)
                console.log(this.props.changeHead)
            }
        })
        
        Axios.get(ApiURL+'/transaksi/Getnotif',{
            params:{
                limit:this.state.limit,
                userid:this.props.LogReg.id
            }
        }).then((res)=>{
            this.props.CountCartnotif(this.props.LogReg.id)
            this.setState({NotifList:res.data})
        }).catch((err)=>{
            console.log(err)
        })

    }
    onbtnlebih=()=>{
        var limitlama=this.state.limit
        var limitbaru=limitlama+10
        console.log(limitbaru)
        this.setState({limit:limitbaru})
        console.log(this.state.limit)
            Axios.get(ApiURL+'/transaksi/Getnotif',{
                params:{
                    limit:limitbaru,
                    userid:this.props.LogReg.id
                }
            }).then((res)=>{
                this.props.CountCartnotif(this.props.LogReg.id)
                this.setState({NotifList:res.data})
            }).catch((err)=>{
                console.log(err)
            })

    }
    renderlistnotif=()=>{
        return this.state.NotifList.map((item,index)=>{
            return (
            <tr key={item.id}>
                <td>{index+1}</td>
                <td>{item.message}</td>
            </tr>
            )
        })
    }

    render() {
        this.props.ChangeHeader(false)
        if(this.state.NotifList===null){
            return <Loading/>
        }  
        return (
            <div className='home'>
                <Table className='mt-2' striped hover>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Notifikasi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderlistnotif()}
                    </tbody>
                </Table>
                <button onClick={this.onbtnlebih}>lebih</button>
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
export default connect(MapStateToProps,{ChangeHeader,CountCartnotif}) (Notif);