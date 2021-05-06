import React, { useState, useEffect } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Signup from "components/Authentication/Signup";
import Login from "components/Authentication/Login";
import NavBar from "components/NavBar";
import Dashboard from "components/Dashboard";
import CreatePoll from "components/Polls/CreatePoll";
import ShowPoll from "components/Polls/ShowPoll";
import EditPoll from "components/Polls/EditPoll";
import { setAuthHeaders, registerIntercepts } from "apis/axios";
import { initializeLogger } from "common/logger";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeLogger();
    registerIntercepts();
    setAuthHeaders(setLoading);
  }, []);

  return (
    <Router>
      <ToastContainer />
      <NavBar />
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/polls/:id/show" component={ShowPoll} />
        <Route exact path="/polls/:id/edit" component={EditPoll} />
        <Route exact path="/polls/new" component={CreatePoll} />
      </Switch>
    </Router>
  );
};

export default App;
