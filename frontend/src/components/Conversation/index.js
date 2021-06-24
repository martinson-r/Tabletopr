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

    const dispatch = useDispatch();
    const tables = useSelector(state => state.tables.tableList);
    const [message, setMessage] = useState('');

    const handleSendOnClick = () => {
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
        {messages.map(message =>  (
            <p key={message.id}><strong>{message.User.username}</strong>: {message.content}</p>)
            )}
        <input type="text" value={message} onChange={handleOnChange} />
        <button type="button" onClick={handleSendOnClick}>Send</button>
     </>
    )
}

export default Conversation;
