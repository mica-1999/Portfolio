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

## JavaScript: Async, Promise, and Await

The main idea behind using async and await is to make asynchronous operations (such as network requests, file handling, or timers) easier to handle while ensuring they synchronize well with the rest of the program.

### Async Functions and Await

An `async` function returns a Promise, and you can use the `await` keyword to pause its execution until the Promise is resolved (or rejected). This makes it easier to handle asynchronous operations without leaking variables.

Example:
```javascript
async function fetchData() {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
fetchData();
```

In this example:
- The `fetchData` function is declared as `async`, which means it returns a Promise.
- The `await` keyword pauses the function execution until the fetch request is resolved.
- If the fetch request fails, the error is caught and logged using a `try-catch` block.

### Arrow Functions and Parameter Modification

Arrow functions in JavaScript allow you to modify the values of parameters before the actual function call happens. This is particularly useful for conditions and other logic that need to be applied to the parameters.

Example:
```javascript
const modifyAndCall = (param) => {
  const modifiedParam = param * 2; // Modify the parameter
  actualFunction(modifiedParam); // Call the actual function with the modified parameter
};
modifyAndCall(5); // Outputs: 10
```

### React and JSX
React uses a syntax extension called JSX, which allows you to write HTML-like code within JavaScript. JSX is different from HTML in several ways:

- **JSX Syntax**: JSX uses a syntax that looks similar to HTML but has some differences. For example, JSX uses `className` instead of `class` and `htmlFor` instead of `for`.
- **Self-Closing Tags**: In JSX, self-closing tags must end with a slash, like `<Sidebar />`.
- **Capitalized Component Names**: React components are recognized by their capitalized names, such as `<Sidebar />`.

You can easily convert HTML to JSX using online converters. This can help you quickly adapt existing HTML code to work with React.

## Core Concepts of React

There are three core concepts of React that you'll need to be familiar with to start building React applications. These are:

### Components
Components are the building blocks of a React application. They are basically functions that return UI elements. They are reusable pieces of UI that can be nested, managed, and handled independently. Components can be either class-based or function-based. Components should initialize with a capital letter to distinguish them from HTML and JavaScript. Additionally, components can be nested inside each other to build complex UIs.

Example of a functional component:
```javascript
import React from 'react';

function Greeting() {
  return <h1>Hello, World!</h1>;
}

export default Greeting;
```

### Props
Props (short for properties) are used to pass data from one component to another. They are read-only and cannot be modified by the receiving component.

Example of using props:
```javascript
import React from 'react';

function Greeting(props) {
  return <h1>Hello, {props.name}!</h1>;
}
export default Greeting;
```

### State
State is a built-in object that allows components to create and manage their own data. State can be updated, and when it changes, the component re-renders to reflect the new state. Basically replaces native JS and jQuery when it comes to this.

Example of using state:
```javascript
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
export default Counter;
```

## React Hooks
Hooks are functions that let you use state and other React features in functional components. They allow you to "hook into" React's state and lifecycle features from function components. Hooks can only be called at the top level of a component or a custom hook.

## Using `useEffect` to Store Data Locally

In React, you can use the `useEffect` hook to store data locally in the browser's `localStorage`. This allows you to persist data across page switches or refreshes. Here's how you can do it:

1. **Storing Data in `localStorage**:
   Use the `useEffect` hook to store data in `localStorage` whenever the data changes.

Example:
```javascript
import React, { useState, useEffect } from 'react';

function MyComponent() {
  const [data, setData] = useState('');

  useEffect(() => {
    localStorage.setItem('myData', data);
  }, [data]);

  return (
    <input
      type="text"
      value={data}
      onChange={(e) => setData(e.target.value)}
    />
  );
}
```

2. **Retrieving Data from `localStorage`**:
   Use the `useEffect` hook to retrieve data from `localStorage` when the component mounts.

Example:
```javascript
import React, { useState, useEffect } from 'react';

function MyComponent() {
  const [data, setData] = useState('');

  useEffect(() => {
    const storedData = localStorage.getItem('myData');
    if (storedData) {
      setData(storedData);
    }
  }, []);

  return (
    <input
      type="text"
      value={data}
      onChange={(e) => setData(e.target.value)}
    />
  );
}
```
## Next.js

Next.js is a React framework that enables server-side rendering and static site generation, providing a powerful way to build fast and user-friendly web applications. It enhances the capabilities of React by allowing you to render pages on the server, generate static pages at build time, and create API routes.

### Routers in Next.js

Next.js provides two different routers for managing your application's routes: the `app` router and the `pages` router.
This project will be using the newer version, the app directory structure.

### Using Next.js with React

Next.js integrates seamlessly with React, allowing you to use all the features of React while adding powerful capabilities like server-side rendering and static site generation. Here's how you can use Next.js with React:

When you use Next.js in your project, you do not need to load the `react` and `react-dom` scripts from external sources like `unpkg.com`. Instead, you can install these packages locally using npm or your preferred package manager. Next.js will manage both `react` and `react-dom` for you. Next.js also has a built-in compiler that transforms JSX into valid JavaScript so that the browser can understand it. This means you do not need to use Babel for this purpose.

Example of a simple page in Next.js:

```javascript
// filepath: /project-root/pages/index.js
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Home Page</title>
      </Head>
      <h1>Welcome to the Home Page</h1>
    </>
  );
}
```
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

Example:
```html
<link rel="stylesheet" href="/assets/css/styles.css" />
<script src="/assets/js/sidebar.js"></script>
```

### Syntax Section 
```javascript
const name_var = require('dependency/library'); // Imports the library or module and assigns it to 'name_var'
const MONGODB_URI = process.env.MONGODB_URI // Processes the env variable under the name and stores it into variable
const dbConnect = async () => {} // async function that returns a Promise.
try{}catch(error){}
export NameFunction // import {NameFunction} on another component to use it
const { name, age } = person; // Destructuring an object
const [first, second] = array; // Destructuring an array
const newArray = [...oldArray, 4, 5]; // Spread operator
const newObject = { ...oldObject, newProp: 'value' }; // Spread operator
const greeting = `Hello, ${name}!`; // Template literal
```

### Authentication with Next.js (NextAuth) / Things Learned
```javascript
await bcrypt.compare(user.password, credentials.password) // Bcrypt is assynchronous, it needs await.
or
bcrypt.compareSync() //also works.
```

```javascript
export const handler = NextAuth({
  providers: [], // Providers and the authorization for those (e.g., CredentialsProvider, Google, etc.)
  session: {}, // How the session will be managed (e.g., JWT or database-backed)
  callbacks: {}, // Custom functions to modify the token or session data
  pages: {} // Route pages for different session-related activities (e.g., custom sign-in page)
}
```


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