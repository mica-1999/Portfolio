const blogItems = [
  "/assets/images/img-1.jpg",
  "/assets/images/img-2.jpg",
  "/assets/images/img-3.jpg",
  "/assets/images/img-4.jpg",
  "/assets/images/img-5.jpg",
  "/assets/images/img-6.jpg",
  "/assets/images/img-7.jpg",
  "/assets/images/img-8.jpg",
];

export default function BlogItems() {
  return (
    <div className="row d-flex mt-1 item-section">
      {blogItems.map((imageSrc, index) => (
        <div className="col-lg-3 d-flex mt-3" key={index}>
          <div className="card">
            <img
              src={imageSrc}
              className="card-img-top img-fluid"
              alt={`Blog item ${index + 1}`}
              width="366"
              height="364"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
