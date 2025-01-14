# CSS Properties

### background-color
Sets the background color of an element. Can be applied to any HTML element.

**Example:**
```css
header {
    background-color: #4CAF50; /* Green background */
}
```

### accent-color
Sets the accent color for user interface controls such as checkboxes, radio buttons, and range inputs.

**Example:**
```css
input[type="checkbox"] {
    accent-color: #FF5733; /* Orange accent color */
}
```

### align-content
Aligns the flexible container's lines within the flex container when there is extra space in the cross-axis. Should be used with `display: flex`. Often applied to `div` elements.

**Possible values:**
- `flex-start`: Lines are packed at the start of the container.
- `flex-end`: Lines are packed at the end of the container.
- `center`: Lines are packed at the center of the container.
- `space-between`: Lines are evenly distributed with equal space between them.
- `space-around`: Lines are evenly distributed with equal space around them.
- `space-evenly`: Lines are evenly distributed with equal space between them.

**Example:**
```css
.container {
    display: flex;
    align-content: center; /* Aligns content to the center */
}
```

### align-items
Aligns the flex items along the cross-axis. Should be used with `display: flex`. Often applied to `div` elements.

**Possible values:**
- `flex-start`: Items are aligned at the start of the container.
- `flex-end`: Items are aligned at the end of the container.
- `center`: Items are aligned at the center of the container.
- `baseline`: Items are aligned at the baseline of the container.
- `stretch`: Items are stretched to fill the container.

**Example:**
```css
.container {
    display: flex;
    align-items: center; /* Aligns items to the center */
}
```

### align-self
Overrides the `align-items` property for individual flex items. Used to specifically align one item differently inside the flex alignments.

**Possible values:**
- `flex-start`: Item is aligned at the start of the container.
- `flex-end`: Item is aligned at the end of the container.
- `center`: Item is aligned at the center of the container.
- `baseline`: Item is aligned at the baseline of the container.
- `stretch`: Item is stretched to fill the container.

**Example:**
```css
#specific-item {
    align-self: flex-end; /* Aligns this item to the end */
}
```

### all
The `all` property resets all properties, apart from `unicode-bidi` and `direction`, to their initial or inherited value.

**Possible values:**
- `initial`
- `inherit`
- `unset`

**Example:**
```css
div {
  background-color: yellow;
  color: red;
  all: initial;
}
```

### aspect-ratio
The `aspect-ratio` property allows you to define the ratio between width and height of an element.

**Example:**
```css
div {
  aspect-ratio: 3 / 2;
}
```

### background
The `background` property allows you to set a background.

**Example:**
```css
body {
  background: lightblue url("img_tree.gif") no-repeat fixed center;
}
```

### border
The `border` property is a shorthand property for:
- `border-width`
- `border-style` (required)
- `border-color`

**Example:**
```css
h2 {
  border: 4px dotted blue;
}
```

### bottom
The `bottom` property affects the vertical position of a positioned element. This property has no effect on non-positioned elements.

**Example:**
```css
div.absolute {
  position: absolute;
  bottom: 10px;
  width: 50%;
  border: 3px solid #8AC007;
}
```

### box-sizing
Include padding and border in the element's total width and height.

**Example:**
```css
#example1 {
  box-sizing: border-box;
}
```

### color
The `color` property specifies the color of text.

**Example:**
```css
body {
  color: red;
}
```

### column properties
The column properties have a wide range of utilities.

**Examples:**
```css
div {
  column-count: 3;
}
div {
  column-gap: 40px;
}
div {
  column-rule: 4px double #ff00ff;
}
div {
  columns: 100px 3;
}
```

### cursor
CSS can generate a bunch of different mouse cursors.

**Examples:**
```css
.alias {cursor: alias;}
.all-scroll {cursor: all-scroll;}
.auto {cursor: auto;}
.cell {cursor: cell;}
.col-resize {cursor: col-resize;}
.context-menu {cursor: context-menu;}
.copy {cursor: copy;}
.crosshair {cursor: crosshair;}
.default {cursor: default;}
.e-resize {cursor: e-resize;}
.ew-resize {cursor: ew-resize;}
.grab {cursor: grab;}
.grabbing {cursor: grabbing;}
.help {cursor: help;}
.move {cursor: move;}
.n-resize {cursor: n-resize;}
.ne-resize {cursor: ne-resize;}
.nesw-resize {cursor: nesw-resize;}
.ns-resize {cursor: ns-resize;}
.nw-resize {cursor: nw-resize;}
.nwse-resize {cursor: nwse-resize;}
.no-drop {cursor: no-drop;}
.none {cursor: none;}
.not-allowed {cursor: not-allowed;}
.pointer {cursor: pointer;}
.progress {cursor: progress;}
.row-resize {cursor: row-resize;}
.s-resize {cursor: s-resize;}
.se-resize {cursor: se-resize;}
.sw-resize {cursor: sw-resize;}
.text {cursor: text;}
.url {cursor: url(myBall.cur),auto;}
.w-resize {cursor: w-resize;}
.wait {cursor: wait;}
.zoom-in {cursor: zoom-in;}
.zoom-out {cursor: zoom-out;}
```

### direction
The `direction` property specifies the text direction/writing direction within a block-level element.

**Example:**
```css
p.rtl {
  direction: rtl;
}
```

### display
The `display` property specifies the display behavior (the type of rendering box) of an element.

**Examples:**
```css
p.ex1 {display: none;}
p.ex2 {display: inline;}
p.ex3 {display: block;}
p.ex4 {display: inline-block;}
```

### display: flex
When you apply `display: flex;` to a container, its direct child elements automatically become flex items. This allows you to control the positioning, alignment, and spacing of these items with flexbox properties.

**Example:**
```css
#main div {
  display: flex;
}
```

### flex: 1
Let all the flexible items be the same length, regardless of its content.

**Example:**
```css
#main div {
  flex: 1;
}
```

### flex-wrap: wrap
The `flex-wrap` property in CSS controls whether flex items should stay in a single row/column or wrap into multiple lines (rows or columns) when there isn't enough space in the flex container.

**Example:**
```css
.container {
  display: flex;
  flex-wrap: nowrap; /* No wrapping, it will overflow */
  flex-wrap: wrap; /* Wrapping, it will go down height or width */
}
```

### float
The `float` property specifies whether an element should float to the left, right, or not at all.

**Example:**
```css
img {
  float: right;
}
```

### font
The `font` property is a shorthand property for:
- `font-style`
- `font-variant`
- `font-weight`
- `font-size/line-height`
- `font-family`

**Examples:**
```css
p.a {
  font: 15px Arial, sans-serif;
}

p.b {
  font: italic small-caps bold 12px/30px Georgia, serif;
}
```

### gap
The `gap` property defines the size of the gap between the rows and between the columns in flexbox, grid, or multi-column layout.

**Example:**
```css
.grid-container {
  gap: 50px;
}
```

### grid
The `grid` property is a shorthand property for:
- `grid-template-rows`
- `grid-template-columns`
- `grid-template-areas`
- `grid-auto-rows`
- `grid-auto-columns`
- `grid-auto-flow`

**Example:**
```css
.grid-container {
  display: grid;
  grid: 150px / auto auto auto;
}
```

### height
If `height: auto;` the element will automatically adjust its height to allow its content to be displayed correctly.

**Example:**
```css
div.a {
  height: auto;
  border: 1px solid black;
}
```

### justify-content
The `justify-content` property aligns the flexible container's items when the items do not use all available space on the main-axis (horizontally).

**Example:**
```css
div {
  display: flex;
  justify-content: center;
}
```

### margin
The `margin` property sets the margins for an element, and is a shorthand property for the following properties:
- `margin-top`
- `margin-right`
- `margin-bottom`
- `margin-left`

**Example:**
```css
p {
  margin: 35px;
}
```

### max-block-size
The `max-block-size` property specifies the maximum size of an element in the block direction.

**Example:**
```css
div {
  max-block-size: 60px;
}
```

### overflow
The `overflow` property specifies what should happen if content overflows an element's box.

**Examples:**
```css
div.ex1 {
  overflow: scroll;
}

div.ex2 {
  overflow: hidden;
}
```

### padding
An element's padding is the space between its content and its border. The `padding` property is a shorthand property for:
- `padding-top`
- `padding-right`
- `padding-bottom`
- `padding-left`

**Example:**
```css
p {
  padding: 35px;
}
```

### text-align
The `text-align` property specifies the horizontal alignment of text in an element.

**Examples:**
```css
div.a {
  text-align: center;
}

div.b {
  text-align: left;
}
```

### z-index
The `z-index` property specifies the stack order of an element.

**Example:**
```css
img {
  position: absolute;
  left: 0px;
  top: 0px;
  z-index: -1;
}
```

### Using :root and CSS Variables
Using `:root` and CSS variables is a good practice for reusing styles and maintaining consistency across your project. Define your variables in the `:root` selector and use the `var()` function to apply them.

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
To implement an accordion in Bootstrap, you need to wrap the collapsible elements inside a parent `div` and use the `data-bs-parent` attribute to ensure only one section is open at a time. Here is an example:

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

In this example:
- The `div` with `id="accordionExample"` is the parent container.
- Each collapsible section is wrapped in a `div` with the class `accordion-item`.
- The `data-bs-parent` attribute ensures that only one section is open at a time.

----------------------------------------------------------------------------------------
p.class only affects p with class x
* affects all elements in the page
h1,h2,p  {
    if using the same styles
}
Box Model is that little 4 squares I see in the browser : Margin,Border,Padding,Content

CSS Combinators
div p{} affects all p inside the div
div > p {} affects all p inside that div 
div + p {} affects the p adjacent to the div
div ~ p {} affects all the p inside that are siblings and next to the div

CSS Pseudoclass -  affects certain elements (a buttons etc)example:
a:link{}
a:visited{}
CSS PseudoElement - affects certain elements (text etc)
p::first-line{} 

CSS Attribute selector targets a tag with a certain attribute
a[class]="something"{
}