"use client";
import { useEffect, useState, useRef } from "react"; 
import { fetchDataFromApi } from '/src/utils/apiUtils';
import { getBadgeClass, getTagColor, filterByTimeRange } from "/src/utils/mainContentUtil";
import { Modal } from '/src/app/components/utility/Modal';

// CONSTANTS
const STATUS = [0,1,2,3];
const TAGS = [
    'HTML', 'CSS', 'Javascript', 'PHP', 'Python', 'Java', 'C++', 'C#', 'Ruby',  
    'React', 'Angular', 'Node.js', 'Express', 'MongoDB', 'Vue.js', 'Firebase',  
    'Tailwind CSS', 'Next.js', 'Bootstrap', 'API', 'Socket.IO', 'Material UI'
  ];
  
const TIME_RANGES = ["Last 7 days", "Last 30 days", "Last 6 months", "Last year", "All time"];
const THEAD = ['Title', 'Description', 'Tags', 'Status', 'Last Updated', 'Actions'];

export default function ManageProject() {
    const addProjectFormRef = useRef(null); // Ref for Add Project form (hides when clicked outside the div)

    // State Management
    const [projects, setProjects] = useState([]); // Array of projects
    const [selectAll, setSelectAll] = useState(false); // Select all checkbox
    const [selectedProjects, setSelectedProjects] = useState({});  // Selected projects
    const [filters, setFilters] = useState({title: '', description: '', tags: [], state: null, version: '', lastUpdated: ''}); // Filters
    const [addProjectDiv, setAddProjectDiv] = useState(false); // Add Project form toggle
    const [formData, setFormData] = useState({title: '', description: '', tags: [], state: '', version: ''}); // Form data
    const [errors, setErrors] = useState({}); // Form errors verification
    const [success, setSuccess] = useState({}); // Form success validation
    const [showModal, setShowModal] = useState({ type: '',show: false,message: ''}); // Modal state
    const [deleteProject, setdeleteProject] = useState(''); // Stores name of project to be deleted
    const [hideBody, setHideBody] = useState(false); // Dark Body toggle
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isformDropdownOpen, setIsformDropdownOpen] = useState(false);
    const [tagBtn, setTagBtn] = useState(false);
    const [formtagBtn, setformTagBtn] = useState(false);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1); // Current page
    const [projectsPerPage, setprojectsPerPage] = useState(10); // Projects per page (Adjust as needed)
    const indexOfLastProject = currentPage * projectsPerPage; // Index of last project
    const indexOfFirstProject = indexOfLastProject - projectsPerPage; // Index of first project
    const totalPages = Math.ceil(projects.length / projectsPerPage); // Total Pages
    const currentProject = projects.slice(indexOfFirstProject, indexOfLastProject); // Current projects on display
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Loading and Fetch Error
    const [loading, setLoading] = useState(false); // Loading state
    const [fetchError, setFetchError] = useState(''); // Fetch error

    // Initial Page Render
    useEffect(() => {
        fetchProjects();
    }, [])

    // Hide Body on Pop-up
    useEffect(() => {
        showModal.show || addProjectDiv ? setHideBody(true) : setHideBody(false);
    }, [showModal.show,addProjectDiv]);

    // Handle clicks outside the "Add New Project" form
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (addProjectDiv && addProjectFormRef.current && !addProjectFormRef.current.contains(event.target)) {
                setAddProjectDiv(false);
            }
        };

        if (addProjectDiv) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [addProjectDiv]);


    // Fetch from MongoDB
    const fetchProjects = async () => {
        setLoading(true);
        setFetchError('');  
        try {
            const response = await fetchDataFromApi("/api/Projects");
            setProjects(response || []);
        } catch (error) {
            console.error('Error fetching data:', error);
            setFetchError('Failed to load projects. Please try again.'); // Update error state
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
        setFormData({ title: '', description: '', tags: [], state: '', version: '' });
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
            const response = await fetch("/api/Projects", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            if (result.error) {
                setShowModal({type: 'error', show: true, message: 'Error creating project. Please try again.'});
                return;
            }

            handleReset();
            setAddProjectDiv(false);
            setShowModal({type: 'success', show: true, message: 'Project has been added successfully'});
            fetchProjects();
        } catch (error) {
            console.error('Error creating project:', error);
            setShowModal({type: 'error', show: true, message: 'Error creating Project. Please try again.'});
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`/api/Projects/?id=${id}`, {
                method: "DELETE",
            });
            const result = await response.json();
            setShowModal({type: 'success', show: true, message: 'Project has been deleted successfully'});
            fetchProjects();
        } catch (error) {
            console.error('Error deleting project:', error);
            setShowModal({type: 'error', show: true, message: 'Failed to delete Project. Please try again.'});
        }
    }

    const verifyInput = (value, fieldName) => {
        value = value.trim();
        let errorMessage = '';

        if (!value) {
            setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: '' }));
            setSuccess((prevSuccess) => ({ ...prevSuccess, [fieldName]: null }));
            return;
        }

        switch (fieldName) {
            case 'title':
            case 'description':
                if (value.length < 2) errorMessage = 'Must have at least 2 characters';
                break;
            default:
                break;
        }

        setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: errorMessage }));
        setSuccess((prevSuccess) => ({ ...prevSuccess, [fieldName]: !errorMessage }));
    };

    
    // Handle header checkbox change
    const handleSelectAll = (e) => {
        const isChecked = e.target.checked;
        setSelectAll(isChecked);
        // Update all individual checkboxes
        const updatedSelectedProjects = {};
        projects.forEach((project) => {updatedSelectedProjects[project.title] = isChecked;});
        setSelectedProjects(updatedSelectedProjects);
    };

    // Handle individual checkbox change
    const handleProjectCheckboxChange = (title) => {
        const updatedSelectedProjects = {
            ...selectedProjects,
            [title]: !selectedProjects[title],
        };
        setSelectedProjects(updatedSelectedProjects);

        // Check if all checkboxes are selected
        const allSelected = Object.values(updatedSelectedProjects).every((val) => val);
        setSelectAll(allSelected);
    };

    const showConfirmationModal = (id,title) => {
        setdeleteProject(id);
        setShowModal({
            type: 'warning',
            show: true,
            message: `Are you sure you want to delete ${title} ?`,
        });
    }
    
    const handleTagChange = (tag) => {
        const updatedTags = filters.tags.includes(tag)
            ? filters.tags.filter((t) => t !== tag)
            : [...filters.tags, tag];
        setFilters({ ...filters, tags: updatedTags });
    }

    const handleTagChangeForm = (tag) => {
        const updatedTags = formData.tags.includes(tag)
            ? formData.tags.filter((t) => t !== tag)
            : [...formData.tags, tag];
        setFormData({ ...formData, tags: updatedTags });
    }
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
                                <select className="form-select"  onChange={(e) => setFilters({ ...filters, state: e.target.value === "" ? null : Number(e.target.value) })}>
                                <option key="default" value="">Select a status</option>
                                    {STATUS.map((status, i) => {
                                        const { output } = getBadgeClass(status);
                                        return <option key={status} value={i}>{output}</option>;
                                    })}
                                </select>
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <div className="dropdown">
                                <div className="select-wrapper">
                                    <button className={`btn dropdown-toggle w-100 tagButton ${tagBtn ? 'setBorder': ''}`} type="button" id="dropdownMenuButton" onClick={() => { setTagBtn(!tagBtn); setIsDropdownOpen(!isDropdownOpen); }}>
                                        {filters.tags.length === 0 ? 'Select tags' : filters.tags.join(', ') }
                                    </button>
                                    <ul className={`dropdown-menu w-100 ulTag ${isDropdownOpen ? 'show' : ''}`} aria-labelledby="dropdownMenuButton">
                                        {TAGS.map((tag) => (
                                        <li key={tag} onClick={() => handleTagChange(tag)} className="custom-tag-li p-2">
                                        <div className="form-check">
                                          <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id={tag}
                                            checked={filters.tags.includes(tag)}
                                            onChange={() => handleTagChange(tag)}
                                          />
                                          <label className="form-check-label" htmlFor={tag}>
                                            {tag}
                                          </label>
                                        </div>
                                      </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <div className="select-wrapper" onChange={(e) => setFilters({ ...filters, lastUpdated: e.target.value })}>
                                <select className="form-select">
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
                            <input type="text" className="form-control searchInput" placeholder="Search Project" onChange={(e) => setFilters({ ...filters, title: e.target.value })}/>
                            <button className="btn btn-primary addBtn" onClick={() => setAddProjectDiv(true)}>Add Project</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card-body d-flex  flex-wrap p-0 mb-4">
                    {loading && <div>Loading...</div>}
                    {fetchError && showModal({type: 'error', show: true, message: fetchError})}

                    <div className="table-responsive text-nowrap user-table manageTable w-100">
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
                                {currentProject.filter((project) => {
                                    if(filters.state !== null && project.state !== filters.state){ return false;}
                                    if(filters.tags.length > 0 && !filters.tags.every((tag) => project.tags.includes(tag))) return false;
                                    if(filters.lastUpdated && !filterByTimeRange(project.lastUpdated, filters.lastUpdated)) return false;
                                    if(filters.title) {
                                        const searchTerm = filters.title.toLowerCase();
                                        const fullName = `${project.title.toLowerCase()}`;
                                        if (!fullName.includes(searchTerm) && !project.description.toLowerCase().includes(searchTerm)) {
                                            return false;
                                        }
                                    }
                                    return true
                                })
                                .map((project) => {
                                    const { badgeColor, output} = getBadgeClass(project.state);
                                    return(
                                        <tr key={project.title}>
                                            <td>
                                            <input className="cCheckbox" type="checkbox" checked={selectedProjects[project.title] || false} onChange={() => handleProjectCheckboxChange(project.title)} />
                                            </td>
                                            <td>{project.title}</td>
                                            <td className="description-cell">{project.description}</td>
                                            <td><div className="d-flex gap-1 flex-wrap">
                                            {project.tags.map((tag, index) => {
                                                const { color, tag: tagName } = getTagColor(tag);
                                                return (
                                                    <div
                                                        key={index}
                                                        className="badge rounded-pill tag-selection"
                                                        style={{
                                                            backgroundColor: `var(--tagColor-${color}-bg)`,
                                                            color: `var(--tagColor-${color}-text)`, 
                                                            border: `1px solid var(--tagColor-${color}-border)`, 
                                                        }}
                                                    >
                                                        {tagName}
                                                    </div>
                                                );
                                            })}</div>
                                            </td>
                                            <td><div className={`badge bg-label-${badgeColor} rounded-pill lh-xs`}>{output}</div></td>
                                            <td>{new Date(project.lastUpdated).toLocaleDateString()}</td>
                                            <td>
                                                <div className="d-flex gap-2">
                                                    <button className="btn btn-sm btn-info">
                                                        <i className="ri-eye-line"></i>
                                                    </button>
                                                    <button className="btn btn-sm btn-primary">
                                                        <i className="ri-edit-line"></i>
                                                    </button>
                                                    
                                                    <button className="btn btn-sm btn-danger" onClick={() => showConfirmationModal(project._id, project.title)}>
                                                        <i className="ri-delete-bin-line"></i>
                                                    </button>
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
                            <p>Showing {indexOfFirstProject +1} to {Math.min(indexOfLastProject, projects.length)} of {projects.length} entries</p>
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
                                    <a className="page-link" aria-label="Next" onClick={currentPage === totalPages ? (e) => e.preventDefault() : () => paginate(currentPage + 1)} >
                                        <i className="ri-arrow-right-s-line"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>  
            </div>
            {/* Add New User form sliding in from the right */}
            <div className={`add-user-form ${addProjectDiv ? 'show' : ''}`} ref={addProjectFormRef}>
                <div className="form-container d-flex flex-column mt-2">
                    <div className="d-flex align-items-center justify-content-between bottom-border">
                        <h5 className="m-0">Add Project</h5>
                        <div className="d-flex align-items-center gap-3 float-end">
                        <i className="ri-refresh-line" onClick={() => handleReset()}></i>
                        <i className="ri-close-line"  onClick={() => setAddProjectDiv(false)}></i>
                        
                        </div>
                    </div>
                    <hr></hr>
                    <form className="d-flex flex-column mt-3" onSubmit={handleSubmit}>
                        {/* Form fields */}
                        <div className="form-group">
                            <input type="text" id="title" name="title" placeholder="Ex: Building a Dashboard" value={formData.title} className={`form-control sInput ${errors.title ? 'errorBorderColor' : success.title ? 'successBorderColor' : ''}`} required onChange={handleInputChange('title')} onBlur={(e) => verifyInput(e.target.value,e.target.name)}/>
                            <label htmlFor="title">Title</label>
                            <div className="errorDiv">{errors.title}</div>
                        </div>

                        <div className="form-group">
                            <input type="text" id="version" name="version" placeholder="v1.12" value={formData.version} className={`form-control sInput ${errors.version ? 'errorBorderColor' : success.version ? 'successBorderColor' : ''}`} required onChange={handleInputChange('version')} onBlur={(e) => verifyInput(e.target.value,e.target.name)}/>
                            <label htmlFor="version">Version</label>
                            <div className="errorDiv">{errors.version}</div>
                        </div>

                        <div className="form-group">
                            <select className={`form-select ${success.state ? 'successBorderColor': ''}`} value={formData.state} id="state" name="state" required onChange={handleInputChange('state')} onBlur={(e) => verifyInput(e.target.value,e.target.name)}>
                                <option value="">Select status</option>
                                {STATUS.map((state) => {
                                    const { output } = getBadgeClass(state);
                                    return <option key={state} value={state}>{output}</option>;
                                })}
                            </select>

                            <label htmlFor="state">State</label>
                            <div className="errorDiv">{errors.role}</div>
                        </div>

                            <div className="select-wrapper">
                                <button className={`btn dropdown-toggle w-100  formBtn tagButton ${formtagBtn ? 'setBorder': ''} ${formData.tags.length > 0 ? 'selected-tags' : ''}`} type="button" id="dropdownForm" onClick={() => { setformTagBtn(!formtagBtn); setIsformDropdownOpen(!isformDropdownOpen); }}>
                                    {formData.tags.length === 0 ? 'Select tags' : formData.tags.join(';') }
                                </button>
                                
                                <ul className={`dropdown-menu w-100 ulTag ${isformDropdownOpen ? 'show' : ''}`} aria-labelledby="dropdownForm">
                                    {TAGS.map((tag) => (
                                    <li key={tag} onClick={() => handleTagChangeForm(tag)} className="custom-tag-li p-2">
                                        
                                    <div className="form-check">
                                        <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id={tag + 'form'}
                                        checked={formData.tags.includes(tag)}
                                        onChange={() => handleTagChangeForm(tag)}
                                        />
                                        <label className="form-check-label" htmlFor={tag + 'form'}>
                                                {tag}
                                        </label>
                                        <div className="errorDiv">{errors.tag}</div>
                                    </div>
                                    </li>
                                    ))}
                                </ul>
                            </div>
                        
                        <div className="form-group pt-4">
                            <textarea
                                id="description"
                                name="description"
                                placeholder="Enter project description"
                                value={formData.description}
                                className={`form-control sInput projectDescription ${errors.description ? 'errorBorderColor' : success.description ? 'successBorderColor' : ''}`}
                                required
                                onChange={handleInputChange('description')}
                                onBlur={(e) => verifyInput(e.target.value, e.target.name)}

                            />
                            <div className="errorDiv mt-4">{errors.description}</div>
                        </div>


                        {/* Additional fields for role, status, etc. */}
                        <div className="d-flex mt-1 gap-3">
                            <button type="submit" className="btn  addItem" >Submit</button>
                            <button type="button" className="btn cancelItem" onClick={() => setAddProjectDiv(false)}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
            <Modal showModal={showModal} setShowModal={setShowModal} handleDelete={handleDelete} deleteAction={deleteProject}/>
            {hideBody  && <div className="modal-backdrop show"></div>}
        </div>
    );
}