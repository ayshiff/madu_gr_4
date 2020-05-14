import React from "react";
import { Route, Switch, Router } from "react-router-dom";
import { createBrowserHistory as createHistory } from "history";

import { Container } from "styles/layout/container";

import { CreateClient } from "./client-create";
import { ListClient } from "./client-list";
import { Mapboxgl } from "../map/index";

const ClientApp = ({ match, history }) => (
    <Container>
        <Switch>
            <Route exact path={`${match.url}/list`} render={() => <ListClient history={history} />} />
            <Route path={`${match.url}/create`} render={() => <CreateClient />} />
            <Route path={`${match.url}/map`} render={() => <Mapboxgl />} />
        </Switch>
    </Container>
);

const history = createHistory();

export default () => {
    return (
        <Router history={history}>
            <Route path="/client" component={({match}) => <ClientApp history={history} match={match} />} />
        </Router>
    );
};
