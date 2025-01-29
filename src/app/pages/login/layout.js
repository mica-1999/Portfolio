
export const metadata = {
  title: 'Login',
  description: 'Stay updated with the latest blog posts from the portfolio.',
};

export default function DashboardLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Meta and Title */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
          rel="stylesheet"
        />
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@4.6.0/fonts/remixicon.min.css"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/assets/css/login.css" />
      </head>
      <body>
      <div className="container-fluid vh-100">
        <div className="row vh-100">
          <div className="d-flex col-lg-12 w-100 justify-content-center align-items-center">
              {children}
          </div>
        </div>
      </div>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
      </body>
    </html>
  );
}
