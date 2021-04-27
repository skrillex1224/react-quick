import React from "react";
import PreLoad from '../../../components/Preload'
import styles from './index.scss'
import Recorder from 'recorder-core'
import 'recorder-core/src/engine/mp3.js'
import 'recorder-core/src/engine/mp3-engine.js'
import 'recorder-core/src/extensions/frequency.histogram.view.js'
import 'recorder-core/src/extensions/waveview.js'
import 'recorder-core/src/extensions/lib.fft.js'
import {observer} from "mobx-react";

var bgmBuffer=new Int16Array();

var load=function(){
    var xhr=new XMLHttpRequest();
    xhr.onloadend=function(){
        if(xhr.status==200){
            console.log(xhr.response)
            const arrayBuffer = xhr.response;
            console.log(arrayBuffer)
            let array = Array.prototype.slice.call(new Uint8Array(arrayBuffer ));
            let newArr = new Int16Array(array);

            const  set={
                // elem:"#container" //自动显示到dom，并以此dom大小为显示大小
                //或者配置显示大小，手动把frequencyObj.elem显示到别的地方
                //以上配置二选一

                width: document.body.clientWidth -100,
                height: 400
                ,scale:1 //缩放系数，应为正整数，使用2(3? no!)倍宽高进行绘制，避免移动端绘制模糊

                ,fps:20 //绘制帧率，不可过高

                ,lineCount:10000  //直方图柱子数量，数量的多少对性能影响不大，密集运算集中在FFT算法中
                ,widthRatio: 1 //柱子线条宽度占比，为所有柱子占用整个视图宽度的比例，剩下的空白区域均匀插入柱子中间；默认值也基本相当于一根柱子占0.6，一根空白占0.4；设为1不留空白，当视图不足容下所有柱子时也不留空白
                ,spaceWidth: 0 //柱子间空白固定基础宽度，柱子宽度自适应，当不为0时widthRatio无效，当视图不足容下所有柱子时将不会留空白，允许为负数，让柱子发生重叠
                ,minHeight:0 //柱子保留基础高度，position不为±1时应该保留点高度
                ,position:0 //绘制位置，取值-1到1，-1为最底下，0为中间，1为最顶上，小数为百分比
                ,mirrorEnable:true //是否启用镜像，如果启用，视图宽度会分成左右两块，右边这块进行绘制，左边这块进行镜像（以中间这根柱子的中心进行镜像）

                ,stripeEnable:false //是否启用柱子顶上的峰值小横条，position不是-1时应当关闭，否则会很丑
                ,stripeHeight:3 //峰值小横条基础高度
                ,stripeMargin:6 //峰值小横条和柱子保持的基础距离

                ,fallDuration:1000 //柱子从最顶上下降到最底部最长时间ms
                ,stripeFallDuration:3500 //峰值小横条从最顶上下降到底部最长时间ms

                //柱子颜色配置：[位置，css颜色，...] 位置: 取值0.0-1.0之间
                ,linear:[0,"#9254de",0.5,"#40a9ff",1,"#bae637"]
                //峰值小横条渐变颜色配置，取值格式和linear一致，留空为柱子的渐变颜色
                ,stripeLinear: null

                ,shadowBlur: 0 //柱子阴影基础大小，设为0不显示阴影，如果柱子数量太多时请勿开启，非常影响性能
                ,shadowColor:"#bbb" //柱子阴影颜色
                ,stripeShadowBlur:-1 //峰值小横条阴影基础大小，设为0不显示阴影，-1为柱子的大小，如果柱子数量太多时请勿开启，非常影响性能
                ,stripeShadowColor:"" //峰值小横条阴影颜色，留空为柱子的阴影颜色
                //当发生绘制时会回调此方法，参数为当前绘制的频率数据和采样率，可实现多个直方图同时绘制，只消耗一个input输入和计算时间
                ,onDraw:function(frequencyData,sampleRate){}
            }
            var wave;
            var rec;
            var index = 0
            rec=Recorder({
                onProcess:function(buffersBak,powerLevel,bufferDuration,bufferSampleRate){
                    // console.log(buffersBak)
                    wave.input(newArr,powerLevel,bufferSampleRate);//输入音频数据，更新显示波形
                }
            });
            rec.open(function(){
                wave=Recorder.FrequencyHistogramView(set); //创建wave对象，写这里面浏览器妥妥的
                const container = document.querySelector("#container");
                // console.log(container)
                container.append(wave.canvas)
                rec.start();
            });

        }else{
        };
    };
    xhr.open("GET","../../assets/467015.mp3",true);
    //xhr.timeout=16000;
    xhr.responseType="arraybuffer";
    xhr.send();
};





@observer
export default class Index extends React.Component<any, any>{
    componentDidMount(): void {
        load()
    }

    render() {
        return (
            <div className={styles.wrapper}>
                <div id='container' className={styles.wrapper_container}></div>
            </div>
        )
    }
}

