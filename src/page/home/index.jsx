import React from 'react';
import './index.css';
import PageTitle from 'component/page-title/index.jsx';
import {Row,Col,Checkbox} from 'antd';

class Home extends React.Component{
    onCheckBoxChange(){}
    render(){
        
        return(
            <div id="page-wrapper">
                 <PageTitle title="首页">
                    <button className="btn btn-warning">test</button>
                 </PageTitle>
                <div className="row">
                    <div className="col-md-12">body
                    </div>
                </div>

            </div>
        )
    }
}

export default Home;