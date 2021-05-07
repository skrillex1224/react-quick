import React, {CSSProperties} from "react";
import {observer} from "mobx-react";
import styles from './index.scss'


@observer
export default class Index extends React.Component<any, any>{

    state = {
        transformList : [1,2,3,4,5,6,7,8,9,10,11,12]
    }

    constructor(props) {
        super(props);

    }

    render(): React.ReactNode {
        const {transformList} = this.state;
        const pixel = document.documentElement.clientWidth / 1920 ;
        return (
            <div className={styles.wrapper}>
               <div className={styles.wrapper_container}>
                   {
                       transformList.map((item, index)=>(
                           <div style={{transform : `rotateY(${index * (360 / 12)}deg) translateZ(${600 * pixel}px) `}} className={styles.wrapper_aspect}>
                               {index}
                           </div>
                       ))
                   }
               </div>
            </div>
        )
    }
}