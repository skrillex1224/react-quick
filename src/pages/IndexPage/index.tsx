import React from "react";
import {observer} from "mobx-react";
import styles from './index.scss'
import MainScreen from '../../components/MainScreen'
import Preload from '../../components/Preload'
import {Animated} from "react-animated-css";
import IndexSet from '../../utils/IndexSet'

const hiddenTime = 600

@observer
export default class Index extends React.Component<any, any>{
    state ={
        isLoading : true,
        isVisible : true,
        current : 0
    }

    componentDidMount(): void {
        setTimeout(()=>{
            let counter = 0;
            /*图片预加载*/
            IndexSet.forEach((item)=>{
                const imgSrc = item.imgName;
                const img  = document.createElement('img');
                img.src = imgSrc;

                const that = this;

                img.onload=function(){
                    // 加载后counter ++ ,直到所有图片加载,进入主页
                    counter++;
                    if(counter === IndexSet.length){
                        that.setState({isLoading:false})
                    }
                }

            })
        },600)
    }

    handleRight = ()=>{
        this.setState({isVisible:false},()=>{
            setTimeout(()=>{
                this.setState({current: (this.state.current +1) % IndexSet.length,isVisible:true})
            },hiddenTime)
        })
    }

    handleLeft = ()=>{
        this.setState({isVisible:false},()=>{
            setTimeout(()=>{
                this.setState({current: (this.state.current -1) < 0 ?  IndexSet.length -1 : (this.state.current -1) ,isVisible:true})
            },hiddenTime)
        })
    }

    /*路由切换时渐渐消失的特效*/

    switchRoute = (route)=>{
        //当是本页面时不执行跳转
        if(route === IndexSet[0].navUrl) return ;

        this.setState({isVisible:false})
         setTimeout(()=>{
             this.props.history.push(route);
             // 这个会重新挂载所有组件
             // window.location.href = route
         },hiddenTime)
    }

    render(): React.ReactNode {
        const {isLoading,isVisible,current} = this.state;
        const {title,imgName} = IndexSet[current];
        return (
            <Preload switchRoute={this.switchRoute} chooseIndex={current} isLoading={isLoading}>
                   <div className={styles.wrapper}>
                       <div onClick={this.handleLeft} className={styles.wrapper_leftShadow} />
                       <Animated   animationIn={'zoomIn'} animationOut={'fadeOut'} isVisible={isVisible} animationInDuration={1200}
                                   animationOutDuration={hiddenTime}>
                            <MainScreen switchRoute={this.switchRoute} title={title} subTitle={current ? 'Click To See' : 'Start'} imgName={imgName}/>
                       </Animated>
                       <div onClick={this.handleRight} className={styles.wrapper_rightShadow} />
                   </div>
           </Preload>
        )
    }
}

