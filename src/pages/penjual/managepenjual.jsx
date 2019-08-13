import React from 'react';
import {connect} from 'react-redux'
import {ChangeHeader} from './../../redux/actions'
import Loading from './../../components/loading'
import {Table,Modal,ModalHeader,ModalBody,ModalFooter,CustomInput} from 'reactstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons'
import { ApiURL } from '../../supports/apiurl';
import Axios from 'axios'
class Jualanku extends React.Component {
    state = {
        Modal:false,
        addImageFilePenjualName:'Select Image....',
        addImageFile:undefined,
        listproduct:null,
      }
    componentDidMount(){
        this.props.ChangeHeader(false)
        console.log(this.props.LogReg)
        Axios.get(ApiURL+'/product/getproductpen/'+this.props.LogReg.penjualid)
        .then((res)=>{
            console.log(res.data)
        })
        document.removeEventListener('scroll', () => {
            var isTop = window.scrollY < 730;
            if (isTop !== this.props.changeHead) {
                this.props.ChangeHeader(isTop)
                console.log(this.props.changeHead)
            }
        });
    }

    componentWillReceiveProps(newprops){
        Axios.get(ApiURL+'/product/getproductpen/'+newprops.LogReg.penjualid)
        .then((res)=>{
            console.log(res.data)
            this.setState({listproduct:res.data})
        })
        document.removeEventListener('scroll', () => {
            var isTop = window.scrollY < 730;
            if (isTop !== this.props.changeHead) {
                this.props.ChangeHeader(isTop)
                console.log(this.props.changeHead)
            }
        });
    }
    onAddImagepenjualFileChange=(event)=>{
        var file=event.target.files[0]
        if(file){
            this.setState({addImageFilePenjualName:file.name,addImageFile:event.target.files[0]})
        }else{
            this.setState({addImageFilePenjualName:'Select Image...',addImageFile:undefined})
        }
    }
    onBtnAddProductClick=()=>{
        console.log(this.props.LogReg.penjualid)
        if(this.state.addImageFile){
            var formdata=new FormData()
            var Headers={
                headers:
                {'Content-Type':'multipart/form-data'}
            }
            var data={
                nama:this.refs.namaProduk.value,
                harga:this.refs.harga.value,
                stok:this.refs.stok.value,
                minimalpembelian:this.refs.order.value,
                informasiproduct:this.refs.informasi.value,
                penjualid:this.props.LogReg.penjualid,
                // waktuupload:new Date ()
                
            }
            formdata.append('image',this.state.addImageFile)
            formdata.append('data',JSON.stringify(data))
            Axios.post(ApiURL+'/product/addproduct/'+this.props.LogReg.penjualid,formdata,Headers)
            .then((res)=>{
                console.log(res.data)
                this.setState({listproduct:res.data,Modal:false})
            })
            .catch((err)=>{
                console.log(err);
                
            })
        }else{
            alert('image harus diisi')
        }
    }
    renderproductlist=()=>{
        if(this.state.listproduct.length===0){
            return(
                <tr>
                    <td colSpan='9'  rowSpan='10'>
                        <div style={{height:'500px',fontSize:'36px'}}className='justify-content-center d-flex align-items-center'>
                            {/* <button className='btn btn-success' onClick={()=>this.setState({Modal:true})}>Add product</button> */}
                            <div className='pointer-add' onClick={()=>this.setState({Modal:true})}>
                                <FontAwesomeIcon icon={faPlusCircle} />
                                add product
                            </div>
                        </div>
                    </td>

                </tr>
            )
        }
        return this.state.listproduct.map((item,index)=>{
            return(
                <tr>
                    <td >{index+1}</td>
                    <td>{item.nama}</td>
                    <td><img src={ApiURL+item.image} alt="" width='200'/></td>
                    <td>{item.harga}</td>
                    <td>{item.stok}</td>
                    <td>{item.minimalpembelian}</td>
                    <td>{item.informasiproduct}</td>
                    <td><button className='btn btn-primary'>edit</button></td>
                    <td><button className='btn btn-danger'>delete</button></td>
                </tr>
            )
        })
    }
    render() {
        if(this.state.listproduct===null){
            return <Loading/>
        } 
        return (
            <div className='home' >
                <div className="mx-2">
                    <Modal isOpen={this.state.Modal} toggle={()=>this.setState({Modal:false})}>
                        <ModalHeader>
                            Add data
                        </ModalHeader>
                        <ModalBody>
                            <input type="text" ref='namaProduk' className='form-control mt-2' placeholder='Nama produk'/>
                            <CustomInput type='file' className='overflow-hidden mt-2' label={this.state.addImageFilePenjualName} onChange={this.onAddImagepenjualFileChange} />
                            <input type="number" ref='harga' className='form-control mt-2' placeholder='harga'/>
                            <input type="number" ref='stok' className='form-control mt-2' placeholder='stok'/>
                            <input type="number" ref='order' className='form-control mt-2' placeholder='minimal pembelian'/>
                            <textarea ref='informasi'   className='form-control mt-2' rows="8" placeholder='informasi product'></textarea>
                        </ModalBody>
                        <ModalFooter>
                            <button className='btn btn-success' onClick={this.onBtnAddProductClick}>Save</button>
                            <button className='btn btn-danger'>Cancel</button>
                        </ModalFooter>
                    </Modal>
                    {this.state.listproduct.length===0?null:<button className='btn btn-success' onClick={()=>this.setState({Modal:true})}>Add product</button>}
                    
                    <Table className='mt-2' striped hover>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Nama produk</th>
                                <th>foto produk</th>
                                <th>harga</th>
                                <th>stok</th>
                                <th>minimal pembelian</th>
                                <th>informasi produk</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                                {this.renderproductlist()}
                        </tbody>
                    </Table>
                </div>
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
export default  connect(MapStateToProps,{ChangeHeader}) (Jualanku);