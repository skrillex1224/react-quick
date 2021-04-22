import React from "react";
import {observer} from "mobx-react";
import Preload from '../../components/Preload'
import MusicWave from '../../components/MusicWave'
import VideoEditor from '../../components/VideoEditor'
import {Animated} from 'react-animated-css'
import styles from './index.scss';
import {func} from "prop-types";

let arr = [];
for (let i = 3; i < 10; i++) {
    arr.push(i);
}

const arrRef = new Array<any>()

for (let i = 0; i < 10; i++) {
    arrRef[i] = React.createRef();
}

//节流
function throttle(eventHandler :Function,delay =200) {
    let timer ;
    return function(...params){
        if(timer) return ;
        timer = setTimeout(()=>{
            eventHandler(...params)
            timer = undefined;
        },delay)
    }
}

//防抖
function debounce(eventHandler : Function , internal = 200){
    let timer ;
    return function(...params){
        if(timer) clearTimeout(timer);
        timer = setTimeout(()=>{
            eventHandler(...params)
        },internal);
    }
}

@observer
export default class  Index extends React.Component<any, any>{

    state = {
        isLoading :true,
        suspend : new Array(10),
    }



    componentDidMount(): void {
        setTimeout(()=>{
            this.setState({isLoading:false})
        })

        //节流
        window.addEventListener('scroll',throttle(()=>{
            const suspend = this.state.suspend;
            for (let i = 0; i < arrRef.length; i++) {
                const currentRef = arrRef[i].current
                if (currentRef?.offsetTop + 200<= window.scrollY + window.innerHeight) {
                    suspend[i] = true;
                }else{
                    suspend[i] = false;
                }

            }
            this.setState({suspend})
        },200),false)

    }

    render() {
        const {isLoading,suspend} =this.state;
    /**animationOut没啥用在这里*/
        return (
            <Preload  isLoading={isLoading} >
               <Animated   animationIn={'fadeIn'} animationOut={'fadeOut'} isVisible={true} animationInDuration={1600}
                         animationOutDuration={600}>
                   <div className={styles.wrapper}>
                       <div className={styles.wrapper_mainScreen}>
                           {/*根据padding撑开父元素, 容纳整个背景图片*/}
                           <div className={styles.wrapper_mainScreen_extend}/>
                           <div className={styles.wrapper_mainScreen_titleBox}>
                              <div className={styles.wrapper_mainScreen_titleBox_title}>案例测试集</div>
                              <div className={styles.wrapper_mainScreen_titleBox_subTitle}>Case Test Set</div>
                          </div>
                       </div>
                       <div style={!!suspend[0] ? {transform:'translateY(0px)',opacity:1} : {}} ref={arrRef[0]} className={styles.wrapper_box} >
                           <div className={styles.wrapper_box_title}>
                               <a href={'https://github.com/xiangyuecn/Recorder'}>点击下方按钮唤醒本地.exe文件</a>
                               <div className={styles.wrapper_box_btn} onClick={debounce(()=>{
                                   window.location.href ='BoYiCap://'
                               },200)}>WakeUp</div>
                           </div>
                       </div>


                       <div style={!!suspend[1] ? {transform:'translateY(0px)',opacity:1} : {}} ref={arrRef[1]}   className={styles.wrapper_box} >
                           <div className={styles.wrapper_box_title}>
                               <a href={'https://github.com/xiangyuecn/Recorder'}>自定义音乐播放波纹</a>
                           </div>
                           <div style={styles.wrapper_musicWave}>
                                <MusicWave />
                           </div>
                       </div>

                       <div style={!!suspend[2] ? {transform:'translateY(0px)',opacity:1} : {}} ref={arrRef[2]}   className={styles.wrapper_box} >
                           <div className={styles.wrapper_box_title}>
                               <a>视频截取</a>
                           </div>
                            <VideoEditor/>
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