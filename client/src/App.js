import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Web3ContextProvider from "./context/Web3Context";

function App() {
  return (
    <Web3ContextProvider>
      <Router>
        {/* <Navbar /> */}
        <Switch>
          <Route exact path="/">
            {/* <Home /> */}
            <p>home</p>
          </Route>
          <Route exact path="/post">
            <p>post page</p>
          </Route>
          <Route exact path="/post/:id">
            <p>hey im the report</p>
          </Route>
        </Switch>
      </Router>
    </Web3ContextProvider>
  );
}

export default App;
