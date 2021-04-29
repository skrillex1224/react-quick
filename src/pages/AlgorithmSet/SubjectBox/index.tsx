import React from "react";
import {observer} from "mobx-react";
import styles from './index.scss'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark  as atomDark} from 'react-syntax-highlighter/dist/esm/styles/prism';

interface IProps {
    index : number,
    title: string,
    desc : string,
    code : string
}

interface IState {

}

@observer
export default class Index extends React.Component<IProps, IState>{
    static defaultProps = {
        index : 1,
        title : '暂无标题',
        desc :'1.暂无内容',
        code : `console.log('....')`
    }

    render(): React.ReactNode {
        const {index,title,code,desc} = this.props;
        return (
            <div className={styles.wrapper}>
                <div className={styles.wrapper_title}>
                    <a>{index}、{title}</a>
                    <div className={styles.wrapper_title_desc}>
                        <h3>题目描述：</h3>
                        {desc.split(/\n/).map((item,index)=>(item.trim() && <p key={index}>{item}</p>))}
                    </div>
                </div>

                <div className={styles.wrapper_content}>
                    <SyntaxHighlighter showLineNumbers={true}
                                                      startingLineNumber = {0}
                                                      language={'javascript'}
                                                      style={atomDark}
                                                      customStyle={{
                                                          borderRadius:'10px',
                                                          border:'1px solid #373E47',
                                                      }}  >
                        {
                            code
                        }
                    </SyntaxHighlighter>
                </div>
            </div>
        )
    }
}