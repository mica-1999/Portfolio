"use client"
import { useEffect, useState } from 'react';
import { formatNumber } from '../../../utils/formatNumber';

export default function MainContent() {
  //Array intializations
  const theads_projects = ['ID', 'Name', 'Description', 'State', 'Last Updated'];


  // State Initialization
  const [totalBalance, setTotalBalance] = useState(null);
  const [balanceMonth, setBalanceMonth] = useState(null);
  const [withdrawal, setWithdrawal] = useState(null);
  const [projects, setProjects] = useState([]);

  // Error Handling and Loading State
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBalanceData = async () => {
      try {
        const response_balance = await fetch('/api/getBalance');
        if (!response_balance.ok) {
          throw new Error('Failed to fetch balance data');
        }
        const data_balance = await response_balance.json();
        setTotalBalance(data_balance.totalBalance);
        setBalanceMonth(data_balance.thisMonth.totalDeposits);
        setWithdrawal(data_balance.thisMonth.totalWithdrawals);
      } catch (error) {
        setError(error.message);
      }
    };

    const fetchProjectData = async () => {
      try {
        const response_project = await fetch('/api/getProjects');
        if (!response_project.ok) {
          throw new Error('Failed to fetch projects data');
        }
        const data_project = await response_project.json();
        console.log(data_project);
        setProjects(data_project);
      } catch (error) {
        setError(error.message);
      }
    };

    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchBalanceData(), fetchProjectData()]);
      setLoading(false);
    };

    fetchData();
  }, []);

  const getBadgeClass = (state) => {
    console.log('State:', state, 'Type:', typeof state); // Debug log
    switch (state) {
      case '0':
        return { badgeColor: 'danger', output: 'Failed' };
      case '1':
        return { badgeColor: 'success', output: 'Completed' };
      case '2':
        return { badgeColor: 'warning', output: 'In Progress' };
      case '3':
        return { badgeColor: 'secondary', output: 'Not Started' };
      default:
        return { badgeColor: 'default', output: 'default' };
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
                <h5 className="mb-0">{formatNumber(totalBalance)}</h5>
                <p className="mb-0">Total Balance</p>
              </div>
            </div>
            <div className="d-flex gap-2">
              <div className="d-flex justify-content-center align-items-center small-box-third">
                <i className="fa-solid fa-arrow-up fa-lg third-icon"></i>
              </div>
              <div className="card-info">
                <h5 className="mb-0">{formatNumber(balanceMonth)}</h5>
                <p className="mb-0">This Month</p>
              </div>
            </div>
            <div className="d-flex gap-2 p-0">
              <div className="d-flex justify-content-center align-items-center small-box-received">
                <i className="fa-solid fa-arrow-down fa-lg balance-received-icon"></i>
              </div>
              <div className="card-info">
                <h5 className="mb-0">{formatNumber(withdrawal)}</h5>
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
                    {theads_projects.map((thead) => {
                      return (
                        <th key={thead}>{thead}</th>
                      );
                   })}
                  </tr>
                </thead>
                <tbody className="table-content">
                  {projects.map((project) => {
                    const { badgeColor, output } = getBadgeClass(project.state);
                    return (
                      <tr key={project.id}>
                        <td>{project.id}</td>
                        <td>{project.title}</td>
                        <td>{project.description}</td>
                        <td>
                          <div className={`badge bg-label-${badgeColor} rounded-pill lh-xs`}>
                            {output}
                          </div>
                        </td>
                        <td>{new Date(project.lastUpdated).toLocaleDateString()}</td>
                      </tr>
                    );
                  })}
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
