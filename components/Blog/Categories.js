export default function Categories() {
  return (
    <div className="row">
      <div className="col-lg-12 d-flex align-items-center mt-5 gap-3">
        <div className="d-flex justify-content-center align-items-center categories">
          <a href="#">Completed</a>
        </div>
        <div className="d-flex justify-content-center align-items-center categories">
          <a href="#">In Progress</a>
        </div>
        <div className="d-flex justify-content-center align-items-center categories">
          <a href="#">Not Started</a>
        </div>
        <div className="d-flex justify-content-center align-items-center categories">
          <a href="#">Failed</a>
        </div>
      </div>
    </div>
  );
}
