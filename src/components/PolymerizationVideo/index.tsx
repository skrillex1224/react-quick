import React from "react";
import {observer} from "mobx-react";
import styles from './index.scss'
import mp3 from '../../assets/testResources/467015.mp3'
import mp4 from '../../assets/testResources/clip.mp4'
import Preload from '../../components/Preload'

var video : HTMLVideoElement
var media ;
var mediaRecorder ;

var recordedChunks = [];

@observer
export default class Index extends React.Component<any, any>{

    render(): React.ReactNode {
        return (

                <div className={styles.wrapper} >
                    <audio  id='my-audio' src={mp3} />
                    <div className={styles.wrapper_video}>
                        <video className={styles.wrapper_video_content}  id="my-video" controls={false}  />
                    </div>
                    <div className={styles.wrapper_ops}>
                        <div className={'index_btn'}>开始录制</div>
                        <div className={'index_btn'}>暂停录制</div>
                        <div className={'index_btn'}>继续录制</div>
                        <div className={'index_btn'}>结束录制</div>
                        <div className={'index_btn'}>插入音乐</div>
                    </div>
                </div>

        )
    }
}