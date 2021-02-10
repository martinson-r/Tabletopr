import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import GameApplicationForm from "./components/GameApplicationForm";
import GameSubmissionForm from "./components/GameSubmissionForm";
import MyTables from "./components/MyTables";
import Applications from "./components/Applications";
import ApplicationDetail from "./components/ApplicationDetail";
import Messages from "./components/Messages";
import { v4 as uuid } from 'uuid';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  // const [username, setUsername] = useState('');

  const testData = {
    message: [{
      id: uuid(),
      username: 'hanasays',
      recipient: 'scarywizard',
      message: 'Test message!',
      created: new Date(),
    }, {
      id: uuid(),
      username: 'hanasays',
      recipient: 'scarywizard',
      message: 'Test message!',
      created: new Date(),
    }]
  }

  const [recipient, setRecipient] = useState('');
  const [messages, setMessages] = useState(testData);
  const [username, setUsername] = useState('');
  const webSocket = useRef(null);

  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    if(!username) {
      return;
    }

    const ws = new WebSocket(process.env.REACT_APP_WS_URL);

    ws.onopen = (e) => {
      console.log(`Connection open: ${e}`);
    }

    ws.onmessage = (e) => {
      console.log(e);
    }

    ws.onerror = (e) => {
      console.log(`Error: ${e}`);
    }

    ws.onclose = (e) => {
      console.log(`Connection closed: ${e}`);
    }

    webSocket.current = ws;

    return function cleanup() {
      if (webSocket.current !== null) {
        webSocket.current.close();
      }
    }

  },[username])

  const handleSendMessage = (message) => {
    const newMessage = {
      ud: uuid(),
      username,
      recipient,
      message,
      created: new Date(),
    }

    const jsonNewMessage = JSON.stringify({
      type: 'send-chat-message',
      data: newMessage,
    });

    console.log(`Sending message ${jsonNewMessage}...`);
    webSocket.current.send(jsonNewMessage);
};

const handleLeave = () => {
  setUsername('');
};

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  useEffect(() => {
    if (sessionUser) {
      setUsername(sessionUser.username)
    }
  }, [isLoaded])

  return (
    <>
      <h1><NavLink exact to="/">Tabletopr</NavLink></h1>
      <Navigation isLoaded={isLoaded} />
      <SimpleSearch />
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
            <Messages messages={messages} username={username} handleSendMessage={handleSendMessage} handleLeave={handleLeave} />
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
          <Route path="/" exact={true}>
            <Home />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
