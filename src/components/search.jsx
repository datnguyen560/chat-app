import React, {useContext, useState} from "react";
import { db } from "../firebase";
import { collection, getDocs, doc, query, setDoc, where, updateDoc} from "firebase/firestore";
import { getDoc, serverTimestamp  } from "firebase/firestore" ;
import { AuthContext } from "../context/authContext";



function Search() {
    const {currentUser} = useContext(AuthContext);
    const [userName, setUserName] = useState("");
    const [user, setUser] = useState(null);
    const [err, setErr] = useState(false);

    const handleSearch = async () => {
        const q = query(collection(db, "users"), where("displayName", "==", userName));
       try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setUser(doc.data())
            });
        } catch (err) {
            setErr(true);
        }

    }

    const handleKey = (e) => {
        e.code === 'Enter' && handleSearch();
    }

    const handleSelect = async () => {
        const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;

       try {
        const res = await getDoc(doc(db, "chats", combinedId));
        if(!res.exists()) {
            // tạo 1 chat trong chat collection
            await setDoc(doc(db, "chats", combinedId),{ messages: [] });

            // tạo chats người dùng
            await updateDoc(doc(db, "userChats", currentUser.uid), {
                [combinedId + ".userInfo"]: {
                    uid: user.uid,
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                },
                [combinedId + ".date"]: serverTimestamp()
            });
            await updateDoc(doc(db, "userChats", user.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: currentUser.uid, 
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL,
                    },
                    [combinedId + ".date"]: serverTimestamp()
            });
        }
        } catch (err) {

        }
        setUser(null);
        setUserName("");

    }
    return ( 
        <div className="search ">
            <div className="searchForm">
                <input type="text" placeholder="Tìm kiếm" 
                onKeyDown={handleKey} 
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
                />
            </div>
            {err && <span>Không tìm thấy</span>}
            {user && <div className="userChat" onClick={handleSelect}>
                <img src={user.photoURL} alt='aa'/>
                <div className="userChatInfo">
                    <span>{user.displayName}</span>
                </div>
            </div>}
        </div>
     );
}

export default Search;