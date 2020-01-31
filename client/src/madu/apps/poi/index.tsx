import React from "react";
import { Route, Switch, Router } from "react-router-dom";
import { createBrowserHistory as createHistory } from "history";
import { CreatePoi } from "./createPoi"
import { ListPoi } from "./listPoi"

const PoiApp = ({ match }) => {
    return (
        <Switch>
            <Route exact path={`${match.url}/create`} render={() => <CreatePoi/>} />
            <Route exact path={`${match.url}/list`} render={() => <ListPoi/>} />

        </Switch>
    );
};

const history = createHistory();

export default () => {
    return (
        <Router history={history}>
            <Route path="/poi" component={PoiApp} />
        </Router>
    );
};
