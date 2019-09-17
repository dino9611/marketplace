import React from 'react';
import {connect} from 'react-redux'
import {ChangeHeader} from './../../redux/actions'
import Loading from './../../components/loading'
import {Table,Modal,ModalHeader,ModalBody,ModalFooter,CustomInput,Input} from 'reactstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons'
import { ApiURL } from '../../supports/apiurl';
import PagenotFound from './../Pagenotfound'
import Axios from 'axios'
import Numeral from 'numeral'

class Jualanku extends React.Component {
    state = {
        Modal:false,
        addImageFilePenjualName:'Select Image....',
        addImageFile:undefined,
        listproduct:null,
        liscategory:[],
        deletemodal:false,
        modaldeleteindex:-1,
        editmodal:false,
        modaleditindex:-1,
        editImageFilePenjualName:'Select Image.',
        editImageFile:undefined,
        categoryid:0
      }
    componentDidMount(){
        this.props.ChangeHeader(false)
        console.log(this.props.LogReg)
        Axios.get(ApiURL+'/product/getproductpen/'+this.props.LogReg.penjualid)
        .then((res)=>{
            console.log(res.data)
            this.setState({listproduct:res.data})
            Axios.get(`${ApiURL}/product/getcategory/${this.props.LogReg.kategoritoko}`)
            .then((res1)=>{
                this.setState({liscategory:res1.data})
                console.log(this.state.liscategory)
            }).catch((err)=>{
                console.log(err)
            })
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
            Axios.get(`${ApiURL}/product/getcategory/${this.props.LogReg.kategoritoko}`)
            .then((res1)=>{
                this.setState({liscategory:res1.data})
                console.log(this.state.liscategory)
            }).catch((err)=>{
                console.log(err)
            })
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
    oneditImagepenjualFileChange=(e)=>{
        if(e.target.files[0]){
            this.setState({editImageFilePenjualName:e.target.files[0].name,editImageFile:e.target.files[0]})
        }else{
            this.setState({editImageFilePenjualName:'Select Image...',editImageFile:undefined})
        }
    }
    onBtnAddProductClick=()=>{
        console.log(this.props.LogReg.penjualid)
        if(this.state.addImageFile){
            var formdata=new FormData()
            var options={
                headers:
                {'Content-Type':'multipart/form-data'}
            }
            var data={
                nama:this.refs.namaProduk.value,
                harga:this.refs.harga.value,
                stok:this.refs.stok.value,
                satuanorder:this.refs.order.value,
                informasiproduct:this.refs.informasi.value,
                penjualid:this.props.LogReg.penjualid,
                categoryprodid:this.state.categoryid
                // waktuupload:new Date ()
                
            }
            formdata.append('image',this.state.addImageFile)
            formdata.append('data',JSON.stringify(data))
            Axios.post(ApiURL+'/product/addproduct/'+this.props.LogReg.penjualid,formdata,options)
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
    onEditSaveBtnClick=(id)=>{
        var formData = new FormData()
        var headers = {
            headers: 
            {'Content-Type': 'multipart/form-data'}
        }

        var data = {
            nama:this.refs.editnamaProduk.value,
            harga:this.refs.editharga.value,
            stok:this.refs.editstok.value,
            satuanorder:this.refs.editorder.value,
            informasiproduct:this.refs.editinformasi.value,
            categoryprodid:this.state.categoryid
            
        }

       
        formData.append('image', this.state.editImageFile)
        formData.append('data', JSON.stringify(data))

        Axios.put(ApiURL + "/product/editproduct/" +id+'?penjualid='+this.props.LogReg.penjualid, formData, headers)
        .then((res) => {
            this.setState({ listproduct: res.data,editmodal:false, modaleditindex: -1,editImageFilePenjualName:'Select Image',editImageFile:undefined, })
        })
        .catch((err) =>{
            console.log(err)
        })
    }
    onDeleteProductClick=(id)=>{
        console.log(this.props.LogReg.penjualid)
        Axios.delete(ApiURL+'/product/deleteproductpen/'+id+'?penjualid='+this.props.LogReg.penjualid)
        .then((res)=>{
            this.setState({listproduct:res.data,modaldeleteindex:-1,deletemodal:false})
        }).catch((err)=>{

        })
    }
    onCategoryChange=(e)=>{
        console.log(e.target.value)
        this.setState({categoryid:e.target.value})
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
                <tr key={item.id}>
                    <td >{index+1}</td>
                    <td>{item.nama}</td>
                    <td><img src={ApiURL+item.image} alt="" width='200'/></td>
                    <td>{'Rp.'+Numeral(item.harga).format('0,0')}</td>
                    <td>{item.stok}</td>
                    <td>{item.namacategory}</td>
                    <td>{item.satuanorder}</td>
                    <td>{item.informasiproduct}</td>
                    <td><button className='btn btn-primary'onClick={()=>this.setState({editmodal:true,modaleditindex:index,categoryid:item.categoryprodid})}>edit</button></td>
                    <td><button className='btn btn-danger' onClick={()=>this.setState({deletemodal:true,modaldeleteindex:index})}>delete</button></td>
                </tr>
            )
        })
    }
    rendermodaldelete=()=>{
        if(this.state.modaldeleteindex!==-1){
            var id=this.state.listproduct[this.state.modaldeleteindex].id
            return(
                <div>
                    <ModalHeader>
                        delete data
                    </ModalHeader>
                    <ModalBody>
                        <div style={{height:'100px'}}>
                            apakah anda yakin ingin menghapus {this.state.listproduct[this.state.modaldeleteindex].id}
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button className='btn btn-success' onClick={()=>this.onDeleteProductClick(id)} >Yes</button>
                        <button className='btn btn-danger' onClick={()=>this.setState({deletemodal:false,modaldeleteindex:-1})}>No</button>
                    </ModalFooter>
                </div>
            )
        }
    }
    rendermodaledit=()=>{
        if(this.state.modaleditindex!==-1){
            var id=this.state.listproduct[this.state.modaleditindex].id
            var listedit=this.state.listproduct[this.state.modaleditindex]
            return(
                <div>
                    <ModalHeader>
                        Edit data
                    </ModalHeader>
                    <ModalBody>
                        <input type="text" ref='editnamaProduk' className='form-control mt-2'defaultValue={listedit.nama} placeholder='Nama produk'/>
                        <CustomInput type='file' className='overflow-hidden mt-2' label={this.state.editImageFilePenjualName} onChange={this.oneditImagepenjualFileChange} />
                        <input defaultValue={listedit.harga} type="number" ref='editharga' className='form-control mt-2' placeholder='harga'/>
                        <input defaultValue={listedit.stok} type="number" ref='editstok' className='form-control mt-2' placeholder='stok'/>
                        <input defaultValue={listedit.satuanorder} type="text" ref='editorder' className='form-control mt-2' placeholder='satuan order ex:10kg or 10pcs'/>
                        <Input type="select" ref='category' innerRef='category'  className='mt-2' onChange={this.onCategoryChange}>
                                <option value="" disabled selected hidden>select category</option>
                                {this.renderCategorylist()}
                        </Input>
                        <textarea defaultValue={listedit.informasiproduct} ref='editinformasi'   className='form-control mt-2' rows="8" placeholder='informasi product'></textarea>
                    </ModalBody>
                    <ModalFooter>
                        <button className='btn btn-success' onClick={()=>this.onEditSaveBtnClick(id)} >Save</button>
                        <button className='btn btn-danger' onClick={()=>this.setState({editmodal:false,modaleditindex:-1})}>Cancel</button>
                    </ModalFooter>
                </div>
            )
        }
    }
    renderCategorylist=()=>{
        if(this.state.liscategory.length!==0){
            return this.state.liscategory.map((item,index)=>{
                if(item.id===this.state.categoryid){
                    return <option value={item.id} selected>{item.namacategory}</option>
                }
                return (
                <option value={item.id}>{item.namacategory}</option>
                    
                    
                    )
            })
        }
        
    }
    render() {
        this.props.ChangeHeader(false)
        if(this.props.LogReg.penjualid===null){
            return <PagenotFound/>
        }
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
                            <input type="text" ref='order' className='form-control mt-2' placeholder='satuan order ex: 10kg or 10pcs'/>
                            <Input type="select" ref='category' innerRef='category'  className='mt-2' onChange={this.onCategoryChange}>
                                <option value="" disabled selected hidden>select category</option>
                                {this.renderCategorylist()}
                            </Input>
                            <textarea ref='informasi'   className='form-control mt-2' rows="8" placeholder='informasi product'></textarea>
                        </ModalBody>
                        <ModalFooter>
                            <button className='btn btn-success' onClick={this.onBtnAddProductClick}>Save</button>
                            <button className='btn btn-danger'>Cancel</button>
                        </ModalFooter>
                    </Modal>
                    <Modal centered isOpen={this.state.deletemodal} toggle={()=>this.setState({deletemodal:false,modaldeleteindex:-1})}>
                        {this.rendermodaldelete()}
                    </Modal>
                    <Modal centered isOpen={this.state.editmodal} toggle={()=>this.setState({editmodal:false,modaleditindex:-1})}>
                        {this.rendermodaledit()}
                    </Modal>
                    <div className='mb-2'>
                        <a href="http://localhost:3000/pentrans?stat=waitingproses">
                            <button className='btn btn-primary mr-2'>Manage transaksi</button>
                        </a>
                        <a href={"http://localhost:3000/detailtoko/"+this.props.LogReg.penjualid}>
                            <button className='btn btn-primary'>Lihat Toko</button>
                        </a>
                    </div>
                    {this.state.listproduct.length===0?null:<button className='btn btn-light font-weight-bolder' onClick={()=>this.setState({Modal:true})}>Add product</button>}

                    <Table className='mt-2' striped hover>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Nama produk</th>
                                <th>foto produk</th>
                                <th>harga</th>
                                <th>stok</th>
                                <th>produk category</th>
                                <th>/satuan order</th>
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