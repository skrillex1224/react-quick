import React from "react";
import {observer} from "mobx-react";
import styles from './index.scss'
import {DownCircleOutlined, UpCircleOutlined} from "@ant-design/icons/lib";
import { Tooltip } from 'antd';
interface IProps {
   title : string,
   dataList : any[]
}

@observer
export  default  class Index extends React.Component<IProps,any>{
    exactHeightList;


    constructor(props) {
        super(props);

        const heightArr = new Array(props.dataList.length)
        heightArr.fill(0);

        this.exactHeightList = new Array(props.dataList.length);
        this.exactHeightList.fill(React.createRef())

        this.state = {
            heightArr
        }
    }

    static defaultProps = {
        title: '暂无标题',
        dataList : [1,2,3,4,5,6,7,8]
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

    render(): React.ReactNode {
        const {title,dataList} = this.props;
        const {heightArr} = this.state;
        return (
            <div className={styles.wrapper}>
                <a className={styles.wrapper_title}>{title}</a>
                <div className={styles.wrapper_content}>
                    {
                        dataList.map((item,index)=>{
                            return (
                                <div className={styles.wrapper_content_item}>
                                    <div  style={heightArr[index] ?  {height: 0 } : {}}  className={styles.wrapper_content_item_title}>
                                        题目：React源码剖析从前端的URL到页面渲染的过程
                                        React源码剖析从前端的URL到页面渲染的过程
                                        React源码剖析从前端的URL到页面渲染的过程
                                        React源码剖析从前端的URL到页面渲染的过程
                                    </div>
                                    <div className={styles.wrapper_content_item_article} style={{height:`${heightArr[index]}px`}}>
                                        <div ref={this.exactHeightList[index]} style={{height:'1000px'}}>
                                            React源码剖析从前端的URL到页面渲染的过程
                                            <br/>React源码剖析从前端的URL到页面渲染的过程
                                            <br/>React源码剖析从前端的URL到页面渲染的过程
                                            <br/>React源码剖析从前端的URL到页面渲染的过程
                                            <br/>React源码剖析从前端的URL到页面渲染的过程
                                            <br/>React源码剖析从前端的URL到页面渲染的过程
                                            <br/>React源码剖析从前端的URL到页面渲染的过程
                                            <br/>React源码剖析从前端的URL到页面渲染的过程
                                            <br/>React源码剖析从前端的URL到页面渲染的过程
                                            <br/>React源码剖析从前端的URL到页面渲染的过程
                                            <br/>React源码剖析从前端的URL到页面渲染的过程
                                            <br/>React源码剖析从前端的URL到页面渲染的过程
                                            <br/>React源码剖析从前端的URL到页面渲染的过程
                                            <br/>React源码剖析从前端的URL到页面渲染的过程
                                            <br/>React源码剖析从前端的URL到页面渲染的过程
                                            <br/>React源码剖析从前端的URL到页面渲染的过程
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
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}