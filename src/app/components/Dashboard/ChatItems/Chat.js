export default function Chat() {
  return(
    <div className="d-flex col-lg-12 mt-1 p-4">
        <div className="card flex-grow-1 p-0 chatApp" >
            <div className="row">
              {/* Chat and Contacts Section */}
                <div className="col-lg-3 d-flex flex-column searchSection">
                  <div className="d-flex justify-content-between align-items-center border-bottom border-end p-3">
                    <img src="/assets/images/profile-icon.png" className="profile-icon" alt="Profile Icon" />
                    <input type="text" className="form-control ms-3 searchContChat" placeholder="Search..." />
                  </div>
                  <div className="d-flex flex-column flex-grow-1 overflow-auto p-3 ">
                    <h3>Chats </h3>
                    <div className="d-flex justify-content-center align-items-center w-100">
                      hey
                    </div>
                  </div>

                  <div className="d-flex flex-column flex-grow-1 overflow-auto p-3">
                    <h3>Contacts  </h3>
                    <div className="d-flex justify-content-center align-items-center w-100">
                      hey
                    </div>
                  </div>
                </div>



              <div className="col-lg-9 d-flex flex-column chatSection">
                <div className="d-flex justify-content-between align-items-center border-bottom p-2">
                  <div className="d-flex align-items-center">
                      <img src="/assets/images/profile-icon.png" className="profile-icon" alt="Profile Icon" />
                      <span className="ml-2">Person Name</span>
                      <p>Next JS Dev</p>
                  </div>
                  <div className="d-flex float-right">
                    <i className="fas fa-phone mr-3"></i>
                    <i className="fas fa-video mr-3"></i>
                    <i className="fas fa-info-circle mr-3"></i>
                    <i className="fas fa-ellipsis-v"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  );
}