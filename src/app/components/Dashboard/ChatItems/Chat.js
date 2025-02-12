"use client";

import { useState } from 'react';

export default function Chat() {
  const [activeChat, setactiveChat] = useState(false);
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
                  <div className={`d-flex align-items-center w-100 mt-1 ms-2 ps-3 pe-3 chatItems  ${activeChat ? "active": ""} `} onClick={() => setactiveChat(!activeChat)}>
                    <img src="/assets/images/profile-icon.png" className="profile-icon" alt="Profile Icon" />
                    <div className="d-flex flex-column ps-3 justify-content-center">
                        <span className="personName">Person Name</span>
                        <span className="description">Message </span>
                    </div>
                    <span className="ms-auto align-self-start text-muted">time ago</span>
                  </div>
                  <div className={`d-flex align-items-center w-100 mt-1 ms-2 ps-3 pe-3 chatItems  ${activeChat ? "active": ""} `} onClick={() => setactiveChat(!activeChat)}>
                    <img src="/assets/images/profile-icon.png" className="profile-icon" alt="Profile Icon" />
                    <div className="d-flex flex-column ps-3 justify-content-center">
                        <span className="personName">Person Name</span>
                        <span className="description">Message </span>
                    </div>
                    <span className="ms-auto align-self-start text-muted">time ago</span>
                  </div>
                  
                </div>

                <div className="d-flex flex-column ps-1 pe-3">
                  <h5 className="title pt-4 ps-4">Contacts </h5>
                  <div className={`d-flex align-items-center w-100 mt-2 ms-2 ps-3 pe-3 chatItems  ${activeChat ? "active": ""} `} onClick={() => setactiveChat(!activeChat)}>
                    <img src="/assets/images/profile-icon.png" className="profile-icon" alt="Profile Icon" />
                    <div className="d-flex flex-column ps-3 justify-content-center">
                        <span className="personName">Person Name</span>
                        <span className="description">Role </span>
                    </div>
                  </div>
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
              <div className="chatBox overflow-auto">

              </div>
              <div className="d-flex align-items-center p-4">
                <form className="d-flex w-100 align-items-center sendMessageForm p-2 ps-4">
                    <input type="text" className="form-control sendMessageInput" placeholder="Type your message here..." aria-label="Recipient's username" aria-describedby="button-addon2" />
                    <div className='d-flex gap-3 pe-3'>
                      <i className="ri-mic-line"></i>
                      <i className="ri-link"></i>
                    </div>
                    <button className="btn sendBtn" type="button" id="button-addon2">Send</button>
                </form>            
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}