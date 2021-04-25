import React from "react";
import {observer} from "mobx-react";
import styles from './index.scss'
import reactLogo from '../../assets/react.png'
import IndexSet from "../../utils/IndexSet";
import {withRouter} from 'react-router-dom'
import {GithubOutlined} from "@ant-design/icons/lib";

@observer
class Index extends React.Component<any, any>{
    handleNavTo = (item)=>{
        return ()=>{
            this.props.history.push(item.navUrl);
        }
    }
    handleToIndex = ()=>{
        this.props.history.push('/');
    }

    render(): React.ReactNode {
        return (
            <div className={styles.wrapper}>
               <div className={styles.wrapper_left}>
                   <img onClick={this.handleToIndex} className={styles.wrapper_left_logo} src={reactLogo} />
                   {IndexSet.map((item,key)=>(
                       <div className={styles.wrapper_left_item} onClick={this.handleNavTo(item)}>
                           {item.title}
                       </div>
                   ))}
               </div>
                <div onClick={()=>window.location.href='https://github.com/skrillex1224'} className={styles.wrapper_right}>
                    <GithubOutlined/> <span className={styles.wrapper_right_name}>skrillex1224</span>
                </div>
            </div>
        )
    }
}

export default  withRouter(Index)