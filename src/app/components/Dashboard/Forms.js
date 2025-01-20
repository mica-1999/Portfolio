export default function Header() {
    return (
        <div className="row d-flex mt-3">
        <div className="d-flex col-lg-5 new-links">
          <div className="card flex-grow-1">
            <div className="card-header">
              <h5 className="card-title">New Links</h5>
              <h6 className="card-subtitle mb-2">insertion</h6>
            </div>
            <div className="card-body d-flex align-items-center justify-content-center flex-wrap p-0 mb-2">


                    <form action="/dashboard/insertForm"  class="d-flex " method="POST">
                        <div class="d-flex gap-2 align-items-center">
                            <label for="validationCustom01" class="form-label">Name</label>
                            <input type="text" class="form-control form-n1" id="validationCustom01" value="Mark" required></input>
                        
                            <label for="exampleInputEmail1" class="form-label">Link Type</label>
                            <select class="form-select form-n1" aria-label="Default select example">
                                <option selected></option>
                                <option value="1">Main Menu</option>
                                <option value="2">Sub Menu</option>
                            </select>
                        </div>
                            
                        <button type="submit" className="btn btn-primary mt-3">Inserir</button>
                    </form>




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
        </div>
    );
  }
  