import React from "react";
import {observer} from "mobx-react";
import Preload from '../../components/Preload'
import {Animated} from 'react-animated-css'
import MainScreen from "../../components/MainScreen";
import IndexSet from "../../utils/IndexSet";


const hiddenTime =600;

@observer
export default class  Index extends React.Component<any, any>{

    state = {
        isLoading :true,
        isVisible : true,
    }


    componentDidMount(): void {
        setTimeout(()=>{
            this.setState({isLoading:false})
        },600)
    }


    switchRoute = (route)=>{
        this.setState({isVisible:false})
        setTimeout(()=>{
            this.props.history.push(route);
        },hiddenTime)
    }


    render() {
        const {isLoading,isVisible} =this.state;
        const {title,subTitle,imgName} = IndexSet[3];

        /**animationOut没啥用在这里*/
        return (
            <Preload switchRoute={this.switchRoute}  chooseIndex={3}  isLoading={isLoading} >
                <Animated   animationIn={'zoomIn'} animationOut={'fadeOut'} isVisible={isVisible} animationInDuration={1600}
                            animationOutDuration={hiddenTime}>
                    <MainScreen title={title} subTitle={subTitle} imgName={imgName}/>
                </Animated>
            </Preload>
        )
    }
}