import React from "react";
import styles from './index.scss'
import {Animated} from "react-animated-css";
import {observer} from "mobx-react";
import Polymerization from '../../components/PolymerizationVideo'
import Preload from '../../components/Preload'

@observer
export default class  Index extends React.Component<any, any>{

    state ={
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
               <Polymerization />
           </Preload>
        )
    }
}