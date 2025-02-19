"use client"

export default function Personal(){
    return(
    <>
        <div className="d-flex col-lg-12 mt-1 p-4">
            <div className="card flex-grow-1 p-0" >
                <div className="d-flex card-header justify-content-between align-items-center headerPP">
                    <img src="/assets/images/headerPP/banner.png" className="headerBackground" alt="Header Background" />
                </div>  
                <div className="card-body">
                    <div className="d-flex align-items-center infoSection">
                        <div className="d-flex">
                            <img src="/assets/images/profile-icon.png" alt="Profile Picture" width="120" height="120"/>
                            <div className="d-flex flex-column ms-3 pt-4">
                                <h4 className="text-primary">John Doe</h4>
                                <div className="d-flex flex-row gap-5">
                                    <h6>Software Engineer</h6>
                                    <h6>Software Engineer</h6>
                                    <h6>Software Engineer</h6>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex flex-grow-1 justify-content-end">
                            <button className="btn btn-primary addBtn"><i className="ri-edit-line me-2"></i> Edit Profile</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="row m-0 p-0">
            <div className="col-lg-12 d-flex  ps-4 gap-3 PPsections">
                <button className="btn active"><i className="ri-user-line me-2"></i> Profile</button>
                <button className="btn"><i className="ri-projector-line me-2"></i> Projects</button>
                <button className="btn"><i className="ri-team-line me-2"></i> Connections</button>
            </div>
        </div>

        <div className="row m-0 p-0 pt-3 pe-4">
            <div className="col-lg-4 d-flex flex-column ps-4 pe-4">
                <div className="card">
                    <div className="card-header">
                        <h5 className="card-title">About</h5>
                    </div>
                    <div className="card-body">
                        <div className="d-flex flex-column aboutMe">
                            <p><i className="ri-user-line me-2"></i> Full Name: John Doe</p>
                            <p><i className="ri-checkbox-circle-line me-2"></i> Status: Active</p>
                            <p><i className="ri-briefcase-line me-2"></i> Role: Developer</p>
                            <p><i className="ri-map-pin-line me-2"></i> Country: USA</p>
                            <p><i className="ri-translate-2 me-2"></i> Languages: English</p>
                            <p><i className="ri-contacts-line me-2"></i> Contacts</p>
                            <p><i className="ri-phone-line me-2"></i> Contact: (123) 456-7890</p>
                            <p><i className="ri-skype-line me-2"></i> Skype: john.doe</p>
                            <p><i className="ri-mail-line me-2"></i> Email: john.doe@example.com</p>
                            <p><i className="ri-team-line me-2"></i> Teams</p>
                            <p><i className="ri-group-line me-2"></i> Backend Developer (126 Members)</p>
                            <p><i className="ri-group-line me-2"></i> React Developer (98 Members)</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-8 d-flex flex-column">
                <div className="row">
                    <div className="col-lg-12 m-0">
                        <div className="card">
                            <div className="card-header">
                                <h5 className="card-title"><i className="ri-bar-chart-fill pe-3 "></i>Activity Timeline</h5>
                            </div>
                            <div className="card-body">
                            
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-header">
                                <h5 className="card-title"><i className="ri-projector-line pe-3"></i>Projects</h5>
                            </div>
                            <div className="card-body">
                            
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}