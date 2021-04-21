import React from "react";
import styles from './index.scss'
import {Animated} from "react-animated-css";
import {observer} from "mobx-react";
import Preload from '../../components/Preload'
import Loading from '../../assets/react.png'
import {Link} from 'react-router-dom'

const neverResolve = new Promise(() => {

});


function Suspender({suspend}) {
    if (suspend) {
        throw neverResolve;
    } else {
        return null;
    }
}

@observer
export default class  Index extends React.Component<any, any>{
    state = {
        isLoading :true,
        suspend : true,
    }

    componentDidMount(): void {
        setTimeout(()=>{
            this.setState({isLoading:false})
            console.log('---------')
        },2000)
    }

    render() {
        const {isLoading,suspend} =this.state;
        return (
            <Preload isLoading={isLoading}  >
                <img src={Loading} />
                <Link to="/Px2rem">dsadasd</Link>
            </Preload>
        )
    }
}