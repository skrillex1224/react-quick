import React from "react";
import {observer} from "mobx-react";
import styles from "./index.scss";
import IndexSet from "../../utils/IndexSet";
import { withRouter } from 'react-router-dom';

interface IProps {
    title: string,
    subTitle: string,
    imgName: string,
    switchRoute: (route : string) => any
}

interface IState {

}


@observer
class Index extends React.Component<IProps, IState>{
    static defaultProps={
        title : '',
        subTitle:'',
        imgName : '',
        switchRoute  : ()=>{}
    }

    handleNavTo = ()=>{
        const finder = IndexSet.find(item=>item.title === this.props.title);
        this.props.switchRoute(finder.navUrl);
    }

    render(): React.ReactNode {
        const {title,subTitle,imgName} =  this.props;
        return (
            <div style={{backgroundImage:`url(${imgName})`}} className={styles.wrapper_mainScreen}>
                {/*根据padding撑开父元素, 容纳整个背景图片*/}
                <div className={styles.wrapper_mainScreen_extend}/>
                <div onClick={this.handleNavTo} className={styles.wrapper_mainScreen_titleBox}>
                    <div className={styles.wrapper_mainScreen_titleBox_title}>{title}</div>
                    <div className={styles.wrapper_mainScreen_titleBox_subTitle}>{subTitle}</div>
                </div>
            </div>
        )
    }
}

// 使用this.props.history 对象
export default withRouter(Index);