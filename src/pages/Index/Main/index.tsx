import React from "react";
import styles from './index.scss'
import {Animated} from 'react-animated-css'

export default class  Index extends React.Component<any, any>{

    render() {
        return (
                <div className={styles.wrapper} onClick={()=>window.location.href='/Px2rem'}>
                   子页面
                </div>
        )
    }
}