// import React from "react";
// import {observer} from "mobx-react";
// import styles from './index.scss'
// import mp3 from '../../assets/mediaResources/HOA.mp3'
// import mp4 from '../../assets/mediaResources/clip.mp4'
//
//
// var video : HTMLVideoElement
// var media ;
// var mediaRecorder ;
//
// var recordedChunks = [];
//
// @observer
// export default class CaseTestSet extends React.Component<any, any>{
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
//                 const aLink = document.createElement('a');
//                 aLink.href = URL.createObjectURL(chunk);
//
//
//                 aLink.target = '_blank';
//                 aLink.click();
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
import ReactDOM from "react-dom";
import {observer} from "mobx-react";
import styles from './index.scss'
import mp3 from '../../../assets/mediaResources/HOA.mp3'
import {CloseCircleOutlined} from '@ant-design/icons'
import message from '../../../components/message'
import classNames from "classnames";

/*视频未加载完成前加锁*/
let  lock  = true;

/*加锁方法*/
function lockerDetection(callback) {
    return ()=>{
        if(lock) return ;
        callback();
    }
}

/**
 * 开始录制 : 进行视频录制
 * 暂停/继续录制  : 进行一段视频的暂停或开始
 * 结束录制 :  停止一段视频的录制
 *
 * 合并视频: 将多个视频通过new Blob 进行合并
 *
 */
@observer
export default class Index extends React.Component<any, any>{
    videoRefObject : any  = React.createRef();

    videoStream : MediaStream= null;

    //@ts-ignore
    videoRecorder : MediaRecorder = null;

    /*开始录像*/
    handleMountThisModule =async  ()=>{
        this.setState({isStart:true})
        await  this.getUserMedia();
    }

    state = {
        recordedChunks : [],
        isStart : false
    }

    getUserMedia = async  ()=>{
        /*使用constraints来指定获取摄像头视频流的高宽 {video : {width:{},height:{exact:  500 }}}*/
        const constraints = {video : {height:500}}
        const videoContext = this.videoRefObject.current;

        try {
            //获取视频流
            const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
            videoContext.srcObject = mediaStream;
            this.videoStream = mediaStream;

            //创建录制对象
            const options = { mimeType: "video/webm" };
            //@ts-ignore
            const recorder = new MediaRecorder(mediaStream,options);
            this.videoRecorder = recorder;
            //绑定监听事件
            this.videoRecorder.ondataavailable = (event)=>{
                const chunk = event.data;
                this.setState((state)=>{
                    /*注意: 单单使用包含已经录制好媒体切片的Blobs 将大可不能单独播放. 媒体在重放之前需要重新组装 .
                    * 所以要进行视频裁剪,但是视频剪辑又不太能写, 所以可以通过控制video标签的进度条来实现
                    *
                    * 但是目前实现的是录制多段blob,将多端blob进行合并, 虽然blob不能分割, 但是合并总是可以的*/
                    return {recordedChunks: [...state.recordedChunks,chunk]}
                })
            }

            videoContext.onloadedmetadata = function(){
                this.play();
                lock = false;
            }

        } catch (e) {
            console.log(e);
        }

    }

    handleStart = ()=>{
        const state = this.videoRecorder.state;


        if(state === 'inactive'){
            this.videoRecorder.start();
            console.log(this.videoRecorder)
            console.log('start...')
            message.warn('录制开始',1000);
        }else{
            message.error('录制已经开始',1000);
        }

    }

    handleResume = ()=>{
        const state =this.videoRecorder.state;
        if(state === 'paused'){
            this.videoRecorder.resume();
            message.warn('录制继续',1000);
            console.log('resume.....')
        }else{
            message.error('录制已经开始',1000);
        }

    }

    handlePause = ()=>{
        const state =this.videoRecorder.state;
        if(state === 'recording'){
            this.videoRecorder.pause();
            //调用以下方法 将会截取一段ondataavailable
            // this.videoRecorder.requestData();
            console.log('pause.....')
            message.warn('录制暂停',1000);
        }else{
            message.error('录制已经暂停',1000);
        }
    }

    handleStop = ()=>{
        const state =this.videoRecorder.state;
        if(state === 'recording'){
            this.videoRecorder.stop();
            message.warn('录制结束',1000);
        }else{
            message.error('录制已经结束',1000);
        }
    }

    componentWillUnmount(): void {
        if(!this.state.isStart) return
        //暂停视频
        this.videoRefObject.current.pause()

        //关闭录像
        const state =this.videoRecorder.state;
        if(state === 'recording'){
            this.videoRecorder.stop();
        }

        //停止mediaStream流
        /*关闭视频流*/
        this.videoStream.getTracks().forEach(item=>item.stop())
    }

    mergeVideo =()=>{
        const {recordedChunks} = this.state;
        const url  = URL.createObjectURL(new Blob(recordedChunks, { 'type' : 'video/webm' }))
        message.warn('合并结果：' +  url ,10000);
    }

    render(): React.ReactNode {
        const {recordedChunks,isStart} = this.state;

            return (
                <div  className={styles.wrapper} >
                    {/*蒙层*/}
                    {isStart ||  <div className={styles.isStartWrapper}>
                        <div onClick={this.handleMountThisModule} className={classNames({
                            'index_btn': true,
                            [`${styles.isStartWrapper_btn}`]: true
                        })}>Start
                        </div>
                    </div>}

                    <audio  id='my-audio' src={mp3} />
                    <div className={styles.wrapper_video}>
                        <video ref={this.videoRefObject} className={styles.wrapper_video_content}  id="my-video" controls={false}  />
                    </div>
                    <div className={styles.wrapper_chunks}>

                        {
                            recordedChunks.length ?
                                recordedChunks.map((item,index)=> {
                                    //释放上一次的资源
                                    URL.revokeObjectURL(item);
                                    return (<div key={index} className={styles.wrapper_chunks_videoItem}>
                                        <div className={styles.wrapper_chunks_videoItem_delete}><CloseCircleOutlined/></div>
                                        <video className={styles.wrapper_chunks_videoItem_videoContent} controls={true} src={URL.createObjectURL(item)}/>
                                    </div>)
                                })
                                :
                                <div className={styles.wrapper_chunks_empty}>暂无数据 <br/> （待合成视频列表）</div>
                        }
                    </div>
                    <div className={styles.wrapper_ops}>
                        <div onClick={lockerDetection(this.handleStart)} className={styles.wrapper_ops_btn}>开始录制</div>
                        <div onClick={lockerDetection(this.handleResume)}  className={styles.wrapper_ops_btn}>继续录制</div>
                        <div onClick={lockerDetection(this.handlePause)}  className={styles.wrapper_ops_btn}>暂停录制</div>
                        <div onClick={lockerDetection(this.handleStop)}  className={styles.wrapper_ops_btn}>结束录制</div>
                        <div onClick={this.mergeVideo} className={styles.wrapper_ops_btn}>合并录制结果</div>
                    </div>
                </div>
            )
        }
}