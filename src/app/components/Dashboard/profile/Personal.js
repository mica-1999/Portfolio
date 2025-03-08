"use client"
import { useEffect, useState } from "react"
import { fetchDataFromApi } from '/src/utils/apiUtils';
import { useSession } from 'next-auth/react';
import { useSearchParams } from "next/navigation";
import { getBadgeClass, getTimeFormatted, getTagColor } from '/src/utils/mainContentUtil';

const THEAD = ['Title', 'Description', 'Tags', 'Status', 'Last Updated'];

export default function Personal(){
    const searchParams = useSearchParams(); 
    const userId = searchParams.get("userId");

    const { data: session } = useSession();
    const [timelineData, setTimelineData] = useState([]);
    const [userData, setUserData] = useState({});
    const [projectData, setProjectData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('profile');

    useEffect(() => {
        if (!userId) {
            setError("User ID is required");
            setLoading(false);
            return;
        }

        const fetchData = async () => {       
            try {
                const [timelineResponse, userResponse, projectResponse] = await Promise.all([
                    fetchDataFromApi('/api/Timeline', userId).catch(() => []),
                    fetchDataFromApi('/api/User', userId).catch(() => ({})),
                    fetchDataFromApi('/api/Projects', userId).catch(() => [])
                ]);
    
                setTimelineData(timelineResponse);   
                setUserData(userResponse); 
                setProjectData(projectResponse);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError("Failed to load data. Please try again later.");
                setLoading(false);
            }
        }
        fetchData();
    },[userId]);

    // Format date properly
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    // Get full name safely
    const getFullName = () => {
        const firstName = userData?.firstName || '';
        const lastName = userData?.lastName || '';
        return `${firstName} ${lastName}`.trim() || 'User';
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{height: '300px'}}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-danger m-4" role="alert">
                {error}
            </div>
        );
    }

    return(
    <>
        <div className="d-flex col-lg-12 mt-1 p-4">
            <div className="card flex-grow-1 p-0" >
                <div className="d-flex card-header justify-content-between align-items-center headerPP">
                    <img src="/assets/images/headerPP/banner.png" className="headerBackground" alt="Header Background" />
                </div>  
                <div className="card-body">
                    <div className="d-flex align-items-center infoSection flex-wrap">
                        <div className="d-flex flex-md-row flex-column">
                            <div className="profile-image-container">
                                <img 
                                    src={userData.profilePicture || "/assets/images/profile-icon.png"} 
                                    alt="Profile Picture" 
                                    width="120" 
                                    height="120"
                                    className="profile-image"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = "/assets/images/profile-icon.png";
                                    }}
                                />
                            </div>
                            <div className="d-flex flex-column ms-3 pt-4">
                                <h4 className="text-primary card-info">{getFullName()}</h4>
                                <div className="d-flex flex-row gap-2 gap-md-5 flex-wrap">
                                    <h6>{userData.job || "No Role Defined"}</h6>
                                    <h6>{userData.address?.city || "No City Attributed"}</h6>
                                    <h6>{"Joined " + formatDate(userData.createdAt)}</h6>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex flex-grow-1 justify-content-end mt-3 mt-md-0">
                            {session?.user?.id === userData._id ? (
                                <button className="btn btn-primary addBtn"><i className="ri-edit-line me-2"></i> Edit Profile</button>
                            ) : (
                                <button className="btn btn-primary addBtn"><i className="ri-user-add-line me-2"></i> Connect</button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="row m-0 p-0">
            <div className="col-lg-12 d-flex ps-4 gap-3 PPsections overflow-auto">
                <button 
                    className={`btn ${activeTab === 'profile' ? 'active' : ''}`}
                    onClick={() => setActiveTab('profile')}
                >
                    <i className="ri-user-line me-2"></i> Profile
                </button>
                <button 
                    className={`btn ${activeTab === 'projects' ? 'active' : ''}`}
                    onClick={() => setActiveTab('projects')}
                >
                    <i className="ri-projector-line me-2"></i> Projects
                </button>
                <button 
                    className={`btn ${activeTab === 'connections' ? 'active' : ''}`}
                    onClick={() => setActiveTab('connections')}
                >
                    <i className="ri-team-line me-2"></i> Connections
                </button>
            </div>
        </div>

        {activeTab === 'profile' && (
            <div className="row m-0 p-0 pe-4">
                <div className="col-lg-4 d-flex flex-column ps-4 pe-4 mb-4">
                    <div className="card">
                        <div className="card-header">
                            <h5 className="card-title">About</h5>
                        </div>
                        <div className="card-body">
                            <div className="d-flex flex-column aboutMe">
                                <p><i className="ri-user-line me-2"></i> Full Name: {getFullName()}</p>
                                <p>
                                    <i className="ri-checkbox-circle-line me-2"></i> 
                                    Status: <span className={`badge ${userData.isActive === "active" ? "bg-success" : "bg-secondary"}`}>
                                        {userData.isActive === "active" ? "active" : "inactive"}
                                    </span>
                                </p>
                                <p><i className="ri-briefcase-line me-2"></i> Role: {userData.job || "N/A"}</p>
                                <p><i className="ri-map-pin-line me-2"></i> Country: {userData.address?.country || "N/A"}</p>
                                <p><i className="ri-translate-2 me-2"></i> Languages: English</p>
                                <p><i className="ri-phone-line me-2"></i> Contact: {userData.phone || "N/A"}</p>
                                <p><i className="ri-mail-line me-2"></i> Email: {userData.email || "N/A"}</p>
                                <p><i className="ri-team-line me-2"></i> Teams</p>
                                <p><i className="ri-group-line me-2"></i> Backend Developer (126 Members)</p>
                                <p><i className="ri-group-line me-2"></i> React Developer (98 Members)</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="col-lg-8 d-flex flex-column">
                    <div className="row">
                        <div className="col-lg-12 m-0 mb-4">
                            <div className="card">
                                <div className="card-header">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <h5 className="card-title">Activity Timeline</h5>
                                    </div>
                                </div>
                                <div className="card-body p-0 pt-4">
                                {timelineData.length === 0 ? (
                                    <p className="text-center text-muted p-4">No activity timeline found.</p>
                                ) : (
                                    <ul className="timeline card-timeline mb-0">
                                        {timelineData.map((timeline_info, index) => {
                                        const { badgeColor, output } = getBadgeClass(timeline_info.state);
                                        const timelineTime = getTimeFormatted(timeline_info.timestamp);
                                        return (
                                            <li className="timeline-item" key={index}>
                                            <span className={`timeline-point timeline-point-${badgeColor}`}></span>
                                            <div className="timeline-event ps-4">
                                                <div className="timeline-header mb-2 pe-4">
                                                <h6 className="mb-0">{timeline_info.title}</h6>
                                                <small className="text-muted">{timelineTime}</small>
                                                </div>
                                                <p>{timeline_info.description}</p>
                                            </div>
                                            </li>
                                        );
                                        })}
                                    </ul>
                                )}
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-lg-12">
                            <div className="card p-0">
                                <div className="card-header pt-4 ps-4">
                                    <h5 className="card-title"><i className="ri-projector-line pe-3"></i>Projects</h5>
                                </div>
                                <div className="card-body p-0">
                                    <div className="table-responsive text-nowrap user-table manageTable w-100">
                                        <table className="table table-sm mb-0">
                                            <thead className="table-head">
                                                <tr style={{ backgroundColor: '#3A3E5B' }}>
                                                    {THEAD.map((thead) => (
                                                        <th key={thead}>{thead}</th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody className="table-content">
                                            {projectData.length === 0 ? (
                                                <tr>
                                                    <td colSpan={THEAD.length} className="text-center text-muted py-4">
                                                        No projects found.
                                                    </td>
                                                </tr>
                                            ) : (
                                                projectData.map((project) => {
                                                    const { badgeColor, output} = getBadgeClass(project.state);
                                                    return(
                                                        <tr key={project._id}>
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
                                                        </tr>
                                                    );
                                                })
                                            )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </>
    )
}