import React from "react";
import styles from './index.scss'
import {Animated} from "react-animated-css";

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

    render() {
        const {isLoading,suspend} =this.state;
        return (
            <React.Suspense fallback={ <Animated animationIn={'slideInDown'} animationOut={'bounceOut'}  isVisible={true} animationInDuration={800}>
                <div className={styles.wrapper}>
                    dasdasdsa
                </div>
            </Animated> }>
                <Suspender suspend={suspend}/>
            </React.Suspense>
        )
    }
}