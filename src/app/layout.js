export const metadata = {
    title: 'My Portfolio', // Global title
    description: 'Welcome to my portfolio site!', // Global description
  };
  
  export default function GlobalLayout({ children }) {
    return (
      <html lang="en">
        <head>
          {/* Global Meta */}
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          
          {/* Global Fonts and Libraries */}
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
          
          {/* Global Scripts */}
          <script
            src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
            defer
          ></script>
  
          {/* Global Styles - only for shared CSS */}
          <link rel="stylesheet" href="/assets/css/global.css" />
        </head>
        <body>
          {children}
        </body>
      </html>
    );
  }
  