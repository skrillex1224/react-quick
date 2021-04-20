import React from "react";
import styles from './index.scss'
import {lazy,Suspense} from 'react'
import {Animated} from 'react-animated-css'

const LazyMain = lazy(() => import(/* webpackChunkName: "Main" */'./Main'));

export default class  Index extends React.Component<any, any>{

    state = {
        isLoading :true
    }

    render() {
        const {isLoading} =this.state;
        return (
            <Suspense fallback={isLoading ? undefined :
                <Animated animationIn={'fadeIn'} animationOut={'fadeOut'} isVisible={true} animationInDuration={2000}
                          animationOutDuration={600}>
                </Animated>} >

                <LazyMain/>
            </Suspense>
        )
    }
}