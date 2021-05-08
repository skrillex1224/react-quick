import React from "react";
import {observer} from "mobx-react";
import styles from './index.scss'
import {DownCircleOutlined, UpCircleOutlined} from "@ant-design/icons/lib";
import {throttle} from "../../../utils/throttle";
import { Animated } from "react-animated-css";
interface IProps {
   title : string,
   dataList : any[],
   isVisible : boolean
}

@observer
export  default  class Index extends React.Component<IProps,any>{
    exactHeightList;
    itemListRef;

    static getDerivedStateFromProps(nextProp , state){
        if(!nextProp.isVisible) {
            const {suspendArr} = state;
            suspendArr.fill(false);
            return {
                //修改可见性
                suspendArr
            }
        }
        return null;
    }

    constructor(props) {
        super(props);

        const heightArr = new Array(props.dataList.length)
        heightArr.fill(0);

        const suspendArr = new Array(props.dataList.length)
        suspendArr.fill(false);


        this.itemListRef =  new Array(props.dataList.length)
        for (let i = 0; i < this.itemListRef.length; i++) {
            this.itemListRef[i] = React.createRef();
        }

        this.exactHeightList = new Array(props.dataList.length);
        for (let i = 0; i < this.exactHeightList.length; i++) {
            this.exactHeightList[i] = React.createRef();
        }

        /*引用类型切不可用fill, 这样填充的都是一个对象*/
        // this.exactHeightList.fill(React.createRef())

        this.state = {
            heightArr,
            suspendArr ,
        }
    }

    componentDidMount(): void {
        /*这样会造成多个scroll事件*/
        window.addEventListener('scroll',throttle(()=>{
            const {suspendArr} = this.state;
            for (let i = 0; i < this.itemListRef.length; i++) {
                const {current} = this.itemListRef[i];
                const offsetY = current?.getBoundingClientRect().y;

                if(offsetY < window.innerHeight - 100){
                    suspendArr[i] = true ;
                }else{
                    suspendArr[i] = false ;
                }
            }

            this.setState({suspendArr})
        },10))
    }

    static defaultProps = {
        title: '暂无标题',
        dataList : [1,2,3,4,5,6,7,8],
        isVisible : true
    }

    handleClick = (index)=>{
        return (e)=>{
            const height =  this.exactHeightList[index].current.clientHeight
            this.setState( ({heightArr})=>{
                heightArr[index] =heightArr[index] ?  0 : height ;
                return heightArr
            })
        }
    }

    collapseAll = ()=>{
        this.setState( ({heightArr})=>{
            heightArr.fill(0);
            return heightArr
        })
    }

    render(): React.ReactNode {
        const {title,dataList} = this.props;
        const {heightArr,suspendArr} = this.state;
        return (
            <div className={styles.wrapper}>
                <Animated   animationIn={'bounceIn'} animationOut={'fadeOut'} isVisible={suspendArr[0]} animationInDuration={1000}
                          animationOutDuration={600}>
                    <a onClick={this.collapseAll} className={styles.wrapper_title}>{title}</a>
                </Animated>
                <div className={styles.wrapper_content}>
                    {
                        dataList.map((item,index)=>{
                            return (
                                <Animated key={index}   animationIn={'slideInLeft'} animationOut={'fadeOut'} isVisible={suspendArr[index]} animationInDuration={1600}
                                            animationOutDuration={600}>
                                    <div   ref={this.itemListRef[index]}  className={styles.wrapper_content_item}>
                                        <div  style={heightArr[index] ?  {height: 0 } : {}}  className={styles.wrapper_content_item_title}>
                                            题目：React源码剖析从前端的URL到页面渲染的过程
                                            React源码剖析从前端的URL到页面渲染的过程
                                            React源码剖析从前端的URL到页面渲染的过程
                                            React源码剖析从前端的URL到页面渲染的过程
                                        </div>
                                        <div className={styles.wrapper_content_item_article} style={{height:`${heightArr[index]}px`}}>
                                            <div ref={this.exactHeightList[index]} >
                                                fsdfjsflksjflksjflksjfdkl
                                            </div>
                                        </div>

                                        <div  onClick={this.handleClick(index)} className={styles.wrapper_content_item_showMore}>
                                            {
                                                heightArr[index] ?
                                                    <>
                                                        <span>收起内容</span><UpCircleOutlined />
                                                    </>
                                                    :
                                                    <>
                                                        <span>查看内容</span><DownCircleOutlined />
                                                    </>
                                            }
                                        </div>
                                    </div>
                               </Animated>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}