import React from 'react';
import {Link} from 'react-router-dom';
import PageTitle from 'component/page-title/index.jsx';
import Pagination from 'util/pagination/index.jsx'

import MUtil from 'util/mm.jsx'
import User  from 'service/user-service.jsx'

const _mm = new MUtil();
const _user = new User();

class UserList extends React.Component{

    constructor(props){
        super(props)
        this.state={
            list:[],
            pageNum:1
        }
    }
    componentDidMount(){
        this.loadUserList()
    }
    loadUserList(){
        _user.getUserList(this.state.pageNum).then(res=>{
            this.setState(res)
        },errMsg=>{
            _mm.errorTips(errMsg);
        });
    }
    onPageNumChange(pageNum){
        this.setState({
            pageNum:pageNum
        },()=>{
            this.loadUserList()
        })
    }
    render(){
        return(
            <div id="page-wrapper">
                <PageTitle title="用户管理">
                </PageTitle>
                <div className="row">
                    <div className="col-md-12">
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>用户名</th>
                                    <th>邮箱</th>
                                    <th>电话</th>
                                    <th>注册时间</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.list.map((v,k)=>{
                                    return (
                                        <tr key={k}>
                                            <td>{v.id}</td>
                                            <td>{v.username}</td>
                                            <td>{v.email}</td>
                                            <td>{v.phone}</td>
                                            <td>{new Date(v.createTime).toLocaleString()}</td>
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

export default UserList;