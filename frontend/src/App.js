import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, NavLink } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import LoginFormModal from "./components/LoginFormModal";
import Home from "./components/Home";
import TableDetail from "./components/TableDetail";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SimpleSearch from "./components/SimpleSearch";
import SearchResults from "./components/SearchResults";
import GameApplicationForm from "./components/GameApplicationForm";
import GameSubmissionForm from "./components/GameSubmissionForm";
import MyTables from "./components/MyTables";
import Applications from "./components/Applications";
import ApplicationDetail from "./components/ApplicationDetail";
import Messages from "./components/Messages";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector(state => state.session.user);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <>
      <div class="signup-login">
        {!sessionUser&&<div className="signup-login"><NavLink to="/signup">Sign Up</NavLink><LoginFormModal /></div>}
        {/* {!sessionUser&&<LoginFormModal />} */}
        {sessionUser&&(<div onClick={logout}>Log Out</div>)}
      </div>
      <h1 className="header"><NavLink exact to="/">Tabletopr</NavLink></h1>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/tables/create" exact={true}>
            <GameSubmissionForm />
          </Route>
          <Route path="/tables/:tableId" exact={true}>
            <TableDetail />
          </Route>
          <Route path="/results">
            <SearchResults />
          </Route>
          <Route path="/messages">
            <Messages />
          </Route>
          <Route path="/tables/:tableId/apply" exact={true}>
            <GameApplicationForm />
          </Route>
          <Route path="/tables/:tableId/applications" exact={true}>
            <Applications />
          </Route>
          <Route path="/tables/players/:playerId">
            <MyTables />
          </Route>
          <Route path="/tables/:tableId/:playerId/application" exact={true}>
            <ApplicationDetail />
          </Route>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/messages">
            <Messages />
          </Route>
          <Route path="/" exact={true}>
            <Home />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
