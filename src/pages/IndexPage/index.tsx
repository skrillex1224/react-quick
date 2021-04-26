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
            this.setState({isLoading:false})
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

    render(): React.ReactNode {
        const {isLoading,isVisible,current} = this.state;
        const {title,imgName} = IndexSet[current];
        return (
            <Preload chooseIndex={current} isLoading={isLoading}>
                   <div className={styles.wrapper}>
                       <div onClick={this.handleLeft} className={styles.wrapper_leftShadow} />
                       <Animated   animationIn={'fadeIn'} animationOut={'fadeOut'} isVisible={isVisible} animationInDuration={1200}
                                   animationOutDuration={hiddenTime}>
                            <MainScreen title={title} subTitle={current ? 'Click To See' : 'Start'} imgName={imgName}/>
                       </Animated>
                       <div onClick={this.handleRight} className={styles.wrapper_rightShadow} />
                   </div>
           </Preload>
        )
    }
}

