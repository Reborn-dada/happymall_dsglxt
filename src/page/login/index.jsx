import React from 'react';
import MUtil from 'util/mm.jsx'
import User  from 'service/user-service.jsx'

const _mm = new MUtil();
const _user = new User();

import './index.scss';
class Login extends React.Component {

    constructor(props){
        super(props);
        this.state={
            userName:'',
            passWord:'',
            redirect:_mm.getUrlParam('redirect') || '/'
        }
    }
    componentWillMount(){
        document.title = '登录 - MMAll ADMIN'
    }
    onInputChange(e){
        let inputName = e.target.name,
            inputValue = e.target.value;
        this.setState({
            [inputName]:inputValue,
        })
    }
    //优化：通过回车替代点击登录操作
    onInputKeyUp(e){
        if(e.keyCode ===13 ){
            this.onSubmit();
        }
    }
    //用户提交表单
    onSubmit(e){
        let loginInfo = {
                username:this.state.userName,
                password:this.state.passWord
            },
            checkResult=_user.checkLoginInfo(loginInfo);
        //通过验证
        if(checkResult.status){
            _user.login(loginInfo).then((res)=>{
                _mm.setStorage('userInfo',res);
                //router中的history对象 .push()方法推进一个页面
                this.props.history.push(this.state.redirect);
            },(errMsg)=>{
                _mm.errorTips(errMsg);
            })
        }
        //没通过验证
        else{
            _mm.errorTips(checkResult.msg);
        }
    }

    render() {
        return (
            <div className="col-md-4 col-md-offset-4">
                <div className="panel panel-default login-panel">
                    <div className="panel-heading">欢迎登录 - MMall管理系统</div>
                    <div className="panel-body">
                        <div>
                            <div className="form-group">
                                <input type="test" className="form-control"  placeholder="请输入用户名" 
                                    name="userName" //这个name是自定义的标签属性
                                    onKeyUp={(e)=>{this.onInputKeyUp(e)}}
                                    onChange={(e)=>{this.onInputChange(e)}}/>
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control"  placeholder="请输入密码" 
                                    name="passWord" 
                                    onKeyUp={(e)=>{this.onInputKeyUp(e)}}
                                    onChange={(e)=>{this.onInputChange(e)}}/>
                            </div>
                            <button  className="btn btn-lg btn-primary btn-block" onClick={(e)=>{this.onSubmit(e)}}>登录</button>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default Login;