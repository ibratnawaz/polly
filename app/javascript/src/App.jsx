import React, { useState, useEffect } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Signup from "components/Authentication/Signup";
import Login from "components/Authentication/Login";
import NavBar from "components/NavBar";
import { setAuthHeaders, registerIntercepts } from "apis/axios";
import { initializeLogger } from "common/logger";
import Logger from "js-logger";

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
        <Route exact path="/" render={() => <div>WELCOME</div>} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </Router>
  );
};

export default App;
