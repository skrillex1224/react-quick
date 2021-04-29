import React from "react";
import {observer} from "mobx-react";
import styles from './index.scss'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark  as atomDark} from 'react-syntax-highlighter/dist/esm/styles/prism';

interface IProps {

}

interface IState {

}

@observer
export default class Index extends React.Component<IProps, IState>{
    static defaultProps = {

    }

    render(): React.ReactNode {
        return (
            <div className={styles.wrapper}>
                <div className={styles.wrapper_title}>
                    <a>1、获取 url 中的参数</a>
                    <div className={styles.wrapper_title_desc}>
                        <h3>题目描述:</h3>
                        <p>1. 指定参数名称，返回该参数的值 或者 空字符串</p>
                        <p>2. 不指定参数名称，返回全部的参数对象 或者 {}</p>
                        <p>3. 如果存在多个同名参数，则返回数组</p>
                    </div>
                </div>

                <div className={styles.wrapper_content}>
                    <SyntaxHighlighter showLineNumbers={true}
                                                      startingLineNumber = {0}
                                                      language={'javascript'}
                                                      style={atomDark}
                                                      customStyle={{
                                                          borderRadius:'10px',
                                                          border:'1px solid #373E47',

                                                      }}  >
                        {
`
function createModule(str1, str2) {
        function Obj(){
            this.greeting = str1;
            this.name = str2;
            this.sayIt = function(){
                return this.greeting + ', ' + this.name;
            };
        }
        return new Obj();
    }
    //构造函数与原型组合
    function createModule(str1, str2) {
        function CreateMod(){
            this.greeting = str1;
            this.name = str2;
        }
        CreateMod.prototype.sayIt = function(){
            return this.greeting + ', '  + this.name;
        }
        return new CreateMod();
    }
    //构造函数与原型组合
    function createModule(str1, str2) {                                 //构造函数与原型组合
    function createModule(str1, str2) {
        function CreateMod(){
            this.greeting = str1;
            this.name = str2;
        }
        CreateMod.prototype.sayIt = function(){
            return this.greeting + ', '  + this.name;
        }
        return new CreateMod();
    }
        function CreateMod(){
            this.greeting = str1;
            this.name = str2;
        }
        CreateMod.prototype.sayIt = function(){
            return this.greeting + ', '  + this.name;
        }
        return new CreateMod();
    }

`
                        }
                    </SyntaxHighlighter>
                </div>
            </div>
        )
    }
}