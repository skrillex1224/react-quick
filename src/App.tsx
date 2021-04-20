import React from "react";
import {BrowserRouter,Switch,Route,Redirect} from "react-router-dom";
import './App.css';
import Px2Rem from "./pages/Px2rem";
import Index from "./pages/Index";

function Demo() {
    return (
        <>
            <Route path={'/'} component={Index} />
            <Route path={'/Px2rem'} component={Px2Rem} />
            <Redirect from="/*" to="/" />
        </>
    )
}


// @ts-ignore
export default function App() {
  return (
    <div>
        <BrowserRouter>
            <Switch>
                <Route path={'/'} exact={false} component={Demo}></Route>
            </Switch>
        </BrowserRouter>
    </div>
  );
}


//@ts-ignore