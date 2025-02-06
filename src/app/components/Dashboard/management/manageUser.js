"use client";
import { useEffect, useState } from "react"; 
import { fetchDataFromApi } from '/src/utils/apiUtils';
import { getRoleClass, getActiveColor,filterByTimeRange } from '/src/utils/mainContentUtil';

export default function ManageUser() {
    const ROLES = ["Admin", "Viewer", "Editor", "Author"];
    const THEAD = ['User', 'Email', 'Role', 'Status', 'Last Active'];
    const STATUS = ["Active", "Inactive", "Pending", "Suspended"]
    const TIME_RANGES = ["Last 7 days", "Last 30 days", "Last 6 months", "Last year", "All time"];

    const [users, setUsers] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState({});
    
    //Filters 
    const [filters, setFilters] = useState({
        name: '',
        role: '',
        time: '',
        status: ''
    });

    // Add New States
    const [addUserDiv, setAddUserDiv] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        role: '',
        linkedProject: []
    });
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState({});


    const handleInputChange = (field) => (e) => {
        setFormData({
            ...formData,
            [field]: e.target.value,
        });
        if (errors[field]) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [field]: '',
            }));
        }
    } 
    
    const handleReset = () => {
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            role: '',
            linkedProject: []
        });
        setErrors({});
        setSuccess({});
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const errorsFound = Object.values(errors).some((error) => error);

        if (errorsFound) {
            alert('Please fill in all fields correctly');
            return;
        }
        try {
            const response = await fetch("/api/User", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
              });

            const result = await response.json();
            
            if (result.error) {
                alert('Error creating user');
                return;
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    
    const verifyInput = (value, fieldName) => {
        value = value.trim();
        let errorMessage = '';

        if (!value.trim()) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [fieldName]: '',
            }));
            setSuccess((prevSuccess) => ({
                ...prevSuccess,
                [fieldName]: null, 
            }));
            return; 
        }

        switch (fieldName) {
            case 'firstName':
            case 'lastName':
                if (value.length === 1) {
                    errorMessage = 'Name must have at least 2 characters';
                }
                break;
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    errorMessage = 'Invalid email format';
                }
                break;
            case 'phone':
                const phoneRegex = /^\+?[0-9]{10,15}$/;
                if (!phoneRegex.test(value)) {
                    errorMessage = 'Invalid phone number';
                }
                break;
            case 'role':
                if (value.length === 1) {
                    errorMessage = 'Role must have at least 2 characters';
                }
                break;
            case 'linkedProject':
                if (value.length === 1) {
                    errorMessage = 'Linked Project must have at least 2 characters';
                }
                break;
            default:
                break;
        }
        setErrors((prevErrors) => ({
            ...prevErrors,
            [fieldName]: errorMessage,
        }));
        setSuccess((prevSuccess) => ({
            ...prevSuccess,
            [fieldName]: !errorMessage,
        }));
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetchDataFromApi("/api/User");
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
                                <select className="form-select" onChange={(e) => setFilters({ ...filters, role: e.target.value })}>
                                    <option key="default" value="">Select a role</option>
                                    {ROLES.map((role) => (
                                        <option key={role} value={role.toLowerCase()}>{role}</option>
                                        )
                                    )}
                                </select>
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <div className="select-wrapper">
                                <select className="form-select" onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
                                <option key="default" value="">Select a status</option>
                                    {STATUS.map((status) => (
                                        <option key={status} value={status.toLowerCase()}>{status}</option>
                                        )
                                    )}
                                </select>
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <div className="select-wrapper">
                                <select className="form-select" onChange={(e) => setFilters({ ...filters, time: e.target.value })}>
                                <option key="default" value="">Select a time range</option>
                                    {TIME_RANGES.map((range) => (
                                        <option key={range} value={range}>{range}</option>
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
                                <input type="text" className="form-control searchInput" placeholder="Search User" onChange={(e) => setFilters({ ...filters, name: e.target.value })}/>
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
                                {users
                                .filter((user) => {
                                    if (filters.status && user.isActive !== filters.status) {
                                        return false;
                                    }
                                    if (filters.role && user.role !== filters.role) {
                                        return false;
                                    }
                                    if (filters.time && !filterByTimeRange(user.lastLogin, filters.time)) {
                                        return false;
                                    }
                                    if (filters.name) {
                                        const searchTerm = filters.name.toLowerCase();
                                        const fullName = `${user.firstName.toLowerCase()} ${user.lastName.toLowerCase()}`;
                                        if (!fullName.includes(searchTerm) && !user.email.toLowerCase().includes(searchTerm)) {
                                            return false;
                                        }
                                    }
                                    return true;
                                })
                                .map((user) => {
                                    const { badgeColor, output, color} = getRoleClass(user.role);
                                    const { colorActive } = getActiveColor(user.isActive);
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
                                            <td><div className={`badge bg-label-${colorActive} rounded-pill lh-xs`}>{user.isActive.charAt(0).toUpperCase() + user.isActive.slice(1)}</div></td>
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
                    <div className="d-flex align-items-center justify-content-between bottom-border">
                        <h5 className="m-0">Add User</h5>
                        <div className="d-flex align-items-center gap-3 float-end">
                        <i className="ri-refresh-line" onClick={() => handleReset()}></i>
                        <i className="ri-close-line"  onClick={() => setAddUserDiv(false)}></i>
                        
                        </div>
                    </div>
                    <hr></hr>
                    <form className="d-flex flex-column mt-3" onSubmit={handleSubmit}>
                        {/* Form fields */}
                        <div className="form-group">
                            <input type="text" id="firstName" name="firstName" placeholder="Michael" value={formData.firstName} className={`form-control sInput ${errors.firstName ? 'errorBorderColor' : success.firstName ? 'successBorderColor' : ''}`} required onChange={handleInputChange('firstName')} onBlur={(e) => verifyInput(e.target.value,e.target.name)}/>
                            <label htmlFor="firstName">First Name</label>
                            <div className="errorDiv">{errors.firstName}</div>
                        </div>
                        <div className="form-group">
                            <input type="text" id="lastName" name="lastName" placeholder="Ribeiro" value={formData.lastName} className={`form-control sInput ${errors.lastName ? 'errorBorderColor' : success.lastName ? 'successBorderColor' : ''}`} required onChange={handleInputChange('lastName')} onBlur={(e) => verifyInput(e.target.value,e.target.name)}/>
                            <label htmlFor="lastName">Last Name</label>
                            <div className="errorDiv">{errors.lastName}</div>
                        </div>
                        <div className="form-group">
                            <input type="email" id="email" name="email" placeholder="example@gmail.com" value={formData.email} className={`form-control sInput ${errors.email ? 'errorBorderColor' : success.email ? 'successBorderColor' : ''}`} required onChange={handleInputChange('email')} onBlur={(e) => verifyInput(e.target.value,e.target.name)}/>
                            <label htmlFor="email">Email</label>
                            <div className="errorDiv">{errors.email}</div>
                        </div>

                        <div className="form-group">
                            <input type="text" id="phone" name="phone" placeholder="+351 964 291 392" value={formData.phone} className={`form-control sInput ${errors.phone ? 'errorBorderColor' : success.phone ? 'successBorderColor' : ''}`} required onChange={handleInputChange('phone')} onBlur={(e) => verifyInput(e.target.value,e.target.name)}/>
                            <label htmlFor="phone">Phone</label>
                            <div className="errorDiv">{errors.phone}</div>
                        </div>

                        <div className="form-group">
                            <input type="text" id="role" name="role" placeholder="Admin" value={formData.role} className={`form-control sInput ${errors.role ? 'errorBorderColor' : success.role ? 'successBorderColor' : ''}`} required onChange={handleInputChange('role')} onBlur={(e) => verifyInput(e.target.value,e.target.name)}/>
                            <label htmlFor="role">Role</label>
                            <div className="errorDiv">{errors.role}</div>
                        </div>

                        <div className="form-group">
                            <input type="text" id="linkedProject" name="linkedProject" placeholder="Linked Project" value={formData.linkedProject} className={`form-control sInput ${errors.linkedProject ? 'errorBorderColor' : success.linkedProject ? 'successBorderColor' : ''}`} required onChange={handleInputChange('linkedProject')} onBlur={(e) => verifyInput(e.target.value,e.target.name)}/>
                            <label htmlFor="linkedProject">Linked Project</label>
                            <div className="errorDiv">{errors.linkedProject}</div>
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