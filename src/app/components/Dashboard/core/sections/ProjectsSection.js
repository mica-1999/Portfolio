"use client";
import { getBadgeClass } from '/src/utils/mainContentUtil';

const theads_projects = ['ID', 'Name', 'Description', 'State', 'Last Updated'];

export default function ProjectsSection({ projects, hidden, onToggleVisibility }) {
  // Safely format dates
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="col-lg-8 d-flex table-custom">
      <div className="card flex-grow-1">
        <div id="2" className={hidden ? 'blur_element' : ''}>
          <div className="card-header">
            <div className="d-flex align-items-center justify-content-between">
              <div className='d-flex align-items-center'>
                  <i className="ri-folder-chart-line ri-lg me-2"></i>
                  <h5 className="mt-2 card-title">Projects</h5>
              </div>
              <div>
                <i className="ri-eye-off-line ri-lg ms-2 pointer" onClick={onToggleVisibility}></i>
              </div>
            </div>
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
                      <tr key={project._id}>
                        <td>{project.id}</td>
                        <td>{project.title}</td>
                        <td>{project.description}</td>
                        <td>
                          <div className={`badge bg-label-${badgeColor} rounded-pill lh-xs`}>
                            {output}
                          </div>
                        </td>
                        <td>{formatDate(project.lastUpdated)}</td>
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
