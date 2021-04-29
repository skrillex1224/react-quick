import React from "react";
import {observer} from "mobx-react";
import Preload from '../../components/Preload'
import {Animated} from 'react-animated-css'
import MainScreen from "../../components/MainScreen";
import IndexSet from "../../utils/IndexSet";
import SubjectBox from './SubjectBox'

import styles from './index.scss'

/*本屏幕的下标*/
const IndexSetOfThisIndex = 2;

const hiddenTime =600;

const algorithmList = [
    1,2,3,4,5,6,7,8,
]

@observer
export default class  Index extends React.Component<any, any>{

    state = {
        isLoading :true,
        isVisible : true,
    }


    componentDidMount(): void {
        setTimeout(()=>{
            this.setState({isLoading:false})
        },600)
    }


    switchRoute = (route)=>{
        this.setState({isVisible:false})
        setTimeout(()=>{
            this.props.history.push(route);
        },hiddenTime)
    }


    render() {
        const {isLoading,isVisible} =this.state;
        const {title,subTitle,imgName} = IndexSet[IndexSetOfThisIndex];

    /**animationOut没啥用在这里*/
        return (
            <Preload switchRoute={this.switchRoute}  chooseIndex={IndexSetOfThisIndex}  isLoading={isLoading} >
               <Animated   animationIn={'rollIn'} animationOut={'fadeOut'} isVisible={isVisible} animationInDuration={1600}
                         animationOutDuration={hiddenTime}>
                   <MainScreen title={title} subTitle={subTitle} imgName={imgName}/>
               </Animated>
               <div className={styles.wrapper}>
                   {
                       algorithmList.map((item,index)=>(
                           <SubjectBox title={'获取URL'} index={1} desc={'完成函数 createModule，调用之后满足如下要求：\n' +
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

`}/>
                       ))
                   }
               </div>
            </Preload>
        )
    }
}

