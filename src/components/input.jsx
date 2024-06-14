
import React from 'react';
import attach from '../img/attach.png';
import img from '../img/img.png';
import { AuthContext } from "../context/authContext";
import { chatContext } from "../context/chatContext";
import { useState, useContext } from 'react';
import { serverTimestamp, Timestamp ,updateDoc, doc, arrayUnion } from 'firebase/firestore';
import { v4 as uuid} from 'uuid';
import { db, storage } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


function Iinput() {

    const [text, setText] = useState("");
    const [imgs, setImgs] = useState(null);
    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(chatContext);

    const handleSend = async () => {
    if (imgs) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, imgs);

      uploadTask.on(
        
        (error) => {
        },
        
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
        
      );
      console.log('co hinh');
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
    setText("");
    setImgs(null);
    
  };

  const handleKeydown = (e) => {
      
        e.code === 'Enter' && handleSend();
    
  }


    return ( 
            <div className="input">
                <input 
                type="text" 
                placeholder="Nhập tin nhắn..." 
                value={text} 
                onKeyDown={handleKeydown} 
                onChange={e => setText(e.target.value)}
                />
                <div className="send">
                    <img src={attach} alt='aa'/>
                    <input 
                    style={{display:'none'}} 
                    type="file" id='file' 
                    onChange={e => setImgs(e.target.files[0])}
                    />
                    <label htmlFor="file">
                        <img src={img} alt='aa'/>
                    </label>
                    <button onClick= {handleSend}>Gửi</button>
                </div>
            </div>
        );

    }

export default Iinput;