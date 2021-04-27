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
    constructor(props) {
        super(props);
        makeObservable(this)
    }

    //当前整个scrollBar 平移的距离
    @observable
    translateX : number =  0

    //节流 并判断是否在点击, 同设置所有图片是否可拖动, 当拖动大框滑动时禁用拖动
    @observable
    isMouseDown = false;

    // 记录鼠标按下时的clientX
    onMouseDownX = 0;

    //记录鼠标按下时的translateX
    onMouseDownTranslateX = 0;


    //滚动的div
    scrollContainer :any  = React.createRef();

    //包裹滚动div的wrapper
    scrollWrapper : any = React.createRef();

    state = {
        srcList : [],
    }

    componentDidMount(): void {
        const srcList = [];
        for (let i = 0; i < 20; i++) {
            srcList.push(reactLogo);
        }
        this.setState({srcList});

    }

    //节流
    throttle = (eventHandler : Function,duration = 300)=>{
        let timer ;
        return (e)=>{
            if(timer || !this.isMouseDown) return ;
            timer = setTimeout(()=>{
                eventHandler(e)
                timer =  null;
            },duration)
        }
    }

    handleScrollStart = (e)=>{
        //记录按下时
        const x = e.clientX;
        this.onMouseDownX =  x;
        this.onMouseDownTranslateX = this.translateX;

        //设置鼠标被按下
        this.isMouseDown = true;
        e.preventDefault()
        console.log('dsadasd')
    }

    handleScrolling = (e)=>{
        const x = e.clientX;
        //和初始位置的差值,即要改变的值
        let minx = x - this.onMouseDownX


        console.log(this.onMouseDownTranslateX +  minx,  )
        //防止越界
        //这个值this.onMouseDownTranslateX +  minx  就是 改变后的translateX , 所以判定这个值
        if(this.onMouseDownTranslateX +  minx > 0) return ;
        if(Math.abs(this.onMouseDownTranslateX +  minx) - 10 > this.scrollContainer.current.scrollWidth  - this.scrollWrapper.current.clientWidth) return ;



        this.translateX = this.onMouseDownTranslateX +  minx;
        e.preventDefault()
    }

    /*将up事件绑定给最外层的,保证全部拖动有效*/
    handleScrollEnd = (e)=>{
        this.isMouseDown = false;
        e.preventDefault()
        console.log('up')
    }

    preventDefaultMethod = (e)=>e.preventDefault();

    render(): React.ReactNode {
        const {srcList,} = this.state;
        return (
            <div onMouseUp={this.handleScrollEnd}  className={styles.wrapper}>
                <div className={styles.wrapper_drawWrapper}>
                    {/*overflow:hidden 如果设置内边距,内边距上的内容依旧会显示,所以为了有padding效果,加格这个  https://segmentfault.com/q/1010000021907068*/}
                    {/*禁用默认行为一禁用就要禁用一整套方法*/}
                    <div ref={this.scrollWrapper} onMouseMove={this.throttle(this.handleScrolling,10)}  onMouseDown={this.handleScrollStart}
                         onMouseUp={this.preventDefaultMethod} className={styles.wrapper_drawWrapper_padding}>
                        <div style={{transform:`translateX(${this.translateX}px)`}} ref={this.scrollContainer}
                             className={styles.wrapper_drawWrapper_drawList} >
                            {srcList.map((item,index)=>(
                                <img onDrag={()=>alert('sadasd')}  draggable  src={item}  className={styles.wrapper_drawWrapper_drawList_waterMark} key={index} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}