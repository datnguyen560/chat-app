import addAvatar from "../img/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth, db} from '../firebase';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {doc, setDoc} from "firebase/firestore";



function Register() {

    const [err, setErr] = useState(false);
    const navigate = useNavigate();
    // đăng ký email cho người mới
    const handleSubmit = async (e) => {
        e.preventDefault();
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const phone = e.target[3].value;
        const file = e.target[4].files[0];
        try {
        const res = await createUserWithEmailAndPassword(auth, email, password)

        const storage = getStorage();
        const storageRef = ref(storage, displayName, phone);

        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on('state_changed', 
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                    default:
                        console.log('Upload');
                    }
            }, 
            (error) => {
                setErr(true);
            }, 
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    await updateProfile(res.user, {
                        displayName,
                        phone,
                        photoURL: downloadURL,
                    });
                await setDoc(doc(db, "users", res.user.uid),{
                    uid: res.user.uid,
                    displayName,
                    phone,
                    email, 
                    photoURL: downloadURL,
            
                })
                await setDoc(doc(db, "userChats", res.user.uid),{})
                    navigate("/login");
                });
            }
            );
            } catch {
                setErr(true);
            }
        }

    return ( 
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">
                    DatNguyen Chat
                </span>
                <span className="title">Đăng ký</span>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Tên hiển thị"/>
                    <input type="email" placeholder="Nhập email"/>
                    <input type="password" placeholder="Nhập password"/>
                    <input type="text" placeholder="Nhập số điện thoại"/>
                    <input style={{display:"none"}} type="file" id='file'/>
                    <label htmlFor="file">
                        <img src={addAvatar} alt='aa'/>
                        Thêm hình ảnh
                    </label>
                    <button>Đăng ký</button>
                    {err && <span>Something went wrong</span>}
                </form>
                <p>Bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link></p>
            </div>
        </div>
     );
}

export default Register;