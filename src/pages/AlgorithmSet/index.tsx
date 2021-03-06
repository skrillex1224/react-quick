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
import {debounce, throttle} from "../../utils/throttle";

/*本屏幕的下标*/
const IndexSetOfThisIndex = 2;

/*消失时间*/
const hiddenTime =600;

/*进场动画*/
const animationIn = 'fadeInDown';

/*出场动画*/
const animationOut = 'fadeOut';

/*轮循直到高度不为0*/
const queryUtilNotZero = (callback)=>{
    if(document.getElementById('wrapper').clientHeight){
            callback();
        return ;
    }
    setTimeout(()=>{
        queryUtilNotZero(callback);
    },100)
}


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
        //isVisible,
        suspendColOne : [],
        suspendColTwo : [],
        suspendColThree : [],
    }


    componentDidMount(): void {
        setTimeout(()=>{
            this.setState({isLoading:false})
        },600)

        //初始化方法
        //参数方法:  调整三列的高度直到他们高度相近
        this.initializeAlgorithmList(this.adjustColumnHeights);



        window.addEventListener('scroll',throttle(()=>{
            const {suspendColOne,suspendColTwo,suspendColThree} = this.state;

            const colOneDomList = document.getElementsByClassName('colOneDom');
            const colTwoDomList = document.getElementsByClassName('colTwoDom');
            const colThreeDomList = document.getElementsByClassName('colThreeDom');

            for (let i = 0; i < colOneDomList.length; i++) {
                const ele = colOneDomList.item(i);

                const ClientY = ele.getBoundingClientRect().y;

                /*使用getBoundingRect*/
                if(ClientY > 0 && ClientY < window.innerHeight){
                    suspendColOne[i] = true;
                }

                if(ClientY > window.innerHeight){
                    suspendColOne[i] = false;
                }
            }

            for (let i = 0; i < colTwoDomList.length; i++) {
                const ele = colTwoDomList.item(i);
                const ClientY = ele.getBoundingClientRect().y;

                /*使用getBoundingRect*/
                if(ClientY > 0 && ClientY < window.innerHeight){
                    suspendColTwo[i] = true;
                }

                if(ClientY > window.innerHeight){
                    suspendColTwo[i] = false;
                }
            }

            for (let i = 0; i < colThreeDomList.length; i++) {
                const ele = colThreeDomList.item(i);
                const ClientY = ele.getBoundingClientRect().y;

                /*使用getBoundingRect*/
                if(ClientY > 0 && ClientY < window.innerHeight){
                    suspendColThree[i] = true;
                }

                if(ClientY > window.innerHeight){
                    suspendColThree[i] = false;
                }
            }

            this.setState({suspendColOne,suspendColTwo,suspendColThree})
        }),false)

    }

    /*初始化列表,先将三列填满后再比较高低,然后再动态进行平衡,这样可以避免多次setState()*/
    initializeAlgorithmList = (callback)=>{
        let {colThreeList,colTwoList,colOneList} = this.state;
        for (let i = 0; i < algorithmList.length; i++) {
            i % 3 === 0  &&  colOneList.push(algorithmList[i]);
            i % 3 === 1  &&  colTwoList.push(algorithmList[i]);
            i % 3 === 2  &&   colThreeList.push(algorithmList[i]);
        }

        this.setState({colThreeList,colTwoList,colOneList},()=>{
            queryUtilNotZero(callback)
        })
    }

    /*调整三列的高度*/
    adjustColumnHeights = ()=>{
        const colOneRef = this.column1.current;
        const colTwoRef = this.column2.current;
        const colThreeRef = this.column3.current;
        const {colOneList,colTwoList,colThreeList} = this.state;

        /**@建立映射对象
        * stateList 是 状态数组
        *ref 是对应的refObj
        * height 当前高度,这个高度会在后面不停计算,
        * lastIndex 当前正在操作倒数第几个节点*/
        const mappingColumnOne = {
            stateList : colOneList,
            ref : colOneRef,
            height : colOneRef.clientHeight,
            lastIndex : 1,
        }
        const mappingColumnTwo = {
            stateList : colTwoList,
            ref : colTwoRef,
            height : colTwoRef.clientHeight,
            lastIndex : 1,
        }
        const mappingColumnThree = {
            stateList : colThreeList,
            ref : colThreeRef,
            height : colThreeRef.clientHeight,
            lastIndex : 1,
        }
        while(true) {
            //拿到最大列和最小列
            let maxMapping = getMax();
            let minMapping = getMin();
            //计算移动之前最大列和最小列两者的高度差
            const beforeDiff = maxMapping.height - minMapping.height;

            const maxChildNode = maxMapping.ref.children[maxMapping.ref.children.length - maxMapping.lastIndex];

            // 操作的子元素向上移动一位
            maxMapping.lastIndex += 1;

            //移动(假移动,只是计算高度)
            minMapping.height += maxChildNode.clientHeight;
            maxMapping.height -=  maxChildNode.clientHeight;


            //重新拿到最大列和最小列
            let  afterMaxMapping = getMax();
            let  afterMinMapping = getMin();

            //计算移动之后最大列和最小列两者的高度差
            const afterDiff = afterMaxMapping.height - afterMinMapping.height;


            //退出条件, 当移动后最大列和最小列两者的高度差 反而变大了
            if(beforeDiff < afterDiff ){
                break;
            }
            //否则将该元素移动到最小高度的state数组
            minMapping.stateList.push(maxMapping.stateList.pop());
        }

        //获取三列最长对象
        function getMax() {
            const one = mappingColumnOne.height;
            const two = mappingColumnTwo.height;
            const three = mappingColumnThree.height;

            if(one > two){
                if(one > three){
                    return mappingColumnOne;
                }else{
                    return mappingColumnThree;
                }
            }else{
                if(two > three){
                    return mappingColumnTwo;
                }else{
                    return mappingColumnThree;
                }
            }

        }

        //获取三列最短对象
        function getMin(){
            const one = mappingColumnOne.height;
            const two = mappingColumnTwo.height;
            const three = mappingColumnThree.height;

            if(one < two){
                if(one < three){
                    return mappingColumnOne;
                }else{
                    return mappingColumnThree;
                }
            }else{
                if(two < three){
                    return mappingColumnTwo;
                }else{
                    return mappingColumnThree;
                }
            }

        }
        /*填充状态数组是否visible*/
        const suspendColOne = new Array(colOneList.length);
        suspendColOne.fill(false);

        const suspendColTwo = new Array(colTwoList.length);
        suspendColTwo.fill(false);

        const suspendColThree = new Array(colThreeList.length);
        suspendColThree.fill(false);

        /*更新state*/
        this.setState({colOneList,colTwoList,colThreeList,suspendColOne,suspendColTwo,suspendColThree})
    }

    switchRoute = (route)=>{
        const {suspendColThree,suspendColOne,suspendColTwo} = this.state;
        suspendColOne.fill(false)
        suspendColTwo.fill(false)
        suspendColThree.fill(false)

        this.setState({isVisible:false,suspendColOne,suspendColTwo,suspendColThree})
        setTimeout(()=>{
            this.props.history.push(route);
        },hiddenTime)
    }



    render() {
        const {isLoading,isVisible,colTwoList,colOneList,colThreeList,suspendColThree,suspendColOne,suspendColTwo} =this.state;
        const {title,subTitle,imgName} = IndexSet[IndexSetOfThisIndex];

    /**animationOut没啥用在这里*/
        return (
            <Preload switchRoute={this.switchRoute}  chooseIndex={IndexSetOfThisIndex}  isLoading={isLoading} >
               <Animated   animationIn={animationIn} animationOut={animationOut} isVisible={isVisible} animationInDuration={1600}
                         animationOutDuration={hiddenTime}>
                   <MainScreen title={title} subTitle={subTitle} imgName={imgName}/>
               </Animated>
                <div id={'wrapper'} className={styles.wrapper}>
                    <div ref={this.column1} className={classNames({
                        [`${styles.wrapper_column1}`]: true,
                        [`${styles.wrapper_column}`]: true,
                    })}>{
                        colOneList.map((item,index)=>(
                            <Animated  className={'colOneDom'} animationIn={animationIn} animationOut={animationOut} isVisible={suspendColOne[index]} animationInDuration={1000}
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
                        colTwoList.map((item,index)=>(
                            <Animated className={'colTwoDom'}  animationIn={animationIn} animationOut={animationOut} isVisible={suspendColTwo[index]} animationInDuration={1000}
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
                        colThreeList.map((item,index)=>(
                            <Animated className={'colThreeDom'}  animationIn={animationIn} animationOut={animationOut} isVisible={suspendColThree[index]} animationInDuration={1000}
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

