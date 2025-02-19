"use client"

export default function Calendar(){
    return(
    <div className="d-flex col-lg-12 mt-1 p-4">
        <div className="card flex-grow-1 p-0" >
            <div className="d-flex card-header justify-content-between align-items-center">
                <span className="ms-3">Month Name</span>
                <div className="btn-group filters">
                    <button type="button" className="btn btn-sm btn-outline-secondary">Today</button>
                    <select className="form-select form-select-sm">
                        <option value="1">Month</option>
                        <option value="2">Year</option>
                    </select>
                    <button type="button" className="btn btn-sm btn-outline-secondary">Add Event</button>
                </div>
            </div>  
            <div className="card-body">

            </div>
        </div>
    </div>


    )
}