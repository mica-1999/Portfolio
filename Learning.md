# React/JS
Async functions: return promise, define when there will be an operation
that requires time. (await for said op)

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

Arrow functions: allow you to manipulate the values of the parameter based on a certain condition before the actual function resolves.

Example:
```javascript
const modifyAndCall = (param) => {
  const modifiedParam = param * 2; // Modify the parameter
  actualFunction(modifiedParam); // Call the actual function with the modified parameter
};
modifyAndCall(5); // Outputs: 10
```
## JS Methods
```javascript
${menu.subMenu.some(subMenu => subMenu.page === currentPath) ? 'show' : ''} // .some checks if an element in the array satisfies a condition
```

# React
React uses a syntax extension called JSX, which allows you to write HTML-like code within JavaScript. JSX is different from HTML in several ways:

- **JSX Syntax**: JSX uses a syntax that looks similar to HTML but has some differences. For example, JSX uses `className` instead of `class` and `htmlFor` instead of `for`.
- **Self-Closing Tags**: In JSX, self-closing tags must end with a slash, like `<Sidebar />`.
- **Capitalized Component Names**: React components are recognized by their capitalized names, such as `<Sidebar />`.

You can easily convert HTML to JSX using online converters.

## State, Components, Props, Hooks TLDR:
States: very useful to manipulate UI elements and store data. When it changes the component re-renders allowing it to change the UI dynamically (replaces native JS and jQuery).
Components: reusable UI elements that can be managed independently. Initialize with capital letter. Can be nested within each other.
Props: work as parameters inside components which allow you to pass data to other components. Read-only.

Hooks: only usable inside Components (top level), has a bunch of useful mechanics and functions which you can use with states. (Ex: useEffect)

Example of a Component:
```javascript
import React from 'react';

function Greeting() {
  return <h1>Hello, World!</h1>;
}
export default Greeting;
```

Example using Props:
```javascript
import React from 'react';

function Greeting(props) {
  return <h1>Hello, {props.name}!</h1>;
}
export default Greeting;
```
Example of State:
```javascript
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </>
  );
}
```

## Useful Hooks
useEffect: allows the user to manipulate something based on a state change, allows you to also store data locally so that when pages refresh or changes the UI can render based on the storage variable

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

## .map function (parameter is element we wanna show and index (optional))
We can use state.map to redefine the same tag element a bunch of times up to the number of elements inside the state.

```javascript
import React, { useState } from 'react';

function ProjectHeaders() {
  const [theads_projects, setTheadsProjects] = useState(['Header1', 'Header2', 'Header3']);

  return (
    <tr>
      {theads_projects.map((thead) => (
        <th key={thead}>{thead}</th>
      ))}
    </tr>
  );
}
```

## Javascript land
You can go javascript inside the html/JSX extension like this which allows you to insert states and variables in UI elements.
```javascript
{`${method.icon}`}
```
### Syntax Section 
```javascript
const name_var = require('dependency/library'); // Imports the library 
const MONGODB_URI = process.env.MONGODB_URI // Processes the env variable 
const dbConnect = async () => {} // async function that returns a Promise.
const ternary_op = 5 ? me=3 : 2; // ternary op useful in JS
try{}catch(error){} // error handling
export NameFunction // import {NameFunction} on another component to use it
const { name, age } = person; // Destructuring an object
const [first, second] = array; // Destructuring an array
const newArray = [...oldArray, 4, 5]; // Spread operator
const newObject = { ...oldObject, newProp: 'value' }; // Spread operator
const greeting = `Hello, ${name}!`; // Template literal
onMouseEnter{() => {}} or onMouseLeave // For hover effect, React special
```

# Next.js

## Data fetching
```javascript
import { NextResponse } from "next/server"; 
return NextResponse.json(user_data); // makes it possible to return a json object of user data
```

App Directory has a system:

layout.js is gonna define the layout for the pages in the current folder
page.js lists the components in the page
api is where all the server side requests are gonna be handled.
api/auth/[...nextauth] is the default for authentication providers configuration.

## Bcrypt
Useful library for encrypting passwords and comparing the hash of password for posterior authentication.

```javascript
await bcrypt.compare(user.password, credentials.password) 
bcrypt.compareSync() //also works.
```

## Auth Page Protection

### useSession
Purpose: A React Hook for accessing the session in client-side components.
Usage: Use this in React components to display session data or conditionally render UI based on the session.

```javascript
  const { data: session, status } = useSession();
  const {  first_name, last_name, role } = session?.user || {}; 
  console.log(session);
```

#### Session Provider
Purpose: Provides session data to child components.
Usage: Needs to be wrapped inside a client-side component. If the layout involves server-side logic, create a Wrapper.js (client-side) to wrap the session provider and pass session data to the child components. (Make sure to include all the components that want to use the useSession hook)

### getServerSession(config);
Purpose: A function for accessing the session on the server side.
Usage: Use this in getServerSideProps, getStaticProps, or API routes to protect pages or fetch session data during server-side rendering (SSR).

Example of Protecting Page SS (the page doesn't render)
```javascript
import { getServerSession } from 'next-auth'; // Hook from next auth
import { authOptions } from '../../api/auth/[...nextauth]/route.js'; //Config provider
import { redirect } from 'next/navigation'; // Redirecting hook

const session = await getServerSession(authOptions);

if (!session) {
  console.log('No session found');
  redirect('/pages/login'); 
  // since it's done in the layout.js it will protect all pages
}
```
### getSession
Purpose: A legacy function for accessing the session on the client side.
Usage: Rarely used in modern applications. Only consider this if you need to fetch the session outside of a React component or in a non-reactive context.

### Callback Functions
Functions that allow the user to modify the data being passed between steps, implement custom logic and control the session.

### Providers API
The file exports a configuration on how the authentication is gonna work and who's the provider, could be Google, Discord, a mongoDB, etc.

```javascript
import NextAuth from "next-auth"; 
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [], // Providers array for the different providers
  session: {}, // How the session will be managed (e.g., JWT or database-backed)
  callbacks: {}, // Custom functions to modify the token or session data
  pages: {} // Route pages for different session-related activities (e.g., custom sign-in page)

  providers: [
    name: // Name for the provider 
    credentials {} // Credentials being used to authenticate, basically a schema so the Auth can understand the fields coming from the form.
    authorize function {} // Core that handles the authentication, here its done the verification. You can return the data you wish to use on the UI from here.
  ]

  session: {
    strategy: // defines how the session is gonna be managed and by what method Example: JWT most common one, less common database. this is required btw.
    maxAge: // self explanatory, by default jwt has it at 31 days
    updateAge: // how often the session is updated. (extended)
    generateSessionToken: // only used with the DB strategy, basically it returns a random UUID
  }

  callbacks: {
    // in this case whenever jwt or session function are called we are adding extra information to both those tokens to allow custom manipulation on the UI.
  }
  pages: {// define when using the custom login page from Next, it will redirect the client to the login page in case it tries to acesss protected content.
  }
}
```

```javascript
export { handler as GET, handler as POST } //This is a requirement for Next.js Route Handlers in the App Router.
```

### SignIn and SignOut
When working with app directory, Nextjs just knows that the Provider Configs are in the folder of api/auth/[...nextauth]