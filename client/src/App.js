import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Menu from "./components/Menu/Menu";
import Services from "./components/Services/Services";
import TopBanner from "./components/TopBanner/TopBanner";
import TransactionList from "./components/TransactionList/TransactionList";
import WalletOverview from "./components/WalletOverview/WalletOverview";
import EditTranForm from "./components/EditTranForm/EditTranForm";
import Login from "./pages/Login/Login";
import TranDetails from "./components/TranDetails/TranDetails";
import Register from "./pages/Register/Register";
import Toaster from "./components/Toaster";
import { useSelector } from "react-redux";
import Chart from "./components/Chart/Chart";

function App() {
  const userLogin = useSelector((state) => state.userLogin);

  const userInfo = userLogin.userInfo;

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
          <Route
            exact
            path="/dashboard"
            render={(props) => (
              <>
                <WalletOverview />
                <TransactionList {...props} />
              </>
            )}
          />
          <Switch>
            <Route
              exact
              path="/transactions/:id/edit"
              render={(props) => (
                <>
                  <EditTranForm {...props} />
                </>
              )}
            />{" "}
            <Route
              exact
              path="/transactions/:id/view"
              render={(props) => (
                <>
                  <TranDetails {...props} />
                </>
              )}
            />
          </Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/chart" component={Chart} />
          <Route exact path="/register" component={Register} />
        </div>

        <div className="footer">
          {/* Toaster */}
          {sessionStorage.getItem("loginMsg") === "1" && userInfo && (
            <Toaster msg={`🙌 Chào mừng ${userInfo.user.firstName}`} />
          )}
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
