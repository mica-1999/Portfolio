"use client";
import { useEffect, useState } from "react"; 
import { fetchDataFromApi } from '/src/utils/apiUtils';
import { getBadgeClass, getTimeFormatted } from '/src/utils/mainContentUtil';

export default function ManageProject() {
    const STATUS = ["Completed", "In Progress", "Not Started", "Failed"];
    const CATEGORIES = ["Web", "Mobile", "Game", "Other"];
    const TIME_RANGES = ["Last 7 days", "Last 30 days", "Last 6 months", "Last year", "All time"];

    const THEAD = ['Title', 'Description', 'Tags', 'Status', 'Last Active'];

    const [Timeline, setTimeline] = useState([]); // Initialize as an empty array
    const [hiddenSections, setHiddenSections] = useState([]);

    useEffect(() => {
        const fetchTimeline = async () => {
            try {
                const response = await fetchDataFromApi("/api/getTimeline");
                setTimeline(response || []);
            } 
            catch (error) {
                console.error('Error fetching data:', error);
            } 
        }
        fetchTimeline();    
    }, []);

    const handleSections = (sectionId) => {
        setHiddenSections((prevHiddenSections) =>
            prevHiddenSections.includes(sectionId)
                ? prevHiddenSections.filter((id) => id !== sectionId)
                : [...prevHiddenSections, sectionId]
        );
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
                        <div className="col-lg-6">
                            <div className="card projectTimeline">                    
                                <div className="card-header">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <h5 className="card-title">Project Name</h5>
                                    </div>
                                    <h6 className="card-subtitle mb-2">ID #</h6>
                                </div>
                                <div className="card-body">


                                <div class="timeline">
                                    <div class="timeline-container primary">
                                        <div class="timeline-icon">
                                            <i class="far fa-grin-wink"></i>
                                        </div>
                                        <div class="timeline-body">
                                            <h4 class="timeline-title"><span class="badge">Primary</span></h4>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam necessitatibus numquam earum ipsa fugiat veniam suscipit, officiis repudiandae, eum recusandae neque dignissimos. Cum fugit laboriosam culpa, repellendus esse commodi deserunt.</p>
                                            <p class="timeline-subtitle">1 Hours Ago</p>
                                        </div>
                                    </div>
                                    <div class="timeline-container danger">
                                        <div class="timeline-icon">
                                            <i class="far fa-grin-hearts"></i>
                                        </div>
                                        <div class="timeline-body">
                                            <h4 class="timeline-title"><span class="badge">Danger</span></h4>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam necessitatibus numquam earum ipsa fugiat veniam suscipit, officiis repudiandae, eum recusandae neque dignissimos. Cum fugit laboriosam culpa, repellendus esse commodi deserunt.</p>
                                            <p class="timeline-subtitle">2 Hours Ago</p>
                                        </div>
                                    </div>
                                </div>


                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="card projectTimeline">                    
                            <div className="card-header">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <h5 className="card-title">Project Name</h5>
                                    </div>
                                    <h6 className="card-subtitle mb-2">ID #</h6>
                                </div>
                                <div className="card-body">
                                    


                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}