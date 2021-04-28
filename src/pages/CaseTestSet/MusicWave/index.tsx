import React from "react";
import styles from './index.scss'
import {observer} from "mobx-react";
import classNames from "classnames";



@observer
export default class Index extends React.Component<any, any>{

    state = {
        isPlaying : false
    }
    //canvas
    canvasCtx : any = React.createRef();

    //canvasContext  2d
    canvasContext  ;

    //audioContext
    audioCtx ;
    // 分析器
    analyser;
    //TypedArray
    dataArray ;

    handleClick = ()=>{
        this.setState({isPlaying:true})

        //创建AudioContext
        const AudioContext = window.AudioContext;
        const ctx = new AudioContext();
        this.audioCtx = ctx;
        //创建AnalyserNode
        const analyser = ctx.createAnalyser();

        this.analyser = analyser;
        analyser.fftSize = 1024;

        //获取音频源
        const audio : any  = document.getElementById('audio');
        audio.play();

        const source = ctx.createMediaElementSource(audio);

        // 将音频源关联到分析器
        source.connect(analyser);

        // 将分析器关联到输出设备（耳机、扬声器）
        analyser.connect(ctx.destination);

        //获取频率数组
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        this.dataArray = dataArray;

        this.renderFrame();
    }

    /*初始化canvas*/
    componentDidMount(): void {
        // canvas
        const  canvasRef = this.canvasCtx.current;
        const canvasContext = canvasRef.getContext('2d');
         this.canvasContext = canvasContext;
        const barWidth = canvasRef.width / 512 * 1.5 * 1.4;
        for (let i = 0, x = 0; i < 512; i++) {
            // 根据每个矩形高度映射一个背景色
            // 绘制一个矩形，并填充背景色
            const barHeight = 100 + Math.floor(Math.random() * 80);
            // 根据每个矩形高度映射一个背景色
            const  linearGradient = canvasContext.createLinearGradient(x,canvasRef.height,x,0);
            linearGradient.addColorStop(0,'#03a9f4');
            linearGradient.addColorStop(0.25,'#f441a5');
            linearGradient.addColorStop(0.5,'#ffeb3b');
            linearGradient.addColorStop(1,'#03a9f4');

            // 绘制一个矩形，并填充背景色
            this.canvasContext.fillStyle = linearGradient;
            this.canvasContext.fillRect(x, canvasRef.height - barHeight , barWidth, barHeight);
            x += barWidth -1;
        }
    }

   //取消animationFrame
    animationFrameID ;

    /*renderCanvas*/
   renderFrame = ()=> {
       //https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame
        this.animationFrameID = requestAnimationFrame(this.renderFrame);

       const  canvasRef = this.canvasCtx.current;

       this.canvasContext.clearRect(0, 0, canvasRef.width, canvasRef.height);

        // 更新频率数据
       this.analyser.getByteFrequencyData(this.dataArray);

       let barWidth = canvasRef.width / this.dataArray.length  * 1.5  * 1.4 ;

       let barHeight;

        // bufferLength表示柱形图中矩形的个数
        for (let i = 0, x = 0; i < this.dataArray.length ; i++) {
            // 根据频率映射一个矩形高度
            barHeight = this.dataArray[i];

            // 根据每个矩形高度映射一个背景色
            // 根据每个矩形高度映射一个背景色
            const  linearGradient = this.canvasContext.createLinearGradient(x,canvasRef.height,x,0);

            linearGradient.addColorStop(0,'#03a9f4');
            linearGradient.addColorStop(0.25,'#f441a5');
            linearGradient.addColorStop(0.5,'#ffeb3b');
            linearGradient.addColorStop(1,'#03a9f4');
            // 绘制一个矩形，并填充背景色
            this.canvasContext.fillStyle = linearGradient;
            this.canvasContext.fillRect(x, canvasRef.height - barHeight, barWidth , barHeight);


            //负数叠起来了
            x += barWidth -1;
        }
    }

    componentWillUnmount(): void {
       /*取消animationFrame*/
       cancelAnimationFrame(this.animationFrameID)
    }

    render(): React.ReactNode {
       const {isPlaying} = this.state;

        return (
            <div className={styles.wrapper} >
                <canvas  width={document.documentElement.clientWidth / 1920  * 1800  } height={400} ref={this.canvasCtx} id={'canvas'}> </canvas>
                {/*使用classnames定义多个class*/}
                {!isPlaying && <div   className={classNames({
                    'index_btn' : true,
                    [`${styles.wrapper_btn}`] : true
                })} onClick={this.handleClick}>Play</div>}
                <audio hidden id={'audio'} controls crossOrigin={'anonymous'} src="//m8.music.126.net/21180815163607/04976f67866d4b4d11575ab418904467/ymusic/515a/5508/520b/f0cf47930abbbb0562c9ea61707c4c0b.mp3?infoId=92001" />
            </div>
        )
    }
}
