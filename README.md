# Portfolio Project

This project is focused on learning and mastering advanced concepts in the following technologies:

- **CSS**: Advanced styling techniques, animations, and responsive design.
- **Bootstrap**: Utilizing the latest features of Bootstrap for efficient and responsive UI design.
- **HTML**: Deep dive into semantic HTML and best practices.
- **React**: Advanced React patterns, hooks, and state management.
- **Next.js**: Server-side rendering, static site generation, and API routes.
- **JavaScript**: Modern JavaScript (ES6+), asynchronous programming, and performance optimization.

## Installation

To install the required dependencies, run the following command:

```bash
npm install connect-flash dotenv express express-session mongoose next path react react-dom next-auth
```

## Getting Started
1. Clone the repository.
2. Install the necessary dependencies using `npm install`.
3. Start the server using `npm start` or `npm run dev`.
4. Open your browser and navigate to `http://localhost:3000` to see the project in action.

## Project Structure
- `public/`: Contains the static files (HTML, CSS, JavaScript).
  - `index.html`: The main HTML file.
  - `styles.css`: The CSS file for styling the HTML.
- `server.js`: The Express server setup.
- `src/app/pages/`: This is where we will have our web pages.
- `src/app/pages/api/`: This is where we are going to do the fetching of data from the database to insert into those pages.


## Next.js

Next.js is a React framework that enables server-side rendering and static site generation, providing a powerful way to build fast and user-friendly web applications. It enhances the capabilities of React by allowing you to render pages on the server, generate static pages at build time, and create API routes.

### Routers in Next.js

Next.js provides two different routers for managing your application's routes: the `app` router and the `pages` router.
This project will be using the newer version, the app directory structure.

### Using Next.js with React

Next.js integrates seamlessly with React, allowing you to use all the features of React while adding powerful capabilities like server-side rendering and static site generation. Here's how you can use Next.js with React:

When you use Next.js in your project, you do not need to load the `react` and `react-dom` scripts from external sources like `unpkg.com`. Instead, you can install these packages locally using npm or your preferred package manager. Next.js will manage both `react` and `react-dom` for you. Next.js also has a built-in compiler that transforms JSX into valid JavaScript so that the browser can understand it. This means you do not need to use Babel for this purpose.

### Utils Folder 
The utils folder is a dedicated space for storing utility functions and helper methods that are reusable across the application. These functions are typically designed to perform specific tasks or calculations, format data, handle common logic, or interact with external APIs.

### Models Folder
The models folder is used to define and organize the database schemas and models for the project. Since we are using MongoDB in this project, Mongoose is utilized to create schemas that structure the data and enforce consistency within the database collections.

### Layouts in Next.js

Next.js automatically renders the layout component for each page. You do not need to call the layout component explicitly in your page components. This ensures that the layout is consistently applied across all pages.

Example of a layout component in Next.js:

```javascript
// filepath: /project-root/pages/_app.js
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header /> {/* Render the Header component */}
      <Component {...pageProps} /> {/* Render the current page */}
      <Footer /> {/* Render the Footer component */}
    </>
  );
}
export default MyApp;
```
If you add a `layout.js` file inside a subdirectory (e.g., `/Form`), it will override the parent layout from `/dashboard` and apply only to routes under `/Form`.

### Any Page Folder
In Next.js, when using the new app directory structure, each folder inside the app directory can represent a route. The page.js file within each folder automatically serves as the default for that route. For example, if you have a dashboard folder with a page.js inside it, the route for /dashboard will render the page.js from that folder.

### API Folder
The api folder in Next.js is responsible for handling server-side requests, such as any CRUD operations (Create, Read, Update, Delete). Each file inside the api folder corresponds to a specific endpoint, and the functions (GET, POST, PUT, DELETE, etc.) within those files define how the server should respond to different HTTP requests. These API routes allow for server-side logic such as interacting with databases, processing form submissions, or handling external API calls.

### Including Static Files

When including static files such as CSS, JS, and images from the `public` directory, make sure to use a leading slash (`/`) in the path. This ensures that the files are referenced from the root of the project and not relative to the current directory.

## Future Enhancements

- Implement a chat feature using Node.js, storing messages in MongoDB.
- Integrate login functionality from another project.
- Add notifications in the top right corner.
- Integrate AI into the chat feature.
- Add CRUD functionality for blog posts, projects, and other items in the dashboard.
- Add APIs for news, Spotify, weather, and other features on the dashboard main page.
- Track and display the number of visiting users using session data.

# Extra
- Do a better Login Page