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

//解决初始化获取元素宽度为undefined的问题

@observer
export default class Index extends React.Component<any, any>{
    videoRef :any = React.createRef();

    positionEle : any = React.createRef();

    state = {
        left : 0,
        right: 100,
        duration : 1,
        parentWidth: 0,
        videoCurTime:0
    }

    askTillNotNull= ()=>{
        setTimeout(()=>{
            const parentWidth = this.positionEle.current?.offsetWidth

            if(!parentWidth){
                this.askTillNotNull();
                return ;
            }
            this.setState({parentWidth})
        },10)
    }

    componentDidMount(): void {
        /*使用react Suspend 和 lazy  在页面刚挂载时直接获取数据为undefined 所以要改成异步*/
        this.askTillNotNull();
    }n

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

        const videoCurTime = Math.floor(this.videoRef.current?.currentTime);
        this.setState({videoCurTime})

        //这边不能Math.floor
        if(this.videoRef.current?.currentTime > calcVideoCurrent(this.state.right,parent.clientWidth,videoContext.duration)){
            videoContext.pause()
        }
    }

    render(): React.ReactNode {
        const {left,right,duration,parentWidth,videoCurTime} = this.state;
        // const width = this.positionEle.current?.clientWidth || 0;
        //
        // console.log(width,this.positionEle.current?.clientWidth)
        return (
            <div className={styles.wrapper}>
                {/*当video加载完后 ,用的是onloadData
                   当video时间变化时 onTimeUpdate
                   video的宽高width height 属性也是css像素
                */}
                <video onTimeUpdate={this.handleVideoPlaying} onLoadedData={this.handleVideoOnload} ref={this.videoRef} className={styles.wrapper_videoContainer} autoPlay={true} src={mp4}   controls={true} />
                <div className={styles.wrapper_info}>
                    <span style={{marginRight:20}}>视频总长为：{duration}s</span>
                    <span>您截取的视频区域为：{calcVideoCurrent(left,parentWidth,duration)}s 至 {calcVideoCurrent(right,parentWidth,duration)}s </span>
                    <span>当前视频播放至 : {videoCurTime}s </span>
                </div>
                <div ref={this.positionEle} className={styles.wrapper_dragger}>
                    <div style={{left}} draggable className={styles.wrapper_dragger_ball}  onDrag={this.handleDrag} onDragEnd={this.handleDragEnd} />
                    <div style={{left:right}} draggable className={styles.wrapper_dragger_ball} onDrag={this.handleDragRight} onDragEnd={this.handleDragEndRight} />
                </div>
            </div>
        )
    }
}
