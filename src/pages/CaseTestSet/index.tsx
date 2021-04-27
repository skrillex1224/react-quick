import React from "react";
import {observer} from "mobx-react";
import Preload from '../../components/Preload'
import MusicWave from './MusicWave'
import VideoEditor from './VideoEditor'
import {Animated} from 'react-animated-css'
import styles from './index.scss';
import ImageClip from './ImageClip'
import Polymerization from "./PolymerizationVideo";
import WakeUpExe from "./WakeUpExe";
import MainScreen from "../../components/MainScreen";
import message from '../../components/message'
import CopyText from './CopyText'
import IndexSet from "../../utils/IndexSet";
import {debounce, throttle} from "../../utils/throttle";

/*本屏幕的下标*/
const IndexSetOfThisIndex = 1;


const arr =[]

for (let i = 6; i < 10; i++) {
    arr.push(i);
}

const arrRef = new Array<any>()

for (let i = 0; i < 10; i++) {
    arrRef[i] = React.createRef();
}

const hiddenTime =600;


@observer
export default class  Index extends React.Component<any, any>{

    state = {
        isLoading :true,
        suspend : new Array(10),
        isVisible : true,
    }

    componentDidMount(): void {
        setTimeout(()=>{
            this.setState({isLoading:false})
        },600)

        //节流
        window.addEventListener('scroll',throttle(()=>{
            const suspend = this.state.suspend;
            for (let i = 0; i < arrRef.length; i++) {
                const currentRef = arrRef[i].current
                if (currentRef?.offsetTop + 300<= window.scrollY + window.innerHeight) {
                    suspend[i] = true;
                }else{
                    suspend[i] = false;
                }

            }
            this.setState({suspend})
        },200),false)

    }

    childVideoEditorMethod = ()=>{}

    handleVideoCutResize = ()=>{
        this.childVideoEditorMethod()
    }

    //子类方法调用父类
    fetchChildMethod = (receiver) =>{
        this.childVideoEditorMethod = receiver
    }

    switchRoute = (route)=>{
        if(route === IndexSet[IndexSetOfThisIndex].navUrl) return ;

        this.setState({isVisible:false})
        setTimeout(()=>{
            this.props.history.push(route);
        },hiddenTime)
    }

    /**@组件列表*/
    componentList = [
        {
            title: '点击下方按钮唤醒exe',
            component : <WakeUpExe />,
            href: '',
            onTransitionEnd : null ,
        },
        // {
        //     title: '自定义音乐播放波纹',
        //     href: 'https://github.com/xiangyuecn/Recorder',
        //     component : <MusicWave />,
        //     onTransitionEnd : null ,
        // },
        {
            title: '视频截取',
            href: '',
            component : <VideoEditor fetchChildMethod={this.fetchChildMethod}/>,
            onTransitionEnd : this.handleVideoCutResize ,
        },
        {
            title: '图片裁剪',
            href: 'https://github.com/react-cropper/react-cropper',
            component : <ImageClip />,
            onTransitionEnd : null
        },
        {
            title: '视频合成',
            href:'https://developer.mozilla.org/zh-CN/docs/Web/API/MediaDevices/getUserMedia',
            component : <Polymerization />,
            onTransitionEnd : null,
        },
        {
            title: '文本复制',
            href: 'https://github.com/sudodoki/copy-to-clipboard',
            component : <CopyText />,
            onTransitionEnd : null ,
        }
    ]

    render() {
        const {isLoading,suspend,isVisible} =this.state;
        const {title,subTitle,imgName} = IndexSet[IndexSetOfThisIndex];

        return (
            <Preload switchRoute={this.switchRoute}  chooseIndex={IndexSetOfThisIndex}  isLoading={isLoading} >
               <Animated   animationIn={'zoomIn'} animationOut={'fadeOut'} isVisible={isVisible} animationInDuration={1600}
                         animationOutDuration={hiddenTime}>
                   <MainScreen title={title} subTitle={subTitle} imgName={imgName}/>
                   <div  className={styles.wrapper}>
                       {
                           this.componentList.map((item,index)=>{
                               const {component,title,href,onTransitionEnd} = item;
                               return    (
                                   <div onTransitionEnd={onTransitionEnd} style={suspend[index] ? {transform:'translateY(0px)  scale(1)',opacity:1} : {}} ref={arrRef[index]} className={styles.wrapper_box} >
                                      <div className={styles.wrapper_box_title} >
                                          <a href={href}>{title}</a>
                                      </div>
                                      {component}
                                  </div>
                               )
                           })
                       }
                   </div>
                   <div className={styles.wrapper_footer}>
                       Copyright
                   </div>
               </Animated>
            </Preload>
        )
    }
}