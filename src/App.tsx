import React from "react";
import {BrowserRouter,Switch,Route,Redirect} from "react-router-dom";
import './App.noModule.scss';
import Px2Rem from "./pages/Px2rem";
import Index from "./pages/Index";

function Demo() {
    return (
        <>
            <Route path={'/'} exact={true} component={Index} />
            <Route path={'/Px2rem'} exact={true} component={Px2Rem} />
            {/*<Redirect path={'/'} to={'/'} />*/}
        </>
    )
}


// @ts-ignore
export default function App() {
  return (
        <BrowserRouter>
            <Switch>
                <Route path={'/'} exact={false} component={Demo}></Route>
            </Switch>
        </BrowserRouter>
  );
}


//@ts-ignore