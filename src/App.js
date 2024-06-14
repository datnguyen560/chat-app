import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './style.scss';
import Login from "./pages/login";
import Register from "./pages/Register";
import Home from './pages/Home';
import { useContext } from "react";
import { AuthContext } from "./context/authContext";
function App() {

  const {currentUser} = useContext(AuthContext);
  const ProtectRoute = ({children}) => {
    if(!currentUser) {
      console.log('coloi');
      return <Navigate to="/login"/>;
      
    } 
    return children;
  }

  return (
    <BrowserRouter>
       <Routes>
           
               <Route path="/" element={<ProtectRoute><Home/></ProtectRoute>}/>
               <Route path="/login" element={<Login/>}/>
               <Route path="/register" element={<Register/>}/> 
            
       </Routes>
    </BrowserRouter>
  );
}

export default App;
