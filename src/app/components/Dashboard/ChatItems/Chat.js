"use client";

import { useState, useEffect, useRef } from 'react';
import { fetchDataFromApi } from '/src/utils/apiUtils';
import { useSession } from "next-auth/react";
import { Modal } from '/src/app/components/utility/Modal';
import { getTimeFormatted } from '/src/utils/mainContentUtil';
import io from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';

export default function Chat() {
  const { data: session } = useSession();
  const [users, setUsers] = useState([]); // Displaying in UI
  const [showModal, setShowModal] = useState({ type: '',show: false,message: ''});

  const [currentUser, setCurrentUser] = useState(null); // Stores current authenticated User

  // Message states
  const [message, setMessage] = useState(""); // USER MESSAGE INPUT
  const [chatMessages, setChatMessages] = useState([]); // CHATROOM MESSAGES
  const [selectedRoom, setSelectedRoom] = useState(null); // SELECTED ROOM/CHAT
  const [selectedUsers, setSelectedUsers] = useState([]); // SELECTED USERS TO CHAT

  const [userStatuses, setUserStatuses] = useState({});  // TO STORE CHAT WITH OR NOT
  const socketRef = useRef(null); // SOCKET REFERENCE

  useEffect(() => {
    // Async function to fetch all chat statuses at once
    const fetchStatuses = async () => {
      const statuses = {};

      // Fetch status for each user asynchronously
      for (const user of users) {
        if (user._id !== currentUser) {
          statuses[user._id] = await fetchChatRoomStatus(currentUser, user._id);  // Store the status
        }
      }

      setUserStatuses(statuses);  // Update the state with all statuses
    };

    fetchStatuses();
  }, [users, currentUser]); 


  // WHEN CHANGING ROOM, JOIN ROOM AND FETCH MESSAGES ( PROBLEM HERE BTW TO FIX LATER)
  useEffect(() =>{
    if (selectedRoom){
      console.log("Room Change, new ID for ",selectedUsers, " is: ", selectedRoom);
      joinRoom(selectedRoom);
      fetchMessages();
    }
    return () => {
      if (selectedRoom) {
        leaveRoom(selectedRoom);
      }
    };
  },[selectedRoom])

  // STARTS SOCKET, SAVES CURRENT USER, SETS SELECTED USERS TO ITSELF AND THE ROOM TO ITSELF, FETCHES USERS
  useEffect(() => {
    if (session?.user?.id) {
      serverConnection(session.user.id, 'connect');
      setCurrentUser(session.user.id);
      setSelectedUsers([session.user.id]);
      setSelectedRoom(session.user.id);
      fetchUsers();
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.off('receiveMessage');
        socketRef.current.disconnect();
        console.log("Disconnected from server");
      }
    };
    
  },[])

  // FETCH FOR USERS
  const fetchUsers = async () => {
    try {
        const response = await fetchDataFromApi("/api/User");
        setUsers(response || []);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
  };

  // CHECK IF CHATROOM EXISTS FOR BOTH USERS 
  const fetchChatRoomStatus = async (currentUser, userMapped) => {
    const response = await fetch(`/api/Chatroom/CheckIfPresent?currentUser=${currentUser}&userMapped=${userMapped}`);
    const data = await response.json();
    return data.roomExists;
  };

  // FETCH FOR MESSAGES
  const fetchMessages = async () => {
    try {
      const response = await fetchDataFromApi(`/api/Chat/?chatroomId=${selectedRoom}`);
      setChatMessages(response || []);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
  };

  // SOCKET CONNECTION AND LISTENERS
  const serverConnection = (userID, action) => {
    try {
      if (action === 'connect') {
        
        socketRef.current = io('http://localhost:3000', {
          path: '/api/Socket',
          query: { userID },
        });

        socketRef.current.on("receiveMessage", (messageData) => {
          const tempId = uuidv4(); // Generate a random ID for the user
          console.log("New message received:", messageData);
          
          const formattedMessage = {
            _id: tempId,
            chatroomId: messageData.chatId,  
            files: [],  
            message: messageData.message, 
            sender: messageData.user,  
            timestamp: messageData.timestamp,  
          };

          setChatMessages((prevMessages) => [...prevMessages, formattedMessage]);
        });

        }
       else if (action === 'disconnect') {
        if (socketRef.current) {
          socketRef.current.off('receiveMessage');
          socketRef.current.disconnect();
          console.log("Disconnected from server");
        }
      }
    } catch (error) {
      console.error('Error connecting to server:', error);
    }
  };

  // SEND MESSAGE
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
          selectedUsers: selectedUsers,
        }),
      });

      const result = await response.json();
        if (result.error) {
          setShowModal({type: 'error', show: true, message: 'Error sending message. Try Again!'});
          return;
        }
      socketRef.current.emit("sendMessage", selectedRoom , message, currentUser);
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
      setShowModal({type: 'error', show: true, message: 'Error sending message. Try Again!'});
    }
  }
  

  // HANDLES CHAT SWITCHING
  const handleSwitchChat = async (user) => {
    const updatedUsers = [currentUser, user];  // Only keep current user & selected user

    setSelectedUsers(updatedUsers);  // Update state

    try {
      const response = await fetchDataFromApi(`/api/Chatroom/Verify?selectedUsers=${JSON.stringify(updatedUsers)}`);
      setSelectedRoom(response ? response : []);
    } catch (error) {
        console.error('Error confirm or generating Chatroom ID:', error);
    }
  }

  // JOIN AND LEAVE ROOM
  const joinRoom = (room) =>{ socketRef.current.emit("joinChat", room);}
  const leaveRoom = (room) =>{ socketRef.current.emit("leaveChat", room);}

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
                    const together = userStatuses[user._id];

                    // If the user is not in a chatroom together with the current user, skip this user
                    if (!together) return null;

                    return (
                      <div key={user._id} className={`d-flex align-items-center w-100 mt-1 ms-2 ps-3 pe-3 chatItems ${selectedUsers.includes(user._id) ? "active": ""}`} onClick={() => handleSwitchChat(user._id)}>
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

                  {users.filter(user => user._id !== currentUser).map((user,index) => {
                    return(
                      <div key={user._id} className={`d-flex align-items-center w-100 mt-2 ms-2 ps-3 pe-3 chatItems ${selectedUsers.includes(user._id) ? "active": ""}`} onClick={() => handleSwitchChat(user._id)}>
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
                    <span className="personName">{selectedUsers.length === 1 
                      ? users.find(user => user._id === selectedUsers[0])?.firstName + " (Me)"
                      : users.find(user => user._id === selectedUsers[1])?.firstName}</span>
                    <span className="description">{selectedUsers.length === 1 
                      ? users.find(user => user._id === selectedUsers[0])?.role 
                      : users.find(user => user._id === selectedUsers[1])?.role}</span>
                  </div>
              </div>
              <div className="d-flex align-items-center float-right gap-3 pe-3">
                <a href={selectedUsers.length === 1 
                      ? "tel:" + users.find(user => user._id === selectedUsers[0])?.phone
                      : "tel:" + users.find(user => user._id === selectedUsers[1])?.phone} style={{ textDecoration: 'none' }}><i className="ri-phone-line" ></i></a>
                <i className="ri-video-chat-line"></i>
                <i className="ri-information-line"></i>
                <i className="fas fa-ellipsis-v"></i>
              </div>
            </div>


            <div className="d-flex flex-column chatSection w-100 h-100">
              <div className="chatHistory h-100 overflow-auto">
                {chatMessages.length === 0 ? (
                  <div className="d-flex justify-content-center align-items-center h-100 selfChat">
                    {selectedUsers.length === 1 ? (
                      "Choose a chat to start messaging or store messages for yourself here."
                    ) : (
                      `Send a message to start chatting with ${users.find(user => user._id === selectedUsers[1])?.firstName}!`
                    )}
                  </div>
                ) : (  
                  <ul className='p-0 ps-3'>
                    {chatMessages.map((message) => {
                    const isMessageMine = message.sender === currentUser;
                    const time = getTimeFormatted(message.timestamp);
                    return(
                      <li key={message._id} className={`d-flex justify-content-${isMessageMine ? "end": "start"}  h-100 mt-3 ps-3 pe-2`} >
                        <div className={`d-flex ${isMessageMine ? "flex-row-reverse" : ""}`}>
                            <img src="/assets/images/profile-icon.png" className="iconProfileMsg" alt="Profile Icon" />
                            <div className="d-flex flex-column ps-3 pe-3">
                              <div className={`message ${isMessageMine ? "myMessage": ""}`}>
                                <p className='m-0'>{message.message}</p>
                              </div>
                              <div className={`d-flex justify-content-${isMessageMine ? "end": "start"} mt-1 ms-2` }>
                                <span className="text-muted timeMsg">{time}</span>
                              </div>
                            </div>
                        </div>
                      </li>
                    );
                    })}
                  </ul>
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