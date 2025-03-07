import { getRoleClass, getActiveColor } from '/src/utils/mainContentUtil';

const thead_user = ['User', 'Email', 'Role', 'Status', 'Last Active'];

export default function UsersSection({ users, hidden, onToggleVisibility }) {
  return (
    <div className="col-lg-12 d-flex table-custom-2">
      <div className="card flex-grow-1 p-0">
        <div id="4" className={hidden ? 'blur_element' : ''}>
          <div className="card-header d-flex align-items-center justify-content-between">
            <h5 className="card-title">Users</h5>
            <div>
              <i className="ri-eye-off-line ri-lg ms-2 pointer" onClick={onToggleVisibility}></i>
            </div>
          </div>
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
                  const { badgeColor, output, color } = getRoleClass(user.role);
                  const { colorActive } = getActiveColor(user.isActive);
                  return (
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
                      <td>
                        <div className={`badge bg-label-${colorActive} rounded-pill lh-xs`}>
                          {user.isActive.charAt(0).toUpperCase() + user.isActive.slice(1)}
                        </div>
                      </td>
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
  );
}
