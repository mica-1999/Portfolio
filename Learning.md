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

### Sockets (Live Chat)
The WebSocket Server and the Next.js are both running at the same time in PORT 3000

#### Server
To create the WebSocket Server the following was done:

```javascript
const io = new Server(server, {
    path: '/api/Socket', // Match the path used in the client
    cors: {
      origin: '*', // Allow all origins (update this in production)
      methods: ['GET', 'POST'],
    },
  });

  //The path /api/Socket is specified to match where the client will connect.
  //CORS settings are configured to allow all origins (but should be restricted in production).
  //WebSocket server is created using Socket.IO and attached to the same HTTP server running the Next.js app.
```

#### Server Handlers
```javascript
  io.on('connection', (socket) => { // The server listens for socket connections
    console.log(`User connected: ${socket.id}`); // socket.id is a randomly generated identifier for each client connection.

    // Event Handlers: Reacts to specific actions triggered by the client.
    socket.on('joinChat', (chatId) => {
      socket.join(chatId);
      console.log(`User joined chat: ${chatId}`);
    });

    socket.on('sendMessage', ({ chatId, message }) => {
      console.log(`New message in chat ${chatId}:`, message);
      io.to(chatId).emit('receiveMessage', message); 
    });

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });

  //socket.on(): Listens for events from the client. The server reacts when the client triggers an event (like sending a message).
  // socket.emit(): Triggers events from the server to a specific client. The server sends data or an action for the client to handle.
  //io.emit(): Sends events to all connected clients (not just one).
  //Client-side .on(): The client listens for events from the server (like receiving a message after it's emitted).
```