import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getAllTables } from "../../store/tables";
import { getFellowPlayers } from "../../store/tables";
import Conversation from "../Conversation";
import { v4 as uuid } from 'uuid';

function Messages() {

    const dispatch = useDispatch();

    const tables = useSelector(state => state.tables.tableList);
    const playerLists = useSelector(state => state.tables.players)
    const [recipientList, setRecipientList] = useState([]);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [username, setUsername] = useState('');
    const [recipient, setRecipient] = useState('');

    const webSocket = useRef(null);

    useEffect(() => {
        console.log('Recipient....', recipient)
    },[recipient])


    const sessionUser = useSelector((state) => state.session.user);

    useEffect(() => {
        if (sessionUser) {
        setUsername(sessionUser.username);
        }
        dispatch(getFellowPlayers())
  }, [])

  useEffect(() => {
      if (playerLists !== undefined) {
          if (playerLists.length > 0) {
              console.log('playerlists length')
              console.log(playerLists)

              const players = playerLists.map(list => list.Table.PlayerLists);
              let joinedPlayerList = [];
              for (let i = 0; i < players.length; i++) {
                joinedPlayerList = joinedPlayerList.concat(players[i]);
              }

              //filter current player out of contact list
              const filteredList = joinedPlayerList.filter( item => item.playerId !== sessionUser.id )
              console.log('FILTERED', filteredList);

              const deDupe = filteredList.filter((v,index,a)=>a.findIndex(t=>( t.playerId === v.playerId ))===index)
              console.log('DEDUPE', deDupe);


              setRecipientList([...deDupe]);
            }
          }
  },[playerLists])

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
          console.log('recipient', message.recipient);
          console.log('username', message.username);
            if ((message.recipient === username) || (message.username === username)) {
                setMessages([message, ...messages]);
                console.log(messages);
            }
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
            <h2>Contacts</h2>
            {recipientList.map(recipient => <div onClick={() =>setRecipient(recipient.User)}>{recipient.User.username}</div>)}
        </div>
        <div>
            {recipient && (<div><Conversation username={username} recipient={recipient} messages={messages} handleSendMessage={handleSendMessage} handleOnChange={handleOnChange} /></div>)}
        </div>
     </>
    )
}

export default Messages;
