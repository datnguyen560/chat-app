import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/authContext";
import { chatContext } from "../context/chatContext";

function Message({message}) {

    const {currentUser} = useContext(AuthContext);
    const { data } = useContext(chatContext);
    
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
            <span>Vừa xong</span>
        </div>
        <div className="messageContent">
            <p>{message.text}</p>
            {message.img && <img src={message.img} alt="aa"/>}
        </div>
    </div> );
}

export default Message;