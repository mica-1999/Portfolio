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

