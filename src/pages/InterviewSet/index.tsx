import React from "react";
import {observer} from "mobx-react";
import Preload from '../../components/Preload'
import {Animated} from 'react-animated-css'
import MainScreen from "../../components/MainScreen";
import IndexSet from "../../utils/IndexSet";
import styles from './index.scss'
import ClassListBox from './ClassListBox'

/*当前的Index*/
const currentPageIndex = 4;

/*隐藏时间*/
const hiddenTime =600;

/*显示时间*/
const showTime = 1600;

const animateIn = 'bounceInRight'

@observer
export default class  Index extends React.Component<any, any>{

    state = {
        isLoading :true,
        isVisible : true,
    }


    componentDidMount(): void {
        // setTimeout(()=>{
            this.setState({isLoading:false})
        // },600)
    }


    switchRoute = (route)=>{
        if(route === '/interviewProblemSet') return ;
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
                <Animated   animationIn={'slideInLeft'} animationOut={'fadeOut'} isVisible={isVisible} animationInDuration={1600}
                            animationOutDuration={hiddenTime}>
                    <MainScreen title={title} subTitle={subTitle} imgName={imgName}/>
                </Animated>

                <div className={styles.wrapper}>
                    <ClassListBox dataList={[1,2,3,4,5,6,7,8]}/>
                    {/*<ClassListBox />*/}
                </div>

            </Preload>
        )
    }
}