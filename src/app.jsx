import React from 'react';
import ReactDOM from 'react-dom';

//import 'font-awesome/css/font-awesome.min.css';
import './index.css';
import './index.scss';


// ReactDOM.render(
//     <div>
//         <i className="fa fa-address-book"></i>
//         <h1>Hello, world!</h1>
//     </div>,
//     document.getElementById('app')
// );

// let name ='Reborn';
// let names= ['Reborn','Lanbo','Boss'];
// let flag = false;

// let jsx = 
//     <div>
//         {/**变量的使用 */}
//         <p>I am {name}</p>
//         {/*条件判断*/}
//         {
//             flag ? <p>I am {name}</p> : <p>I am not {name}</p>
//         }
//         {/*数组循环*/}
//         {
//             names.map((name,index)=><p key={index}>Hi,{name}</p>)
//         }
//     </div>
// ReactDOM.render(jsx,document.getElementById('app'))


// class Component extends React.Component{
//     constructor(){
//         super();
//         this.state= {
//             name:'reborn',
//         }
//     }
//     render(){
//         setTimeout(()=>{
//             this.setState({
//                 name:'reborn-dada'
//             })
//         },2000)
//         return (
//             <div>
//                 <h1>i am {this.state.name}</h1>
//             </div>
//         )        
//     }
// }
// ReactDOM.render(<Component/>,document.getElementById('app'));

// class Child extends React.Component{
//     constructor(){
//         super();
        
//     }
//     handleClick(){
//         this.props.changeColor('blue')
//     };
    
//     render(){
//         return (
//             <div>
//                 <h1>父组件背景色： {this.props.bgColor}</h1>
//                 <button onClick={(e)=>{this.handleClick(e)}}>改变父组件颜色</button>
//             </div>
//         )        
//     }
// }
// class Father extends React.Component{
//     constructor(){
//         super();
//         this.state={
//             bgColor:'#999'
//         }
//     }
//     onBgColorChange(color){
//         this.setState({
//             bgColor:color
//         })
//     }
//     render(){
//         return (
//             <div style={{background:this.state.bgColor}}>
//                 <Child bgColor={this.state.bgColor} changeColor={(color)=>{this.onBgColorChange(color)}}></Child>
//             </div>    
//         )
//     }
// }

class App extends React.Component{
    constructor(props){
        super(props);
        console.log('constructor')
    }
    componentWillMount(){
        {/*组件将要加载的时候，js已经在跑了，异步的操作一般都写在这里*/}
        console.log('componentWillMount');
    }
    componentDidMount(){
        console.log('componentDidMount');
    }
    render(){
        console.log('render');
        return (
            <div>
                App
            </div>
        )
    }
}

ReactDOM.render(<App/>
    ,document.getElementById('app'));


