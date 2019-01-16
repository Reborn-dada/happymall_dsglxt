import React from 'react';
import './index.scss';

class Login extends React.Component {
    render() {
        return (
            <div className="col-md-4 col-md-offset-4">
                <div className="panel panel-default login-panel">
                    <div className="panel-heading">欢迎登录 - MMall管理系统</div>
                    <div className="panel-body">
                        <form>
                            <div className="form-group">
                                <input type="email" className="form-control"  placeholder="请输入用户名"/>
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control"  placeholder="请输入密码"/>
                            </div>
                            <button type="submit" className="btn btn-lg btn-primary btn-block">登录</button>
                        </form>
                    </div>
                </div>
            </div>

        )
    }
}

export default Login;