export default function ErrorState({ message }) {
  return (
    <div className="alert alert-danger mt-3">
      <i className="ri-error-warning-line me-2"></i>
      Error: {message}
    </div>
  );
}
