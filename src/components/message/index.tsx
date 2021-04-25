import React from "react";
import {observer} from "mobx-react";
import styles from './index.scss'
import ReactDOM from "react-dom";
import {CheckCircleOutlined, CloseCircleOutlined, ExclamationCircleOutlined} from "@ant-design/icons/lib";
import copy from "copy-to-clipboard";

interface IProps {
    iconType : string,
    message : string,
    duration : number
}

interface IState {
    visible : boolean
}

/**
 *
 * 使用方法同antd的message对象
 */
@observer
export default class Index extends React.Component<IProps, IState>{
   static defaultProps = {
       duration:3000,
       iconType: 'warn',
       message:'提示消息'
   }

    private static typeMapping = {
        'warn' : <ExclamationCircleOutlined />,
        'success' : <CheckCircleOutlined />,
        'error' : <CloseCircleOutlined />,
    }

    //队列
    private static queue = 0;

    /*
     * 向外暴露的方法
     */
    public static warn = (message,duration)=>{
        Index.showMessage(message,duration,'warn');
    }

    public static error = (message,duration)=>{
        Index.showMessage(message,duration,'error')
    }

    public static success = (message,duration)=>{
        Index.showMessage(message,duration,'success')
    }


    private  static showMessage = (message,duration ,iconType)=>{
        const ele = <Index message={message} duration={duration} iconType={iconType}/>

        Index.queue++;

        const divEle = document.createElement('div');
        divEle.id = `message${Index.queue}`;
        divEle.style.position = 'fixed'
        divEle.style.left = '0'
        divEle.style.top = '0'
        divEle.style.width ='100%';
        divEle.style.zIndex = `${Number.MAX_VALUE}`

        document.body.append(divEle);

        //从页面上获取node
        const divRenderedEle = document.getElementById(`message${Index.queue}`);
        //@ts-ignore
        ReactDOM.render(ele, divRenderedEle);
        setTimeout(()=>{
            //从页面上获取node
            ReactDOM.unmountComponentAtNode(divRenderedEle);
            document.body.removeChild(divRenderedEle);
        },duration  + 1100)
    }


    state = {
        visible : false
    }

    componentDidMount(): void {
        setTimeout(()=>{
            this.setState({visible:true})
            setTimeout(()=>{
                this.setState({visible:false})
            },this.props.duration )
        })
    }

    /*点击复制*/
    handleClick = ()=>{
        copy(this.props.message)
    }

    render() {
        const {visible} = this.state;
        const {message,iconType}  = this.props;


        return (
            // @ts-ignore
            <div onClick={this.handleClick} style={visible  ? {transform:`translateY(20px)`} : {}} className={styles.wrapper}>
                <div className={styles.wrapper_main}>
                    <span className={styles.wrapper_main_icon}>{Index.typeMapping[iconType]}</span>
                    <span>{message}</span>
                </div>
            </div>
        )
    }
}
