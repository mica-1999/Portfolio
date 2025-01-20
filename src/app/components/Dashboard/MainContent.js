export default function MainContent() {
  return (
    <div className="row d-flex mt-3">
      <div className="d-flex col-lg-6 balance">
        <div className="card flex-grow-1">
          <div className="card-header">
            <h5 className="card-title">Multibanco</h5>
            <h6 className="card-subtitle mb-2">Balance Overview</h6>
          </div>
          <div className="card-body d-flex justify-content-evenly flex-wrap p-0 mb-4">
            <div className="d-flex gap-2">
              <div className="d-flex justify-content-center align-items-center small-box">
                <i className="fa-solid fa-euro-sign fa-lg euro-icon"></i>
              </div>
              <div className="card-info">
                <h5 className="mb-0">?????</h5>
                <p className="mb-0">Total Balance</p>
              </div>
            </div>
            <div className="d-flex gap-2">
              <div className="d-flex justify-content-center align-items-center small-box-third">
                <i className="fa-solid fa-arrow-up fa-lg third-icon"></i>
              </div>
              <div className="card-info">
                <h5 className="mb-0">?????</h5>
                <p className="mb-0">This Month</p>
              </div>
            </div>
            <div className="d-flex gap-2 p-0">
              <div className="d-flex justify-content-center align-items-center small-box-received">
                <i className="fa-solid fa-arrow-down fa-lg balance-received-icon"></i>
              </div>
              <div className="card-info">
                <h5 className="mb-0">TBD</h5>
                <p className="mb-0">New Transactions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex col-lg-3 ratings">
        <div className="card flex-grow-1">
          <div className="row g-0 flex-grow-1">
            <div className="col-lg-6">
              <div className="card-header">
                <h6 className="card-title">Ratings</h6>
                <div className="badge bg-label-primary rounded-pill lh-xs">Year of 2025</div>
              </div>
              <div className="card-body p-0 ms-3">
                <h4>8.5k</h4>
              </div>
            </div>
            <div className="col-lg-6 d-flex align-items-center justify-content-end pe-4">
              <img src="../assets/images/avatar.png" className="img-fluid" style={{ marginBottom: '-10px' }} />
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex col-lg-3 sessions">
        <div className="card flex-grow-1">
          <div className="row flex-grow-1">
            <div className="col-lg-6">
              <div className="card-header">
                <h6 className="card-title">Sessions</h6>
                <div className="badge bg-label-success rounded-pill lh-xs">Last Month</div>
              </div>
              <div className="card-body p-0 ms-3">
                <h4>0</h4>
              </div>
            </div>
            <div className="col-lg-6 d-flex align-items-center justify-content-end pe-4">
              <img src="../assets/images/session.png" className="img-fluid" style={{ marginBottom: '-10px' }} />
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-8 d-flex table-custom">
        <div className="card flex-grow-1">
          <div className="card-header">
            <h5 className="card-title">Projects</h5>
            <h6 className="card-subtitle mb-2">#Categories</h6>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive text-nowrap project-table">
              <table className="table user-table border-top">
                <thead className="table-head">
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>State</th>
                    <th>Last Updated</th>
                  </tr>
                </thead>
                <tbody className="table-content">
                  <tr>
                    <td>001</td>
                    <td>CSS Project</td>
                    <td>Practice CSS for Advancement</td>
                    <td><div className="badge bg-label-success rounded-pill lh-xs">Completed</div></td>
                    <td>2023-10-01</td>
                  </tr>
                  <tr>
                    <td>002</td>
                    <td>JavaScript Project</td>
                    <td>Learn JavaScript Basics</td>
                    <td><div className="badge bg-label-warning rounded-pill lh-xs">In Progress</div></td>
                    <td>2023-10-10</td>
                  </tr>
                  <tr>
                    <td>003</td>
                    <td>React Project</td>
                    <td>Build a React App</td>
                    <td><div className="badge bg-label-secondary rounded-pill lh-xs">Not Started</div></td>
                    <td>2023-09-25</td>
                  </tr>
                  <tr>
                    <td>004</td>
                    <td>Node.js Project</td>
                    <td>Create a REST API</td>
                    <td><div className="badge bg-label-success rounded-pill lh-xs">Completed</div></td>
                    <td>2023-08-15</td>
                  </tr>
                  <tr>
                    <td>005</td>
                    <td>Python.js Project</td>
                    <td>Develop a Web Scraper</td>
                    <td><div className="badge bg-label-danger rounded-pill lh-xs">Failed</div></td>
                    <td>2023-07-20</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-4 d-flex timeline-custom">
        <div className="card flex-grow-1">
          <div className="card-header">
            <h5 className="card-title">Activity Timeline</h5>
          </div>
          <div className="card-body p-0 pt-4">
            <ul className="timeline card-timeline mb-0">
              <li className="timeline-item">
                <span className="timeline-point timeline-point-primary"></span>
                <div className="timeline-event ps-4">
                  <div className="timeline-header mb-2 pe-4">
                    <h6 className="mb-0">New Project</h6>
                    <small className="text-muted">12 min ago</small>
                  </div>
                  <p>Description of the first timeline</p>
                </div>
              </li>
              <li className="timeline-item">
                <span className="timeline-point timeline-point-success"></span>
                <div className="timeline-event ps-4">
                  <div className="timeline-header mb-2 pe-4">
                    <h6 className="mb-0">Project Completed</h6>
                    <small className="text-muted">1 hour ago</small>
                  </div>
                  <p>Description of the second timeline</p>
                </div>
              </li>
              <li className="timeline-item">
                <span className="timeline-point timeline-point-warning"></span>
                <div className="timeline-event ps-4">
                  <div className="timeline-header mb-2 pe-4">
                    <h6 className="mb-0">Warning Issued</h6>
                    <small className="text-muted">3 hours ago</small>
                  </div>
                  <p>Description of the third timeline</p>
                </div>
              </li>
              <li className="timeline-item">
                <span className="timeline-point timeline-point-danger"></span>
                <div className="timeline-event ps-4">
                  <div className="timeline-header mb-2 pe-4">
                    <h6 className="mb-0">Error Occurred</h6>
                    <small className="text-muted">5 hours ago</small>
                  </div>
                  <p>Description of the fourth timeline</p>
                </div>
              </li>
              <li className="timeline-item">
                <span className="timeline-point timeline-point-info"></span>
                <div className="timeline-event ps-4">
                  <div className="timeline-header mb-2 pe-4">
                    <h6 className="mb-0">Information</h6>
                    <small className="text-muted">1 day ago</small>
                  </div>
                  <p>Description of the fifth timeline</p>
                </div>
              </li>
              <li className="timeline-item">
                <span className="timeline-point timeline-point-secondary"></span>
                <div className="timeline-event ps-4">
                  <div className="timeline-header mb-2 pe-4">
                    <h6 className="mb-0">Secondary Event</h6>
                    <small className="text-muted">2 days ago</small>
                  </div>
                  <p>Description of the sixth timeline</p>
                </div>
              </li>
              <li className="timeline-item">
                <span className="timeline-point timeline-point-light"></span>
                <div className="timeline-event ps-4">
                  <div className="timeline-header mb-2 pe-4">
                    <h6 className="mb-0">Light Event</h6>
                    <small className="text-muted">3 days ago</small>
                  </div>
                  <p>Description of the seventh timeline</p>
                </div>
              </li>
              <li className="timeline-item">
                <span className="timeline-point timeline-point-dark"></span>
                <div className="timeline-event ps-4">
                  <div className="timeline-header mb-2 pe-4">
                    <h6 className="mb-0">Dark Event</h6>
                    <small className="text-muted">4 days ago</small>
                  </div>
                  <p>Description of the eighth timeline</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="col-lg-3 d-flex custom-height-3 cs-5">
        <div className="card flex-grow-1">
          <div className="card-header">
            <h5 className="card-title">TBD</h5>
            <h6 className="card-subtitle mb-2">TBD</h6>
          </div>
          <div className="card-body p-0">
            {/* Content for this card */}
          </div>
        </div>
      </div>
      <div className="col-lg-5 d-flex cs-5">
        <div className="card flex-grow-1">
          <div className="card-header">
            <h5 className="card-title">TBD</h5>
            <h6 className="card-subtitle mb-2">TBD</h6>
          </div>
          <div className="card-body p-0">
            {/* Content for this card */}
          </div>
        </div>
      </div>

      <div className="col-lg-4 d-flex cs-5 c-order">
        <div className="card flex-grow-1">
          <div className="card-header">
            <h5 className="card-title">CHANGE ORDER OF THIS TO BOTTOM</h5>
            <h6 className="card-subtitle mb-2">TBD</h6>
          </div>
          <div className="card-body p-0">
            {/* Content for this card */}
          </div>
        </div>
      </div>
      
      <div className="col-lg-8 d-flex table-custom-2">
        <div className="card flex-grow-1 p-0">
          <div className="table-responsive text-nowrap user-table rounded">
            <table className="table table-sm mb-0">
              <thead className="table-head">
                <tr style={{ backgroundColor: '#3A3E5B' }}>
                  <th>User</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Last Active</th>
                </tr>
              </thead>
              <tbody className="table-content">
                <tr>
                  <td>
                    <span className="d-flex align-items-center gap-2">
                      <img src="../assets/images/profile-icon.png" alt="Profile Icon" className="profile-icon-small" />
                      John Doe
                    </span>
                  </td>
                  <td>john.doe@example.com</td>
                  <td>
                    <span className="d-flex align-items-center gap-2 text-heading">
                      <i className="ri-vip-crown-line ri-22px text-primary"></i> Admin
                    </span>
                  </td>
                  <td><div className="badge bg-label-success rounded-pill lh-xs">Active</div></td>
                  <td>2023-10-01</td>
                </tr>
                <tr>
                  <td>
                    <span className="d-flex align-items-center gap-2">
                      <img src="../assets/images/profile-icon.png" alt="Profile Icon" className="profile-icon-small" />
                      Jane Smith
                    </span>
                  </td>
                  <td>jane.smith@example.com</td>
                  <td>
                    <span className="d-flex align-items-center gap-2 text-heading">
                      <i className="ri-edit-box-line ri-22px text-warning"></i> Editor
                    </span>
                  </td>
                  <td><div className="badge bg-label-warning rounded-pill lh-xs">Inactive</div></td>
                  <td>2023-09-25</td>
                </tr>
                <tr>
                  <td>
                    <span className="d-flex align-items-center gap-2">
                      <img src="../assets/images/profile-icon.png" alt="Profile Icon" className="profile-icon-small" />
                      Alice Johnson
                    </span>
                  </td>
                  <td>alice.johnson@example.com</td>
                  <td>
                    <span className="d-flex align-items-center gap-2 text-heading">
                      <i className="ri-user-line ri-22px text-success"></i> Viewer
                    </span>
                  </td>
                  <td><div className="badge bg-label-success rounded-pill lh-xs">Active</div></td>
                  <td>2023-08-15</td>
                </tr>
                <tr>
                  <td>
                    <span className="d-flex align-items-center gap-2">
                      <img src="../assets/images/profile-icon.png" alt="Profile Icon" className="profile-icon-small" />
                      Amy Johnson
                    </span>
                  </td>
                  <td>amy.johnson@example.com</td>
                  <td>
                    <span className="d-flex align-items-center gap-2 text-heading">
                      <i className="ri-computer-line ri-22px text-danger"></i> Author
                    </span>
                  </td>
                  <td><div className="badge bg-label-danger rounded-pill lh-xs">Banned</div></td>
                  <td>2023-08-15</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="col-lg-4 d-flex cs-6">
        <div className="card flex-grow-1">
          <div className="card-header">
            <h5 className="card-title">STAYS NEXT TO THE CHANGED ORDER CARD</h5>
            <h6 className="card-subtitle mb-2">TBD</h6>
          </div>
          <div className="card-body p-0">
            {/* Content for this card */}
          </div>
        </div>
      </div>
    </div>
  );
}
