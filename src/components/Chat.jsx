import { useContext } from 'react';
import add from '../img/add.png';
import cam from '../img/cam.png';
import more from '../img/more.png';
import Iinput from './input';
import Messages from './messages';
import { chatContext } from '../context/chatContext';


function Chat() {
  const {data} = useContext(chatContext);


    return ( 
    <div className="chat">
       <div className="chatInfo">
          <span>{data.user?.displayName}</span>
          <div className="chatIcons">
            <img title='Video Call' src={cam} alt='aa'/>
            <img title='Thêm bạn' src={add} alt='aa'/>
            <img title= 'Thêm' src={more} alt='aa'/>
          </div>
        </div>
          <Messages/>
          <Iinput/>
        </div> 
        );
}

export default Chat;