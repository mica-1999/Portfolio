"use client";
import { useEffect, useState, useRef } from "react";
import { fetchDataFromApi } from '/src/utils/apiUtils';
import { getRoleClass, getActiveColor, filterByTimeRange } from '/src/utils/mainContentUtil';
import { Modal } from '/src/app/components/utility/Modal';

// Constants
const ROLES = ["Admin", "Viewer", "Editor", "Author"];
const THEAD = ['User', 'Email', 'Role', 'Status', 'Last Active','Actions'];
const STATUS = ["Active", "Inactive", "Pending", "Suspended"];
const TIME_RANGES = ["Last 7 days", "Last 30 days", "Last 6 months", "Last year", "All time"];

export default function ManageUser() {
    const addUserFormRef = useRef(null); // Ref for Add User form (hides when clicked outside the div)

    // State Management
    const [users, setUsers] = useState([]);  // Array of users
    const [selectAll, setSelectAll] = useState(false); // Select all checkbox
    const [selectedUsers, setSelectedUsers] = useState({}); // Selected users
    const [filters, setFilters] = useState({ name: '', role: '', time: '', status: '' }); // Filters
    const [addUserDiv, setAddUserDiv] = useState(false); // Add User form toggle
    const [formData, setFormData] = useState({firstName: '', lastName: '', email: '', phone: '', role: '', linkedProject: []}); // Form data
    const [errors, setErrors] = useState({}); // Form errors verification
    const [success, setSuccess] = useState({}); // Form success validation
    const [showModal, setShowModal] = useState({ type: '',show: false,message: ''}); // Modal state
    const [deleteUser, setdeleteUser] = useState(''); // Stores username of user to be deleted
    const [hideBody, setHideBody] = useState(false); // Dark Body toggle

    // Pagination
    const [currentPage, setCurrentPage] = useState(1); // Current page
    const [usersPerPage, setUsersPerPage] = useState(5); // Users per page (Adjust as needed)
    const indexOfLastUser = currentPage * usersPerPage; // Index of last user
    const indexOfFirstUser = indexOfLastUser - usersPerPage; // Index of first user
    const totalPages = Math.ceil(users.length / usersPerPage); // Total Pages
    const currentUsers = users.length > usersPerPage ? users.slice(indexOfFirstUser, indexOfLastUser): users; // Current users on display
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Loading and Fetch Error
    const [loading, setLoading] = useState(false); // Loading state
    const [fetchError, setFetchError] = useState(''); // Fetch error

    // Initial Page Render
    useEffect(() => {
        fetchUsers();
    }, [])

    // Hide Body on Pop-up
    useEffect(() => {
        showModal.show || addUserDiv ? setHideBody(true) : setHideBody(false);
    }, [showModal.show,addUserDiv]);

    // Handle clicks outside the "Add New User" form
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (addUserDiv && addUserFormRef.current && !addUserFormRef.current.contains(event.target)) {
                setAddUserDiv(false);
            }
        };

        if (addUserDiv) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [addUserDiv]);

    // Fetch from MongoDB
    const fetchUsers = async () => {
        setLoading(true);
        setFetchError('');  
        try {
            const response = await fetchDataFromApi("/api/User");
            setUsers(response || []);
        } catch (error) {
            console.error('Error fetching data:', error);
            setFetchError('Failed to load users. Please try again.'); // Update error state
        } finally {
            setLoading(false);  // Set loading to false once the fetch is complete
        }
    };

    // Handlers
    const handleInputChange = (field) => (e) => {
        const value = e.target.value;
        setFormData({ ...formData, [field]: value });
        if (errors[field]) {
            setErrors((prevErrors) => ({ ...prevErrors, [field]: '' }));
        }
    };

    const handleReset = () => {
        setFormData({ firstName: '', lastName: '', email: '', phone: '', role: '', linkedProject: [] });
        setErrors({});
        setSuccess({});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errorsFound = Object.values(errors).some((error) => error);

        if (errorsFound) {
            setShowModal({type: 'error', show: true, message: 'Please fill in all fields correctly'});
            return;
        }

        try {
            const response = await fetch("/api/User", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            if (result.error) {
                setShowModal({type: 'error', show: true, message: 'Error creating User. Please try again.'});
                return;
            }

            handleReset();
            setAddUserDiv(false);
            setShowModal({type: 'success', show: true, message: 'User has been added successfully'});
            fetchUsers();
        } catch (error) {
            console.error('Error creating user:', error);
            setShowModal({type: 'error', show: true, message: 'Error creating User. Please try again.'});
        }
    };

    const handleDelete = async (username) => {
        try {
            const response = await fetch(`/api/User/?username=${username}`, {
                method: "DELETE",
            });
            const result = await response.json();
            setShowModal({type: 'success', show: true, message: 'User has been deleted successfully'});
            fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
            setShowModal({type: 'error', show: true, message: 'Failed to delete User. Please try again.'});
        }
    }
    
    const verifyInput = (value, fieldName) => {
        value = value.trim();
        let errorMessage = '';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\+?[0-9]{10,15}$/;

        if (!value) {
            setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: '' }));
            setSuccess((prevSuccess) => ({ ...prevSuccess, [fieldName]: null }));
            return;
        }

        switch (fieldName) {
            case 'firstName':
            case 'lastName':
                if (value.length < 2) errorMessage = 'Name must have at least 2 characters';
                break;
            case 'email':
                if (!emailRegex.test(value)) errorMessage = 'Invalid email format';
                break;
            case 'phone':
                if (!phoneRegex.test(value)) errorMessage = 'Invalid phone number';
                break;
            case 'role':
            case 'linkedProject':
                if (value.length < 2) errorMessage = `${fieldName} must have at least 2 characters`;
                break;
            default:
                break;
        }

        setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: errorMessage }));
        setSuccess((prevSuccess) => ({ ...prevSuccess, [fieldName]: !errorMessage }));
    };

    const handleSelectAll = (e) => {
        const isChecked = e.target.checked;
        setSelectAll(isChecked);
        const updatedSelectedUsers = {};
        users.forEach((user) => (updatedSelectedUsers[user.username] = isChecked));
        setSelectedUsers(updatedSelectedUsers);
    };

    const handleUserCheckboxChange = (username) => {
        const updatedSelectedUsers = { ...selectedUsers, [username]: !selectedUsers[username] };
        setSelectedUsers(updatedSelectedUsers);
        setSelectAll(Object.values(updatedSelectedUsers).every((val) => val));
    };

    const showConfirmationModal = (username,fName, LName) => {
        setdeleteUser(username);
        setShowModal({
            type: 'warning',
            show: true,
            message: `Are you sure you want to delete ${fName + " " + LName} ?`,
        });
    }

    return(
        <div className="d-flex col-lg-12 mt-4">
            {/* Filters and Table Section */}
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
                            <button className="btn btn-secondary dropdown-toggle exportBtn">Export </button>
                            <div className="d-flex gap-3">
                                <input type="text" className="form-control searchInput" placeholder="Search User" onChange={(e) => setFilters({ ...filters, name: e.target.value })}/>
                                <button className="btn btn-primary addBtn" onClick={() => setAddUserDiv(true)}>Add New User</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card-body d-flex  flex-wrap p-0 mb-1">
                    {loading && <div>Loading...</div>}
                    {fetchError && showModal({type: 'error', show: true, message: fetchError})}
                    
                    <div className="table-responsive text-nowrap user-table w-100">
                        <table className="table table-sm mb-0">
                            <thead className="table-head">
                                <tr style={{ backgroundColor: '#3A3E5B' }}>
                                    <th><input className="cCheckbox" type="checkbox" checked={selectAll} onChange={handleSelectAll}/></th>
                                    {THEAD.map((thead) => (
                                        <th key={thead}>{thead}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="table-content">
                                {currentUsers
                                .filter((user) => {
                                    if (filters.status && user.isActive.toLowerCase() !== filters.status.toLowerCase()) {
                                        return false;
                                    }
                                    if (filters.role && user.role.toLowerCase() !== filters.role.toLowerCase()) {
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
                                        <tr className="userRow" key={user.username} onClick={() => window.location.href = `/pages/dashboard/personal?userId=${user._id}`}>
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
                                                    <button className="btn btn-sm btn-primary">
                                                        <i className="ri-edit-line"></i>
                                                    </button>
                                                    {user.firstName !== "Micael" ? 
                                                    <button className="btn btn-sm btn-danger" onClick={() => showConfirmationModal(user.username,user.firstName, user.lastName)}>
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
                    <div className="row w-100">
                        <div className="col-lg-12 d-flex align-items-center justify-content-between ps-5 pt-3">
                            <p>Showing {indexOfFirstUser +1} to {Math.min(indexOfLastUser, users.length)} of {users.length} entries</p>
                            <ul className="pagination gap-2">
                                <li className="page-item arrow">
                                    <a className="page-link" aria-label="Previous" onClick={currentPage === 1 ? (e) => e.preventDefault() : () => paginate(currentPage - 1)}>
                                        <i className="ri-arrow-left-s-line"></i>
                                    </a>
                                </li>
                                {Array.from({ length: totalPages }, (_, i) => (
                                    <li key={i} className={`page-item ${i + 1 === currentPage ? "active" : ""}`}>
                                        <a className="page-link" onClick={() => paginate(i + 1)}>
                                            {i + 1}
                                        </a>
                                    </li>
                                ))}
                                
                                <li className="page-item arrow">
                                    <a className="page-link" onClick={currentPage === totalPages ? (e) => e.preventDefault() : () => paginate(currentPage + 1)} aria-label="Next">
                                        <i className="ri-arrow-right-s-line"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>  
            </div>

            {/* Add New User form sliding in from the right */}
            <div className={`add-user-form ${addUserDiv ? 'show' : ''}`} ref={addUserFormRef}>
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
                            <select className={`form-select ${success.role ? 'successBorderColor': ''}`} value={formData.role}  id="role" name="role" required onChange={handleInputChange('role')} onBlur={(e) => verifyInput(e.target.value,e.target.name)}>
                                <option value="">Select role</option>
                                {ROLES.map((role) => (
                                    <option key={role} value={role.toLowerCase()}>{role}</option>
                                    )
                                )}
                            </select>

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
                            <button type="submit" className="btn  addItem" >Submit</button>
                            <button type="button" className="btn cancelItem" onClick={() => setAddUserDiv(false)}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
            <Modal showModal={showModal} setShowModal={setShowModal} handleDelete={handleDelete} deleteAction={deleteUser}/>
            {hideBody  && <div className="modal-backdrop show"></div>}
        </div>
    );
}