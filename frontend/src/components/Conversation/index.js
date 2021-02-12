import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getAllTables } from "../../store/tables";
// import "./Home.css";

function Conversation({ messages, recipient, username, handleLeave, handleSendMessage}) {

    const sortedMessages = messages.sort((a, b) => {
        let c = new Date(a.createdAt);
    var d = new Date(b.createdAt);
    return c-d
    });
    
    console.log('SORTED', sortedMessages);

    const dispatch = useDispatch();
    const tables = useSelector(state => state.tables.tableList);
    const [message, setMessage] = useState('');

    console.log('conversation messages', messages)

    const handleSendOnClick = () => {
        console.log('conversation message',)
        handleSendMessage(message);
        setMessage('');
    };

    const handleOnChange = (e) => {
        setMessage(e.target.value);
    }

    const handleLeaveOnClick = () => {
        handleLeave();
    }

    useEffect(() => {
        dispatch(getAllTables());
      }, [dispatch]);

    return (
        <>
        {/* eventually map out conversations here by recipient */}
        {/* <Conversation messages={messages}/> */}
        <h2>{username}'s Conversation With {recipient.username}</h2>
        <input type="text" value={message} onChange={handleOnChange} />
        <button type="button" onClick={handleSendOnClick}>Send</button>
        {messages.map(message =>  (
            <p key={message.id}><strong>{message.User.username}</strong>: {message.content}</p>)
            )}
     </>
    )
}

export default Conversation;
