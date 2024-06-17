import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../firebase";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {


    const [err, setErr] = useState(false);
    const navigate = useNavigate();
    const handleSignin = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;
        try {
            await signInWithEmailAndPassword(auth, email, password) // xác thực khi hợp lệ thì chuyến hướng
            navigate('/');
        } catch(err) {
            setErr(true);
        }

    }
    return ( 
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">
                    DatNguyen Chat
                </span>
                <span className="title">Đăng Nhập</span>
                <form onSubmit={handleSignin} >
                    <input type="email" placeholder="Nhập email" autoComplete='on'/>
                    <input type="password" placeholder="Nhập password"/>
                    <button>Đăng nhập</button>
                    {err && <span>Sai tài khoản hoặc mật khẩu</span>}
                </form>
                <div className="signin">
                    <button className="title" >Đăng nhập với Facebook</button>
                    <button className="title" >Đăng nhập với Google</button>
                </div>
                <p>Bạn đã có tài khoản? <Link to="/register">Đăng ký</Link></p>
            </div>
        </div>
    );
}

export default Login;