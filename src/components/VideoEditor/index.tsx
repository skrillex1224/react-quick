import React from "react";
import {observer} from "mobx-react";
import styles from "./index.scss"
import mp4 from '../../assets/clip.mp4'

function calcDotPosition(clientX,offsetLeft,width) {
    const offsetRight = offsetLeft + width;

    if(offsetRight < clientX) return width;
    if(offsetLeft > clientX) return 0;
    return clientX - offsetLeft;
}

function calcVideoCurrent(dotPosition,width,duration){
    return Math.floor(duration *  (dotPosition / width))
}

@observer
export default class Index extends React.Component<any, any>{
    videoRef :any = React.createRef();

    positionEle : any = React.createRef();

    state = {
        left : 0,
        right: 100,
        duration : 1,
    }

    handleDrag =(event)=>{
        const parent = this.positionEle?.current;
        const videoContext = this.videoRef?.current;

        const left = calcDotPosition(event.clientX,parent.offsetLeft,parent.clientWidth)

        //解决闪回0的问题
        if(left === 0) return ;


        // 防止越界
        if(left +12 > this.state.right){
            return
        }

        videoContext.currentTime = calcVideoCurrent(left,parent.clientWidth,this.state.duration);
        console.log(videoContext.currentTime)
        videoContext.play()
        this.setState({left})

    }


    handleDragEnd =(event)=>{
        const parent = this.positionEle?.current;
        const videoContext = this.videoRef?.current;

        const left = calcDotPosition(event.clientX,parent.offsetLeft,parent.clientWidth)

        // 防止越界
        if(left +12 > this.state.right){
            return
        }

        videoContext.currentTime = calcVideoCurrent(left,parent.clientWidth,this.state.duration);
        this.setState({left })
    }

    handleDragRight =(event)=>{
        const parent = this.positionEle?.current;

        const right = calcDotPosition(event.clientX,parent.offsetLeft,parent.clientWidth)

        if(right === 0) return ;

        this.setState({right})

    }

    handleDragEndRight =(event)=>{
        const parent = this.positionEle?.current;
        this.setState({right : calcDotPosition(event.clientX,parent.offsetLeft,parent.clientWidth) })
    }

    handleVideoOnload = ()=>{
        const duration = Math.floor(this.videoRef.current.duration)
        this.setState({duration})
    }

    handleVideoPlaying = ()=>{
        const videoContext = this.videoRef.current;
        const parent = this.positionEle?.current;

        if(videoContext?.currentTime > calcVideoCurrent(this.state.right,parent.clientWidth,videoContext.duration)){
            videoContext.pause()
        }
    }

    render(): React.ReactNode {
        const {left,right,duration} = this.state;
        const width = this.positionEle.current?.clientWidth || 0;
        console.log(width)
        return (
            <div className={styles.wrapper}>
                {/*当video加载完后 ,用的是onloadData
                   当video时间变化时 onTimeUpdate
                */}
                <video onTimeUpdate={this.handleVideoPlaying} onLoadedData={this.handleVideoOnload} ref={this.videoRef} className={styles.wrapper_videoContainer} autoPlay={true} src={mp4}   controls={true} />
                <div className={styles.wrapper_info}>
                    <span style={{marginRight:20}}>视频总长为：{duration}s</span>
                    <span>您截取的视频区域为：{calcVideoCurrent(left,width,duration)}s 至 {calcVideoCurrent(right,width,duration)}s </span>
                </div>
                <div ref={this.positionEle} className={styles.wrapper_dragger}>
                    <div style={{left}} draggable className={styles.wrapper_dragger_ball}  onDrag={this.handleDrag} onDragEnd={this.handleDragEnd} />
                    <div style={{left:right}} draggable className={styles.wrapper_dragger_ball} onDrag={this.handleDragRight} onDragEnd={this.handleDragEndRight} />
                </div>
            </div>
        )
    }
}
