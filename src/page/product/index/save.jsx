import React from 'react'
import PageTitle from 'component/page-title/index.jsx';
import MUtil from 'util/mm.jsx'
import Product  from 'service/product-service.jsx';
import CategorySelector from './category-select.jsx';
import './index.scss';
import FileUploader from 'util/file-uploader/index.jsx'
import './save.scss'
import RichEditor from 'util/rich-editor/index.jsx';

const _mm = new MUtil();
const _product = new Product();

class ProductSave extends React.Component{

    constructor(props){
        super(props)
        this.state={
            categoryId:0,
            parentCategoryId:0,
            subImage:[],
            detail:''
        }
    }
    //品类选择器变化
    onCategoryChange(categoryId,parentCategoryId){
        console.log(categoryId,parentCategoryId)
    }
    onUploadSuccess(res){
        let subImages = this.state.subImage
        subImages.push(res)
        this.setState({
            subImage:subImages
        })
    }
    onUploadError(errMsg){
        _mm.errorTips(errMsg ||'上传图片失败')
    }
    onImageDelete(e){
        let index = parseInt(e.target.getAttribute('index'))
            subImages=this.state.subImage;
        subImages.splice(index,1);
        this.setState({
            subImage:subImages
        }) 
    }
    onDetailValueChange(value){
        this.setState({
            detail:value
        })
    }
    render(){
        return(
            <div>
                <div id="page-wrapper">
                    <PageTitle title="添加商品">
                      <div>
                        <div className="form-horizontal">
                            <div className="form-group">
                                <label className="col-md-2 control-label">商品名称</label>
                                <div className="col-md-5">
                                    <input type="text" className="form-control" placeholder="请输入商品名称"/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-md-2 control-label">商品描述</label>
                                <div className="col-md-5">
                                    <input type="text" className="form-control" placeholder="请输入商品描述"/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-md-2 control-label">所属分类</label>
                                <CategorySelector onCategoryChange={(categoryId,parentCategoryId)=>{this.onCategoryChange(categoryId,parentCategoryId)}}></CategorySelector>
                            </div>
                            <div className="form-group">
                                <label className="col-md-2 control-label">商品价格</label>
                                <div className="col-md-3">
                                    <div className="input-group">
                                        <input type="number" className="form-control" placeholder="价格"/>
                                        <span className="input-group-addon">元</span>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-md-2 control-label">商品库存</label>
                                <div className="col-md-3">
                                    <div className="input-group">
                                        <input type="number" className="form-control" placeholder="库存"/>
                                        <span className="input-group-addon">件</span>
                                    </div> 
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-md-2 control-label">商品图片</label>
                                <div className="col-md-10">
                                    {
                                        this.state.subImage.length>0?this.state.subImage.map((image,index)=>
                                            <div className="img-con" key={index} >
                                                <img className="img" src={image.url}/>
                                                <i className="fa fa-close" index={index} onClick={(e)=>this.onImageDelete(e)}/>
                                            </div>   
                                        ):<div>请上传图片</div>
                                    }
                                </div>
                                <div className="col-md-offset-2 col-md-10 file-upload-con">
                                    <FileUploader onSuccess={(res)=>{this.onUploadSuccess(res)}} onError={(errMsg)=>{this.onUploadError(errMsg)}}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-md-2 control-label">商品详情</label>
                                <div className="col-md-10">
                                    <RichEditor onValueChange={(value) => this.onDetailValueChange(value)}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-sm-offset-2 col-md-5">
                                    <button type="submit" className="btn btn-primary">提交</button>
                                </div>
                            </div>
                        </div>
                      </div>
                    </PageTitle>
                </div>
            </div>
        )
    }
}

export default ProductSave