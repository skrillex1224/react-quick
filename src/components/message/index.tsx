import React from "react";
import {observer} from "mobx-react";
import styles from './index.scss'
import ReactDOM from "react-dom";
import {CheckCircleOutlined, CloseCircleOutlined, ExclamationCircleOutlined} from "@ant-design/icons/lib";

interface IProps {
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

    private  static duration = 3000;

    private static iconType = 'warn';

    private static message = '提示消息';

    private static typeMapping = {
        'warn' : <ExclamationCircleOutlined />,
        'success' : <CheckCircleOutlined />,
        'error' : <CloseCircleOutlined />,
    }

    /*
     * 向外暴露的方法
     */
    public static warn = (message,duration)=>{
        Index.iconType = 'warn'
        Index.showMessage(message,duration);
    }

    public static error = (message,duration)=>{
        Index.iconType = 'error'
        Index.showMessage(message,duration)
    }

    public static success = (message,duration)=>{
        Index.iconType = 'success'
        Index.showMessage(message,duration)
    }


    private  static showMessage = (message,duration )=>{
        Index.duration = duration;
        Index.message = message;
        const ele = <Index />
        const divEle = document.createElement('div');
        divEle.id = 'message';
        divEle.style.position = 'absolute'
        divEle.style.left = '0'
        divEle.style.top = '0'
        divEle.style.height ='60px';
        divEle.style.width ='100%';
        divEle.style.zIndex = '999';

        document.body.append(divEle);

        //从页面上获取node
        const divRenderedEle = document.getElementById('message');
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
            },Index.duration )
        })
    }

    render() {
        const {visible} = this.state;
        const {message,iconType,typeMapping}  = Index;
        return (
            <div style={visible  ? {transform:'translateY(20px)'} : {}} className={styles.wrapper}>
                <div className={styles.wrapper_main}>
                    <span className={styles.wrapper_main_icon}>{typeMapping[iconType]}</span>
                    <span>{message}</span>
                </div>
            </div>
        )
    }
}
