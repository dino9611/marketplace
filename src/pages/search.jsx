import React, { Component } from 'react';
import {connect} from 'react-redux'
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import {ChangeHeader} from './../redux/actions'
import Axios from 'axios'
import {Link} from 'react-router-dom'
import { ApiURL } from '../supports/apiurl';
import Numeral from 'numeral'
import querystring from 'query-string'
import Loading from './../components/loading'

class Search extends Component {
    state = {
        listallproduct:null,
        paginationitem:0,
        currentpage:0,
        keywordsearch:'',
        Categorysearch:'Semua Product',
        cat:0
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
        var query=querystring.parse(this.props.location.search)
        console.log(querystring.parse(this.props.location.search))
        Axios.get(`${ApiURL}/product/getsearchproduct?prod=${query.prod}&page=${query.page}&cat=${query.cat}`)
        .then((res)=>{
            console.log(res.data)
            if(res.data.pagination.length===0){
                this.setState({listallproduct:res.data.pagination,paginationitem:res.data.page.jumlah,currentpage:parseInt(query.page),Categorysearch:'',cat:query.cat})
            }else{
                if(query.cat!=='0'){
                    this.setState({listallproduct:res.data.pagination,paginationitem:res.data.page.jumlah,currentpage:parseInt(query.page),Categorysearch:res.data.pagination[0].namacategory,cat:query.cat})
                }else{
                    this.setState({listallproduct:res.data.pagination,paginationitem:res.data.page.jumlah,currentpage:parseInt(query.page)})
                }
            }
        }).catch((err)=>{
            console.log(err)
        })
    }


    renderAllProduct=()=>{
        return this.state.listallproduct.map((item)=>{
            return(
                <div className=" text-dark col-md-2 col-6 p-1" key={item.id}>
                    <Link to={'/detailprod/'+item.id} style={{textDecoration:'none'}} key={item.id}>
                        <div className="card bg-light" style={{height:'300px',fontSize:'17px'}}>
                            <img src={`${ApiURL+item.image}`} alt={item.id} height='150px' width='100%'/>
                            <div className='mt-1 font-weight-bolder px-3 text-dark'>
                                {item.nama}/{item.satuanorder}
                            </div>
                            <div className="row px-4  mt-5">
                                <div className="col-4 p-1">
                                    <div className="rounded-pill py-1 bg-primary  text-center text-white" style={{fontSize:'8px'}}>{item.namacategory}</div>
                                </div>
                            </div>
                            <div className='mt-1 text-primary font-weight-bold px-3' style={{fontSize:'16px'}}>
                                {'Rp.'+Numeral(item.harga).format('0,0.00')}    
                            </div> 
                        </div>
                    </Link>
                </div>
            )
        })
    }
    renderPagination=()=>{
        var query=querystring.parse(this.props.location.search)
        var akhir=Math.ceil(this.state.paginationitem/2)//dibagi 2 karena dicoba 2 item perpage
        var jsx=[]
        if(akhir===1){
            jsx.push(
            <div>
                <PaginationItem active={this.state.currentpage===1?true:false}>
                    <PaginationLink href={`http://localhost:3000/search?prod=${query.prod}&page=${1}`}>
                        {1}
                    </PaginationLink>
                </PaginationItem>
            </div>
            )
        }else{
            for(var i=this.state.currentpage;i<this.state.currentpage+2;i++){ //plus 2 karena 2 page aja
                if(this.state.currentpage===akhir){
                    jsx.push(
                        <div>
                            <PaginationItem active={this.state.currentpage===i-1?true:false}>
                                <PaginationLink href={`http://localhost:3000/search?prod=${query.prod}&page=${i-1}&cat=${this.state.cat}`}>
                                    {i-1}
                                </PaginationLink>
                            </PaginationItem>
                        </div>
                    )
                }else{
                    jsx.push(<div>
                             <PaginationItem active={this.state.currentpage===i?true:false}>
                                 <PaginationLink href={`http://localhost:3000/search?prod=${query.prod}&page=${i}&cat=${this.state.cat}`}>
                                     {i}
                                 </PaginationLink>
                             </PaginationItem>
                         </div>
                         )
    
                }
            }

        }
        return jsx
    }
    render() {
        this.props.ChangeHeader(false) 
        var query=querystring.parse(this.props.location.search)
        console.log(this.state.paginationitem)
        var akhir=Math.ceil(this.state.paginationitem/2)//bagi 2 karena tiap page 2 jangan lupa diganti kalo udah banyak
        console.log(akhir)
        if(this.state.listallproduct===null){
            return <Loading/>
        }
        if(this.state.listallproduct.length===0){
            return (
            <div>
                <h1 className='home'>product tidak ada</h1>
                <div className='d-flex justify-content-center'style={{marginTop:'33%'}}>
                    <Pagination aria-label="Page navigation example">
                        <PaginationItem disabled={this.state.currentpage===1?true:false}>
                            <PaginationLink first href={`http://localhost:3000/search?prod=${query.prod}&page=${1}&cat=${this.state.cat}`} />
                        </PaginationItem>
                        <PaginationItem disabled={this.state.currentpage===1?true:false} >
                            <PaginationLink previous href={`http://localhost:3000/search?prod=${query.prod}&page=${parseInt(query.page)-1}&cat=${this.state.cat}`} />
                        </PaginationItem>
                            {this.renderPagination()}
                        <PaginationItem disabled={this.state.currentpage===akhir?true:false}>
                            <PaginationLink  next href={`http://localhost:3000/search?prod=${query.prod}&page=${parseInt(query.page)+1}&cat=${this.state.cat}`} />
                        </PaginationItem>
                        <PaginationItem disabled={this.state.currentpage===akhir?true:false}>
                            <PaginationLink last href={`http://localhost:3000/search?prod=${query.prod}&page=${akhir}&cat=${this.state.cat}`} />
                        </PaginationItem>
                    </Pagination>
                </div>
        </div>
            
            
            )
        }
        return (
            <div className='home kontainer'>
                <div className="d-flex">
                    <h5 className='mr-3'>Keyword :"{query.prod===''?'tidak ada keyword':query.prod}" </h5>
                    <h5>Category :"{this.state.Categorysearch}" </h5>
                </div>
                <div className="row">
                    {this.renderAllProduct()}
                </div>
                <div className='d-flex justify-content-center mt-5'>
                    <Pagination aria-label="Page navigation example">
                        <PaginationItem disabled={this.state.currentpage===1?true:false}>
                            <PaginationLink first href={`http://localhost:3000/search?prod=${query.prod}&page=${1}&cat=${this.state.cat}`} />
                        </PaginationItem>
                        <PaginationItem disabled={this.state.currentpage===1?true:false} >
                            <PaginationLink previous href={`http://localhost:3000/search?prod=${query.prod}&page=${parseInt(query.page)-1}&cat=${this.state.cat}`} />
                        </PaginationItem>
                            {this.renderPagination()}
                        <PaginationItem disabled={this.state.currentpage===akhir?true:false}>
                            <PaginationLink  next href={`http://localhost:3000/search?prod=${query.prod}&page=${parseInt(query.page)+1}&cat=${this.state.cat}`} />
                        </PaginationItem>
                        <PaginationItem disabled={this.state.currentpage===akhir?true:false}>
                            <PaginationLink last href={`http://localhost:3000/search?prod=${query.prod}&page=${akhir}&cat=${this.state.cat}`} />
                        </PaginationItem>
                    </Pagination>
                </div>
            </div>
          )
    }
}
const MapStateToProps=(state)=>{
    return{
        changeHead:state.HeaderBg,
        LogReg:state.LogReg
    }
  }
export default connect(MapStateToProps,{ChangeHeader}) (Search);