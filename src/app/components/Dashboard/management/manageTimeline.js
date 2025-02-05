"use client";
import { useEffect, useState } from "react"; 
import { fetchDataFromApi } from '/src/utils/apiUtils';
import { getTimeFormatted, getEventColor } from '/src/utils/mainContentUtil';

export default function ManageProject() {
    const STATUS = ["Completed", "In Progress", "Not Started", "Failed"];
    const CATEGORIES = ["Web", "Mobile", "Game", "Other"];
    const TIME_RANGES = ["Last 7 days", "Last 30 days", "Last 6 months", "Last year", "All time"];
    const [data, setData] = useState([]); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchDataFromApi("/api/getProjectTimeline");
                setData(response || []);
                console.log(response);

            } 
            catch (error) {
                console.error('Error fetching data:', error);
            } 
        }
        fetchData();    
    }, []);

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

                    <div className="row d-flex mt-3 pb-3 ps-2 pe-2 border-bottom">
                        <div className="col-lg-12 d-flex align-items-center justify-content-between">
                            <div className="d-flex">
                                <button className="btn btn-secondary dropdown-toggle exportBtn">Export </button>
                            </div>
                            <div className="d-flex gap-3">
                                <input type="text" className="form-control searchInput" placeholder="Search Project" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card-body p-0 p-4">
                    <div className="row d-flex align-items-center p-2">

                    {data.map((projectData) => {
                        return projectData.timeline.length > 0 ? (
                            <div className="col-lg-6" key={projectData._id}>
                            <div className="card projectTimeline">
                                <div className="card-header">
                                <div className="d-flex align-items-center justify-content-between">
                                    <h5 className="card-title">{projectData.title}</h5>
                                    <i className="ri-add-line ri-lg ms-2 add-event-icon"></i>
                                </div>
                                <h6 className="card-subtitle mb-2">ID #{projectData.id}</h6>
                                </div>
                                <div className="card-body p-0 overflow-auto">
                                <div className="manage-timeline pt-3">
                                    {projectData.timeline.map((timeline) => {
                                    const eventColor = getEventColor(timeline.state);
                                    return (
                                        <div className="manage-timeline-container pe-4" key={timeline._id}>
                                            <div className="manage-timeline-icon" style={{ background: eventColor }}></div>
                                            <div className="manage-timeline-body">
                                                <h4 className="manage-timeline-title">
                                                    <span className="badge" style={{ background: eventColor }}>{timeline.title}</span>
                                                </h4>
                                                <p>{timeline.description}</p>
                                                <p className="manage-timeline-subtitle">{getTimeFormatted(timeline.startDate)}</p>
                                            </div>
                                        </div>
                                    );
                                    })}
                                </div>
                                </div>
                            </div>
                            </div>
                        ) : null;
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}