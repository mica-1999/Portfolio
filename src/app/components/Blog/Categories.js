export default function Categories() {
  const categories = ["Completed", "In Progress", "Not Started", "Failed"];

  return (
    <div className="row">
      <div className="col-lg-12 d-flex align-items-center mt-5 gap-3">
        {categories.map((category, index) => (
          <div
            className="d-flex justify-content-center align-items-center categories"
            key={index}
          >
            <a href="#">{category}</a>
          </div>
        ))}
      </div>
    </div>
  );
}