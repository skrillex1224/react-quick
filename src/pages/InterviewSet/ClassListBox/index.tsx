import React from "react";
import {observer} from "mobx-react";
import styles from './index.scss'
import {DownCircleOutlined} from "@ant-design/icons/lib";
import { Tooltip } from 'antd';
interface IProps {
   title : string,
   dataList : any[]
}

@observer
export  default  class Index extends React.Component<IProps,any>{

    constructor(props) {
        super(props);

        const heightArr = new Array(props.dataList.length)
        heightArr.fill(0);

        this.state = {
            heightArr
        }
    }

    static defaultProps = {
        title: '暂无标题',
        dataList : [1,2,3,4,5,6,7,8]
    }

    handleClick = (index)=>{
        async  function callUtilNotNull(e) {
            const val = e.target.previousSibling?.children[0]?.clientHeight;

            return new Promise((resolve)=>{
                setTimeout(async ()=>{
                    console.log(val,'===================')
                    resolve(val || await callUtilNotNull(e))
                },200)
            })
        }

        return (e)=>{
            this.setState(async ({heightArr})=>{
                console.log(await callUtilNotNull(e),'----')

                heightArr[index] = heightArr[index] ? 0 : (await  callUtilNotNull(e));
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
                                        <div style={{height:'1000px'}}>
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
                                        <span>查看内容</span><DownCircleOutlined />
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