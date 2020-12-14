import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Web3ContextProvider from "./context/Web3Context";
import PostReportForm from "./components/Form/PostReportForm";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import { PostList } from "./components/Posts/PostList";
import Report from "./components/Report/Report";

function App() {
  return (
    <Web3ContextProvider>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/feed">
            <PostList />
          </Route>
          <Route exact path="/feed/:id">
            <Report />
          </Route>
          <Route exact path="/uploadpost">
            <PostReportForm />
          </Route>
        </Switch>
      </Router>
    </Web3ContextProvider>
  );
}

export default App;
