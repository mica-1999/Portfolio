"use client";

import { useState, useEffect, useRef } from 'react';
import { fetchDataFromApi } from '/src/utils/apiUtils';
import { useSession } from "next-auth/react";
import { getTimeFormatted } from '/src/utils/mainContentUtil';
import io from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';

export default function Chat() {
  const { data: session } = useSession();
  const [users, setUsers] = useState([]);
  const [searchSection, setSearchSection] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [userStatuses, setUserStatuses] = useState({});
  const [chatroomIds, setChatroomIds] = useState({});
  const [lastMessages, setLastMessages] = useState({});
  const [typing, setTyping] = useState(false);
  const [personTyping, setPersonTyping] = useState('');
  
  const socketRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const chatHistoryRef = useRef(null);

  // Initialize socket connection and fetch users when session is available
  useEffect(() => {
    if (!session?.user?.id) return;
    
    const userId = session.user.id;
    
    // Initialize user data
    setCurrentUser(userId);
    setSelectedUsers([userId]);
    setSelectedRoom(userId);
    
    // Fetch users and establish socket connection
    fetchUsers();
    initializeSocket(userId);
    
    // Cleanup function
    return () => {
      if (socketRef.current) {
        socketRef.current.off('receiveMessage');
        socketRef.current.off('userTyping');
        socketRef.current.off('stopTyping');
        socketRef.current.disconnect();
      }
      
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [session]);

  // Fetch chat status for all users
  useEffect(() => {
    if (users.length > 0 && currentUser) {
      fetchChatStatusForAllUsers();
    }
  }, [users, currentUser]);

  // Handle room changes
  useEffect(() => {
    if (!selectedRoom) return;
    
    console.log("Room changed:", selectedRoom, "for users:", selectedUsers);
    joinRoom(selectedRoom);
    fetchMessages();
    
    return () => {
      if (selectedRoom) {
        leaveRoom(selectedRoom);
      }
    };
  }, [selectedRoom]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [chatMessages]);

  // Socket initialization
  const initializeSocket = (userId) => {
    try {
      socketRef.current = io('http://localhost:3000', {
        path: '/api/Socket',
        query: { userID: userId },
      });

      // Set up event listeners
      socketRef.current.on("receiveMessage", handleIncomingMessage);
      socketRef.current.on("userTyping", (user) => setPersonTyping(`${user} is typing...`));
      socketRef.current.on("stopTyping", () => setPersonTyping(''));
      
      console.log("Socket connection established");
    } catch (error) {
      console.error('Error connecting to socket server:', error);
    }
  };

  // Handle incoming messages from socket
  const handleIncomingMessage = (messageData) => {
    const { chatId, message, user, timestamp } = messageData;
    
    const formattedMessage = {
      _id: uuidv4(),
      chatroomId: chatId,  
      files: [],  
      message: message, 
      sender: user,  
      timestamp: timestamp,  
    };

    setChatMessages((prevMessages) => [...prevMessages, formattedMessage]);
    
    // Update last message for this chat
    if (chatroomIds[user] === chatId) {
      setLastMessages((prev) => ({
        ...prev,
        [user]: { message, timestamp }
      }));
    }
  };

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const response = await fetchDataFromApi("/api/User");
      if (response) {
        setUsers(response);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Fetch chat status for all users
  const fetchChatStatusForAllUsers = async () => {
    try {
      const statuses = {};
      const promises = users
        .filter(user => user._id !== currentUser)
        .map(async (user) => {
          // Fetch chatroom & last message
          await fetchChatroomAndLastMessage(user);
          
          // Fetch chat status
          const status = await fetchChatRoomStatus(currentUser, user._id);
          statuses[user._id] = status;
        });
      
      await Promise.all(promises);
      setUserStatuses(statuses);
    } catch (error) {
      console.error('Error fetching chat statuses:', error);
    }
  };

  // Check if chatroom exists between two users
  const fetchChatRoomStatus = async (currentUser, userMapped) => {
    try {
      const response = await fetch(`/api/Chatroom/CheckIfPresent?currentUser=${currentUser}&userMapped=${userMapped}`);
      const data = await response.json();
      return data.roomExists;
    } catch (error) {
      console.error('Error checking chatroom status:', error);
      return false;
    }
  };

  // Fetch messages for the selected room
  const fetchMessages = async () => {
    if (!selectedRoom) return;
    
    try {
      const response = await fetchDataFromApi(`/api/Chat/?chatroomId=${selectedRoom}`);
      if (response) {
        setChatMessages(response);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  // Fetch chatroom ID and last message
  const fetchChatroomAndLastMessage = async (user) => {
    if (!currentUser || !user._id) return;
    
    try {
      const chatroomId = await verifyChatroom([currentUser, user._id]);
      if (chatroomId) {
        setChatroomIds(prev => ({ ...prev, [user._id]: chatroomId }));
        
        const lastMessage = await fetchLastMessage(chatroomId, [currentUser, user._id]);
        if (lastMessage) {
          setLastMessages(prev => ({ ...prev, [user._id]: lastMessage }));
        }
      }
    } catch (error) {
      console.error('Error fetching chatroom or last message:', error);
    }
  };

  // Fetch last message for a chatroom
  const fetchLastMessage = async (chatroomId, users) => {
    if (!chatroomId) return null;
    
    try {
      const response = await fetch(`/api/Chat/LastMessage?chatroomId=${chatroomId}&selectedUsers=${JSON.stringify(users)}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching last message:', error);
      return null;
    }
  };

  // Verify if chatroom exists, create if not
  const verifyChatroom = async (users) => {
    if (!users || users.length !== 2) return null;
    
    try {
      return await fetchDataFromApi(`/api/Chatroom/Verify?selectedUsers=${JSON.stringify(users)}`);
    } catch (error) {
      console.error('Error verifying chatroom:', error);
      return null;
    }
  };

  // Handle switching between chats
  const handleSwitchChat = async (userId) => {
    if (userId === currentUser) {
      // Switching to self-chat
      setSelectedUsers([currentUser]);
      setSelectedRoom(currentUser);
    } else {
      // Switching to chat with another user
      const updatedUsers = [currentUser, userId];
      setSelectedUsers(updatedUsers);
      
      const chatroom = await verifyChatroom(updatedUsers);
      setSelectedRoom(chatroom || null);
    }
  };

  // Handle sending a message
  const handleMessageSend = async (e) => {
    e.preventDefault();
    
    if (!currentUser || !message.trim() || !selectedRoom) {
      console.error("Cannot send message: missing user, message, or room");
      return;
    }

    try {
      const response = await fetch('/api/Chat', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: message.trim(),
          userId: currentUser,
          chatroomId: selectedRoom,
          selectedUsers: selectedUsers,
        }),
      });

      const result = await response.json();
      if (result.error) {
        console.error("Error sending message:", result.error);
        return;
      }
      
      // Emit the message to other users
      if (socketRef.current) {
        socketRef.current.emit("sendMessage", selectedRoom, message.trim(), currentUser);
      }
      
      // Clear the message input
      setMessage("");
      
      // Stop typing indicator
      handleStopTyping();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Handle message input changes and typing indicators
  const handleMessageInput = (e) => {
    setMessage(e.target.value);

    // Handle typing indicators
    if (!typing && socketRef.current) {
      setTyping(true);
      socketRef.current.emit("typing", selectedRoom, currentUser);
    }

    // Reset typing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    typingTimeoutRef.current = setTimeout(handleStopTyping, 2000);
  };

  // Stop typing indicator
  const handleStopTyping = () => {
    if (typing && socketRef.current) {
      setTyping(false);
      socketRef.current.emit("stopTyping", selectedRoom, currentUser);
    }
  };

  // Join a chat room
  const joinRoom = (room) => {
    if (socketRef.current && room) {
      socketRef.current.emit("joinChat", room);
    }
  };

  // Leave a chat room
  const leaveRoom = (room) => {
    if (socketRef.current && room) {
      socketRef.current.emit("leaveChat", room);
    }
  };

  // Filter users based on search query
  const filteredUserList = users.filter(user => 
    user._id !== currentUser &&
    (user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) || 
     user.lastName.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Get user name by ID
  const getUserName = (userId) => {
    const user = users.find(u => u._id === userId);
    return user ? `${user.firstName} ${user.lastName}` : "Unknown User";
  };

  // Get user role by ID
  const getUserRole = (userId) => {
    const user = users.find(u => u._id === userId);
    return user ? user.role : "";
  };

  // Get user phone by ID
  const getUserPhone = (userId) => {
    const user = users.find(u => u._id === userId);
    return user ? user.phone : "";
  };

  return (
    <div className="d-flex col-lg-12 mt-1 p-4">
      <div className="card flex-grow-1 p-0 chatApp">
        <div className="row h-100 m-0">
          {/* Contacts/Chats Sidebar */}
          <div className={`col-lg-3 p-0 d-flex flex-column searchSection h-100 m-0 border-end ${searchSection ? "show": ""}`}>
            <div className="d-flex justify-content-between align-items-center border-bottom p-3 searchDiv">
              <img src="/assets/images/profile-icon.png" className="profile-icon" alt="Profile" />
              <input 
                type="text" 
                className="form-control ms-3 searchContChat" 
                placeholder="Search contacts..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <i 
                className="ms-3 fa-solid fa-times-circle fa-lg d-none" 
                onClick={() => setSearchSection(false)}
              ></i>
            </div>
            
            <div className="h-100 overflow-auto">
              {/* Active Chats Section */}
              <div className="d-flex flex-column ps-1 pe-3">
                <h5 className="title pt-4 ps-4">Recent Chats</h5>
                {filteredUserList
                  .filter(user => userStatuses[user._id])
                  .map((user) => {
                    const lastMessage = lastMessages[user._id] || {};
                    
                    return (
                      <div 
                        key={user._id} 
                        className={`d-flex align-items-center w-100 mt-2 ms-2 ps-3 pe-3 chatItems ${selectedUsers.includes(user._id) ? "active": ""}`} 
                        onClick={() => handleSwitchChat(user._id)}
                      >
                        <img src="/assets/images/profile-icon.png" className="profile-icon" alt="Profile" />
                        <div className="d-flex flex-column ps-3 justify-content-center">
                          <span className="personName">{`${user.firstName} ${user.lastName}`}</span>
                          <span className="description">
                            {lastMessage.message ? 
                              (lastMessage.message.length > 30 ? 
                                lastMessage.message.slice(0, 30) + "..." : 
                                lastMessage.message) : 
                              "No messages yet"}
                          </span>
                        </div>
                        {lastMessage.timestamp && (
                          <span className="ms-auto align-self-start text-muted">
                            {getTimeFormatted(lastMessage.timestamp)}
                          </span>
                        )}
                      </div>
                    );
                  })}
              </div>

              {/* All Contacts Section */}
              <div className="d-flex flex-column ps-1 pe-3">
                <h5 className="title pt-4 ps-4">All Contacts</h5>
                {filteredUserList.map((user) => (
                  <div 
                    key={user._id} 
                    className={`d-flex align-items-center w-100 mt-2 ms-2 ps-3 pe-3 chatItems ${selectedUsers.includes(user._id) ? "active": ""}`} 
                    onClick={() => handleSwitchChat(user._id)}
                  >
                    <img src="/assets/images/profile-icon.png" className="profile-icon" alt="Profile" />
                    <div className="d-flex flex-column ps-3 justify-content-center">
                      <span className="personName">{`${user.firstName} ${user.lastName}`}</span>
                      <span className="description">{user.role || "User"}</span>
                    </div>
                  </div>
                ))}       
              </div>
            </div>
          </div>

          {/* Chat Area */}
          <div className="col-lg-9 p-0 d-flex flex-column rightCol">
            {/* Chat Header */}
            <div className="d-flex ps-4 pe-4 justify-content-between align-items-center border-bottom headerDiv">
              <div className="d-flex align-items-center">
                <i 
                  className="fa-solid fa-bars chat-bar fa-lg me-3 d-none" 
                  onClick={() => setSearchSection(true)}
                ></i>
                <img src="/assets/images/profile-icon.png" className="profile-icon" alt="Profile" />
                <div className="d-flex ps-2 flex-column">
                  <span className="personName">
                    {selectedUsers.length === 1 
                      ? `${getUserName(selectedUsers[0])} (Me)`
                      : getUserName(selectedUsers[1])}
                  </span>
                  <span className="description">
                    {selectedUsers.length === 1 
                      ? getUserRole(selectedUsers[0])
                      : getUserRole(selectedUsers[1])}
                  </span>
                </div>
              </div>
              
              {/* Actions Menu */}
              <div className="d-flex align-items-center float-right gap-3 pe-3">
                <a 
                  href={`tel:${selectedUsers.length === 1 
                    ? getUserPhone(selectedUsers[0])
                    : getUserPhone(selectedUsers[1])}`} 
                  style={{ textDecoration: 'none' }}
                >
                  <i className="ri-phone-line"></i>
                </a>
                <i className="ri-video-chat-line"></i>
                <i className="ri-information-line"></i>
                <i className="fas fa-ellipsis-v"></i>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="d-flex flex-column chatSection w-100 h-100">
              <div className="chatHistory h-100 overflow-auto" ref={chatHistoryRef}>
                {chatMessages.length === 0 ? (
                  <div className="d-flex justify-content-center align-items-center h-100 selfChat">
                    {selectedUsers.length === 1 ? (
                      "Choose a chat to start messaging or store messages for yourself here."
                    ) : (
                      `Send a message to start chatting with ${getUserName(selectedUsers[1])}!`
                    )}
                  </div>
                ) : (  
                  <ul className='p-0 ps-3'>
                    {chatMessages.map((message) => {
                      const isMessageMine = message.sender === currentUser;
                      const time = getTimeFormatted(message.timestamp);
                      
                      return (
                        <li 
                          key={message._id} 
                          className={`d-flex justify-content-${isMessageMine ? "end": "start"} h-100 mt-3 ps-3 pe-2`}
                        >
                          <div className={`d-flex ${isMessageMine ? "flex-row-reverse" : ""}`}>
                            <img 
                              src="/assets/images/profile-icon.png" 
                              className="iconProfileMsg" 
                              alt="Profile" 
                            />
                            <div className="d-flex flex-column ps-3 pe-3">
                              <div className={`message ${isMessageMine ? "myMessage": ""}`}>
                                <p className='m-0'>{message.message}</p>
                              </div>
                              <div className={`d-flex justify-content-${isMessageMine ? "end": "start"} mt-1 ms-2`}>
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
              
              {/* Typing Indicator and Message Input */}
              <div className="d-flex flex-column align-items-start messageDiv p-4">
                {personTyping && (
                  <div className='typingIndicator mb-1'>{personTyping}</div>
                )}
                
                <form 
                  className="d-flex w-100 align-items-center sendMessageForm p-2 ps-4" 
                  onSubmit={handleMessageSend}
                >
                  <input 
                    type="text" 
                    className="sendMessageInput" 
                    name="message" 
                    value={message} 
                    placeholder="Type your message here..." 
                    onChange={handleMessageInput}
                    disabled={!selectedRoom}
                  />
                  <div className='d-flex gap-3 pe-3'>
                    <i className="ri-mic-line"></i>
                    <i className="ri-link"></i>
                  </div>
                  <button 
                    className="btn sendBtn" 
                    type="submit"
                    disabled={!message.trim() || !selectedRoom}
                  >
                    Send
                  </button>
                </form>            
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}