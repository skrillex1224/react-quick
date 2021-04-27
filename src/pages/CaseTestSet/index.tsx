import React from "react";
import {observer} from "mobx-react";
import Preload from '../../components/Preload'
import MusicWave from './MusicWave'
import VideoEditor from './VideoEditor'
import {Animated} from 'react-animated-css'
import styles from './index.scss';
import ImageClip from './ImageClip'
import Polymerization from "./PolymerizationVideo";
import MainScreen from "../../components/MainScreen";
import message from '../../components/message'
import CopyText from './CopyText'
import IndexSet from "../../utils/IndexSet";
import {debounce, throttle} from "../../utils/throttle";

let arr = [];
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
        if(route === IndexSet[1].navUrl) return ;

        this.setState({isVisible:false})
        setTimeout(()=>{
            this.props.history.push(route);
        },hiddenTime)
    }

    render() {
        const {isLoading,suspend,isVisible} =this.state;
        const {title,subTitle,imgName} = IndexSet[1];

        return (
            <Preload switchRoute={this.switchRoute}  chooseIndex={1}  isLoading={isLoading} >
               <Animated   animationIn={'zoomIn'} animationOut={'fadeOut'} isVisible={isVisible} animationInDuration={1600}
                         animationOutDuration={hiddenTime}>
                   <MainScreen title={title} subTitle={subTitle} imgName={imgName}/>
                   <div  className={styles.wrapper}>
                       <div style={!!suspend[0] ? {transform:'translateY(0px)  scale(1)',opacity:1} : {}} ref={arrRef[0]} className={styles.wrapper_box} >
                           <div className={styles.wrapper_box_title} >
                               <a>点击下方按钮唤醒本地.exe文件</a>
                           </div>
                           <div className='index_btn' onClick={debounce(()=>{
                               message.success('唤醒中，请稍等',3000)
                               window.location.href ='BoYiCap://'
                           },200)}>WakeUp</div>
                       </div>


                       <div style={!!suspend[1] ? {transform:'translateY(0px)  scale(1)',opacity:1} : {}} ref={arrRef[1]}   className={styles.wrapper_box} >
                           <div className={styles.wrapper_box_title}>
                               <a href={'https://github.com/xiangyuecn/Recorder'}>自定义音乐播放波纹</a>
                           </div>
                            <MusicWave />
                       </div>

                       <div  onTransitionEnd={this.handleVideoCutResize} style={!!suspend[2] ? {transform:'translateY(0px)  scale(1)',opacity:1} : {}} ref={arrRef[2]}   className={styles.wrapper_box} >
                           <div className={styles.wrapper_box_title}>
                               <a>视频截取</a>
                           </div>
                            <VideoEditor fetchChildMethod={this.fetchChildMethod}/>
                       </div>

                       <div style={!!suspend[3] ? {transform:'translateY(0px)  scale(1)',opacity:1} : {}} ref={arrRef[3]}   className={styles.wrapper_box} >
                           <div className={styles.wrapper_box_title}>
                               <a href={'https://github.com/react-cropper/react-cropper'}>图片裁剪</a>
                           </div>
                           <ImageClip/>
                       </div>

                       <div style={!!suspend[4] ? {transform:'translateY(0px)  scale(1)',opacity:1} : {}} ref={arrRef[4]}   className={styles.wrapper_box} >
                           <div className={styles.wrapper_box_title}>
                               <a href={'https://developer.mozilla.org/zh-CN/docs/Web/API/MediaDevices/getUserMedia'}>视频合成</a>
                           </div>
                           <Polymerization />
                       </div>

                       <div style={!!suspend[5] ? {transform:'translateY(0px) scale(1)',opacity:1} : {}} ref={arrRef[5]}   className={styles.wrapper_box} >
                           <div className={styles.wrapper_box_title}>
                               <a href={'https://github.com/sudodoki/copy-to-clipboard'}>文本复制</a>
                           </div>
                           <CopyText />
                       </div>

                       {
                           arr.map(item=>{
                              return   <div style={!!suspend[item] ? {transform:'translateY(0px)',opacity:1} : {}} id={item} ref={arrRef[item]}   className={styles.wrapper_box} >
                                  {item}
                              </div>
                           })

                       }
                       <div className={styles.wrapper_footer}>
                             Copyright
                       </div>
                   </div>
               </Animated>
            </Preload>
        )
    }
}