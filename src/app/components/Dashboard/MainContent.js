"use client"
import { useEffect, useState } from 'react';
import { formatNumber } from '../../../utils/formatNumber';

export default function MainContent() {
  // Array initializations
  const theads_projects = ['ID', 'Name', 'Description', 'State', 'Last Updated'];
  const thead_user = ['User', 'Email', 'Role', 'Status', 'Last Active'];

  // State Initialization
  const [totalBalance, setTotalBalance] = useState(null);
  const [balanceMonth, setBalanceMonth] = useState(null);
  const [withdrawal, setWithdrawal] = useState(null);
  const [projects, setProjects] = useState([]);
  const [timeline, setTimeline] = useState([]);
  const [users, setUsers] = useState([]);

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
        setProjects(data_project);
      } catch (error) {
        setError(error.message);
      }
    };

    const fetchTimelineData = async () => {
      try {
        const response_timeline = await fetch('/api/getTimeline');
        if (!response_timeline.ok) {
          throw new Error('Failed to fetch timeline data');
        }
        const timeline_data = await response_timeline.json();
        setTimeline(timeline_data);
      } catch (error) {
        setError(error.message);
      }
    };


    const fetchUserData = async () => {
      try {
        const response_user = await fetch('/api/getUser');
        if (!response_user.ok) {
          throw new Error('Failed to fetch timeline data');
        }
        const user_data = await response_user.json();
        console.log(user_data);
        setUsers(user_data);
      } catch (error) {
        setError(error.message);
      }
    };

    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchBalanceData(), fetchProjectData(), fetchTimelineData(), fetchUserData()]);
      setLoading(false);
    };

    fetchData();
  }, []);

  const getBadgeClass = (state) => {
    switch (state) {
      case 0:
        return { badgeColor: 'danger', output: 'Failed' };
      case 1:
        return { badgeColor: 'success', output: 'Completed' };
      case 2:
        return { badgeColor: 'warning', output: 'In Progress' };
      case 3:
        return { badgeColor: 'secondary', output: 'Not Started' };
      default:
        return { badgeColor: 'default', output: 'default' };
    }
  };

  const getRoleClass = (role) => {
    switch (role) {
      case 'admin':
        return { badgeColor: 'vip-crown', output: 'Admin', color: 'primary' };
      case 'viewer':
        return { badgeColor: 'user', output: 'Viewer', color: 'success' };
      case 'editor':
        return { badgeColor: 'edit-box', output: 'Editor' , color: 'warning'};
      case 'author':
        return { badgeColor: 'computer', output: 'Author' , color: 'danger'};
      default:
        return { badgeColor: 'default', output: 'default' , color: 'default'};
    }
  };

  const getTimeFormatted = (time) => {
    const currentTime = new Date(); // Current time
    const eventTime = new Date(time); // Timeline time
  
    const diffMs = currentTime - eventTime; // Difference in milliseconds
  
    // Convert difference to seconds, minutes, hours, and days
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
  
    // Generate the formatted string
    if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    } else if (diffHours > 0) {
      const remainingMinutes = diffMinutes % 60;
      return `${diffHours}h ${remainingMinutes}min ago`;
    } else if (diffMinutes > 0) {
      return `${diffMinutes} min ago`;
    } else {
      return `${diffSeconds} sec ago`;
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
      {/* Balance Section */}
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

      {/* Ratings Section */}
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

      {/* Sessions Section */}
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

      {/* Projects Section */}
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
                    {theads_projects.map((thead) => (
                      <th key={thead}>{thead}</th>
                    ))}
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

      {/* Timeline Section */}
      <div className="col-lg-4 d-flex timeline-custom">
        <div className="card flex-grow-1">
          <div className="card-header">
            <h5 className="card-title">Activity Timeline</h5>
          </div>
          <div className="card-body p-0 pt-4">
            <ul className="timeline card-timeline mb-0">
              {timeline.map((timeline_info) => {
                const { badgeColor, output } = getBadgeClass(timeline_info.state);
                const timelineTime = getTimeFormatted(timeline_info.lastEvent);
                return (
                  <li className="timeline-item" key={timeline_info.id}>
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
          </div>
        </div>
      </div>

      {/* Placeholder Sections */}
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
            <h5 className="card-title">TBD</h5>
            <h6 className="card-subtitle mb-2">TBD</h6>
          </div>
          <div className="card-body p-0">
            {/* Content for this card */}
          </div>
        </div>
      </div>

      {/* User Table Section */}
      <div className="col-lg-8 d-flex table-custom-2">
        <div className="card flex-grow-1 p-0">
          <div className="table-responsive text-nowrap user-table rounded">
            <table className="table table-sm mb-0">
              <thead className="table-head">
                <tr style={{ backgroundColor: '#3A3E5B' }}>
                    {thead_user.map((thead) => (
                      <th key={thead}>{thead}</th>
                    ))}
                </tr>
              </thead>
              <tbody className="table-content">
                {users.map((user) => {
                  const { badgeColor, output, color} = getRoleClass(user.role);
                  return(
                    <tr key={user.username}>
                      <td>
                        <span className="d-flex align-items-center gap-2">
                          <img src="../assets/images/profile-icon.png" alt="Profile Icon" className="profile-icon-small" />
                          {user.firstName} {user.lastName}
                        </span>
                      </td>
                      <td>{user.email}</td>
                      <td>
                        <span className="d-flex align-items-center gap-2 text-heading">
                          <i className={`ri-${badgeColor}-line ri-22px text-${color}`}></i> {output}
                        </span>
                      </td>
                      <td><div className="badge bg-label-success rounded-pill lh-xs">{user.isActive ? 'Active' : 'Inactive'}</div></td>
                      <td>{new Date(user.lastLogin).toLocaleDateString()}</td>
                    </tr>
                  );
              })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Placeholder Section */}
      <div className="col-lg-4 d-flex cs-6">
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
    </div>
  );
}
