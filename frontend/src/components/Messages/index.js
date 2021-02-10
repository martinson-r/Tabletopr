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
  },[username])

  useEffect(() => {
      if (webSocket.current !== null) {
        webSocket.current.onmessage = (e) => {
            console.log(`Processing incoming message`);
            const chatMessage = JSON.parse(e.data);
            console.log('incoming message', chatMessage)
            const message = chatMessage.data;

            //date was JSON formatted, we need to convert it back to a Date object.
            message.created = new Date(message.created);

            setMessages([message, ...messages]);
          }
      }
  }, [messages])

  const handleSendMessage = (message) => {
    const newMessage = {
      uuid: uuid(),
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
    console.log('current websocket', webSocket.current)
    webSocket.current.send(jsonNewMessage);
};

const handleLeave = () => {
  setUsername('');
};


    console.log(messages);

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
        {/* eventually map out conversations here by recipient */}
        {/* <Conversation messages={messages}/> */}
        <h2>{username}'s Messages</h2>
        <input type="text" value={message} onChange={handleOnChange} />
        <button type="button" onClick={handleSendOnClick}>Send</button>
        {messages.map(message => (
            <p key={message.id}>({message.created.toLocaleTimeString()}){message.username}: <strong>{message.message}</strong></p>)
            )}
     </>
    )
}

export default Messages;
