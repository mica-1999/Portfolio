export default function LoadingState() {
  return (
    <div className="d-flex justify-content-center align-items-center mt-5">
      <div className="spinner-border text-primary me-2" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <span>Loading dashboard data...</span>
    </div>
  );
}
