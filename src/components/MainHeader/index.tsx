import React from "react";
import {observer} from "mobx-react";
import styles from './index.scss'
import reactLogo from '../../assets/react.png'
import IndexSet from "../../utils/IndexSet";
import {withRouter} from 'react-router-dom'
import {GithubOutlined} from "@ant-design/icons/lib";

function debounce (eventHandler,duration){
    let timer ;
    return ()=>{
        if(timer) return ;

        timer = setTimeout(()=>{
            eventHandler()
            timer = null;
        },duration)
    }
}

interface IProps {
    chooseIndex : number,
    switchRoute : (route)=>any
}

interface IState {
    fixed: boolean,
}



@observer
class Index extends React.Component<IProps, IState>{

    static defaultProps={
        //主页
        chooseIndex : 0,
        switchRoute : ()=>{}
    }

    state = {
        fixed : false
    }

    componentDidMount(): void {
        window.addEventListener('scroll',debounce(()=>{
            const scrollTop = window.scrollY;

            const targetVal = document.body.clientWidth / 1920 * 1080

            if(targetVal < scrollTop){
                this.setState({fixed :true })
                return
            }

            this.setState({fixed:false})

        },400),false);
    }

    handleNavTo = (item)=>{
        return ()=>{
            this.props.switchRoute(item.navUrl);
        }
    }

    render(): React.ReactNode {
        const {chooseIndex} = this.props

        return (
            <div className={styles.wrapper} style={this.state.fixed?{position:'fixed'}:{}}>
               <div className={styles.wrapper_left}>

                   {IndexSet.map((item,index )=>(
                       <div key={index} style={index === chooseIndex ?{ color: item.color}: {}} className={styles.wrapper_left_item} onClick={this.handleNavTo(item)}>
                           {item.logo && <img onClick={this.handleNavTo} className={styles.wrapper_left_logo} src={reactLogo} />}
                           {item.logo || item.title}
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