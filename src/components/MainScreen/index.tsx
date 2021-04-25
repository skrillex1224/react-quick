import React from "react";
import {observer} from "mobx-react";
import styles from "./index.scss";
import caseTestSet from '../../assets/caseSet.png';
import algorithmSet from '../../assets/algorithmSet.png';
import interviewSet from '../../assets/interviewSet.png';
import projectSet from '../../assets/projectSet.png';

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
}

@observer
export default class Index extends React.Component<IProps, IState>{
    static defaultProps={
        title : '',
        subTitle:'',
        imgName : '',
    }

    render(): React.ReactNode {
        const {title,subTitle,imgName} =  this.props;


        return (
            <div style={{backgroundImage:`url(${bgMapping[imgName]})`}} className={styles.wrapper_mainScreen}>
                {/*根据padding撑开父元素, 容纳整个背景图片*/}
                <div className={styles.wrapper_mainScreen_extend}/>
                <div className={styles.wrapper_mainScreen_titleBox}>
                    <div className={styles.wrapper_mainScreen_titleBox_title}>{title}</div>
                    <div className={styles.wrapper_mainScreen_titleBox_subTitle}>{subTitle}</div>
                </div>
            </div>
        )
    }
}