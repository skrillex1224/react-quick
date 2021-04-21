import React from "react";
import {observer} from "mobx-react";
import Preload from '../../components/Preload'
import {Animated} from 'react-animated-css'
import styles from './index.scss';
import {func} from "prop-types";

let arr = [];
for (let i = 2; i < 10; i++) {
    arr.push(i);
}

const arrRef = new Array<any>()

for (let i = 0; i < 10; i++) {
    arrRef[i] = React.createRef();
}

function throttle(eventHandler :Function,delay =200) {
    let timer ;
    return function(...params){
        if(timer) return ;
        timer = setTimeout(()=>{
            eventHandler(...params)
            timer = undefined;
        },delay)
    }
}


@observer
export default class  Index extends React.Component<any, any>{

    state = {
        isLoading :true,
        suspend : new Array(10),
    }



    componentDidMount(): void {
        setTimeout(()=>{
            this.setState({isLoading:false})
        })

        //节流
        window.addEventListener('scroll',throttle(()=>{
            const suspend = this.state.suspend;
            for (let i = 0; i < arrRef.length; i++) {
                const currentRef = arrRef[i].current
                if (currentRef?.offsetTop + 200<= window.scrollY + window.innerHeight) {
                    suspend[i] = true;
                }else{
                    suspend[i] = false;
                }

            }
            this.setState({suspend},()=>{
                console.log(this.state)
            })
        },200),false)

    }

    render() {
        const {isLoading,suspend} =this.state;
    /**animationOut没啥用在这里*/
        return (
            <Preload  isLoading={isLoading} >
               <Animated   animationIn={'fadeIn'} animationOut={'fadeOut'} isVisible={true} animationInDuration={1600}
                         animationOutDuration={600}>
                   <div className={styles.wrapper}>
                       <div className={styles.wrapper_mainScreen}>
                           主屏
                       </div>
                       <div style={!!suspend[0] ? {transform:'translateY(0px)',opacity:1} : {}} ref={arrRef[0]}  onClick={()=>{
                           window.location.href ='BoYiCap://'
                       }}  className={styles.wrapper_box} >
                              点击这里直接唤醒本地.exe文件
                       </div>

                       <div style={!!suspend[0] ? {transform:'translateY(0px)',opacity:1} : {}} ref={arrRef[0]}   className={styles.wrapper_box} >
                           <div className={styles.wrapper_box_title}>
                               自定义音乐播放波纹
                           </div>
                           <div style={styles.draggable}>


                           </div>
                       </div>

                       {
                           arr.map(item=>{
                              return   <div style={!!suspend[item] ? {transform:'translateY(0px)',opacity:1} : {}} id={item} ref={arrRef[item]}   className={styles.wrapper_box} >
                                  {item}
                              </div>
                           })

                       }
                       <div className={styles.wrapper_footer}>
                             Copyright
                       </div>
                   </div>

               </Animated>
            </Preload>
        )
    }
}