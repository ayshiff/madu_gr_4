import React from "react";
import { Route, Switch, Router } from "react-router-dom";
import { createBrowserHistory as createHistory } from "history";

import { Container } from "styles/layout/container";

import { SurveyContainer } from "./view";

const PoiApp = ({ match }) => (
    <Container>
        <Switch>
            <Route exact path={`${match.url}`} render={() => <SurveyContainer />} />
        </Switch>
    </Container>
);

const history = createHistory();

export default () => {
    return (
        <Router history={history}>
            <Route path="/survey" component={PoiApp} />
        </Router>
    );
};
