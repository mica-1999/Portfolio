# Bootstrap 5 Learning

## Containers
- `.container`: Provides a responsive fixed-width container (has padding inside).
- `.container-fluid`: Provides a full-width container, spanning the entire width of the viewport.

By default, containers have left and right padding, with no top or bottom padding. Use spacing utilities, such as extra padding and margins, to improve appearance. For example, `.pt-5` means "add a large top padding".

## Grid System
The Bootstrap 5 grid system has six classes:
- `.col-` (extra small devices - screen width less than 576px)
- `.col-sm-` (small devices - screen width equal to or greater than 576px)
- `.col-md-` (medium devices - screen width equal to or greater than 768px)
- `.col-lg-` (large devices - screen width equal to or greater than 992px)
- `.col-xl-` (xlarge devices - screen width equal to or greater than 1200px)
- `.col-xxl-` (xxlarge devices - screen width equal to or greater than 1400px)

Use these classes in combination to specify how columns should behave on different devices.

## Bootstrap Breakpoints

Bootstrap includes six default breakpoints, sometimes referred to as grid tiers, for building responsive layouts. These breakpoints can be used to control the layout and design of your web pages at different screen sizes.

- `xs` (extra small): `<576px`
- `sm` (small): `≥576px`
- `md` (medium): `≥768px`
- `lg` (large): `≥992px`
- `xl` (extra large): `≥1200px`
- `xxl` (extra extra large): `≥1400px`

These breakpoints can be used with various Bootstrap classes to create responsive designs. For example:

```html
<div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 col-xxl-1">
    <!-- Content here -->
</div>
```

In this example:
- The element will take up 12 columns (full width) on extra small screens.
- It will take up 6 columns on small screens.
- It will take up 4 columns on medium screens.
- It will take up 3 columns on large screens.
- It will take up 2 columns on extra large screens.
- It will take up 1 column on extra extra large screens.

### Example Usage

Here is an example of how to use Bootstrap breakpoints in your HTML:

```html
<div class="container">
    <div class="row">
        <div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 col-xxl-1">
            <!-- Content here -->
        </div>
        <div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 col-xxl-1">
            <!-- Content here -->
        </div>
        <!-- Add more columns as needed -->
    </div>
</div>
```

In this example:
- The `container` class creates a responsive fixed-width container.
- The `row` class creates a horizontal group of columns.
- The `col-*` classes specify the number of columns to span at each breakpoint.

### Customizing Breakpoints

You can customize the breakpoints by modifying the CSS or using a preprocessor like Sass. Here is an example of how to customize breakpoints using Sass:

```scss
$grid-breakpoints: (
    xs: 0,
    sm: 576px,
    md: 768px,
    lg: 992px,
    xl: 1200px,
    xxl: 1400px
);

@import "bootstrap/scss/bootstrap";
```

In this example:
- The `$grid-breakpoints` map defines the custom breakpoints.
- The `@import` directive includes the Bootstrap styles with the custom breakpoints.

### Using Breakpoints in CSS

You can also use the breakpoints in your custom CSS to apply styles at different screen sizes. Here is an example:

```css
/* Extra small devices (phones, less than 576px) */
@media (max-width: 575.98px) {
    .custom-class {
        /* Styles for extra small devices */
    }
}

/* Small devices (tablets, 576px and up) */
@media (min-width: 576px) {
    .custom-class {
        /* Styles for small devices */
    }
}

/* Medium devices (desktops, 768px and up) */
@media (min-width: 768px) {
    .custom-class {
        /* Styles for medium devices */
    }
}

/* Large devices (large desktops, 992px and up) */
@media (min-width: 992px) {
    .custom-class {
        /* Styles for large devices */
    }
}

/* Extra large devices (larger desktops, 1200px and up) */
@media (min-width: 1200px) {
    .custom-class {
        /* Styles for extra large devices */
    }
}

/* Extra extra large devices (largest desktops, 1400px and up) */
@media (min-width: 1400px) {
    .custom-class {
        /* Styles for extra extra large devices */
    }
}
```

In this example:
- The `@media` rule applies styles based on the screen width.
- The `min-width` and `max-width` conditions specify the breakpoints.

By using these breakpoints, you can create responsive designs that adapt to different screen sizes and devices.

## Setting Default Padding and Using `p-0` to Reset

In your CSS, you can set a default padding for elements using the `:root` selector. This ensures a consistent padding across your entire project. If you need to reset the padding for a specific element, you can use the Bootstrap class `p-0`, which sets the padding to `0`.

### Example

In your CSS file, you can define a default padding like this:

```css
:root {
    --default-padding: 1rem; /* Default padding for elements */
}

body {
    padding: var(--default-padding); /* Apply default padding */
}
```

To reset the padding for a specific element, use the `p-0` class:

```html
<div class="card p-0">
    <!-- Card content here -->
</div>
```

In this example:
- The `:root` selector defines a CSS variable `--default-padding` to set a default padding.
- The `body` element applies this default padding.
- The `p-0` class on the `div` element resets the padding to `0`, allowing you to apply custom padding as needed.

## Multiple `col-md` Inside a Single Row

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

## Typography
- `<p class="h1">h1 Bootstrap heading</p>`
- `<p class="h2">h2 Bootstrap heading</p>`
- `<p class="h3">h3 Bootstrap heading</p>`
- `<p class="h4">h4 Bootstrap heading</p>`
- `<p class="h5">h5 Bootstrap heading</p>`
- `<p class="h6">h6 Bootstrap heading</p>`

## Text Utilities
- `<mark>` and `.mark`: Highlight text with a yellow background and some padding.
- `<abbr>`: Style abbreviations with a dotted border bottom and a cursor with a question mark on hover.
- `<blockquote class="blockquote">`: Style blockquotes.
- `<code>`: Style inline code.
- `<kbd>`: Style keyboard input.

## Colors
Bootstrap 5 has a variety of colors with classes for different elements.

## Tables
- `.table`: Basic table styling.
- `.table-striped`: Zebra theme.
- `.table-bordered`: Adds borders.
- `.table-hover`: Adds hover effect.
- `.table-dark`: Dark theme, can be combined with striped and hoverable.
- `.table-responsive`: Adds a scrollbar when the table gets too big. Can be responsive based on screen size.

## Images
- `.rounded`: Rounded corners.
- `.rounded-circle`: Circle image.
- `.img-thumbnail`: Thumbnail styling.
- `.float-start`: Floats the image to the start.
- `.mx-auto d-block`: Centers the image.
- `.img-fluid`: Responsive image.

## Alerts
- `.alert`: Basic alert.
- `.alert-(action)`: Changes based on the action.
- `.alert-dismissible`: Dismissible alert (use `data-bs-dismiss="alert"` on a button to dismiss).
- `.fade` and `.show`: Add effects.

## Buttons
- `.btn`: Basic button.
- `.btn-outline-(color)`: Adds a hover effect.
- `.btn-lg`, `.btn-sm`: Adjust button size.
- `.d-grid`: Makes the button span the entire width.
- `.active` and `.disabled`: Button states.
- Spinners: Add loading spinners inside buttons.

## Dropdowns
```html
<div class="dropdown-menu">
  <a class="dropdown-item" href="#">Tablet</a>
  <a class="dropdown-item" href="#">Smartphone</a>
</div>
```

## Badges
```html
<span class="badge bg-primary">Primary</span>
<span class="badge bg-secondary">Secondary</span>
<span class="badge bg-success">Success</span>
<span class="badge bg-danger">Danger</span>
<span class="badge bg-warning">Warning</span>
<span class="badge bg-info">Info</span>
<span class="badge bg-light">Light</span>
<span class="badge bg-dark">Dark</span>
```

## Progress Bars
- `.progress`: Container for progress bars.
- `.progress-bar`: Individual progress bar.

## Spinners
- Can be used inside or outside buttons.

## Pagination
```html
<ul class="pagination">
  <li class="page-item"><a class="page-link" href="#">Previous</a></li>
  <li class="page-item"><a class="page-link" href="#">1</a></li>
  <li class="page-item"><a class="page-link" href="#">2</a></li>
  <li class="page-item"><a class="page-link" href="#">3</a></li>
  <li class="page-item"><a class="page-link" href="#">Next</a></li>
</ul>
```

## List Groups
- Use list groups for creating styled lists similar to tables.

## Cards
A card can contain a header, content, and a footer. It also supports action colors.
- `.card-header`
- `.card-body`
- `.card-footer`
- `.card-title`: Title in header.
- `.card-img-top`, `.card-img-bottom`: Position of an image in the card.

## Navigation
- `.nav`: Apply to `<ul>` to create a horizontal menu.
- `.nav-item`: Apply to `<li>`.
- `.nav-link`: Apply to links.
- `.justify-content-center`, `.justify-content-end`: Position the navbar within the row.
- `.flex-column`: Make the navbar vertical.

## Navbar
- Control the position of the navbar based on devices.
- `.navbar-brand`: Apply to `<a>` for logos.
- Button that expands in small screens.

## Other Components
- Carousels
- Modals
- Tooltips for buttons (hover for help)
- Dark Mode

## Flexbox
- When using `.flex-column`, the div transforms into a y-axis, making `justify-content` based on the y-axis. `align-items` will still work on the horizontal axis.

