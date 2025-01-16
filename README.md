# CSS-Weakness
CSS Mastery: Strengthening Responsive Design and Layout Skills

## Project Goals
The purpose of this project is to hone my CSS skills and gain a better understanding of various CSS properties and responsive design techniques.

## Objectives
- Practice and improve CSS layout techniques.
- Understand and implement responsive design principles.
- Experiment with different CSS properties to see their effects.
- Create clean and visually appealing web pages.

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
