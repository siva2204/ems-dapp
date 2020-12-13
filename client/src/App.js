import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Web3ContextProvider from "./context/Web3Context";
import PostReportForm from "./components/Form/PostReportForm";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <Web3ContextProvider>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/post">
            <p>post page</p>
          </Route>
          <Route exact path="/uploadpost">
            <PostReportForm />
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
