import React from 'react';
import ReactDOM from 'react-dom';
import './index.noModule.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
/*引入js文件,立即执行, 监听页面变化,设置rem大小*/
import './resizable'

ReactDOM.render(
    <App /> ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
