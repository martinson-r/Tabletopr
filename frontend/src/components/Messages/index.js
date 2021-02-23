import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getAllTables } from "../../store/tables";
import { getFellowPlayers } from "../../store/tables";
import { saveUserMessages } from "../../store/messages";
import { loadUserMessages } from "../../store/messages";
import Conversation from "../Conversation";
import { v4 as uuid } from 'uuid';
import Cookies from 'js-cookie';
import { io } from 'socket.io-client';

function Messages() {

    const dispatch = useDispatch();

    const playerLists = useSelector(state => state.tables.players);
    const oldMessages = useSelector(state => state.messages.messages);
    const [recipientList, setRecipientList] = useState([]);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [username, setUsername] = useState('');
    const [recipient, setRecipient] = useState('');
    const socket = io('http://localhost:5000');

    const saveMessage = async(message) => {
      const response = await fetch(`/api/messages/${sessionUser.id}/${recipient.id}`, {
          method: "POST",
          headers: { "Content-Type": "application/json", "XSRF-Token": `${Cookies.get('XSRF-TOKEN')}` },
          body: JSON.stringify({
            message
          })
        });
        if (response.ok) {
          const messagesFromServer = await response.json();
          console.log('FROM SERVER', messagesFromServer)
        }
};

    socket.on('broadcast-chat-message', function(broadcastedMessage) {
      console.log('broadcastedMessage***', broadcastedMessage)
      let messageJSON = JSON.parse(broadcastedMessage);
      let message = messageJSON.data;
      message.createdAt = new Date(message.createdAt);
      console.log('message structure', message);
      setMessages([...messages, message]);
  });


    const initSocket = () => {
        socket.on('connect', () => {
          console.log('socket connected');
          const jsonData = JSON.stringify({data: { User: { id: sessionUser.id }, Recipient: { id: recipient.id }}})
          console.log('recipient', recipient.id)
          console.log(jsonData);
          socket.emit('private-chat', jsonData )

          const getOldMessages = async() => {
                    const data = await fetch(`/api/messages/${sessionUser.id}`);
                    if (data.ok) {
                        const oldMessages = await data.json();
                        setMessages([...oldMessages.rows]);
                    }
                };
                getOldMessages();
                console.log('Old Messages', oldMessages);

              });
  }

    useEffect(() => {
      if (recipient !== undefined) {
        initSocket();
        console.log('connect');
      }
        console.log('Recipient....', recipient)
    },[recipient.id])


    const sessionUser = useSelector((state) => state.session.user);

    useEffect(() => {

        if (sessionUser) {
        setUsername(sessionUser.username);
        dispatch(getFellowPlayers());
        dispatch(loadUserMessages(sessionUser.id));
        }
        if (sessionUser === undefined) {
            setMessages([]);
        }
  }, [dispatch, sessionUser])

  useEffect(() => {
      if (playerLists !== undefined) {
          if (playerLists.length > 0) {
              console.log(playerLists)

              const players = playerLists.map(list => list.Table.PlayerLists);
              let joinedPlayerList = [];
              for (let i = 0; i < players.length; i++) {
                joinedPlayerList = joinedPlayerList.concat(players[i]);
              }

              //filter current player out of contact list
              const filteredList = joinedPlayerList.filter( item => item.playerId !== sessionUser.id )
              const hosts = playerLists.map(list => list.Table);
              filteredList.concat(hosts);

              const deDupe = filteredList.filter((v,index,a)=>a.findIndex(t=>( t.playerId === v.playerId ))===index)


              console.log('PLAYERS', deDupe)
              console.log('HOSTS', hosts);

              setRecipientList([...deDupe]);
            }
          }
  },[playerLists])

  useEffect(() => {
    if(!username) {
      return;
    }
  },[])

  useEffect(() => {
    console.log('useeffect triggered');
    if (socket !== null ) {
      console.log('NOT NULL', socket)
  }
}, [messages, sessionUser]);



const handleSendMessage = (message) => {
    const newMessage = {
      id: sessionUser.id,
      uuid: uuid(),
      username,
      Recipient: recipient,
      User: sessionUser,
      content: message,
      createdAt: new Date(),
    }

    const jsonNewMessage = JSON.stringify({
      data: newMessage,
    });

    saveMessage(newMessage.content);
    socket.emit('send-chat-message', jsonNewMessage);
  }

const handleLeave = () => {
  setUsername('');
};

    const handleOnChange = (e) => {
        setMessage(e.target.value);
    }

    useEffect(() => {
        dispatch(getAllTables());
        if (sessionUser) {
            const getMessages = async() => {
                const data = await fetch('/api/messages');
                const messages = await data.json();
            }
            getMessages();
        }
      }, [dispatch, sessionUser]);

      if ( recipientList.length === 0 ) {
          return (
              <div className="container"><p>You can't message anyone until you join a game. Join some games, and then you will be able to message your fellow players!</p></div>
          )
      }

    return (
        <div className="container">
        <div>
            <h2>Contacts</h2>
            {/* {hosts.map(host => <div onClick={() =>setRecipient(host)}>{host.username}</div>)} */}
            {recipientList.map(recipient => <div onClick={() =>setRecipient(recipient.User)}>{recipient.User.username}</div>)}
        </div>
        {/* {recipientList.map(recipient => {console.log(recipient)})} */}
        <div>
            {recipient && (<div><Conversation username={username}
            recipient={recipient}
            messages={messages.filter(message => (message.Recipient.username === username && message.User.username === recipient.username)
                || (message.User.username === username && message.Recipient.username === recipient.username))}
            handleSendMessage={handleSendMessage}
            handleOnChange={handleOnChange} /></div>)}
        </div>
     </div>
    )
}

export default Messages;
