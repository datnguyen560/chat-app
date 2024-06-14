
import Chats from "./Chats";
import Navbar from "./navbar";
import Search from './search';

function Sidebar() {
    return ( 
    <div className="sidebar">
       <Navbar/>
       <Search/>
       <Chats/>
    </div> );
}

export default Sidebar;