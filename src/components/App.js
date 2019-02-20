import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "../history";
import Header from "./Header";
import HandleNews from "./HandleNews/HandleNews";
import HandleUS from "./HandleNews/HandleUS";
import HandleKR from "./HandleNews/HandleKR";
import HandleJP from "./HandleNews/HandleJP";
import HandleNewsDetail from "./HandleNews/HandleNewsDetail";

const App = () => {
  return (
    <Router history={history}>
      <div>
        <Header />
        <Switch>
          <Route path="/" exact component={HandleNews} />
          <Route path="/news/jp" component={HandleJP} />
          <Route path="/news/kr" component={HandleKR} />
          <Route path="/news/us" component={HandleUS} />
          <Route path="/news/:id" component={HandleNewsDetail} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
