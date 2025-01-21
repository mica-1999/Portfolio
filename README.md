# Portfolio Project

This project is focused on learning and mastering advanced concepts in the following technologies:

- **CSS**: Advanced styling techniques, animations, and responsive design.
- **Bootstrap**: Utilizing the latest features of Bootstrap for efficient and responsive UI design.
- **HTML**: Deep dive into semantic HTML and best practices.
- **React**: Advanced React patterns, hooks, and state management.
- **Next.js**: Server-side rendering, static site generation, and API routes.
- **JavaScript**: Modern JavaScript (ES6+), asynchronous programming, and performance optimization.

## Getting Started
1. Clone the repository.
2. Install the necessary dependencies using `npm install`.
3. Start the server using `node server.js`.
4. Open your browser and navigate to `http://localhost:3000` to see the project in action.

## Project Structure
- `public/`: Contains the static files (HTML, CSS, JavaScript).
  - `index.html`: The main HTML file.
  - `styles.css`: The CSS file for styling the HTML.
- `server.js`: The Express server setup.
- `src/app/pages/`: This is where we will have our web pages.
- `src/app/pages/api/`: This is where we are going to do the fetching of data from the database to insert into those pages.

## React and JSX
React uses a syntax extension called JSX, which allows you to write HTML-like code within JavaScript. JSX is different from HTML in several ways:

- **JSX Syntax**: JSX uses a syntax that looks similar to HTML but has some differences. For example, JSX uses `className` instead of `class` and `htmlFor` instead of `for`.
- **Self-Closing Tags**: In JSX, self-closing tags must end with a slash, like `<Sidebar />`.
- **Capitalized Component Names**: React components are recognized by their capitalized names, such as `<Sidebar />`.

You can easily convert HTML to JSX using online converters. This can help you quickly adapt existing HTML code to work with React.

## React Hooks
Hooks are functions that let you use state and other React features in functional components. They allow you to "hook into" React's state and lifecycle features from function components. Hooks can only be called at the top level of a component or a custom hook.

### `useState`
`useState` is a built-in hook that allows you to add state to functional components. It returns an array with two elements: the current state value and a function to update it.

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

In this example:
- `useState` initializes the state variable `count` with a value of `0`.
- `setCount` is a function that updates the value of `count`.
- The button's `onClick` handler increments the `count` value by `1` each time it is clicked.

## Resources
- [W3Schools](https://www.w3schools.com/): A great resource for learning HTML, CSS, JavaScript, and more.
- [Font Awesome](https://fontawesome.com/): A popular source for icons.

## How to Contribute
Feel free to fork this repository and submit pull requests. Any contributions that help improve CSS skills and understanding are welcome.

## Custom Scrollbar CSS
To customize the scrollbar, you can add the following CSS properties to your stylesheet:

```css
/* Custom scrollbar styles */
::-webkit-scrollbar {
    width: 12px; /* Width of the scrollbar */
}

::-webkit-scrollbar-track {
    background: var(--primary-bg-color); /* Background of the scrollbar track */
}

::-webkit-scrollbar-thumb {
    background-color: var(--card-border-color); /* Color of the scrollbar thumb */
    border-radius: 10px; /* Roundness of the scrollbar thumb */
    border: 3px solid var(--primary-bg-color); /* Padding around the scrollbar thumb */
}

::-webkit-scrollbar-thumb:hover {
    background-color: var(--card-bg-color); /* Color of the scrollbar thumb on hover */
}
```

## Bootstrap Tips
You can have multiple `col-md` classes inside a single row. This allows you to change the order of the elements inside the row easily. In this project, the `d-flex` class was used with `flex-column`, which changes the order in height.

```html
<div class="row">
    <div class="col-md-4">First Column</div>
    <div class="col-md-4 order-md-3">Second Column</div>
    <div class="col-md-4 order-md-2">Third Column</div>
</div>
```

In this example:
- The `order-md-*` classes are used to change the order of the columns on medium and larger screens.
- The `d-flex` class with `flex-column` can be used to change the order in height.

## Future Enhancements

- Implement a chat feature using Node.js, storing messages in MongoDB.
- Integrate login functionality from another project.
- Add notifications in the top right corner.
- Integrate AI into the chat feature.
- Add CRUD functionality for blog posts, projects, and other items in the dashboard.
- Add APIs for news, Spotify, weather, and other features on the dashboard main page.
- Track and display the number of visiting users using session data.

