import React from "react";
import {observer} from "mobx-react";
import styles from "./index.scss";
import caseTestSet from '../../assets/caseSet.png';
import algorithmSet from '../../assets/algorithmSet.png';
import interviewSet from '../../assets/interviewSet.png';
import projectSet from '../../assets/projectSet.png';
import startSet from '../../assets/startSet.png';
import IndexSet from "../../utils/IndexSet";
import { withRouter } from 'react-router-dom';

interface IProps{
    title: string,
    subTitle: string,
    imgName : string,
}

interface IState {

}

const bgMapping = {
    'caseTestSet' : caseTestSet,
    'algorithmCollectionSet' : algorithmSet,
    'interviewProblemSet' : interviewSet,
    'projectAllSet' : projectSet,
    'startSet' : startSet
}

@observer
class Index extends React.Component<IProps, IState>{
    static defaultProps={
        title : '',
        subTitle:'',
        imgName : '',
    }

    handleNavTo = ()=>{
        const finder = IndexSet.find(item=>item.title === this.props.title);
        //@ts-ignore
        this.props.history.push(finder.navUrl);
    }

    render(): React.ReactNode {
        const {title,subTitle,imgName} =  this.props;
        return (
            <div style={{backgroundImage:`url(${bgMapping[imgName]})`}} className={styles.wrapper_mainScreen}>
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