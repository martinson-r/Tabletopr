import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getAllTables } from "../../store/tables";
import Conversation from "../Conversation";
import { v4 as uuid } from 'uuid';

// import "./Home.css";

function Messages() {


    const dispatch = useDispatch();
    const tables = useSelector(state => state.tables.tableList);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [username, setUsername] = useState('');
    const [recipient, setRecipient] = useState('');
    const webSocket = useRef(null);
    const recipients = [
        {id: 500,
        username: 'Scarywizard'},
        {id: 501,
        username: 'LuckyFromFlorida'},
        {id: 502,
        username: 'RougeRogue'},
    ]

    useEffect(() => {
        console.log('Recipient....', recipient)
    },[recipient])


    const sessionUser = useSelector((state) => state.session.user);

    useEffect(() => {
        if (sessionUser) {
        setUsername(sessionUser.username)
        }
  }, [])

  useEffect(() => {
    if(!username) {
      return;
    }

    const ws = new WebSocket(process.env.REACT_APP_WS_URL);

    ws.onopen = (event) => {
      console.log(`Connection open: ${event}`);

      //set messages to trigger other useEffect
      setMessages([]);
    }

    ws.onerror = (event) => {
      console.log(`Error: ${event}`);
    }

    ws.onclose = (event) => {
      console.log(`Connection closed: ${event}`);
      webSocket.current = null;
    //   setUsername('');
    //   setMessages([]);
    }

    webSocket.current = ws;

    return function cleanup() {
      if (webSocket.current !== null) {
        webSocket.current.close();
      }
    }
  },[username]);

  useEffect(() => {
    console.log('useeffect triggered');
    if (webSocket.current !== null) {
        console.log('NOT NULL', webSocket.current);
          webSocket.current.onmessage = (event) => {
          const chatMessage = JSON.parse(event.data);
          const message = chatMessage.data;

          //date was JSON formatted, we need to convert it back to a Date object.
          message.created = new Date(message.created);

          setMessages([message, ...messages]);
          console.log(messages);
        }
    }
}, [messages])



  const handleSendMessage = (message) => {
    const newMessage = {
      uuid: uuid(),
      username,
      recipient: recipient.username,
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

    const handleSendOnClick = () => {
        handleSendMessage(message);
        setMessage(message);
    };

    const handleOnChange = (e) => {
        setMessage(e.target.value);
        console.log('Message', message)
    }

    const handleLeaveOnClick = () => {
        handleLeave();
    }

    useEffect(() => {
        dispatch(getAllTables());
        console.log("Got all tables");
      }, [dispatch]);

    return (
        <>
        <div>
            <h2>Conversations</h2>
            {recipients.map(recipient => <div onClick={() =>setRecipient(recipient)}>{recipient.username}</div>)}
        </div>
        {recipient && (<div><Conversation username={username} recipient={recipient} messages={messages} handleSendMessage={handleSendMessage} handleOnChange={handleOnChange} /></div>)}

     </>
    )
}

export default Messages;
