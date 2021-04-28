import React from "react";
import {observer} from "mobx-react";
import styles from './index.scss'
import markBg from '../../../assets/caseTestSet/waterMark_bg.png'
import reactLogo from '../../../assets/react.png'
import eventHandler from "jest-circus/build/eventHandler";
import {makeObservable, observable} from "mobx";
/*
拖拽上传
      <div onDragEnter={(e)=>{
            }} onDragOver={(e)=>e.preventDefault()}
                 onDrop={(e)=>{
                e.preventDefault();

                //拿到拖拽文件内容
                console.log(e.dataTransfer.files[0])
            }}  onDragLeave={(e)=>e.preventDefault()} className={styles.wrapper}>
 */


@observer
export default class Index extends React.Component<any, any>{
    //当拖拽开始时,鼠标相对于图片的偏移
     onDragStartOffsets = {
         offsetX:0,
         offsetY:0
     }

     state = {
         srcList :[],
         dragEntered : false,
     }
    componentDidMount(): void {
         const srcList = this.state.srcList;
        for (let i = 0; i < 6; i++) {
            srcList.push(reactLogo);
        }
        this.setState({srcList});
    }

    handleDragEnter = (e)=>{
        this.setState({dragEntered:true})
        e.preventDefault();
    }

    handleDragLeave = (e)=>{
        this.setState({dragEntered:false})
        e.preventDefault();
    }

    handleDragOver = (e)=>{
        e.preventDefault();
    }

    handleDrop = (e)=>{
         this.setState({dragEntered:false})
        //获取鼠标的最后位置
         const offsetX = e.nativeEvent.offsetX;
         const offsetY = e.nativeEvent.offsetY;

         const img = new Image(50,50);
         //获取src
         img.src = e.dataTransfer.getData('image/png');

         //根据初始偏移和现在鼠标的位置，计算图片真正该放置的位置
         let trueX = offsetX - this.onDragStartOffsets.offsetX
         let trueY = offsetY - this.onDragStartOffsets.offsetY;

         //防止越界
        console.log(trueX,trueY)
        if(trueX <0) trueX = 0;
        if(trueY <0) trueY = 0;

        img.style.position ='absolute';
        img.style.left = `${trueX}px`;
        img.style.top = `${trueY}px` ;
        img.style.zIndex = '999';

        const imgContainer = document.getElementById('img-container');
        imgContainer.append(img);

        e.preventDefault();
    }

    handleDragStart = (e)=>{
        const offsetX = e.nativeEvent.offsetX;
        const offsetY = e.nativeEvent.offsetY;
        //设置初始偏移
        this.onDragStartOffsets = {
            offsetX,
            offsetY
        }

        //设置数据
         e.dataTransfer.setData('image/png',reactLogo)
    }

    render(): React.ReactNode {
        const {srcList,dragEntered} = this.state;
        return (
            <div  className={styles.wrapper}>
                <div id={'img-container'} onDragEnter={this.handleDragEnter} onDragOver={this.handleDragOver} onDragLeave={this.handleDragLeave} onDrop={this.handleDrop}
                     style={dragEntered ?{border:'2px dashed #fffa',filter:'blur(1px) opacity(.8)'} : {}}  className={styles.wrapper_imgContainer} >
                    <img className={styles.wrapper_imgContainer_imgBg} src={markBg}/>
                </div>
                <div className={styles.wrapper_drawWrapper}>
                    {/*overflow:hidden 如果设置内边距,内边距上的内容依旧会显示,所以为了有padding效果,加格这个  https://segmentfault.com/q/1010000021907068*/}
                    {/*禁用默认行为一禁用就要禁用一整套方法*/}
                    {srcList.map((item,index)=>(
                        <img onDragStart={this.handleDragStart}
                             draggable  src={item}  className={styles.wrapper_drawWrapper_waterMark} key={index} />
                    ))}
                </div>
            </div>
        )
    }
}