import React from "react";
import styles from './index.scss'
import {Animated} from "react-animated-css";
import {observer} from "mobx-react";
import ScrollView from '../CaseTestSet/ScrollView'
import Preload from '../../components/Preload'

@observer
export default class  Index extends React.Component<any, any>{

    state = {
        isLoading : true
    }

    componentDidMount(): void {
        setTimeout(()=>{
            this.setState({isLoading:false})
        },800)
    }

    render() {
        return (
            <Preload isLoading={this.state.isLoading}>
               <Animated animationIn={'rollIn'} isVisible={true} animationInDuration={1600} animationOut={'fadeOut'} animationOutDuration={600}>
                   <ScrollView />
               </Animated>
            </Preload>
        )
    }
}