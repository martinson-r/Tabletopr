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
const socketUrl = "http://localhost:5000";

function Messages() {

    const dispatch = useDispatch();

    const tables = useSelector(state => state.tables.tableList);
    const playerLists = useSelector(state => state.tables.players);
    const oldMessages = useSelector(state => state.messages.messages);
    const [recipientList, setRecipientList] = useState([]);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [username, setUsername] = useState('');
    const [recipient, setRecipient] = useState('');

    const initSocket = () => {
        const socket = io(socketUrl);
        socket.on('connect', () => {
            console.log('connected');
        })
    }


    useEffect(() => {
        console.log('Recipient....', recipient)
    },[recipient])


    const sessionUser = useSelector((state) => state.session.user);

    useEffect(() => {

        if (sessionUser) {
        initSocket();
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

    // socket.on('connect', function(){
    //     const getOldMessages = async() => {
    //         const data = await fetch(`/api/messages/${sessionUser.id}`);
    //         if (data.ok) {
    //             const oldMessages = await data.json();
    //             setMessages([...oldMessages]);
    //             console.log('OLD MESSAGES', oldMessages);
    //             console.log('MESSAGES AFTER SET', messages)
    //         }
    //     }
    //     getOldMessages();
    // });

    // },[username]);

//   useEffect(() => {
//     console.log('useeffect triggered');
//     if (webSocket.current !== null) {
//         console.log('NOT NULL', webSocket.current);
//           webSocket.current.onmessage = (event) => {
//           const chatMessage = JSON.parse(event.data);
//           const message = chatMessage.data;

//           //date was JSON formatted, we need to convert it back to a Date object.
//           message.created = new Date(message.created);
//             // if ((message.recipient === username) || (message.username === username)) {
//                 setMessages([...messages, message]);
//         //   }
//         console.log('Message structure', message)
//         }
//     }
}, [messages, sessionUser])



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
      type: 'send-chat-message',
      data: newMessage,
    });

    console.log(`Sending message ${jsonNewMessage}...`);
    // socket.io.emit(jsonNewMessage);


    const saveMessage = async() => {
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
            // dispatch(loadAllMessages(messagesFromServer));
          }
        }
        saveMessage();

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
    }

    const handleLeaveOnClick = () => {
        handleLeave();
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
