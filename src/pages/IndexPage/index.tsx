import React from "react";
import {observer} from "mobx-react";
import styles from './index.scss'
import MainScreen from '../../components/MainScreen'
import Preload from '../../components/Preload'
import {Animated} from "react-animated-css";

@observer
export default class Index extends React.Component<any, any>{
    state ={
        isLoading : true,
        isVisible : true,
    }

    componentDidMount(): void {
        setTimeout(()=>{
            this.setState({isLoading:false})
        },600)
    }

    render(): React.ReactNode {
        const {isLoading,isVisible} = this.state;
        return (
            <Preload isLoading={isLoading}>
                <Animated   animationIn={'fadeIn'} animationOut={'fadeOut'} isVisible={isVisible} animationInDuration={2000}
                            animationOutDuration={600}>
                   <div className={styles.wrapper}>
                       <div className={styles.wrapper_leftShadow} />
                       <MainScreen title={'案例测试集'} subTitle={'Click To See'} imgName={'caseTestSet'}/>
                       <div className={styles.wrapper_rightShadow} />
                   </div>
                </Animated>
           </Preload>
        )
    }
}

