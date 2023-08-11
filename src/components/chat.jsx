import React, { useContext } from 'react'
import Add from "../images/add.png";
import Cam from "../images/cam.png";
import More from "../images/more.png";
import Messages from './messages';
import Input from './input';
import { ChatContext } from '../context/ChatContext';

const Chat = () => {
    const { data } = useContext(ChatContext)
    return (
        <div className='chat'>
            <div className="chatinfo">
                <span>{data.user?.displayName}</span>
                <div className="chaticons">
                    <img src={Cam} alt="" />
                    <img src={Add} alt="" />
                    <img src={More} alt="" />
                </div>
            </div>
            <Messages />
            <Input />
        </div>
    )
}

export default Chat