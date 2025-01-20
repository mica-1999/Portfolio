# CSS Properties

### Background and Color
- **background-color**: Sets the background color of an element.
- **accent-color**: Sets the accent color for user interface controls.
- **background**: Allows you to set a background.
- **color**: Specifies the color of text.

**Examples:**
```css
header {
    background-color: #4CAF50; /* Green background */
}
input[type="checkbox"] {
    accent-color: #FF5733; /* Orange accent color */
}
body {
    background: lightblue url("img_tree.gif") no-repeat fixed center;
}
body {
    color: red;
}
```

### Flexbox and Alignment
- **align-content**: Aligns the flexible container's lines within the flex container.
- **align-items**: Aligns the flex items along the cross-axis.
- **align-self**: Overrides the `align-items` property for individual flex items.
- **justify-content**: Aligns the flexible container's items when the items do not use all available space on the main-axis.
- **display: flex**: Applies flexbox layout to a container.
- **flex: 1**: Makes all flexible items the same length.
- **flex-wrap: wrap**: Controls whether flex items should stay in a single row/column or wrap into multiple lines.

**Examples:**
```css
.container {
    display: flex;
    align-content: center; /* Aligns content to the center */
    align-items: center; /* Aligns items to the center */
    justify-content: center; /* Aligns items to the center */
    flex-wrap: wrap; /* Wrapping, it will go down height or width */
}
#specific-item {
    align-self: flex-end; /* Aligns this item to the end */
}
```

### Box Model
- **border**: Shorthand property for `border-width`, `border-style`, and `border-color`.
- **box-sizing**: Includes padding and border in the element's total width and height.
- **margin**: Sets the margins for an element.
- **padding**: Sets the padding for an element.

**Examples:**
```css
h2 {
  border: 4px dotted blue;
}
#example1 {
  box-sizing: border-box;
}
p {
  margin: 35px;
  padding: 35px;
}
```

### Sizing and Positioning
- **height**: Specifies the height of an element.
- **max-block-size**: Specifies the maximum size of an element in the block direction.
- **bottom**: Affects the vertical position of a positioned element.
- **aspect-ratio**: Defines the ratio between width and height of an element.

**Examples:**
```css
div.a {
  height: auto;
  border: 1px solid black;
}
div {
  max-block-size: 60px;
}
div.absolute {
  position: absolute;
  bottom: 10px;
  width: 50%;
  border: 3px solid #8AC007;
}
div {
  aspect-ratio: 3 / 2;
}
```

### Text and Typography
- **text-align**: Specifies the horizontal alignment of text in an element.
- **font**: Shorthand property for `font-style`, `font-variant`, `font-weight`, `font-size/line-height`, and `font-family`.

**Examples:**
```css
div.a {
  text-align: center;
}
p.a {
  font: 15px Arial, sans-serif;
}
p.b {
  font: italic small-caps bold 12px/30px Georgia, serif;
}
```

### Miscellaneous
- **all**: Resets all properties, apart from `unicode-bidi` and `direction`, to their initial or inherited value.
- **cursor**: Specifies the type of cursor to be displayed when pointing on an element.
- **direction**: Specifies the text direction/writing direction within a block-level element.
- **display**: Specifies the display behavior of an element.
- **float**: Specifies whether an element should float to the left, right, or not at all.
- **gap**: Defines the size of the gap between the rows and columns in flexbox, grid, or multi-column layout.
- **grid**: Shorthand property for `grid-template-rows`, `grid-template-columns`, `grid-template-areas`, `grid-auto-rows`, `grid-auto-columns`, and `grid-auto-flow`.
- **overflow**: Specifies what should happen if content overflows an element's box.
- **z-index**: Specifies the stack order of an element.

**Examples:**
```css
div {
  all: initial;
}
img {
  float: right;
}
.grid-container {
  display: grid;
  grid: 150px / auto auto auto;
}
div.ex1 {
  overflow: scroll;
}
img {
  position: absolute;
  left: 0px;
  top: 0px;
  z-index: -1;
}
```

### Using :root and CSS Variables
Using `:root` and CSS variables is a good practice for reusing styles and maintaining consistency across your project.

**Example:**
```css
:root {
    --primary-color: #4CAF50;
    --secondary-color: #FF5733;
    --font-size-large: 1.5rem;
}

header {
    background-color: var(--primary-color);
    color: var(--secondary-color);
    font-size: var(--font-size-large);
}
```

### How the Accordion Works
To implement an accordion in Bootstrap, you need to wrap the collapsible elements inside a parent `div` and use the `data-bs-parent` attribute to ensure only one section is open at a time.

**Example:**
```html
<div id="accordionExample">
    <div class="accordion-item">
        <h2 class="accordion-header" id="headingOne">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                Accordion Item #1
            </button>
        </h2>
        <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
            <div class="accordion-body">
                <!-- Content for Accordion Item #1 -->
            </div>
        </div>
    </div>
    <div class="accordion-item">
        <h2 class="accordion-header" id="headingTwo">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                Accordion Item #2
            </button>
        </h2>
        <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
            <div class="accordion-body">
                <!-- Content for Accordion Item #2 -->
            </div>
        </div>
    </div>
</div>
```

### flex-grow-1
The `flex-grow-1` class in Bootstrap is used to make an element grow to fill the available space in a flex container. It is a shorthand for the CSS property `flex-grow: 1;`.

**Example:**
```html
<div class="d-flex">
    <div class="flex-grow-1">This element will grow to fill the available space.</div>
    <div>This element will not grow.</div>
</div>
```

### CSS Combinators and Pseudo-classes
- **CSS Combinators**: 
  - `div p {}`: Affects all `p` inside the `div`.
  - `div > p {}`: Affects all `p` directly inside the `div`.
  - `div + p {}`: Affects the `p` adjacent to the `div`.
  - `div ~ p {}`: Affects all `p` inside that are siblings and next to the `div`.

- **CSS Pseudo-class**: Affects certain elements (e.g., `a`, `button`).
  - `a:link {}`: Affects unvisited links.
  - `a:visited {}`: Affects visited links.

- **CSS Pseudo-element**: Affects certain parts of elements (e.g., text).
  - `p::first-line {}`: Affects the first line of a paragraph.

### CSS Attribute Selector
Targets a tag with a certain attribute.

**Example:**
```css
a[class="something"] {
}
```