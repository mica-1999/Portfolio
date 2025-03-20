"use client";
import { useEffect, useState } from "react"; 
import { fetchDataFromApi } from '/src/utils/apiUtils';
import { getTimeFormatted, getEventColor } from '/src/utils/mainContentUtil';

export default function ManageTimeline() {
    const STATUS = ["Completed", "In Progress", "Not Started", "Failed"];
    const CATEGORIES = ["Web", "Mobile", "Game", "Other"];
    const TIME_RANGES = ["Last 7 days", "Last 30 days", "Last 6 months", "Last year", "All time"];
    
    const [data, setData] = useState([]); 
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        category: '',
        status: '',
        timeRange: ''
    });
    const [showAddModal, setShowAddModal] = useState(false);
    const [activeProject, setActiveProject] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetchDataFromApi("/api/ProjectTimeline");
                setData(response || []);
                setFilteredData(response || []);
                setLoading(false);
            } 
            catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to load timeline data. Please try again later.');
                setLoading(false);
            } 
        }
        fetchData();    
    }, []);

    useEffect(() => {
        applyFilters();
    }, [filters, searchTerm, data]);

    const applyFilters = () => {
        let result = [...data];
        
        // Apply category filter
        if (filters.category) {
            result = result.filter(project => project.category === filters.category);
        }
        
        // Apply status filter
        if (filters.status) {
            result = result.filter(project => 
                project.timeline.some(item => item.state === filters.status.toLowerCase())
            );
        }
        
        // Apply time range filter
        if (filters.timeRange) {
            const now = new Date();
            let cutoffDate = new Date();
            
            switch (filters.timeRange) {
                case "Last 7 days":
                    cutoffDate.setDate(now.getDate() - 7);
                    break;
                case "Last 30 days":
                    cutoffDate.setDate(now.getDate() - 30);
                    break;
                case "Last 6 months":
                    cutoffDate.setMonth(now.getMonth() - 6);
                    break;
                case "Last year":
                    cutoffDate.setFullYear(now.getFullYear() - 1);
                    break;
                default:
                    cutoffDate = new Date(0); // All time
            }
            
            result = result.filter(project => 
                project.timeline.some(item => new Date(item.startDate) >= cutoffDate)
            );
        }
        
        // Apply search term filter
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            result = result.filter(project => 
                project.title.toLowerCase().includes(term) ||
                project.timeline.some(item => 
                    item.title.toLowerCase().includes(term) ||
                    item.description.toLowerCase().includes(term)
                )
            );
        }
        
        setFilteredData(result);
    };

    const handleFilterChange = (e, filterType) => {
        setFilters({
            ...filters,
            [filterType]: e.target.value
        });
    };

    const handleClearFilters = () => {
        setFilters({
            category: '',
            status: '',
            timeRange: ''
        });
        setSearchTerm('');
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleAddEvent = (projectId) => {
        setActiveProject(projectId);
        setShowAddModal(true);
    };

    const exportData = () => {
        // Implementation for exporting data
        alert('Export functionality will be implemented here');
    };

    if (loading) {
        return (
            <div className="d-flex col-lg-12 mt-4 justify-content-center align-items-center" style={{ height: '500px' }}>
                <div className="text-center">
                    <div className="spinner-border text-primary mb-3" role="status" style={{ width: '3rem', height: '3rem' }}>
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="text-muted">Loading timeline data...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="d-flex col-lg-12 mt-4">
                <div className="card flex-grow-1 p-4">
                    <div className="alert alert-danger" role="alert">
                        <i className="ri-error-warning-line me-2"></i> {error}
                        <button className="btn btn-sm btn-outline-danger ms-3" onClick={() => window.location.reload()}>
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return(
        <div className="d-flex col-lg-12 mt-4">
            <div className="card flex-grow-1 p-0" >
                <div className="card-header filters">
                    <div className="row d-flex align-items-center p-2">
                        <h5 className="card-title">
                            <i className="ri-calendar-todo-line me-2"></i>
                            Project Timelines
                        </h5>    
                    </div>
                    <div className="row d-flex align-items-center ps-2 pe-2 pb-4 border-bottom">
                        <div className="col-lg-4 mb-3 mb-lg-0">
                            <div className="select-wrapper">
                                <select 
                                    className="form-select"
                                    value={filters.category}
                                    onChange={(e) => handleFilterChange(e, 'category')}
                                >
                                    <option value="">Select a category</option>
                                    {CATEGORIES.map((category) => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="col-lg-4 mb-3 mb-lg-0">
                            <div className="select-wrapper">
                                <select 
                                    className="form-select"
                                    value={filters.status}
                                    onChange={(e) => handleFilterChange(e, 'status')}
                                >
                                    <option value="">Select a status</option>
                                    {STATUS.map((status) => (
                                        <option key={status} value={status}>{status}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <div className="select-wrapper">
                                <select 
                                    className="form-select"
                                    value={filters.timeRange}
                                    onChange={(e) => handleFilterChange(e, 'timeRange')}
                                >
                                    <option value="">Select a time range</option>
                                    {TIME_RANGES.map((range) => (
                                        <option key={range} value={range}>{range}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="row d-flex mt-3 pb-3 ps-2 pe-2 border-bottom">
                        <div className="col-lg-12 d-flex align-items-center justify-content-between flex-wrap gap-3">
                            <div className="d-flex gap-2">
                                <button className="btn btn-secondary exportBtn" onClick={exportData}>
                                    <i className="ri-download-2-line me-2"></i> Export 
                                </button>
                                <button 
                                    className="btn btn-outline-secondary" 
                                    onClick={handleClearFilters}
                                    title="Clear all filters"
                                >
                                    <i className="ri-refresh-line"></i>
                                </button>
                            </div>
                            <div className="d-flex position-relative searchBox">
                                <i className="ri-search-line search-icon"></i>
                                <input 
                                    type="text" 
                                    className="form-control searchInput ps-5" 
                                    placeholder="Search timeline..." 
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                />
                                {searchTerm && (
                                    <button 
                                        className="btn btn-sm btn-link position-absolute end-0 top-50 translate-middle-y text-muted"
                                        onClick={() => setSearchTerm('')}
                                        style={{ zIndex: 5 }}
                                    >
                                        <i className="ri-close-line"></i>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card-body p-0 p-4">
                    {filteredData.length === 0 ? (
                        <div className="text-center my-5 py-5">
                            <i className="ri-calendar-event-line" style={{ fontSize: '3rem', color: '#595b75' }}></i>
                            <h5 className="mt-3 text-muted">No timeline data found</h5>
                            <p className="text-muted">Try adjusting your filters or search terms</p>
                            <button className="btn btn-outline-primary mt-2" onClick={handleClearFilters}>
                                Clear Filters
                            </button>
                        </div>
                    ) : (
                        <div className="row d-flex p-2">
                            {filteredData.map((projectData) => (
                                projectData.timeline.length > 0 && (
                                    <div className="col-lg-6 d-flex timeline-custom mb-4" key={projectData._id}>
                                        <div className="card flex-grow-1">
                                            <div className="card-header">
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <div>
                                                        <h5 className="card-title mb-0">{projectData.title}</h5>
                                                        <span className="badge bg-label-primary mt-1">
                                                            {projectData.category || "Uncategorized"}
                                                        </span>
                                                    </div>
                                                    <button 
                                                        className="btn btn-sm btn-icon btn-primary rounded-circle" 
                                                        onClick={() => handleAddEvent(projectData._id)}
                                                        title="Add timeline event"
                                                    >
                                                        <i className="ri-add-line"></i>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="card-body p-0 pt-4">
                                                <ul className="timeline card-timeline mb-0">
                                                    {projectData.timeline.map((timeline, index) => {
                                                        const eventColor = getEventColor(timeline.state);
                                                        const timelineTime = getTimeFormatted(timeline.startDate);
                                                        return (
                                                            <li 
                                                                className="timeline-item" 
                                                                key={timeline._id || index}
                                                                title={`Status: ${timeline.state}`}
                                                            >
                                                                <span className={`timeline-point timeline-point-${eventColor}`}></span>
                                                                <div className="timeline-event ps-4">
                                                                    <div className="timeline-header mb-2 pe-4">
                                                                        <div>
                                                                            <h6 className="mb-0">{timeline.title}</h6>
                                                                            <small className="text-muted">{timelineTime}</small>
                                                                        </div>
                                                                        <div className="timeline-actions">
                                                                            <div className="dropdown">
                                                                                <button className="btn btn-sm btn-icon btn-text-secondary" data-bs-toggle="dropdown">
                                                                                    <i className="ri-more-2-fill"></i>
                                                                                </button>
                                                                                <ul className="dropdown-menu dropdown-menu-end">
                                                                                    <li><a className="dropdown-item" href="#"><i className="ri-edit-line me-2"></i> Edit</a></li>
                                                                                    <li><a className="dropdown-item text-danger" href="#"><i className="ri-delete-bin-line me-2"></i> Delete</a></li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <p>{timeline.description}</p>
                                                                </div>
                                                            </li>
                                                        );
                                                    })}
                                                </ul>
                                            </div>
                                            <div className="card-footer p-3 text-end">
                                                <button className="btn btn-sm btn-link text-primary">
                                                    View All Activities
                                                </button>
                                            </div>
                                        </div> 
                                    </div>
                                )
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Add Timeline Event Modal */}
            {showAddModal && (
                <div className="modal d-block show" tabIndex="-1" style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add Timeline Event</h5>
                                <button type="button" className="btn-close" onClick={() => setShowAddModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group mb-3">
                                    <input type="text" className="form-control sInput" id="eventTitle" placeholder=" " />
                                    <label htmlFor="eventTitle">Event Title</label>
                                </div>
                                <div className="form-group mb-3">
                                    <textarea className="form-control sInput description" id="eventDescription" placeholder="Enter event description"></textarea>
                                    <label htmlFor="eventDescription">Description</label>
                                </div>
                                <div className="form-group mb-3">
                                    <select className="form-control sInput" id="eventStatus">
                                        <option value="">Select status</option>
                                        {STATUS.map((status) => (
                                            <option key={status} value={status.toLowerCase()}>{status}</option>
                                        ))}
                                    </select>
                                    <label htmlFor="eventStatus">Status</label>
                                </div>
                                <div className="form-group mb-3">
                                    <input type="date" className="form-control sInput" id="eventDate" />
                                    <label htmlFor="eventDate">Date</label>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn cancelItem" onClick={() => setShowAddModal(false)}>Cancel</button>
                                <button type="button" className="btn addItem">Add Event</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}