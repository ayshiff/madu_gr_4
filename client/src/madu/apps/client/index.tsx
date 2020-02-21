import React from "react";
import { Route, Switch, Router } from "react-router-dom";
import { createBrowserHistory as createHistory } from "history";

import { Container } from "styles/layout/container";

import { CreateClient } from "./client-create";
import { ListClient } from "./client-list";

const ClientApp = ({ match }) => (
    <Container>
        <Switch>
            <Route exact path={`${match.url}/list`} render={() => <ListClient />} />
            <Route path={`${match.url}/create`} render={() => <CreateClient />} />
        </Switch>
    </Container>
);

const history = createHistory();

export default () => {
    return (
        <Router history={history}>
            <Route path="/client" component={ClientApp} />
        </Router>
    );
};
