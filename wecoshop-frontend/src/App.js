import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import "./App.css";
import { PageHeader, Avatar } from "antd";
import Signup from "./controller/signup.js";

import Pages from "./Pages";
import api from "./api";

export default class App extends React.Component {
  componentDidMount() {
    api.getCurrentUser().then(user => {
      console.log("Current User", user);
      if (
        (!user.vkId || !user.email) &&
        window.location.pathname !== "/login"
      ) {
        // window.location.pathname = "/login";
      }
    });
  }

  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Pages.Login}></Route>
            <Route path="/parties" component={Pages.PartyOverview}></Route>
            <Route path="/login" component={Pages.Login}></Route>
            <Route path="/party/:id/items" component={Pages.PartyItems}></Route>
            <Route path="/party/:id" component={Pages.Party}></Route>
            <Route path="/topics">
              <Topics />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

function Topics() {
  let match = useRouteMatch();

  return (
    <div>
      <h2>Topics</h2>

      <ul>
        <li>
          <Link to={`${match.url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
        </li>
      </ul>

      {/* The Topics page has its own <Switch> with more routes
          that build on the /topics URL path. You can think of the
          2nd <Route> here as an "index" page for all topics, or
          the page that is shown when no topic is selected */}
      <Switch>
        <Route path={`${match.path}/:topicId`}>
          <Topic />
        </Route>
        <Route path={match.path}>
          <h3>Please select a topic.</h3>
        </Route>
      </Switch>
    </div>
  );
}

function Topic() {
  let { topicId } = useParams();
  return <h3>Requested topic ID: {topicId}</h3>;
}
