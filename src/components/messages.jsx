import { useContext, useEffect, useState } from "react";
import Message from "./message";
import { chatContext } from "../context/chatContext";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../firebase";

function Messages() {
    const [messages, setMessages] = useState([]);
    const { data } = useContext(chatContext);

    useEffect (() => {
        const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
            doc.exists() && setMessages(doc.data().messages)

        });

        return () => {
            unsub();
        }
    }, [data.chatId]);
    return ( 
        <div className="messages">
            {messages.map( m => ( 
                <Message message={m} key={m.id}/>
            ))}
        </div>
     );
}

export default Messages;