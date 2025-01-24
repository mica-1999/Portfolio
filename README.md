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
import React from 'react';

function Greeting() {
  return <h1>Hello, World!</h1>;
}

export default Greeting;
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

In React, state updates are asynchronous.React schedules the state update but does not immediately update the value of the state variable. As a result, if you try to log the state variable immediately after calling the setter function, it will still hold its previous value.

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

## Organizing Utility Functions

To keep your code organized and maintainable, it's a good practice to separate utility functions into a dedicated `utils` directory. This allows you to import these functions whenever needed and helps with organizing the code better.

### Example

1. **Create a `utils` directory**:
   Create a directory named `utils` in your project.

2. **Move utility functions to separate files**:
   Move utility functions like `formatNumber`, `getBadgeClass`, and `getRoleClass` to separate files in the `utils` directory. By organizing utility functions in a dedicated `utils` directory, you can keep your codebase clean and maintainable, making it easier to manage and scale your project.

## Next.js

Next.js is a React framework that enables server-side rendering and static site generation, providing a powerful way to build fast and user-friendly web applications. It enhances the capabilities of React by allowing you to render pages on the server, generate static pages at build time, and create API routes.

### Routers in Next.js

Next.js provides two different routers for managing your application's routes: the `app` router and the `pages` router.

1. **App Router**: The `app` router is the newer router in Next.js and supports the latest React features, such as React Server Components and Suspense. It offers a more modern approach to building applications but may still be evolving in terms of stability and features.

2. **Pages Router**: The `pages` router is the more stable and widely used router in Next.js. It follows a file-based routing system where each file in the `pages` directory automatically becomes a route in your application. This router is well-documented and has been used in production applications for a longer time.

### Using Next.js with React
When you use Next.js in your project, you do not need to load the `react` and `react-dom` scripts from external sources like `unpkg.com`. Instead, you can install these packages locally using npm or your preferred package manager. Next.js will manage both `react` and `react-dom` for you.
Next.js also has a built-in compiler that transforms JSX into valid JavaScript so that the browser can understand it. This means you do not need to use Babel for this purpose. For more information, you can refer to the [Next.js documentation](https://nextjs.org/docs).

### Layouts in Next.js

Next.js automatically renders the layout component for each page. You do not need to call the layout component explicitly in your page components. This ensures that the layout is consistently applied across all pages.

Example of a layout in Next.js:



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

This approach ensures that the files are correctly loaded regardless of the current route.

Next.js simplifies the process of building React applications with powerful features and a structured approach to routing and rendering.

## Future Enhancements

- Implement a chat feature using Node.js, storing messages in MongoDB.
- Integrate login functionality from another project.
- Add notifications in the top right corner.
- Integrate AI into the chat feature.
- Add CRUD functionality for blog posts, projects, and other items in the dashboard.
- Add APIs for news, Spotify, weather, and other features on the dashboard main page.
- Track and display the number of visiting users using session data.