"use client"
import { useEffect, useState } from 'react';
import { formatNumber, getBadgeClass, getRoleClass, getTimeFormatted, getActiveColor } from '/src/utils/mainContentUtil';
import { useSession } from 'next-auth/react';
import { fetchDataFromApi } from '/src/utils/apiUtils';

export default function MainContent() {
  // Session handling 
  const { data: session, status } = useSession();
  const { id } = session?.user || {};

  // Array initializations
  const theads_projects = ['ID', 'Name', 'Description', 'State', 'Last Updated'];
  const thead_user = ['User', 'Email', 'Role', 'Status', 'Last Active'];

  // State Initialization for data coming from DB 
  const [balanceData, setBalanceData] = useState({
    totalBalance: null,
    balanceMonth: null,
    withdrawal: null,
  });
  const [projects, setProjects] = useState([]);
  const [timeline, setTimeline] = useState([]);
  const [users, setUsers] = useState([]); 

  // State Initialization for loading and error handling
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State Initialization for hidden sections
  const [hidden_sections, setHiddenSections] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedHiddenSections = localStorage.getItem('hidden_sections_saved');
      return savedHiddenSections ? JSON.parse(savedHiddenSections) : [];
    }
    return [];
  });

  // Function to handle the hidden sections
  const handle_sections = (section) => {
    setHiddenSections((prevHiddenSections) => {
      const updatedSections = prevHiddenSections.includes(section)
        ? prevHiddenSections.filter((s) => s !== section)
        : [...prevHiddenSections, section]
      return updatedSections;
    });
  }

  // Store `hidden_sections` in localStorage whenever the blur button is clicked
  useEffect(() => {
    localStorage.setItem('hidden_sections_saved', JSON.stringify(hidden_sections));
  }, [hidden_sections]);



  // Runs once when the component is mounted
  useEffect(() => {

    // Ensure localStorage is accessed only when available
    if (typeof window !== 'undefined') {
      const savedHiddenSections = localStorage.getItem('hidden_sections_saved');
      if (savedHiddenSections) {
        setHiddenSections(JSON.parse(savedHiddenSections));  // Set state with saved data
      }
    }

    // Fetch data from the API
    const fetchData = async () => {
      setLoading(true);
      try {
        const [balanceData, projects, timeline, users] = await Promise.all([
          fetchDataFromApi('/api/Balance', id),
          fetchDataFromApi('/api/Projects', id),
          fetchDataFromApi('/api/Timeline', id),
          fetchDataFromApi('/api/User', id),
        ]);
        
        // Set the state with the fetched data
        setBalanceData({
          totalBalance: balanceData.totalBalance,
          balanceMonth: balanceData.thisMonth.totalDeposits,
          withdrawal: balanceData.thisMonth.totalWithdrawals,
        });
        setProjects(projects || []);
        setTimeline(timeline || []);
        setUsers(users || []);
        console.log(users);
      } 
      catch (error) {
        console.error("Failed to fetch data:", error);
        setError("An unexpected error occurred. Please try again.");
      } 
      finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  
  if (loading) {
    return <div className="mt-3">Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="row d-flex mt-3">
      {/* Balance Section */}
      <div className="d-flex col-lg-6 balance">
        <div className="card flex-grow-1" >
          <div id="1" className={hidden_sections.includes('1') ? 'blur_element' : ''}>
            <div className="card-header">
              <div className="d-flex align-items-center justify-content-between">
                <h5 className="card-title">Multibanco</h5>
                <div>
                  <i className="ri-eye-off-line ri-lg ms-2 pointer" onClick={() => handle_sections('1')}></i>
                </div>
              </div>
              <h6 className="card-subtitle mb-2">Balance Overview</h6>
            </div>
            <div className="card-body d-flex justify-content-evenly flex-wrap p-0 mb-4">
              <div className="d-flex gap-2">
                <div className="d-flex justify-content-center align-items-center small-box">
                  <i className="fa-solid fa-euro-sign fa-lg euro-icon"></i>
                </div>
                <div className="card-info">
                  <h5 className="mb-0">{formatNumber(balanceData.totalBalance)}</h5>
                  <p className="mb-0">Total Balance</p>
                </div>
              </div>
              <div className="d-flex gap-2">
                <div className="d-flex justify-content-center align-items-center small-box-third">
                  <i className="fa-solid fa-arrow-up fa-lg third-icon"></i>
                </div>
                <div className="card-info">
                  <h5 className="mb-0">{formatNumber(balanceData.balanceMonth)}</h5>
                  <p className="mb-0">This Month</p>
                </div>
              </div>
              <div className="d-flex gap-2 p-0">
                <div className="d-flex justify-content-center align-items-center small-box-received">
                  <i className="fa-solid fa-arrow-down fa-lg balance-received-icon"></i>
                </div>
                <div className="card-info">
                  <h5 className="mb-0">{formatNumber(balanceData.withdrawal)}</h5>
                  <p className="mb-0">New Transactions</p>
                </div>
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
          <div id="2" className={hidden_sections.includes('2') ? 'blur_element' : ''}>
            <div className="card-header">
              <div className="d-flex align-items-center justify-content-between">
                <h5 className="card-title">Projects</h5>
                <div>
                  <i className="ri-eye-off-line ri-lg ms-2 pointer" onClick={() => handle_sections('2')}></i>
                </div>
              </div>
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
      </div>

      {/* Timeline Section */}
      <div className="col-lg-4 d-flex timeline-custom">
        <div className="card flex-grow-1">
          <div id="3" className={hidden_sections.includes('3') ? 'blur_element' : ''}>
            <div className="card-header">
              <div className="d-flex align-items-center justify-content-between">
                <h5 className="card-title">Activity Timeline</h5>
                <div>
                  <i className="ri-eye-off-line ri-lg ms-2 pointer" onClick={() => handle_sections('3')}></i>
                </div>
              </div>
            </div>
            <div className="card-body p-0 pt-4">
              <ul className="timeline card-timeline mb-0">
                {timeline.map((timeline_info) => {
                  const { badgeColor, output } = getBadgeClass(timeline_info.state);
                  const timelineTime = getTimeFormatted(timeline_info.lastEvent);
                  return (
                    <li className="timeline-item" key={timeline_info.description}>
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
      </div>
      {/* User Table Section */}
      <div className="col-lg-12 d-flex table-custom-2">
        <div className="card flex-grow-1 p-0">
          <div id="4" className={hidden_sections.includes('4') ? 'blur_element' : ''}>
            <div className="table-responsive text-nowrap user-table rounded">
              <div className="card-header">
                <div className="d-flex align-items-center justify-content-end mt-2">
                    <i className="ri-eye-off-line ri-lg ms-2 pointer" onClick={() => handle_sections('4')}></i>
                </div>
              </div>
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
                    const { colorActive } = getActiveColor(user.isActive);
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
                          <span className="d-flex align-items-center gap-2">
                            <i className={`ri-${badgeColor}-line ri-22px text-${color}`}></i> {output}
                          </span>
                        </td>
                        <td><div className={`badge bg-label-${colorActive} rounded-pill lh-xs`}>{user.isActive.charAt(0).toUpperCase() + user.isActive.slice(1)}</div></td>
                        <td>{new Date(user.lastLogin).toLocaleDateString()}</td>
                      </tr>
                    );
                })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}