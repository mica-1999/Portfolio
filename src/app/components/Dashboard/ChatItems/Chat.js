"use client";

import { useState, useEffect, useRef } from 'react';
import { fetchDataFromApi } from '/src/utils/apiUtils';
import { useSession } from "next-auth/react";
import { Modal } from '/src/app/components/utility/Modal';
import io from 'socket.io-client';

export default function Chat() {
  const { data: session } = useSession();
  const [users, setUsers] = useState([]); 

  const [showModal, setShowModal] = useState({ type: '',show: false,message: ''});

  const [currentUser, setCurrentUser] = useState(null);
  const [activeChat, setactiveChat] = useState(false);
  // Message states
  const [message, setMessage] = useState(""); // USER MESSAGE INPUT
  const [messages, setMessages] = useState([]); // ALL MESSAGES
  const [chatMessages, setChatMessages] = useState([]); // CHATROOM MESSAGES
  const [selectedRoom, setSelectedRoom] = useState(null);
  

  const socketRef = useRef(null);

  // Loading and Fetch Error
  const [loading, setLoading] = useState(false); // Loading state
  const [fetchError, setFetchError] = useState(''); // Fetch error

  // Fetches when a new room is selected
  useEffect(() =>{
    fetchMessages();
  },[selectedRoom])

    // Fetches when a new room is selected
    useEffect(() =>{
      console.log(chatMessages)
    },[chatMessages])

  useEffect(() => {
    if (session?.user?.id) {
      serverConnection(session.user.id, 'connect');
      setCurrentUser(session.user.id);
      setSelectedRoom(session.user.id);
      fetchUsers();
    }

    return () => {
      serverConnection('disconnect');
    };
    
  },[])

  // Fetch from MongoDB
  const fetchUsers = async () => {
    setLoading(true);
    setFetchError('');  
    try {
        const response = await fetchDataFromApi("/api/User");
        setUsers(response || []);
    } catch (error) {
        console.error('Error fetching data:', error);
        setFetchError('Failed to load users. Please try again.');
    } finally {
        setLoading(false);
    }
  };

  // Fetch from MongoDB
  const fetchMessages = async () => {
    setLoading(true);
    setFetchError('');  
    try {
        if (selectedRoom) {
          const response = await fetchDataFromApi(`/api/Chat/?chatroomId=${selectedRoom}`);
          setChatMessages(response || []);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        setFetchError('Failed to load messages. Please try again.');
    } finally {
        setLoading(false);
    }
  };

  const serverConnection = (userID, action) => {
    try {
      if (action === 'connect') {
          socketRef.current = io('http://localhost:3000', {
            path: '/api/Socket',
            query: { userID },
          });
          socketRef.current.on('connect', () => {
            console.log('Connected to server with ID: ' + socketRef.current.id);
          });
        }
       else if (action === 'disconnect') {
        socketRef.current.disconnect();
        console.log("Disconnected from server");
      }
    } catch (error) {
      console.error('Error connecting to server:', error);
    }
  };

  const handleMessageSend = async (e) => {
    e.preventDefault();
    
    if (!currentUser || !message) {
      console.error("Message or current user is not available.");
      return;
    }

    try {
      const response = await fetch(`/api/Chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: message,
          userId: currentUser,
          chatroomId: selectedRoom,
        }),
      });

      const result = await response.json();
        if (result.error) {
          setShowModal({type: 'error', show: true, message: 'Error sending message. Try Again!'});
          return;
        }
    } catch (error) {
      console.error("Error sending message:", error);
      setShowModal({type: 'error', show: true, message: 'Error sending message. Try Again!'});
    }
    socketRef.current.emit("sendMessage", selectedRoom , message, currentUser);
  }
  
  return(
    <div className="d-flex col-lg-12 mt-1 p-4">
      <div className="card flex-grow-1 p-0 chatApp" >
        <div className="row h-100 m-0" >
          {/* Chat and Contacts Section */}
            <div className="col-lg-3 p-0 d-flex flex-column searchSection h-100 m-0 border-end">
              <div className="d-flex justify-content-between align-items-center border-bottom p-3 searchDiv">
                <img src="/assets/images/profile-icon.png" className="profile-icon" alt="Profile Icon" />
                <input type="text" className="form-control ms-3 searchContChat" placeholder="Search..." />
              </div>
            
              <div className="h-100 overflow-auto">
                <div className="d-flex flex-column ps-1 pe-3">
                  <h5 className="title pt-4 ps-4">Chats </h5>

                  {users.filter(user => user._id !== currentUser).map((user) => {
                    return (
                      <div key={user._id} className={`d-flex align-items-center w-100 mt-1 ms-2 ps-3 pe-3 chatItems`} onClick={() => setactiveChat(true)}>
                        <img src="/assets/images/profile-icon.png" className="profile-icon" alt="Profile Icon" />
                        <div className="d-flex flex-column ps-3 justify-content-center">
                            <span className="personName">{user.firstName + " " + user.lastName}</span>
                            <span className="description">Message </span>
                        </div>
                        <span className="ms-auto align-self-start text-muted">time ago</span>
                      </div>
                    )
                  })}
                </div>

                <div className="d-flex flex-column ps-1 pe-3">
                  <h5 className="title pt-4 ps-4">Contacts </h5>

                  {users.map((user,index) => {
                    return(
                      <div key={user._id} className={`d-flex align-items-center w-100 mt-2 ms-2 ps-3 pe-3 chatItems `}>
                        <img src="/assets/images/profile-icon.png" className="profile-icon" alt="Profile Icon" />
                        <div className="d-flex flex-column ps-3 justify-content-center">
                            <span className="personName">{user.firstName + " " + user.lastName}</span>
                            <span className="description">{user.role}</span>
                        </div>
                      </div>
                    )
                  })}       
                </div>
              </div>
            </div>



          <div className="col-lg-9 p-0 d-flex flex-column rightCol">
            <div className="d-flex ps-4 pe-4 justify-content-between align-items-center border-bottom headerDiv">
              <div className="d-flex align-items-center">
                  <img src="/assets/images/profile-icon.png" className="profile-icon" alt="Profile Icon" />
                  <div className="d-flex ps-2 flex-column">
                    <span className="personName">Person Name</span>
                    <span className="description">Role</span>
                  </div>
              </div>
              <div className="d-flex align-items-center float-right gap-4 pe-3">
                <i className="ri-phone-line"></i>
                <i className="ri-video-chat-line"></i>
                <i className="ri-information-line"></i>
                <i className="fas fa-ellipsis-v"></i>
              </div>
            </div>


            <div className="d-flex flex-column chatSection w-100 h-100">
              <div className="chatHistory h-100">
                {!activeChat ? (
                  <div className="d-flex justify-content-center align-items-center h-100 selfChat">
                    Choose a chat to start messaging or store messages for yourself here.
                  </div>
                ) : (  
                  chatMessages.map((message) => {
                    return(
                      <ul key={message._id}>
                        <li className="d-flex justify-content-start h-100 mt-3">
                          <img src="/assets/images/profile-icon.png" className="iconProfileMsg" alt="Profile Icon" />
                          <div className="d-flex flex-column ps-2">
                            <div className="message">
                              <p>{message.message}</p>
                            </div>
                            <div className="d-flex justify-content-start">
                            <span className="text-muted timeMsg">10:15 AM</span>
                            </div>
                          </div>
                        </li>
                      </ul>
                    )
                  })
                )}
              </div>
              <div className="d-flex align-items-center messageDiv p-4">
                <form className="d-flex w-100 align-items-center sendMessageForm p-2 ps-4" onSubmit={handleMessageSend}>
                    <input type="text" className="sendMessageInput" name="message" value={message} placeholder="Type your message here..." aria-label="Recipient's username" onChange={(e) => setMessage(e.target.value)}/>
                    <div className='d-flex gap-3 pe-3'>
                      <i className="ri-mic-line"></i>
                      <i className="ri-link"></i>
                    </div>
                    <button className="btn sendBtn" type="submit">Send</button>
                </form>            
              </div>
            </div>
            
          </div>
        </div>
      </div>

    </div>
  );
}