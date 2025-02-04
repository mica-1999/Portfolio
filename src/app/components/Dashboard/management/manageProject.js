"use client";
import { useEffect, useState } from "react"; 
import { fetchDataFromApi } from '/src/utils/apiUtils';
import { getBadgeClass, getTagColor } from "/src/utils/mainContentUtil";

export default function ManageProject() {
    const STATUS = ["Completed", "In Progress", "Not Started", "Failed"];
    const CATEGORIES = ["Web", "Mobile", "Game", "Other"];
    const TIME_RANGES = ["Last 7 days", "Last 30 days", "Last 6 months", "Last year", "All time"];

    const THEAD = ['Title', 'Description', 'Tags', 'Status', 'Last Active'];

    const [projects, setProjects] = useState([]); // Initialize as an empty array
    const [selectAll, setSelectAll] = useState(false); // State for header checkbox
    const [selectedProjects, setSelectedProjects] = useState({}); // State for individual checkboxes

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetchDataFromApi("/api/getProjects");
                setProjects(response || []);
            } 
            catch (error) {
                console.error('Error fetching data:', error);
            } 
        }
        fetchProjects();    
    }, []);

    // Handle header checkbox change
    const handleSelectAll = (e) => {
        const isChecked = e.target.checked;
        setSelectAll(isChecked);
        // Update all individual checkboxes
        const updatedSelectedProjects = {};
        projects.forEach((project) => {
            updatedSelectedProjects[project.title] = isChecked;
        });
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
                                    <option key="default" value="">Select a category</option>
                                    {CATEGORIES.map((category) => (
                                        <option key={category} value={category}>{category}</option>
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

                        <div className="col-lg-4">
                            <div className="select-wrapper">
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
                                <input type="text" className="form-control searchInput" placeholder="Search Project" />
                                <button className="btn btn-primary adduserBtn">Add Project</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card-body d-flex  flex-wrap p-0 mb-4">
                    <div className="table-responsive text-nowrap user-table manageTable">
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
                                    <th className="d-flex justify-content-center">Actions</th>
                                
                                </tr>
                            </thead>
                            <tbody className="table-content">
                                {projects.map((project) => {
                                    const { badgeColor, output} = getBadgeClass(project.state);
                                    return(
                                        <tr key={project.title}>
                                            <td>
                                            <input className="cCheckbox" type="checkbox" checked={selectedProjects[project.title] || false} onChange={() => handleProjectCheckboxChange(project.title)} />
                                            </td>
                                            <td>{project.title}</td>
                                            <td className="description-cell">{project.description}</td>
                                            <td><div className="d-flex gap-1">
                                            {project.tags.map((tag, index) => {
                                                const { color, tag: tagName } = getTagColor(tag);
                                                return (
                                                    <div
                                                        key={index}
                                                        className="badge rounded-pill tag-selection"
                                                        style={{
                                                            backgroundColor: `var(--tagColor-${color}-bg)`, // Light background color
                                                            color: `var(--tagColor-${color}-text)`, // Text color
                                                            border: `1px solid var(--tagColor-${color}-border)`, // Border matches text color
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
                                                    
                                                    <button className="btn btn-sm btn-danger">
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
                </div>  
            </div>
        </div>
    );
}