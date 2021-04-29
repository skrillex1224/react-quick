import styles from "./index.scss";
import {debounce} from "../../../utils/throttle";
import copy from "copy-to-clipboard";
import message from "../../../components/message";
import React from "react";


export default class Index extends React.Component<any, any>{
    handleCopy = ()=>{
        /*复制的文本实际上是textarea中的文本, 因为  document.execCommand('copy'); 命令只能用于textarea和input*/
        const textarea : any  = document.getElementById('copy-content')
        //选中文本
        textarea.select();
        document.execCommand('copy');
        message.success('复制成功')
    }

    render(): React.ReactNode {
        return (
            <div className={styles.wrapper}>
                <p >
                    Robbert van de Corput (Dutch pronunciation: [ˈrɔbərt fɑn də ˈkɔrpʏt];[1] born 7 January 1988), known professionally as Hardwell, is a Dutch DJ, record producer, and remixer from Breda, North Brabant.[2] Hardwell was voted the world's number one DJ on DJ Mag in 2013 and
                    again in 2014.[3] He was ranked at number twelve in the top 100 DJs 2019 poll by DJ Mag. Hardwell is best known for his sets at music festivals, including Ultra Music Festival, Sunburn and Tomorrowland
                </p>
                <div  className='index_btn' onClick={debounce(this.handleCopy,200)}>复制文本</div>

                <textarea id='copy-content'  className={styles.wrapper_textarea} value={'Robbert van de Corput (Dutch pronunciation: [ˈrɔbərt fɑn də ˈkɔrpʏt];[1] born 7 January 1988), known professionally as Hardwell, is a Dutch DJ, record producer, and remixer from Breda, North Brabant.[2] Hardwell was voted the world\'s number one DJ on DJ Mag in 2013 and\n' +
                '                    again in 2014.[3] He was ranked at number twelve in the top 100 DJs 2019 poll by DJ Mag. Hardwell is best known for his sets at music festivals, including Ultra Music Festival, Sunburn and Tomorrowland\n' +
                '              '} />
            </div>
        )
    }
}