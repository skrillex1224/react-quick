// import React from "react";
// import {observer} from "mobx-react";
// import styles from './index.scss'
// import mp3 from '../../assets/testResources/467015.mp3'
// import mp4 from '../../assets/testResources/clip.mp4'
//
//
// var video : HTMLVideoElement
// var media ;
// var mediaRecorder ;
//
// var recordedChunks = [];
//
// @observer
// export default class Index extends React.Component<any, any>{
//
//     handle = ()=>{
//         var options = { mimeType: "video/webm; codecs=vp9" };
//
//         /*混合音频*/
//         const audio =  document.getElementById('my-audio');
//         // @ts-ignore
//         const audioTracks = audio.captureStream(20).getAudioTracks();
//
//         const videoRep =  document.getElementById('my-video-2');
//         // @ts-ignore
//         const videoStream = videoRep.captureStream(60);
//         console.log(videoStream)
//
//         const videoTracks = videoStream.getVideoTracks();
//         // @ts-ignore
//         audio.play();
//         // @ts-ignore
//         videoRep.play();
//
//         videoRep.onplay= ()=>{
//             console.log('---------')
//             // @ts-ignore
//             mediaRecorder = new MediaRecorder(videoStream, options);
//             mediaRecorder.ondataavailable = e =>{
//                 const chunk = e.data
//                 console.log(chunk)
//                 console.log(URL.createObjectURL(chunk));
//             }
//             mediaRecorder.start();
//         }
//
//
//     }
//
//     componentDidMount(): void {
//
//         video = document.querySelector('#my-video');
//         var option = {video:{
//             width:{
//                 ideal : 640
//              },height:{
//                 ideal :  480
//               }}};
//         media =  navigator.mediaDevices.getUserMedia(option);
//
//         media.then((stream)=>{
//             video.srcObject = stream;
//
//             var options = { mimeType: "video/webm; codecs=vp9" };
//
//             video.onloadedmetadata = ()=>video.play()
//
//
//             /*混合音频*/
//             const audio =  document.getElementById('my-audio');
//             // @ts-ignore
//             const audioTracks = audio.captureStream(20).getAudioTracks();
//
//             //@ts-ignore
//             audio.play()
//
//             let combined = new MediaStream([...stream.getVideoTracks(),...audioTracks]);
//
//             //@ts-ignore
//             mediaRecorder = new MediaRecorder(combined,options);
//             mediaRecorder.ondataavailable = e =>{
//                 const chunk = e.data
//                 console.log(chunk)
//
//                 recordedChunks.push(chunk)
//                 // console.log(URL.createObjectURL(chunk));
//             }
//             mediaRecorder.start();
//
//             // this.handle()
//
//
//         }).catch((error)=>{console.log(error)});
//     }
//
//     render(): React.ReactNode {
//         return (
//             <div onClick={()=>{
//             }}  className={styles.wrapper} >
//                 <audio  id='my-audio' src={mp3}/>
//
//                 <video  id="my-video" controls={false} width={640} height={480} crossOrigin="anonymous" />
//                 {/*<video  id="my-video-2" controls={true} width={640} height={480} crossOrigin="anonymous" src={mp4}/>*/}
//                 <div className={'index_btn'} onClick={()=>{
//                     video.play()
//                     mediaRecorder.resume();
//
//                 }}>播放</div>
//                 <div  className={'index_btn'} onClick={()=>{
//                     video.pause();
//                     mediaRecorder.pause();
//                     mediaRecorder.requestData();
//                 }}>暂停</div>
//                 <div className={'index_btn'}   onClick={()=>{
//                     video.pause();
//                     mediaRecorder.stop()
//
//                     var blob = new Blob(recordedChunks, {
//                         type: "video/webm"
//                     });
//                     var url = URL.createObjectURL(blob);
//                     var a = document.createElement("a");
//                     document.body.appendChild(a);
//                     a.href = url;
//                     a.target='_blank'
//                     a.click();
//                 }}>停止</div>
//                 <div className={'index_btn'}   onClick={this.handle}>测试合成</div>
//             </div>
//         )
//     }
// }

import React from "react";
import {observer} from "mobx-react";
import styles from './index.scss'
import mp3 from '../../assets/testResources/467015.mp3'
import mp4 from '../../assets/testResources/clip.mp4'
import Preload from '../../components/Preload'
import {CloseCircleOutlined} from '@ant-design/icons'

/*视频未加载完成前加锁*/
const  lock  = true;

/*录制结果合集*/
const recordedChunks = [];

/*加锁方法*/
function lockerDetection(callback) {
    if(lock) return ;
    callback();
}


@observer
export default class Index extends React.Component<any, any>{
    videoRefObject : any  = React.createRef();

    async componentDidMount(){
        await this.getUserMedia();
    }

    getUserMedia = async  ()=>{
        /*使用constraints来指定获取摄像头视频流的高宽*/
        const rem  = parseInt(document.documentElement.style.fontSize);
        const constraints = {video : {width:{},height:{exact:  500 }}}
        const videoContext = this.videoRefObject.current;
        try {
            //获取视频流
            const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
            console.log(mediaStream)
            videoContext.srcObject = mediaStream;

            videoContext.onloadedmetadata = function(){
                this.play();
                this.lock = false;
            }

        } catch (e) {
            console.log(e);
        }

    }

    handleStart = ()=>{

    }

    render(): React.ReactNode {
        return (
                <div className={styles.wrapper} >
                    <audio  id='my-audio' src={mp3} />
                    <div className={styles.wrapper_video}>
                        <video ref={this.videoRefObject} className={styles.wrapper_video_content}  id="my-video" controls={false}  />
                    </div>
                    <div className={styles.wrapper_chunks}>

                        {
                            [1,1,1,1,,1,1,1,1,1,1,1,1,1,1,1,1,1,].map(()=>(
                                <div className={styles.wrapper_chunks_videoItem}>
                                    <div className={styles.wrapper_chunks_videoItem_delete}><CloseCircleOutlined /></div>
                                    <video className={styles.wrapper_chunks_videoItem_videoContent} controls={true} src={'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4'} />
                                 </div>
                            ))
                        }
                    </div>
                    <div className={styles.wrapper_ops}>
                        <div onClick={this.handleStart} className={styles.wrapper_ops_btn}>开始录制</div>
                        <div className={styles.wrapper_ops_btn}>暂停录制</div>
                        <div className={styles.wrapper_ops_btn}>继续录制</div>
                        <div className={styles.wrapper_ops_btn}>结束录制</div>
                        <div className={styles.wrapper_ops_btn}>插入音乐</div>
                    </div>
                </div>
        )
    }
}