import React from 'react';
import { Link } from 'react-router-dom';
import PageTitle from 'component/page-title/index.jsx';
import ListSearch from './../product/index/index-list-search.jsx'
import Pagination from 'util/pagination/index.jsx'

import MUtil from 'util/mm.jsx'
import Order from 'service/order-service.jsx'
import './index.scss'

const _mm = new MUtil();
const _order = new Order();

class OrderList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            list: [],
            pageNum: 1,
            listType: 'list',
            searchType:'orderNo',
            searchKeyword:''
        }
    }
    componentDidMount() {
        this.loadOrderList()
        
    }
    //加载商品列表
    loadOrderList(){
        let listParam = {};
        listParam.listType = this.state.listType;
        listParam.pageNum = this.state.pageNum;
        //如果是搜索的话，需要传入搜索类型和搜索关键字
        if (this.state.listType === 'search') {
            listParam.searchType = 'orderNo';
            listParam.keyword = this.state.searchKeyword;
        }
        //请求接口
        _order.getOrderList(listParam).then(res => {
            this.setState(res)
        }, errMsg => {
            this.setState({
                list: []
            })
            _mm.errorTips(errMsg);
        });
    }
    onSearch(searchType,searchKeyword) {
        let listType = searchKeyword === '' ? 'list' : 'search';
        this.setState({
            listType: listType,
            pageNum: 1,
            searchType: searchType,
            searchKeyword: searchKeyword
        }, () => {
            this.loadOrderList();
        })
    }
    onPageNumChange(pageNum) {
        this.setState({
            pageNum: pageNum
        }, () => {
            this.loadOrderList()
        })
    }
    onValueChange(e){
        this.setState({
            searchKeyword:e.target.value.trim()
        },console.log('aaaaaaa',this.state))
        
    }
    onSearchKeywordKeyUp(e){
        if(e.keyCode===13){
            this.onSearch();
        }
    }
    render(){
        return(
            <div id="page-wrapper">
                <PageTitle title="订单列表">
                    <div className="row search-wrap">
                        <div className="col-md-12">
                            <div className="form-inline">
                                <div className="form-group">
                                    <select className="form-control"
                                        name="searchType">
                                        <option value="orderNo">按订单号查询</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="关键词"
                                        name="searchKeyword"
                                        onKeyUp={(e) => { this.onSearchKeywordKeyUp(e) }}
                                        onChange={(e) => { this.onValueChange(e) }} />
                                </div>
                                <button type="button" className="btn btn-primary"
                                    onClick={(e,searchKeyword) => this.onSearch(e,this.state.searchKeyword)}>搜索</button>
                            </div>
                        </div>
                    </div>
                </PageTitle>
                <div className="row">
                    <div className="col-md-12">
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>订单号</th>
                                    <th>收件人</th>
                                    <th>订单状态</th>
                                    <th>订单总价</th>
                                    <th>创建时间</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.list.map((v, k) => {
                                    return (
                                        <tr key={k}>
                                            <td>{v.orderNo}</td>
                                            <td>{v.receiverName}</td>
                                            <td>{v.statusDesc}</td>
                                            <td>{v.payment}</td>
                                            <td>{v.createTime}</td>
                                            <td>
                                                <Link className="opear" to={`/order/detail/${v.id}`}>查看</Link>
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
                    onChange={(pageNum) => { this.onPageNumChange(pageNum) }} />
            </div>
        )
    }
}

export default OrderList;