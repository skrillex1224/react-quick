import React from "react";
import {observer} from "mobx-react";
import styles from './index.scss'
import markBg from '../../../assets/caseTestSet/waterMark_bg.png'
import message from '../../../components/message'
import reactLogo from '../../../assets/react.png'
import {Animated} from 'react-animated-css'
import {ArrowsAltOutlined, CloseOutlined, DeleteOutlined, RotateRightOutlined} from "@ant-design/icons/lib";

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
         offsetY:0,
     }

     state = {
         srcList :[],
         dragEntered : false,
         //所有水印小组件
         waterMarkList : [ ]
     }
    componentDidMount(): void {
         const srcList = this.state.srcList;
        for (let i = 0; i < 7; i++) {
            srcList.push(reactLogo);
        }
        this.setState({srcList});
    }

    handleDragEnter = (e)=>{
        e.preventDefault();
    }

    handleDragLeave = (e)=>{
        e.preventDefault();
    }

    handleDragOver = (e)=>{
        e.preventDefault();
    }

    handleDrop = (e)=>{
         //获取src
         const imgSrc = e.dataTransfer.getData('image/png');
         if(!imgSrc) return ;

         //判断着陆位置是图片而非其他的waterMark
        //如果不是lander 则return
        if(!e.target.id){
            message.error('放置位置重叠，请重试', 1000)
            return ;
        }

        let {waterMarkList} = this.state;

        //获取鼠标的最后位置
        const offsetX = e.nativeEvent.offsetX ;
        const offsetY = e.nativeEvent.offsetY;

         //根据初始偏移和现在鼠标的位置，计算图片真正该放置的位置
         let trueX = offsetX - this.onDragStartOffsets.offsetX
         let trueY = offsetY - this.onDragStartOffsets.offsetY;

         //防止越界
        if(trueX <0) trueX = 0;
        if(trueY <0) trueY = 0;


        const imgComponent =(
                <div  style={{left:`${trueX}px`,top:`${trueY}px`}} className={styles.imgComponent} >
                    {/*传入对应元素在数组的下标*/}
                    <div  onClick={this.handleDeleteClick(waterMarkList.length)} className={styles.imgComponent_delete}><CloseOutlined /></div>
                    <div  onClick={this.handleResizeClick(waterMarkList.length)} className={styles.imgComponent_resize}><ArrowsAltOutlined /></div>
                    <div  onClick={this.handleRotateClick(waterMarkList.length)} className={styles.imgComponent_rotate}> <RotateRightOutlined /></div>
                    <img src={imgSrc} className={styles.imgComponent_img}  />
                </div>
        )

        waterMarkList = [...waterMarkList,imgComponent];

        e.preventDefault();

        this.setState({waterMarkList})
    }

    handleResizeClick = (index)=>{
         return ()=>{

         }
    }

    handleRotateClick = (index)=>{
         return (e)=>{
            console.log(e.target)
         }
    }

    handleDeleteClick = (index)=>{
         /*闭包*/
         return ()=>{
             const waterMarkList = this.state.waterMarkList;
             waterMarkList.splice(index,1);
             this.setState({waterMarkList})
         }
    }

    handleDragEnd = (e)=>{
        this.setState({dragEntered:false})
    }

    handleDragStart = (e)=>{
        const offsetX = e.nativeEvent.offsetX;
        const offsetY = e.nativeEvent.offsetY;
        //设置初始偏移
        this.onDragStartOffsets = {
            offsetX,
            offsetY
        }

        //设置模糊
        this.setState({dragEntered:true})
        //设置数据
         e.dataTransfer.setData('image/png',reactLogo)
    }

    render(): React.ReactNode {
        const {srcList,dragEntered,waterMarkList} = this.state;
        return (
            <div  className={styles.wrapper}>
                <div id={'img-container'} onDragEnter={this.handleDragEnter} onDragOver={this.handleDragOver} onDragLeave={this.handleDragLeave} onDrop={this.handleDrop}
                     style={dragEntered ?{border:'2px dashed #fffa',filter:'blur(1px) opacity(.8)'} : {}}  className={styles.wrapper_imgContainer} >
                    <img id={'lander'} className={styles.wrapper_imgContainer_imgBg} src={markBg}/>
                    {
                        waterMarkList.map((item)=>(
                            item
                        ))
                    }
                </div>
                <div className={styles.wrapper_drawWrapper}>
                    {/*overflow:hidden 如果设置内边距,内边距上的内容依旧会显示,所以为了有padding效果,加格这个  https://segmentfault.com/q/1010000021907068*/}
                    {/*禁用默认行为一禁用就要禁用一整套方法*/}
                    {srcList.map((item,index)=>(
                        <img  onDragStart={this.handleDragStart} onDragEnd={this.handleDragEnd}
                             draggable  src={item}  className={styles.wrapper_drawWrapper_waterMark} key={index} />
                    ))}
                </div>
            </div>
        )
    }
}