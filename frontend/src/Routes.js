import React from "react";
import { Route, Switch } from "react-router-dom";
import CreateEvent from "./components/CreateEvent";
import NotFound from "./components/NotFound";
import EventPage from "./components/EventPage";

export default function Routes() {
  return (
    <Switch>
        <Route exact path="/">
            <CreateEvent />
        </Route>

        <Route path="/event/:eventID" component={EventPage}>
        </Route>

        <Route>
            <NotFound />
        </Route>
    </Switch>
  );
}