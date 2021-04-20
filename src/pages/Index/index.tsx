import React from "react";
import styles from './index.scss'
import {lazy,Suspense} from 'react'
import LazyMain from './Main'
import {Animated} from 'react-animated-css'

// const LazyMain = lazy(() => import(/* webpackChunkName: "Main" */'./Main'));

const neverResolve = new Promise(() => {

});


function Suspender({suspend}) {
    if (suspend) {
        throw neverResolve;
    } else {
        return null;
    }
}

export default class  Index extends React.Component<any, any>{

    state = {
        isLoading :false,
        suspend : true,
    }

    componentDidMount(): void {
        setTimeout(()=>{
                this.setState({suspend:false})
                console.log('---------')
            },3000)
    }

    render() {
        const {isLoading,suspend} =this.state;
    /**animationOut没啥用在这里*/
        return (
            <React.Suspense fallback={ <Animated animationIn={'fadeIn'} animationOut={'bounceOut'}  isVisible={true} animationInDuration={800}
                    animationOutDuration={600}>
                <LazyMain/>
            </Animated>}>
                <Animated animationIn={'bounceIn'} animationOut={'bounceOut'}  isVisible={true} animationInDuration={2000}
                          animationOutDuration={600}>
                    <LazyMain/>
                </Animated>
                <Suspender suspend={suspend}/>
            </React.Suspense>
        )
    }
}