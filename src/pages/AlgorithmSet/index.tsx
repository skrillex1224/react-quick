import React from "react";
import {observer} from "mobx-react";
import Preload from '../../components/Preload'
import {Animated} from 'react-animated-css'
import MainScreen from "../../components/MainScreen";
import IndexSet from "../../utils/IndexSet";
import SubjectBox from './SubjectBox'
import algorithmList, {code} from './configList'

import styles from './index.scss'
import classNames from "classnames";

/*本屏幕的下标*/
const IndexSetOfThisIndex = 2;

const hiddenTime =600;


@observer
export default class  Index extends React.Component<any, any>{

    column1 : any = React.createRef();
    column2 : any = React.createRef();
    column3 : any = React.createRef();

    state = {
        isLoading :true,
        isVisible : true,
        colOneList : [],
        colTwoList : [],
        colThreeList : [],
    }


    componentDidMount(): void {
        // setTimeout(()=>{
            this.setState({isLoading:false})
        // },600)

        this.initializeAlgorithmList();
            console.log(this.state)
    }

    /*初始化列表,先将三列填满后再比较高低,然后再动态进行平衡,这样可以避免多次setState()*/
    initializeAlgorithmList = ()=>{
        const {colThreeList,colTwoList,colOneList} = this.state;
        for (let i = 0; i < algorithmList.length; i++) {
            i % 3 === 0  &&  colOneList.push(algorithmList[i]);
            i % 3 === 1  &&  colTwoList.push(algorithmList[i]);
            i % 3 === 2  &&   colThreeList.push(algorithmList[i]);
        }

        this.setState({colThreeList,colTwoList,colOneList})

    }


    switchRoute = (route)=>{
        this.setState({isVisible:false})
        setTimeout(()=>{
            this.props.history.push(route);
        },hiddenTime)
    }



    render() {
        const {isLoading,isVisible,colTwoList,colOneList,colThreeList} =this.state;
        const {title,subTitle,imgName} = IndexSet[IndexSetOfThisIndex];

    /**animationOut没啥用在这里*/
        return (
            <Preload switchRoute={this.switchRoute}  chooseIndex={IndexSetOfThisIndex}  isLoading={isLoading} >
               <Animated   animationIn={'rollIn'} animationOut={'fadeOut'} isVisible={isVisible} animationInDuration={1600}
                         animationOutDuration={hiddenTime}>
                   <MainScreen title={title} subTitle={subTitle} imgName={imgName}/>
               </Animated>
                <div className={styles.wrapper}>
                    <div ref={this.column1} className={classNames({
                        [`${styles.wrapper_column1}`]: true,
                        [`${styles.wrapper_column}`]: true,
                    })}>{
                        colOneList.map((item,index)=>(
                            <Animated   animationIn={'rollIn'} animationOut={'fadeOut'} isVisible={true} animationInDuration={1600}
                                        animationOutDuration={hiddenTime} >
                                <SubjectBox title={'获取URL'} index={index} desc={'完成函数 createModule，调用之后满足如下要求：\n' +
                                '1、返回一个对象\n' +
                                '2、对象的 greeting 属性值等于 str1， name 属性值等于 str2\n' +
                                '3、对象存在一个 sayIt 方法，该方法返回的字符串为 greeting属性值 + \', \' + name属性值'}
                                            code={`
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

`.slice(0,index * 820)}/>
                            </Animated>
                        ))
                    }</div>
                    <div ref={this.column2} className={classNames({
                        [`${styles.wrapper_column2}`]: true,
                        [`${styles.wrapper_column}`]: true,
                    })}>{
                        colOneList.map((item,index)=>(
                            <Animated   animationIn={'rollIn'} animationOut={'fadeOut'} isVisible={true} animationInDuration={1600}
                                        animationOutDuration={hiddenTime} >
                                <SubjectBox title={'获取URL'} index={index} desc={'完成函数 createModule，调用之后满足如下要求：\n' +
                                '1、返回一个对象\n' +
                                '2、对象的 greeting 属性值等于 str1， name 属性值等于 str2\n' +
                                '3、对象存在一个 sayIt 方法，该方法返回的字符串为 greeting属性值 + \', \' + name属性值'}
                                            code={code.slice(0,index * 300)}/>
                            </Animated>
                        ))
                    } </div>
                    <div ref={this.column3} className={classNames({
                        [`${styles.wrapper_column2}`]: true,
                        [`${styles.wrapper_column}`]: true,
                    })}>{
                        colOneList.map((item,index)=>(
                            <Animated   animationIn={'rollIn'} animationOut={'fadeOut'} isVisible={true} animationInDuration={1600}
                                        animationOutDuration={hiddenTime} >
                                <SubjectBox title={'获取URL'} index={index} desc={'完成函数 createModule，调用之后满足如下要求：\n' +
                                '1、返回一个对象\n' +
                                '2、对象的 greeting 属性值等于 str1， name 属性值等于 str2\n' +
                                '3、对象存在一个 sayIt 方法，该方法返回的字符串为 greeting属性值 + \', \' + name属性值'}
                                            code={`
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

`.slice(0,index * 160)}/>
                            </Animated>
                        ))
                    } </div>
                </div>
            </Preload>
        )
    }
}

