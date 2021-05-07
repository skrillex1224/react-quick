import React from "react";
import {observer} from "mobx-react";
import Preload from '../../components/Preload'
import {Animated} from 'react-animated-css'
import MainScreen from "../../components/MainScreen";
import IndexSet from "../../utils/IndexSet";
import styles from './index.scss'
import {throttle} from "../../utils/throttle";
import classNames from "classnames";
import WeappCarousel from 'pages/ProjectSet/WeappCarousel'
import BigScreenCarousel from 'pages/ProjectSet/BigScreenCarousel'
import WebCarousel from 'pages/ProjectSet/WebCarousel'

/*当前的Index*/
const currentPageIndex = 3;

/*隐藏时间*/
const hiddenTime =600;

/*显示时间*/
const showTime = 1400;

/*数据*/
const dataList = [0,1,2,3,4,5];

@observer
export default class  Index extends React.Component<any, any>{
    //state
    constructor(props) {
        super(props);

        /*设置state*/
        this.state = {
            isLoading :true,
            isVisible : true,
        }

    }


    componentDidMount(): void {

        // setTimeout(()=>{
            this.setState({isLoading:false})
        // },600)

    }


    switchRoute = (route)=>{
        if(route === '/projectAllSet') return ;

        this.setState({isVisible:false})
        setTimeout(()=>{
            this.props.history.push(route);
        },hiddenTime)
    }


    render() {
        const {isLoading,isVisible} =this.state;
        const {title,subTitle,imgName} = IndexSet[currentPageIndex];

        /**animationOut没啥用在这里*/
        return (
            <Preload switchRoute={this.switchRoute}  chooseIndex={currentPageIndex}  isLoading={isLoading} >
                <Animated   animationIn={'zoomIn'} animationOut={'fadeOut'} isVisible={isVisible} animationInDuration={showTime}
                            animationOutDuration={hiddenTime}>
                    <MainScreen title={title} subTitle={subTitle} imgName={imgName}/>
                </Animated>

                <Animated   animationIn={'zoomIn'} animationOut={'fadeOut'} isVisible={true} animationInDuration={showTime}
                            animationOutDuration={hiddenTime}>
                    <div className={styles.wrapper_title}>
                        <a>小程序项目总览</a>
                    </div>
                    <WeappCarousel/>
                </Animated>

                <Animated   animationIn={'zoomIn'} animationOut={'fadeOut'} isVisible={true} animationInDuration={showTime}
                            animationOutDuration={hiddenTime}>
                    <div className={styles.wrapper_title}>
                        <a>Web项目总览</a>
                    </div>
                    <WebCarousel/>
                </Animated>

                <Animated   animationIn={'zoomIn'} animationOut={'fadeOut'} isVisible={true} animationInDuration={showTime}
                            animationOutDuration={hiddenTime}>
                    <div className={styles.wrapper_title}>
                        <a>大屏项目总览</a>
                    </div>
                    <BigScreenCarousel/>
                </Animated>
            </Preload>
        )
    }
}

