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
        <div className="row">
            <div className="col-lg-12 d-flex  ps-4 gap-3 PPsections">
                <button className="btn active"><i className="ri-user-line me-2"></i> Profile</button>
                <button className="btn"><i className="ri-projector-line me-2"></i> Projects</button>
                <button className="btn"><i className="ri-team-line me-2"></i> Connections</button>
            </div>
        </div>
    </>
    )
}