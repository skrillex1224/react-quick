import React from "react";
import {observer} from "mobx-react";
import Preload from '../../components/Preload'
import {Animated} from 'react-animated-css'
import MainScreen from "../../components/MainScreen";
import IndexSet from "../../utils/IndexSet";
import styles from './index.scss'
import {throttle} from "../../utils/throttle";
import classNames from "classnames";

/*当前的Index*/
const currentPageIndex = 3;

/*隐藏时间*/
const hiddenTime =600;

/*显示时间*/
const showTime = 1400;

@observer
export default class  Index extends React.Component<any, any>{
    refList = [];

    constructor(props) {
        super(props);

        this.refList = new Array(5);
        this.refList.fill(React.createRef());
    }

    state = {
        isLoading :true,
        isVisible : true,
        isVisibleCarousel: false,
    }


    componentDidMount(): void {
        setTimeout(()=>{
            this.setState({isLoading:false})
        },600)

        /**/


        /*滚动监听*/
        const carouselDiv = document.getElementById('carousel');
        window.addEventListener('scroll',throttle(()=>{
            const currentY = carouselDiv.getBoundingClientRect().y;
            console.log(currentY)
            if(currentY < window.innerHeight){
                this.setState({isVisibleCarousel:true})
            }

        }),false)
    }


    switchRoute = (route)=>{
        if(route === '/projectAllSet') return ;

        this.setState({isVisible:false})
        setTimeout(()=>{
            this.props.history.push(route);
        },hiddenTime)
    }


    render() {
        const {isLoading,isVisible,isVisibleCarousel} =this.state;
        const {title,subTitle,imgName} = IndexSet[currentPageIndex];

        /**animationOut没啥用在这里*/
        return (
            <Preload switchRoute={this.switchRoute}  chooseIndex={currentPageIndex}  isLoading={isLoading} >
                <Animated   animationIn={'zoomIn'} animationOut={'fadeOut'} isVisible={isVisible} animationInDuration={showTime}
                            animationOutDuration={hiddenTime}>
                    <MainScreen title={title} subTitle={subTitle} imgName={imgName}/>
                </Animated>

                <Animated   animationIn={'zoomIn'} animationOut={'fadeOut'} isVisible={isVisibleCarousel} animationInDuration={showTime}
                            animationOutDuration={hiddenTime}>
                    <div className={styles.wrapper}>
                        <div id={'carousel'} className={styles.wrapper_carousel}>
                            {
                                [1,2,3,4,5].map((item,index)=>{
                                    return (
                                        <div ref={this.refList[index]} className={classNames({
                                            [`${styles.wrapper_carousel_item}`]:true
                                        })}>{item}</div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </Animated>
            </Preload>
        )
    }
}