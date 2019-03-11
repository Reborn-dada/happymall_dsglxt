import React from 'react';
import {Link} from 'react-router-dom';
import PageTitle from 'component/page-title/index.jsx';
import ListSearch from './index-list-search.jsx'
import Pagination from 'util/pagination/index.jsx'

import MUtil from 'util/mm.jsx'
import Product  from 'service/product-service.jsx'
import './index.scss'

const _mm = new MUtil();
const _product = new Product();

class ProductList extends React.Component{

    constructor(props){
        super(props)
        this.state={
            list:[],
            pageNum:1,
            listType:'list'
        }
    }
    componentDidMount(){
        this.loadProductList()
    }
    //加载商品列表
    loadProductList(){
        let listParam = {};
        listParam.listType=this.state.listType;
        listParam.pageNum=this.state.pageNum;
        //如果是搜索的话，需要传入搜索类型和搜索关键字
        if(this.state.listType==='search'){
            listParam.searchType=this.state.searchType;
            listParam.keyword=this.state.searchKeyword
        }
        //请求接口a
        _product.getProductList(listParam).then(res=>{
            this.setState(res)
        },errMsg=>{
            this.setState({
                list:[]
            })
            _mm.errorTips(errMsg);
        });
    }
    onSearch(searchType,searchKeyword){
        console.log(searchType,searchKeyword)
        let listType= searchKeyword === ''?'list':'search';
        this.setState({
            listType:listType,
            pageNum:1,
            searchType:searchType,
            searchKeyword:searchKeyword
        },()=>{
            this.loadProductList();
        })
    }
    onPageNumChange(pageNum){
        this.setState({
            pageNum:pageNum
        },()=>{
            this.loadProductList()
        })
    }
    onSetProductStatus(e,productId,currentStatus){
        let newStatus = currentStatus==1?2:1,
            confimTips= currentStatus==1?'确定要下架该商品':'确定要上架该商品';
        if(window.confirm(confimTips)){
            _product.setProductStatus({
                productId:productId,
                status:newStatus
            }).then(res=>{
                _mm.successTips(res);
                this.loadProductList();
            },errMsg=>{
                _mm.errorTips(errMsg);
            })
        }
    }
    render(){
        return(
            <div id="page-wrapper">
                <PageTitle title="商品列表">
                    <div className="page-header-right">
                        <Link to="/product/save" className="btn btn-primary">
                            <i className="fa fa-plus"></i>
                            <span>添加商品</span>
                        </Link>
                    </div>
                </PageTitle>
                <ListSearch onSearch={(searchType,searchKeyword)=>{this.onSearch(searchType,searchKeyword)}}/>
                <div className="row">
                    <div className="col-md-12">
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>商品ID</th>
                                    <th>商品信息</th>
                                    <th>价格</th>
                                    <th>状态</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.list.map((v,k)=>{
                                    return (
                                        <tr key={k}>
                                            <td style={{width:'10%'}}>{v.id}</td>
                                            <td style={{width:'50%'}}>
                                                <p>{v.name}</p>
                                                <p>{v.subtitle}</p>
                                            </td>
                                            <td style={{width:'10%'}}>￥{v.price}</td>
                                            <td style={{width:'15%'}}>
                                                <p>{v.status==1?'在售':'已下架'}</p>
                                                <button className="btn btn-xs btn-warning" 
                                                    onClick={(e)=>{this.onSetProductStatus(e,v.id,v.status)}}>
                                                    {v.status==1?'下架':'上架'}
                                                </button>
                                            </td>
                                            <td style={{width:'15%'}}>
                                                <Link className="opear" to={`/product/detail/${v.id}`}>查看详情</Link>
                                                <Link className="opear" to={`/product/save/${v.id}`}>编辑</Link>
                                            </td>
                                        </tr>
                                    );
                                })}
                                
                            </tbody>
                        </table>
                    </div>
                </div>
                <Pagination current={this.state.pageNum} 
                    total={this.state.total} 
                    onChange={(pageNum)=>{this.onPageNumChange(pageNum)}}/>
            </div>
        )
    }
}

export default ProductList;