import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import PublicNavbar from "./components/PublicNavbar";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PopularPage from "./pages/PopularPage";
import TopRatedPage from "./pages/TopRatedPage";
import DetailPage from "./pages/DetailPage";

function App() {
  return (
    <>
      <Router>
        <PublicNavbar />

        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/popular" component={PopularPage} />
          <Route exact path="/toprate" component={TopRatedPage} />
          <Route exact path="/movies/:id" component={DetailPage} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
