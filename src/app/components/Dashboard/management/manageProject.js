"use client";
import { useEffect, useState, useRef, useMemo, useCallback } from "react"; 
import { fetchDataFromApi } from '/src/utils/apiUtils';
import { getBadgeClass, getTagColor, filterByTimeRange } from "/src/utils/mainContentUtil";
import { Modal } from '/src/app/components/utility/Modal';

// CONSTANTS
const STATUS = [0, 1, 2, 3];
const TAGS = [
  'HTML', 'CSS', 'Javascript', 'PHP', 'Python', 'Java', 'C++', 'C#', 'Ruby',  
  'React', 'Angular', 'Node.js', 'Express', 'MongoDB', 'Vue.js', 'Firebase',  
  'Tailwind CSS', 'Next.js', 'Bootstrap', 'API', 'Socket.IO', 'Material UI'
];  
const TIME_RANGES = ["Last 7 days", "Last 30 days", "Last 6 months", "Last year", "All time"];
const THEAD = ['Title', 'Description', 'Tags', 'Status', 'Last Updated', 'Actions'];

export default function ManageProject() {
    const addProjectFormRef = useRef(null); // Ref for Add Project form

    // State Management
    const [projects, setProjects] = useState([]); 
    const [selectAll, setSelectAll] = useState(false);
    const [selectedProjects, setSelectedProjects] = useState({});
    const [filters, setFilters] = useState({title: '', description: '', tags: [], state: null, version: '', lastUpdated: ''});
    const [addProjectDiv, setAddProjectDiv] = useState(false);
    const [formData, setFormData] = useState({title: '', description: '', tags: [], state: '', version: ''});
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState({});
    const [showModal, setShowModal] = useState({ type: '',show: false, message: ''});
    const [deleteProject, setDeleteProject] = useState('');
    const [hideBody, setHideBody] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isformDropdownOpen, setIsformDropdownOpen] = useState(false);
    const [tagBtn, setTagBtn] = useState(false);
    const [formtagBtn, setFormTagBtn] = useState(false);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [projectsPerPage, setProjectsPerPage] = useState(5);
    
    // Loading and Fetch Error
    const [loading, setLoading] = useState(false);
    const [fetchError, setFetchError] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [deleting, setDeleting] = useState(false);

    // Memoized pagination calculations
    const { indexOfLastProject,indexOfFirstProject,totalPages,currentProjects} = useMemo(() => {
        const indexOfLast = currentPage * projectsPerPage;
        const indexOfFirst = indexOfLast - projectsPerPage;
        const total = Math.ceil(projects.length / projectsPerPage);
        
        // Apply filters to projects
        const filteredProjects = projects.filter((project) => {
            // State filter
            if (filters.state !== null && project.state !== filters.state) {
                return false;
            }
            
            // Tags filter
            if (filters.tags.length > 0 && !filters.tags.every((tag) => project.tags.includes(tag))) {
                return false;
            }
            
            // Last updated filter
            if (filters.lastUpdated && !filterByTimeRange(project.lastUpdated, filters.lastUpdated)) {
                return false;
            }
            
            // Title and description search
            if (filters.title) {
                const searchTerm = filters.title.toLowerCase();
                const projectTitle = project.title.toLowerCase();
                const projectDesc = project.description.toLowerCase();
                
                if (!projectTitle.includes(searchTerm) && !projectDesc.includes(searchTerm)) {
                    return false;
                }
            }
            
            return true;
        });
        
        return {
            indexOfLastProject: indexOfLast,
            indexOfFirstProject: indexOfFirst,
            totalPages: Math.ceil(filteredProjects.length / projectsPerPage),
            currentProjects: filteredProjects.slice(indexOfFirst, indexOfLast)
        };
    }, [projects, filters, currentPage, projectsPerPage]);

    // Fetch projects on initial render
    useEffect(() => {
        fetchProjects();
    }, []);

    // Hide Body on Pop-up
    useEffect(() => {
        setHideBody(showModal.show || addProjectDiv);
    }, [showModal.show, addProjectDiv]);

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

    // Reset current page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [filters]);

    // Fetch from MongoDB - memoized with useCallback
    const fetchProjects = useCallback(async () => {
        setLoading(true);
        setFetchError('');  
        try {
            const response = await fetchDataFromApi("/api/Projects");
            if (!response) {
                throw new Error("No data returned from API");
            }
            setProjects(response);
        } catch (error) {
            console.error('Error fetching data:', error);
            const errorMessage = error.message || 'Failed to load projects. Please try again.';
            setFetchError(errorMessage);
            setShowModal({
                type: 'error',
                show: true,
                message: errorMessage
            });
        } finally {
            setLoading(false);
        }
    }, []);

    // Pagination handler
    const paginate = useCallback((pageNumber) => {
        setCurrentPage(pageNumber);
    }, []);

    // Form handlers
    const handleInputChange = useCallback((field) => (e) => {
        const value = e.target.value;
        setFormData(prev => ({ ...prev, [field]: value }));
        
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: '' }));
        }
    }, [errors]);

    const handleReset = useCallback(() => {
        setFormData({ title: '', description: '', tags: [], state: '', version: '' });
        setErrors({});
        setSuccess({});
        
        // Focus first input after reset for better UX
        setTimeout(() => {
            const firstInput = document.getElementById('title');
            if (firstInput) firstInput.focus();
        }, 0);
    }, []);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        const errorsFound = Object.values(errors).some((error) => error);

        if (errorsFound) {
            setShowModal({
                type: 'error', 
                show: true, 
                message: 'Please fill in all fields correctly'
            });
            return;
        }

        setSubmitting(true);
        try {
            const response = await fetch("/api/Projects", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Server responded with an error");
            }

            const result = await response.json();
            if (result.error) {
                setShowModal({
                    type: 'error', 
                    show: true, 
                    message: result.error || 'Error creating project. Please try again.'
                });
                return;
            }

            handleReset();
            setAddProjectDiv(false);
            setShowModal({
                type: 'success', 
                show: true, 
                message: 'Project has been added successfully'
            });
            fetchProjects();
        } catch (error) {
            console.error('Error creating project:', error);
            setShowModal({
                type: 'error', 
                show: true, 
                message: error.message || 'Error creating Project. Please try again.'
            });
        } finally {
            setSubmitting(false);
        }
    }, [formData, errors, handleReset, fetchProjects]);

    const handleDelete = useCallback(async (id) => {
        if (!id) return;
        
        setDeleting(true);
        try {
            const response = await fetch(`/api/Projects/?id=${id}`, {
                method: "DELETE",
            });
            
            if (!response.ok) {
                throw new Error("Failed to delete project");
            }
            
            setShowModal({
                type: 'success', 
                show: true, 
                message: 'Project has been deleted successfully'
            });
            fetchProjects();
        } catch (error) {
            console.error('Error deleting project:', error);
            setShowModal({
                type: 'error', 
                show: true, 
                message: error.message || 'Failed to delete Project. Please try again.'
            });
        } finally {
            setDeleting(false);
        }
    }, [fetchProjects]);

    const verifyInput = useCallback((value, fieldName) => {
        value = value.trim();
        let errorMessage = '';

        if (!value) {
            setErrors((prev) => ({ ...prev, [fieldName]: '' }));
            setSuccess((prev) => ({ ...prev, [fieldName]: null }));
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

        setErrors((prev) => ({ ...prev, [fieldName]: errorMessage }));
        setSuccess((prev) => ({ ...prev, [fieldName]: !errorMessage }));
    }, []);

    // Checkbox handlers
    const handleSelectAll = useCallback((e) => {
        const isChecked = e.target.checked;
        setSelectAll(isChecked);
        
        // Update all individual checkboxes
        const updatedSelectedProjects = {};
        projects.forEach((project) => {
            updatedSelectedProjects[project.title] = isChecked;
        });
        
        setSelectedProjects(updatedSelectedProjects);
    }, [projects]);

    const handleProjectCheckboxChange = useCallback((title) => {
        setSelectedProjects(prev => {
            const updated = {
                ...prev,
                [title]: !prev[title],
            };
            
            // Check if all checkboxes are selected
            const allSelected = projects.every((project) => 
                updated[project.title]
            );
            
            setSelectAll(allSelected);
            return updated;
        });
    }, [projects]);

    const showConfirmationModal = useCallback((id, title) => {
        setDeleteProject(id);
        setShowModal({
            type: 'warning',
            show: true,
            message: `Are you sure you want to delete ${title}?`,
        });
    }, []);
    
    const handleTagChange = useCallback((tag) => {
        setFilters(prev => {
            const updatedTags = prev.tags.includes(tag)
                ? prev.tags.filter((t) => t !== tag)
                : [...prev.tags, tag];
            
            return { ...prev, tags: updatedTags };
        });
    }, []);

    const handleTagChangeForm = useCallback((tag) => {
        setFormData(prev => {
            const updatedTags = prev.tags.includes(tag)
                ? prev.tags.filter((t) => t !== tag)
                : [...prev.tags, tag];
            
            return { ...prev, tags: updatedTags };
        });
    }, []);

    // Add keyboard navigation for pagination
    const handlePaginationKeyPress = useCallback((e, pageNumber) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            paginate(pageNumber);
        }
    }, [paginate]);

    // Memoize pagination display
    const paginationComponent = useMemo(() => {
        return (
            <ul className="pagination gap-2" role="navigation" aria-label="Pagination">
                <li className={`page-item arrow ${currentPage === 1 ? 'disabled' : ''}`}>
                    <a 
                        className="page-link" 
                        aria-label="Previous page" 
                        onClick={currentPage === 1 ? null : () => paginate(currentPage - 1)}
                        onKeyDown={(e) => handlePaginationKeyPress(e, currentPage - 1)}
                        tabIndex={currentPage === 1 ? -1 : 0}
                        role="button"
                        style={{ cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
                    >
                        <i className="ri-arrow-left-s-line"></i>
                    </a>
                </li>
                {Array.from({ length: totalPages }, (_, i) => (
                    <li key={i} className={`page-item ${i + 1 === currentPage ? "active" : ""}`}>
                        <a 
                            className="page-link" 
                            onClick={() => paginate(i + 1)}
                            onKeyDown={(e) => handlePaginationKeyPress(e, i + 1)}
                            tabIndex={0}
                            role="button"
                            aria-label={`Page ${i + 1}`}
                            aria-current={i + 1 === currentPage ? "page" : null}
                            style={{ cursor: 'pointer' }}
                        >
                            {i + 1}
                        </a>
                    </li>
                ))}
                <li className={`page-item arrow ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <a 
                        className="page-link" 
                        aria-label="Next page" 
                        onClick={currentPage === totalPages ? null : () => paginate(currentPage + 1)}
                        onKeyDown={(e) => handlePaginationKeyPress(e, currentPage + 1)}
                        tabIndex={currentPage === totalPages ? -1 : 0}
                        role="button"
                        style={{ cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
                    >
                        <i className="ri-arrow-right-s-line"></i>
                    </a>
                </li>
            </ul>
        );
    }, [currentPage, totalPages, paginate, handlePaginationKeyPress]);

    // Render the filtered projects table rows
    const projectRows = useMemo(() => {
        return currentProjects.map((project) => {
            const { badgeColor, output } = getBadgeClass(project.state);
            
            return (
                <tr key={project._id || project.title}>
                    <td>
                        <input 
                            className="cCheckbox" 
                            type="checkbox" 
                            checked={selectedProjects[project.title] || false} 
                            onChange={() => handleProjectCheckboxChange(project.title)} 
                        />
                    </td>
                    <td>{project.title}</td>
                    <td className="description-cell">{project.description}</td>
                    <td>
                        <div className="d-flex gap-1 flex-wrap">
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
                            })}
                        </div>
                    </td>
                    <td>
                        <div className={`badge bg-label-${badgeColor} rounded-pill lh-xs`}>
                            {output}
                        </div>
                    </td>
                    <td>{new Date(project.lastUpdated).toLocaleDateString()}</td>
                    <td>
                        <div className="d-flex gap-2">
                            <button className="btn btn-sm btn-info">
                                <i className="ri-eye-line"></i>
                            </button>
                            <button className="btn btn-sm btn-primary">
                                <i className="ri-edit-line"></i>
                            </button>
                            <button 
                                className="btn btn-sm btn-danger" 
                                onClick={() => showConfirmationModal(project._id, project.title)}
                            >
                                <i className="ri-delete-bin-line"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            );
        });
    }, [currentProjects, selectedProjects, handleProjectCheckboxChange, showConfirmationModal]);

    // Calculate entries display text
    const entriesDisplayText = useMemo(() => {
        const firstEntry = projects.length > 0 ? indexOfFirstProject + 1 : 0;
        const lastEntry = Math.min(indexOfLastProject, projects.length);
        return `Showing ${firstEntry} to ${lastEntry} of ${projects.length} entries`;
    }, [indexOfFirstProject, indexOfLastProject, projects.length]);

    return(
        <div className="d-flex col-lg-12 mt-4">
            <div className="card flex-grow-1 p-0">
                <div className="card-header filters">
                    <div className="row d-flex align-items-center p-2">
                        <h5 className="card-title">Filters</h5>    
                    </div>
                    <div className="row d-flex align-items-center ps-2 pe-2 pb-4 border-bottom">
                        <div className="col-lg-4">
                            <div className="select-wrapper">
                                <select 
                                    className="form-select"  
                                    onChange={(e) => setFilters({ 
                                        ...filters, 
                                        state: e.target.value === "" ? null : Number(e.target.value) 
                                    })}
                                >
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
                                    <button 
                                        className={`btn dropdown-toggle w-100 tagButton ${tagBtn ? 'setBorder': ''}`} 
                                        type="button" 
                                        id="dropdownMenuButton" 
                                        onClick={() => { 
                                            setTagBtn(!tagBtn); 
                                            setIsDropdownOpen(!isDropdownOpen); 
                                        }}
                                    >
                                        {filters.tags.length === 0 ? 'Select tags' : filters.tags.join(', ')}
                                    </button>
                                    <ul 
                                        className={`dropdown-menu w-100 ulTag ${isDropdownOpen ? 'show' : ''}`} 
                                        aria-labelledby="dropdownMenuButton"
                                    >
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
                                                    <label className="form-check-label" htmlFor={tag} onClick={(e) => e.preventDefault()}>
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
                            <div className="select-wrapper">
                                <select className="form-select"onChange={(e) => setFilters({ ...filters, lastUpdated: e.target.value })}>
                                    <option key="default" value="">Select a time range</option>
                                    {TIME_RANGES.map((range) => (
                                        <option key={range} value={range}>{range}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="row d-flex mt-3 pb-3 ps-2 pe-2">
                        <div className="col-lg-12 d-flex align-items-center justify-content-between">
                            <div className="d-flex">
                                <button className="btn btn-secondary dropdown-toggle exportBtn">Export</button>
                            </div>
                            <div className="d-flex gap-3">
                                <input 
                                    type="text" 
                                    className="form-control searchInput" 
                                    placeholder="Search Project" 
                                    onChange={(e) => setFilters({ ...filters, title: e.target.value })}
                                    aria-label="Search projects"
                                />
                                <button 
                                    className="btn btn-primary addBtn" 
                                    onClick={() => setAddProjectDiv(true)}
                                    aria-label="Add new project"
                                >
                                    Add Project
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card-body d-flex flex-wrap p-0 mb-4">
                    {loading && (
                        <div className="d-flex justify-content-center w-100 p-4">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    )}
                    
                    {fetchError && (
                        <div className="alert alert-danger w-100 m-3" role="alert">
                            {fetchError}
                        </div>
                    )}

                    {!loading && !fetchError && (
                        <div className="table-responsive text-nowrap user-table manageTable w-100">
                            <table className="table table-sm mb-0">
                                <thead className="table-head">
                                    <tr style={{ backgroundColor: '#3A3E5B' }}>
                                        <th>
                                            <input 
                                                className="cCheckbox" 
                                                type="checkbox" 
                                                checked={selectAll} 
                                                onChange={handleSelectAll}
                                            />
                                        </th>
                                        {THEAD.map((thead) => (
                                            <th key={thead}>{thead}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="table-content">
                                    {currentProjects.length === 0 ? (
                                        <tr>
                                            <td colSpan={THEAD.length + 1} className="text-center p-4">
                                                No projects found matching your filters
                                            </td>
                                        </tr>
                                    ) : (
                                        projectRows
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                    
                    {!loading && !fetchError && projects.length > 0 && (
                        <div className="row w-100">
                            <div className="col-lg-12 d-flex align-items-center justify-content-between ps-5 pt-3">
                                <p>{entriesDisplayText}</p>
                                {paginationComponent}
                            </div>
                        </div>
                    )}
                </div>  
            </div>
            
            {/* Add New Project form sliding in from the right */}
            <div 
                className={`add-user-form ${addProjectDiv ? 'show' : ''}`} 
                ref={addProjectFormRef}
                role="dialog"
                aria-labelledby="addProjectFormTitle"
            >
                <div className="form-container d-flex flex-column mt-2">
                    <div className="d-flex align-items-center justify-content-between bottom-border">
                        <h5 className="m-0" id="addProjectFormTitle">Add Project</h5>
                        <div className="d-flex align-items-center gap-3 float-end">
                            <i 
                                className="ri-refresh-line" 
                                onClick={handleReset}
                                tabIndex="0"
                                role="button"
                                aria-label="Reset form"
                                onKeyDown={(e) => e.key === 'Enter' && handleReset()}
                            ></i>
                            <i 
                                className="ri-close-line" 
                                onClick={() => setAddProjectDiv(false)}
                                tabIndex="0"
                                role="button"
                                aria-label="Close form"
                                onKeyDown={(e) => e.key === 'Enter' && setAddProjectDiv(false)}
                            ></i>
                        </div>
                    </div>
                    <hr />
                    <form className="d-flex flex-column mt-3" onSubmit={handleSubmit} noValidate>
                        <div className="form-group">
                            <input 
                                type="text" 
                                id="title" 
                                name="title" 
                                placeholder="Ex: Building a Dashboard" 
                                value={formData.title} 
                                className={`form-control sInput ${
                                    errors.title ? 'errorBorderColor' : success.title ? 'successBorderColor' : ''
                                }`} 
                                required 
                                onChange={handleInputChange('title')} 
                                onBlur={(e) => verifyInput(e.target.value, e.target.name)}
                            />
                            <label htmlFor="title">Title</label>
                            <div className="errorDiv">{errors.title}</div>
                        </div>

                        <div className="form-group">
                            <input 
                                type="text" 
                                id="version" 
                                name="version" 
                                placeholder="v1.12" 
                                value={formData.version} 
                                className={`form-control sInput ${
                                    errors.version ? 'errorBorderColor' : success.version ? 'successBorderColor' : ''
                                }`} 
                                required 
                                onChange={handleInputChange('version')} 
                                onBlur={(e) => verifyInput(e.target.value, e.target.name)}
                            />
                            <label htmlFor="version">Version</label>
                            <div className="errorDiv">{errors.version}</div>
                        </div>

                        <div className="form-group">
                            <select 
                                className={`form-select ${success.state ? 'successBorderColor': ''}`} 
                                value={formData.state} 
                                id="state" 
                                name="state" 
                                required 
                                onChange={handleInputChange('state')} 
                                onBlur={(e) => verifyInput(e.target.value, e.target.name)}
                            >
                                <option value="">Select status</option>
                                {STATUS.map((state) => {
                                    const { output } = getBadgeClass(state);
                                    return <option key={state} value={state}>{output}</option>;
                                })}
                            </select>
                            <label htmlFor="state">State</label>
                            <div className="errorDiv">{errors.state}</div>
                        </div>

                        <div className="select-wrapper">
                            <button 
                                className={`btn dropdown-toggle w-100 formBtn tagButton ${
                                    formtagBtn ? 'setBorder': ''
                                } ${
                                    formData.tags.length > 0 ? 'selected-tags' : ''
                                }`} 
                                type="button" 
                                id="dropdownForm" 
                                onClick={() => { 
                                    setFormTagBtn(!formtagBtn); 
                                    setIsformDropdownOpen(!isformDropdownOpen); 
                                }}
                            >
                                {formData.tags.length === 0 ? 'Select tags' : formData.tags.join(', ')}
                            </button>
                            
                            <ul 
                                className={`dropdown-menu w-100 ulTag ${isformDropdownOpen ? 'show' : ''}`} 
                                aria-labelledby="dropdownForm"
                            >
                                {TAGS.map((tag) => (
                                    <li 
                                        key={tag} 
                                        onClick={() => handleTagChangeForm(tag)} 
                                        className="custom-tag-li p-2"
                                    >
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
                                className={`form-control sInput projectDescription ${
                                    errors.description ? 'errorBorderColor' : success.description ? 'successBorderColor' : ''
                                }`}
                                required
                                onChange={handleInputChange('description')}
                                onBlur={(e) => verifyInput(e.target.value, e.target.name)}
                            />
                            <div className="errorDiv mt-4">{errors.description}</div>
                        </div>

                        <div className="d-flex mt-1 gap-3">
                            <button 
                                type="submit" 
                                className="btn addItem"
                                disabled={submitting}
                            >
                                {submitting ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                                        Submitting...
                                    </>
                                ) : "Submit"}
                            </button>
                            <button 
                                type="button" 
                                className="btn cancelItem" 
                                onClick={() => setAddProjectDiv(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            
            <Modal 
                showModal={showModal} 
                setShowModal={setShowModal} 
                handleDelete={handleDelete} 
                deleteAction={deleteProject}
                isDeleting={deleting}
            />
            
            {hideBody && <div className="modal-backdrop show"></div>}
        </div>
    );
}