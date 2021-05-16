import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Menu from "./components/Menu/Menu";
import Services from "./components/Services/Services";
import TopBanner from "./components/TopBanner/TopBanner";
import Login from "./pages/Login/Login";

function App() {
  return (
    <Router>
      <div className="app">
        <div className="header">
          <Menu />
        </div>
        <div className="body">
          <Route
            exact
            path="/"
            render={(props) => (
              <>
                <TopBanner />
                <Services />
              </>
            )}
          />
          <Route exact path="/login" component={Login} />
        </div>
        <div className="footer">
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
