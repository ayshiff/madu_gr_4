import React from "react";
import { Route, Switch, Router } from "react-router-dom";
import { createBrowserHistory as createHistory } from "history";

import { Container } from "styles/layout/container";

import { CreatePoi } from "./createPoi";
import { ListPoi } from "./listPoi";

const PoiApp = ({ match }) => (
    <Container>
        <Switch>
            <Route exact path={`${match.url}/list`} render={() => <ListPoi />} />
            <Route path={`${match.url}/create`} render={() => <CreatePoi />} />
        </Switch>
    </Container>
);

const history = createHistory();

export default () => {
    return (
        <Router history={history}>
            <Route path="/poi" component={PoiApp} />
        </Router>
    );
};
