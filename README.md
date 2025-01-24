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
npm install connect-flash dotenv express express-session mongoose next path react react-dom
```

## Getting Started
1. Clone the repository.
2. Install the necessary dependencies using `npm install`.
3. Start the server using `npm start` or `npm run dev`.
4. Open your browser and navigate to `http://localhost:3000` to see the project in action.

## Project Structure

```
CSS-Weakness/
├── public/
│   ├── assets/
│   └── index.html
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   └── Dashboard/
│   │   ├── pages/
│   │   │   └── api/
│   │   └── utils/
│   └── models/
├── .env
├── .gitignore
├── package.json
├── README.md
└── server.js
```

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

## React and JSX
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
export default function Name() {
  return (
    <div>
      {/* Your JSX content goes here */}
    </div>
  );
}
```

Example of nested components:
```javascript
import React from 'react';

function Header() {
  return <header><h1>Header</h1></header>;
}

function Footer() {
  return <footer><p>Footer</p></footer>;
}

function Layout() {
  return (
    <div>
      <Header />
      <main><p>Main content</p></main>
      <Footer />
    </div>
  );
}

export default Layout;
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
State is a built-in object that allows components to create and manage their own data. State can be updated, and when it changes, the component re-renders to reflect the new state.

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

### `useState`
`useState` is a built-in hook that allows you to add state to functional components. It returns an array with two elements: the current state value and a function to update it. The first element is the current state value, and the second element is the function to update that value.

Example usage of `useState`:
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
```

### Asynchronous State Updates in React

In React, state updates are asynchronous. This means that when you call a state setter function like `setTotalBalance`, React schedules the state update but does not immediately update the value of the state variable. As a result, if you try to log the state variable immediately after calling the setter function, it will still hold its previous value.

#### Example

```javascript
const [totalBalance, setTotalBalance] = useState(null);

useEffect(() => {
  const fetchBalanceData = async () => {
    try {
      const response = await fetch('/api/getBalance');
      if (!response.ok) {
        throw new Error('Failed to fetch balance data');
      }
      const data = await response.json();
      setTotalBalance(data.totalBalance);
      console.log(totalBalance); // This will print null because the state update is asynchronous
    } catch (error) {
      console.error(error.message);
    }
  };

  fetchBalanceData();
}, []);
```

In the example above, `console.log(totalBalance)` prints `null` because `setTotalBalance` schedules the state update, but the state variable `totalBalance` is not updated immediately. The state update will take effect after the component re-renders.

#### Solution

To see the updated state value, you can use another `useEffect` hook that depends on the state variable:

```javascript
useEffect(() => {
  console.log(totalBalance); // This will print the updated value of totalBalance
}, [totalBalance]);
```

By adding a `useEffect` hook that depends on `totalBalance`, you can log the updated value after the state has been updated and the component has re-rendered.

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

In these examples:
- The `useEffect` hook with an empty dependency array (`[]`) runs only once when the component mounts, retrieving the stored data from `localStorage`.
- The `useEffect` hook with `[data]` as the dependency array runs whenever the `data` state changes, storing the updated data in `localStorage`.

This approach ensures that the data persists across page switches or refreshes, providing a better user experience.

## Organizing Utility Functions

To keep your code organized and maintainable, it's a good practice to separate utility functions into a dedicated `utils` directory. This allows you to import these functions whenever needed and helps with organizing the code better.

### Example

1. **Create a `utils` directory**:
   Create a directory named `utils` in your project.

2. **Move utility functions to separate files**:
   Move utility functions like `formatNumber`, `getBadgeClass`, and `getRoleClass` to separate files in the `utils` directory.

   Example:
   ```javascript
   // filepath: /src/utils/formatNumber.js
   export const formatNumber = (number) => {
     return new Intl.NumberFormat().format(number);
   };
   ```

   ```javascript
   // filepath: /src/utils/getBadgeClass.js
   export const getBadgeClass = (state) => {
     switch (state) {
       case 0:
         return { badgeColor: 'danger', output: 'Failed' };
       case 1:
         return { badgeColor: 'success', output: 'Completed' };
       case 2:
         return { badgeColor: 'warning', output: 'In Progress' };
       case 3:
         return { badgeColor: 'secondary', output: 'Not Started' };
       default:
         return { badgeColor: 'default', output: 'default' };
     }
   };
   ```

   ```javascript
   // filepath: /src/utils/getRoleClass.js
   export const getRoleClass = (role) => {
     switch (role) {
       case 'admin':
         return { badgeColor: 'vip-crown', output: 'Admin', color: 'primary' };
       case 'viewer':
         return { badgeColor: 'user', output: 'Viewer', color: 'success' };
       case 'editor':
         return { badgeColor: 'edit-box', output: 'Editor', color: 'warning' };
       case 'author':
         return { badgeColor: 'computer', output: 'Author', color: 'danger' };
       default:
         return { badgeColor: 'default', output: 'default', color: 'default' };
     }
   };
   ```

3. **Import utility functions**:
   Import the utility functions in your components as needed.

   Example:
   ```javascript
   // filepath: /src/app/components/Dashboard/MainContent.js
   import { formatNumber } from '../../../utils/formatNumber';
   import { getBadgeClass } from '../../../utils/getBadgeClass';
   import { getRoleClass } from '../../../utils/getRoleClass';

   // ...existing code...
   ```

By organizing utility functions in a dedicated `utils` directory, you can keep your codebase clean and maintainable, making it easier to manage and scale your project.

## Next.js

Next.js is a React framework that enables server-side rendering and static site generation, providing a powerful way to build fast and user-friendly web applications. It enhances the capabilities of React by allowing you to render pages on the server, generate static pages at build time, and create API routes.

### Routers in Next.js

Next.js provides two different routers for managing your application's routes: the `app` router and the `pages` router.

1. **App Router**: The `app` router is the newer router in Next.js and supports the latest React features, such as React Server Components and Suspense. It offers a more modern approach to building applications but may still be evolving in terms of stability and features.

2. **Pages Router**: The `pages` router is the more stable and widely used router in Next.js. It follows a file-based routing system where each file in the `pages` directory automatically becomes a route in your application. This router is well-documented and has been used in production applications for a longer time.

### Using Next.js with React

Next.js integrates seamlessly with React, allowing you to use all the features of React while adding powerful capabilities like server-side rendering and static site generation. Here's how you can use Next.js with React:

- **Pages**: Create a `pages` directory at the root of your project. Each file in this directory represents a route in your application. For example, `pages/index.js` will be the home page, and `pages/about.js` will be the about page.

- **Components**: Organize your React components in a separate directory, such as `components`, and import them into your pages as needed.

- **API Routes**: Create API routes by adding files to the `pages/api` directory. Each file in this directory becomes an API endpoint.

When you use Next.js in your project, you do not need to load the `react` and `react-dom` scripts from external sources like `unpkg.com`. Instead, you can install these packages locally using npm or your preferred package manager. Next.js will manage both `react` and `react-dom` for you.

Next.js also has a built-in compiler that transforms JSX into valid JavaScript so that the browser can understand it. This means you do not need to use Babel for this purpose. For more information, you can refer to the [Next.js documentation](https://nextjs.org/docs).

### Layouts in Next.js

Next.js automatically renders the layout component for each page. You do not need to call the layout component explicitly in your page components. This ensures that the layout is consistently applied across all pages.

Example of a layout in Next.js:

```javascript
// filepath: /src/app/dashboard/layout.js
import Sidebar from '../components/Dashboard/Sidebar'; // Import the Sidebar component
import Header from '../components/Dashboard/Header'; // Import the Header component
import Footer from '../components/Dashboard/Footer'; // Import the Footer component

export const metadata = {
  title: 'Dashboard for Portfolio',
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
        <link rel="stylesheet" href="/assets/css/styles.css" />
      </head>
      <body>
      <div className="container-fluid vh-100">
        <div className="row">
          <Sidebar/> {/* Render the Sidebar component */}
          <div className="col-lg-10 offset-lg-2 p-4 card-section">
            <Header /> {/* Render the Header component */}   
              {children}
            <Footer /> {/* Render the Footer component */}
          </div>
        </div>
      </div>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
        <script src="/assets/js/sidebar.js"></script>
      </body>
    </html>
  );
}
```

### Layout File Structure

The layout file structure in Next.js allows you to define layouts that apply to specific routes. If you create a `layout.js` file inside a subdirectory, it will override the parent layout and apply only to routes under that subdirectory.

Example file structure:

```
src/
├── app/
│   ├── dashboard/
│   │   ├── layout.js
│   │   ├── page.js
│   │   └── Form/
│   │       ├── layout.js
│   │       └── page.js
```

In this example:
- The `dashboard/layout.js` file defines a layout that applies to all routes under `/dashboard`.
- The `dashboard/Form/layout.js` file defines a layout that overrides the parent layout and applies only to routes under `/dashboard/Form`.

### Including Static Files

When including static files such as CSS, JS, and images from the `public` directory, make sure to use a leading slash (`/`) in the path. This ensures that the files are referenced from the root of the project and not relative to the current directory.

Example:
```html
<link rel="stylesheet" href="/assets/css/styles.css" />
<script src="/assets/js/sidebar.js"></script>
```

This approach