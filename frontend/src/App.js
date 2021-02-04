import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, NavLink } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import Home from "./components/Home";
import TableDetail from "./components/TableDetail";
// import LoginFormPage from "./components/LoginFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SimpleSearch from "./components/SimpleSearch";
import SearchResults from "./components/SearchResults";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <h1><NavLink exact to="/">Tabletopr</NavLink></h1>
      <Navigation isLoaded={isLoaded} />
      <SimpleSearch />
      {isLoaded && (
        <Switch>
          <Route path="/tables/:tableId" exact={true}>
            <TableDetail />
          </Route>
          <Route path="/results">
            <SearchResults />
          </Route>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
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
