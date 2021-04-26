import React from "react";
import {BrowserRouter,Switch,Route} from "react-router-dom";
import './App.noModule.scss';
import TestPage from "./pages/TestPage";
import CaseTestSet from "./pages/CaseTestSet";
import MainHeader from "./components/MainHeader";
import IndexPage from "./pages/IndexPage";
import IndexSet from "./utils/IndexSet";

function Index() {
    return (
        <>
            {
                IndexSet.map((item,index)=>(
                    <Route key={index} path={item.navUrl} exact={true} component={item.component} />
                ))
            }
            <Route path={'/TestPage'} exact={true} component={TestPage} />
        </>
    )
}


// @ts-ignore
export default function App() {
  return (
        <BrowserRouter>
            <Switch>
                <Route path={'/'} exact={false} component={Index} />
            </Switch>
        </BrowserRouter>
  );
}


//@ts-ignore