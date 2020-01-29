import React from "react";
import { Route, Switch, Router } from "react-router-dom";
import { createBrowserHistory as createHistory } from "history";

const PoiApp = ({ match }) => {
  return (
    <Switch>
      <Route
        exact
        path={`${match.url}`}
        render={() => <div>Page de test</div>}
      />
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
