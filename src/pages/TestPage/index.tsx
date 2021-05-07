import React from "react";
import {Animated} from "react-animated-css";
import {observer} from "mobx-react";
import Example from '../ProjectSet/WeappCarousel'
import Example1 from '../ProjectSet/BigScreenCarousel'
import Example2 from '../ProjectSet/WebCarousel'
import Preload from '../../components/Preload'
import styles from './index.scss'

@observer
export default class  Index extends React.Component<any, any>{

    state = {
        isLoading : true
    }

    componentDidMount(): void {
        // setTimeout(()=>{
        //     this.setState({isLoading:false})
        // },800)
    }

    render() {
        return (
            // <Preload isLoading={this.state.isLoading}>
            //    <Animated animationIn={'rollIn'} isVisible={true} animationInDuration={1600} animationOut={'fadeOut'} animationOutDuration={600}>
                  <div className={styles.wrapper}>
                      <Example />
                      {/*<Example1 />*/}
                      {/*<Example2 />*/}
                  </div>
               // </Animated>
            // </Preload>
        )
    }
}