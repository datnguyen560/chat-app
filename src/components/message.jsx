import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/authContext";
import { chatContext } from "../context/chatContext";

function Message({message}) {


    const {currentUser} = useContext(AuthContext);
    const { data } = useContext(chatContext);

    const timestamp = message.date;
    const date = timestamp.toDate();
    const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    const formattedTime = `${hours}:${minutes}`;
    const ref = useRef();

    useEffect(() => {
        ref.current?.scrollIntoView({behavior: "smooth"});
    }, [message]);
    
   

    return ( 
    <div ref={ref} 
        className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
        <div className="messageInfo">
            <img src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL} alt="aa"/>
            <span>{formattedTime}</span>
        </div>
        <div className="messageContent">
            <p>{message.text}</p>
            {message.img && <img src={message.img} alt="aa"/>}
        </div>
    </div> );
}

export default Message;