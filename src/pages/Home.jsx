import Chat from "../components/Chat";
import Sidebar from "../components/sidebar";

function Home() {
    return ( 
        <div className="home">
            <div className="container">
                <Sidebar/>
                <Chat/>
            </div>
        </div>
     );
}

export default Home;