import React,{Suspense} from "react";
import {observer} from "mobx-react";
import {Animated} from "react-animated-css";
import ReactLogo from "../../assets/react.png";
import styles from './index.scss'

function Suspender({isLoading}){
    if(isLoading){
        // 从不结束的promise
        // 保持挂起fallback的状态
        throw new Promise(()=>{})
    }
    return null
}

interface IProps {
    isLoading : boolean
}

interface IState {
    timeOutHide : boolean
}


// @ts-ignore
@observer
export default class Index extends React.Component<IProps, IState>{
    static defaultProps = {
        isLoading : true
    }

    state = {
        timeOutHide : true,
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void {
        //加载完毕了
        if(!this.props.isLoading){
            setTimeout(()=>{
                this.setState({timeOutHide:false})
            },800)
        }
    }

    render(): React.ReactNode {
        const {children,isLoading} = this.props
        const {timeOutHide} = this.state;
        return (
            <Suspense fallback={  <Animated animationIn={'fadeIn'} animationOut={'fadeOut'} isVisible={isLoading} animationInDuration={1600}
                                            animationOutDuration={600} >
                <div  className={styles.wrapper}>
                    <div className={styles.wrapper_blinkWrapper} />
                    <div className={styles.wrapper_scaleUp} style={isLoading ? {}: {transform:'scale(4)'}} >
                        <img className={styles.wrapper_rotateImg} src={ReactLogo} />
                    </div>
                </div>
            </Animated>}>
                {children}
                <Suspender isLoading={timeOutHide} />
            </Suspense>
        )
    }
}