import React from "react";
import {observer} from "mobx-react";
import styles from './index.scss'
import reactLogo from '../../assets/react.png'
import IndexSet from "../../utils/IndexSet";
import {withRouter} from 'react-router-dom'
import {GithubOutlined} from "@ant-design/icons/lib";
import {Animated} from 'react-animated-css'

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
    isVisible : boolean
}



@observer
class Index extends React.Component<IProps, IState>{

    static defaultProps={
        //主页
        chooseIndex : 0,
        switchRoute : ()=>{}
    }

    state = {
        fixed : false,
        isVisible: true
    }

    componentDidMount(): void {
        window.addEventListener('scroll',debounce(()=>{
            const scrollTop = window.scrollY;

            const targetVal = document.body.clientWidth / 1920 * 1080

            if(targetVal < scrollTop){
                //如果已经固定,则return
                if(this.state.fixed) return ;

                this.setState({fixed :true ,isVisible:false},()=>{
                       setTimeout(()=>{
                           this.setState({isVisible:true })
                       },200)
                })
                return
            }else{
                //如果没有固定,则return
                if(!this.state.fixed) return ;

                this.setState({fixed :false ,isVisible:false},()=>{
                      setTimeout(()=>{
                          this.setState({isVisible:true })
                      },200)
                })
            }



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
            <Animated className={styles.wrapper} style={this.state.fixed?{position:'fixed'}:{}} animationIn={'fadeInDown'} animationOut={'fadeOutUp'} animationInDuration={1000} animationOutDuration={0} isVisible={this.state.isVisible}>
                    <div className={styles.wrapper_left}>

                        {IndexSet.map((item,index )=>(
                            <div key={index} style={index === chooseIndex ?{ color: item.color}: {}} className={styles.wrapper_left_item} onClick={this.handleNavTo(item)}>
                                {item.logo && <img onClick={this.handleNavTo} className={styles.wrapper_left_logo} src={reactLogo} />}
                                {item.logo || item.title}
                            </div>
                        ))}
                    </div>


                    <div className={styles.wrapper_right}>
                        <div className={styles.wrapper_right_github} onClick={()=>window.location.href='https://github.com/skrillex1224'} ><GithubOutlined/> <span style={{marginLeft:'10px'}}>skrillex1224</span></div>
                    </div>
            </Animated>
        )
    }
}

export default  withRouter(Index)