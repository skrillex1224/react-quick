import styles from "./index.scss";
import {debounce} from "../../../utils/throttle";
import copy from "copy-to-clipboard";
import message from "../../../components/message";
import React from "react";


export default class Index extends React.Component<any, any>{
    handleWakeUp = ()=>{
        message.success('唤醒中，请稍等',3000)
        window.location.href ='steam://'
    }

    render(): React.ReactNode {
        return (
            <div className={styles.wrapper}>
                <div className='index_btn' onClick={debounce(this.handleWakeUp,200)}>WakeUp</div>
            </div>
        )
    }
}