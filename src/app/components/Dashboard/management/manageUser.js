export default function manageUser() {
    const ROLES = ["Admin", "Viewer", "Editor", "Author"];
    const STATUS = ["Active", "Inactive", "Pending", "Suspended"]

    return(
        <div className="d-flex col-lg-12 mt-4">
            <div className="card flex-grow-1" >
                <div className="card-header filters">
                    <div className="row d-flex align-items-center">
                        <h5 className="card-title">Filters</h5>    
                    </div>
                    <div className="row d-flex align-items-center mt-2 pb-4 border-bottom">
                        <div className="col-lg-4">
                            <div className="select-wrapper">
                                <select className="form-select">
                                    <option key="default" value="">Select a role</option>
                                    {ROLES.map((role) => (
                                        <option key={role} value={role}>{role}</option>
                                        )
                                    )}
                                </select>
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <div className="select-wrapper">
                                <select className="form-select">
                                    <option value="admin">Admin Users</option>
                                    {STATUS.map((status) => (
                                        <option key={status} value={status}>{status}</option>
                                        )
                                    )}
                                </select>
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <div className="select-wrapper">
                                <select className="form-select">
                                    <option value="admin">Admin Users</option>
                                    {STATUS.map((status) => (
                                        <option key={status} value={status}>{status}</option>
                                        )
                                    )}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="row d-flex mt-2 pb-4 border-bottom">
                        <div className="col-lg-12 d-flex align-items-center justify-content-between">
                            <div className="d-flex">
                                <button className="btn btn-primary">Apply</button>
                            </div>
                            <div className="d-flex gap-3">
                                <input type="text" className="form-control searchInput" placeholder="Search" />
                                <button className="btn btn-primary adduserBtn">Add New User</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card-body d-flex justify-content-evenly flex-wrap p-0 mb-4">
                    
                </div>  

            </div>
        </div>
    );
}