import React from "react";
import {observer} from "mobx-react";
import styles from './index.scss'



@observer
export default class Index extends React.Component<any, any>{
    componentDidMount(): void {
        var video : HTMLVideoElement = document.querySelector('#my-video');
        var option = {video:{
            width:{
                ideal : 640
             },height:{
                ideal :  480
             }}};
        var media = navigator.mediaDevices.getUserMedia(option);

        media.then((stream)=>{
            video.srcObject = stream;

            video.onloadedmetadata = ()=>video.play()

            var options = { mimeType: "video/webm; codecs=vp9" };
            // @ts-ignore
            const mediaRecorder = new MediaRecorder(stream, options);
            mediaRecorder.ondataavailable = e =>{
                const chunk = e.data
                console.log(chunk)
                console.log(URL.createObjectURL(chunk));
            }
            mediaRecorder.start();

            setTimeout(()=>{
                video.pause();
                mediaRecorder.stop();
                stream.getTracks().forEach(track => {
                    track.stop();
                });

                setTimeout(()=>{
                    video.play()
                    // mediaRecorder.start();
                },1000)
            },2000)

        }).catch((error)=>{console.log(error)});
    }

    render(): React.ReactNode {
        return (
            <div className={styles.wrapper} >

                <video id="my-video" controls={false} width={640} height={480} crossOrigin="anonymous" />
            </div>
        )
    }
}