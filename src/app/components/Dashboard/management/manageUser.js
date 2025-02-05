"use client";
import { useEffect, useState } from "react"; 
import { fetchDataFromApi } from '/src/utils/apiUtils';
import { getRoleClass } from '/src/utils/mainContentUtil';

export default function ManageUser() {
    const ROLES = ["Admin", "Viewer", "Editor", "Author"];
    const STATUS = ["Active", "Inactive", "Pending", "Suspended"]
    const THEAD = ['User', 'Email', 'Role', 'Status', 'Last Active'];
    const [users, setUsers] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState({});
    const [addUserDiv, setAddUserDiv] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetchDataFromApi("/api/getUser");
                setUsers(response || []);
            } 
            catch (error) {
                console.error('Error fetching data:', error);
            } 
        }
        fetchUsers();    
    }, []);

    // Handle header checkbox change
    const handleSelectAll = (e) => {
        const isChecked = e.target.checked;
        setSelectAll(isChecked);
        // Update all individual checkboxes
        const updatedSelectedUsers = {};
        users.forEach((user) => {
            updatedSelectedUsers[user.username] = isChecked;
        });
        setSelectedUsers(updatedSelectedUsers);
    };

    // Handle individual checkbox change
    const handleUserCheckboxChange = (username) => {
        const updatedSelectedUsers = {
            ...selectedUsers,
            [username]: !selectedUsers[username],
        };
        setSelectedUsers(updatedSelectedUsers);

        // Check if all checkboxes are selected
        const allSelected = Object.values(updatedSelectedUsers).every((val) => val);
        setSelectAll(allSelected);
    };

    return(
        
        <div className="d-flex col-lg-12 mt-4">
            <div className="card flex-grow-1 p-0" >
                <div className="card-header filters">
                    <div className="row d-flex align-items-center p-2">
                        <h5 className="card-title">Filters</h5>    
                    </div>
                    <div className="row d-flex align-items-center ps-2 pe-2 pb-4 border-bottom">
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
                                <option key="default" value="">Select a plan</option>
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
                                <option key="default" value="">Select a status</option>
                                    {STATUS.map((status) => (
                                        <option key={status} value={status}>{status}</option>
                                        )
                                    )}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="row d-flex mt-3 pb-3 ps-2 pe-2">
                        <div className="col-lg-12 d-flex align-items-center justify-content-between">
                            <div className="d-flex">
                                <button className="btn btn-secondary dropdown-toggle exportBtn">Export </button>
                            </div>
                            <div className="d-flex gap-3">
                                <input type="text" className="form-control searchInput" placeholder="Search User" />
                                <button className="btn btn-primary addBtn" onClick={() => setAddUserDiv(true)}>Add New User</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card-body d-flex  flex-wrap p-0 mb-4">
                    <div className="table-responsive text-nowrap user-table w-100">
                        <table className="table table-sm mb-0">
                            <thead className="table-head">
                                <tr style={{ backgroundColor: '#3A3E5B' }}>
                                    <th>
                                        <input className="cCheckbox" type="checkbox" checked={selectAll}
                                            onChange={handleSelectAll}/>
                                    </th>
                                    {THEAD.map((thead) => (
                                    <th key={thead}>{thead}</th>
                                    ))}
                                    <th>Actions</th>
                                
                                </tr>
                            </thead>
                            <tbody className="table-content">
                                {users.map((user) => {
                                    const { badgeColor, output, color} = getRoleClass(user.role);
                                    return(
                                        <tr key={user.username}>
                                            <td>
                                            <input className="cCheckbox" type="checkbox" checked={selectedUsers[user.username] || false} onChange={() => handleUserCheckboxChange(user.username)} />
                                            </td>
                                            <td>
                                                <span className="d-flex align-items-center gap-2">
                                                <img src="/assets/images/profile-icon.png" alt="Profile Icon" className="profile-icon-small" />
                                                {user.firstName} {user.lastName}
                                                </span>
                                            </td>
                                            <td>{user.email}</td>
                                            <td>
                                                <span className="d-flex align-items-center gap-2">
                                                <i className={`ri-${badgeColor}-line ri-22px text-${color}`}></i> {output}
                                                </span>
                                            </td>
                                            <td><div className={`badge bg-label-${user.isActive ? 'success' : 'warning'} rounded-pill lh-xs`}>{user.isActive ? 'Active' : 'Inactive'}</div></td>
                                            <td>{new Date(user.lastLogin).toLocaleDateString()}</td>
                                            <td>
                                                <div className="d-flex gap-2">
                                                    <button className="btn btn-sm btn-info">
                                                        <i className="ri-eye-line"></i>
                                                    </button>
                                                    <button className="btn btn-sm btn-primary">
                                                        <i className="ri-edit-line"></i>
                                                    </button>
                                                    {user.firstName !== "Micael" ? 
                                                    <button className="btn btn-sm btn-danger">
                                                        <i className="ri-delete-bin-line"></i>
                                                    </button>
                                                    : null}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>  
            </div>

            {/* Add New User form sliding in from the right */}
            <div className={`add-user-form ${addUserDiv ? 'show' : ''}`}>
                <div className="form-container d-flex flex-column mt-2">
                    <div className="d-flex justify-content-between bottom-border">
                        <h5>Add User</h5>
                        <button className="btn-close" onClick={() => setAddUserDiv(false)}></button>
                    </div>
                    <hr></hr>
                    <form className="d-flex flex-column mt-3">
                        {/* Form fields */}
                        <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <input type="text" id="firstName" placeholder="Insert Name" className="form-control sInput" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Last Name</label>
                            <input type="text" id="lastName" placeholder="Insert Name" className="form-control sInput" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" placeholder="Insert Email" className="form-control sInput" />
                        </div>
                        {/* Additional fields for role, status, etc. */}
                        <div className="d-flex mt-2 gap-3">
                            <button type="submit" className="btn  addItem">Submit</button>
                            <button type="button" className="btn cancelItem" onClick={() => setAddUserDiv(false)}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}