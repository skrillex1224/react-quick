import React from "react";
import {BrowserRouter,Switch,Route} from "react-router-dom";
import './App.noModule.scss';
import TestPage from "./pages/TestPage";
import CaseTestSet from "./pages/CaseTestSet";
import MainHeader from "./components/MainHeader";
import IndexPage from "./pages/IndexPage";

function Index() {
    return (
        <>
            <MainHeader />
            <Route path={'/'} exact={true} component={IndexPage} />
            <Route path={'/CaseTestSet'} exact={true} component={CaseTestSet} />
            <Route path={'/TestPage'} exact={true} component={TestPage} />
            {/*<Redirect path={'/'} to={'/'} />*/}
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