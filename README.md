# Lit Material Components

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/lit-material-components)

A Material Design component library built with Lit Element, implementing components matching the MUI React library API.

## Features

- 🎨 Material Design components matching MUI's API
- 🚀 Built with Lit Element for fast, lightweight web components
- 📦 Tree-shakeable and modular
- 🎯 TypeScript support
- 🔧 Customizable through CSS custom properties
- ♿ Accessible by default

## Installation

```bash
npm install
npm run build
```

## Usage

The components export only the class definitions. You need to register them with custom element names in your application:

```typescript
import { Button, TextField, Checkbox } from 'lit-material-components';

// Register components with your preferred names
customElements.define('my-button', Button);
customElements.define('my-text-field', TextField);
customElements.define('my-checkbox', Checkbox);
```

Then use them in your HTML:

```html
<my-button variant="contained" color="primary">Click Me</my-button>
<my-text-field label="Email" type="email"></my-text-field>
<my-checkbox checked color="primary"></my-checkbox>
```

## Available Components

### Layout
- **Box** - Flexible layout component with spacing, alignment, and styling utilities
- **Container** - Responsive container component with centered content and max-width constraints
- **Grid** - Flexible 12-column grid system with responsive breakpoints and spacing
- **Stack** - One-dimensional layout component for arranging elements with consistent spacing

### Navigation
- **AppBar** - Top app bar with title, navigation, and action buttons
- **BottomNavigation** - Bottom navigation bar for mobile apps with action buttons
- **Breadcrumbs** - Navigation aid showing the current location within a hierarchy
- **Drawer** - Side navigation panel with temporary, persistent, and permanent variants
- **Link** - Styled links with Material Design principles and multiple variants
- **Menu** - Dropdown menus with keyboard navigation, submenus, and positioning options
- **Stepper** - Step-by-step navigation for multi-step processes with horizontal/vertical layouts
- **Tabs** - Tab navigation with horizontal/vertical orientation and multiple variants

### Form Controls
- **Autocomplete** - Searchable dropdown with single/multiple selection
- **Button** - Material button with variants (text, contained, outlined)
- **ButtonGroup** - Group of buttons with shared styling and layout
- **Checkbox** - Checkbox with indeterminate state support
- **Fab** - Floating Action Button for primary actions
- **Radio** - Radio button
- **Switch** - Toggle switch
- **NumberField** - Numeric input with increment/decrement controls
- **TextField** - Text input with variants (outlined, filled, standard)
- **ToggleButton** - Toggle button for on/off states with grouping support
- **TransferList** - Move items between two lists with selection controls
- **Select** - Dropdown select
- **Skeleton** - Placeholder loading component with multiple variants and animations
- **Slider** - Range slider
- **Snackbar** - Brief messages and notifications with actions and auto-hide
- **SpeedDial** - Floating action button that reveals related actions when activated

### Data Display
- **Accordion** - Expandable panels for organizing content with summary and details sections
- **Avatar** - User profile picture or initials in circular, rounded, or square format
- **Badge** - Small status indicator that appears on top of content
- **ImageList** - Grid layout for displaying collections of images with multiple variants and title bars
- **List** - Flexible list component with ListItem, ListItemText, ListItemIcon, etc.
- **Typography** - Text with Material Design typography styles
- **Chip** - Compact elements for tags, filters, etc.
- **Divider** - Horizontal or vertical divider
- **Paper** - Container with elevation

### Feedback
- **Alert** - Alert messages with severity levels
- **CircularProgress** - Circular loading indicator
- **LinearProgress** - Linear loading indicator
- **Progress** - Unified progress component supporting both linear and circular variants

### Surfaces
- **Card** - Flexible card container with CardHeader, CardMedia, CardContent, and CardActions
- **Paper** - Elevated surface container

### Utils
- **Backdrop** - Semi-transparent overlay for modals and loading states
- **IconButton** - Button for icons
- **Dialog** - Modal dialog with DialogTitle, DialogContent, DialogActions

### Data Display
- **Table** - Data table with TableHead, TableBody, TableFooter, TableRow
- **TableCell** - Table cell with sorting and alignment options
- **TableContainer** - Scrollable table wrapper
- **TablePagination** - Table pagination controls
- **TableSortLabel** - Sortable column header label

## Component Examples

### Button
```html
<my-button variant="contained" color="primary" size="large">
  Submit
</my-button>
```

Properties:
- `variant`: 'text' | 'contained' | 'outlined'
- `color`: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'
- `size`: 'small' | 'medium' | 'large'
- `disabled`: boolean
- `fullWidth`: boolean

### TextField
```html
<my-text-field 
  label="Username" 
  variant="outlined"
  helperText="Enter your username"
  required
></my-text-field>
```

Properties:
- `label`: string
- `value`: string
- `variant`: 'outlined' | 'filled' | 'standard'
- `type`: 'text' | 'password' | 'email' | 'number'
- `error`: boolean
- `helperText`: string
- `disabled`: boolean
- `required`: boolean

### Autocomplete
```html
<my-autocomplete 
  label="Choose option"
  placeholder="Type to search..."
  variant="outlined"
  multiple
></my-autocomplete>
```

Properties:
- `options`: any[] - Array of options to choose from
- `label`: string - Input label
- `placeholder`: string - Input placeholder text
- `multiple`: boolean - Allow multiple selections
- `disabled`: boolean - Disable the component
- `loading`: boolean - Show loading indicator
- `freeSolo`: boolean - Allow custom values not in options
- `clearOnEscape`: boolean - Clear input on Escape key
- `disableClearable`: boolean - Hide clear button
- `size`: 'small' | 'medium' - Component size
- `variant`: 'outlined' | 'filled' | 'standard' - Input variant
- `getOptionLabel`: (option: any) => string - Custom option label function
- `isOptionEqualToValue`: (option: any, value: any) => boolean - Custom equality check
- `filterOptions`: (options: any[], state: any) => any[] - Custom filtering function

### ButtonGroup
```html
<my-button-group variant="outlined" color="primary" orientation="horizontal">
  <my-button>One</my-button>
  <my-button>Two</my-button>
  <my-button>Three</my-button>
</my-button-group>
```

Properties:
- `variant`: 'text' | 'contained' | 'outlined' - Button style variant
- `color`: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' - Color theme
- `size`: 'small' | 'medium' | 'large' - Button size
- `orientation`: 'horizontal' | 'vertical' - Layout direction
- `disabled`: boolean - Disable all buttons in group
- `disableElevation`: boolean - Remove shadow from contained buttons
- `fullWidth`: boolean - Make buttons fill container width

### Badge
```html
<my-badge badgeContent="4" color="primary">
  <div>Content with badge</div>
</my-badge>
```

Properties:
- `badgeContent`: string - Text or number to display in badge
- `color`: 'default' | 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' - Badge color
- `variant`: 'standard' | 'dot' - Badge style (content or just a dot)
- `anchorOrigin`: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' - Badge position
- `invisible`: boolean - Hide the badge
- `showZero`: boolean - Show badge when content is "0"
- `max`: number - Maximum number to display (shows "max+" when exceeded)
- `overlap`: 'rectangular' | 'circular' - Adjust positioning for circular content

### Avatar
```html
<my-avatar src="profile.jpg" alt="John Doe"></my-avatar>
<my-avatar alt="Jane Smith" color="primary"></my-avatar>
<my-avatar color="secondary">
  <svg><!-- icon --></svg>
</my-avatar>
```

Properties:
- `src`: string - Image source URL
- `alt`: string - Alternative text (used for initials if no image)
- `variant`: 'circular' | 'rounded' | 'square' - Avatar shape
- `size`: 'small' | 'medium' | 'large' | string - Predefined or custom size
- `color`: 'default' | 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' - Background color for text/icon avatars

**Content Priority:**
1. Image (if `src` provided and loads successfully)
2. Slotted content (icons, custom elements)
3. Initials from `alt` text
4. Default person icon

### ImageList
```html
<!-- Standard Image List -->
<my-image-list variant="standard" cols="4" gap="4" rowHeight="164">
  <my-image-list-item src="image1.jpg" alt="Image 1">
    <my-image-list-item-bar title="Image Title" subtitle="by @photographer"></my-image-list-item-bar>
  </my-image-list-item>
  <my-image-list-item src="image2.jpg" alt="Image 2">
    <my-image-list-item-bar title="Another Image" subtitle="by @artist"></my-image-list-item-bar>
  </my-image-list-item>
</my-image-list>

<!-- Quilted Image List -->
<my-image-list variant="quilted" cols="4" gap="4">
  <my-image-list-item src="featured.jpg" alt="Featured" featured>
    <my-image-list-item-bar title="Featured Image" subtitle="Large display"></my-image-list-item-bar>
  </my-image-list-item>
  <my-image-list-item src="regular1.jpg" alt="Regular 1">
    <my-image-list-item-bar title="Regular Image"></my-image-list-item-bar>
  </my-image-list-item>
</my-image-list>

<!-- Masonry Image List -->
<my-image-list variant="masonry" cols="3" gap="4">
  <my-image-list-item src="tall-image.jpg" alt="Tall Image">
    <my-image-list-item-bar title="Tall Image" subtitle="Natural height"></my-image-list-item-bar>
  </my-image-list-item>
  <my-image-list-item src="square-image.jpg" alt="Square Image">
    <my-image-list-item-bar title="Square Image"></my-image-list-item-bar>
  </my-image-list-item>
</my-image-list>

<!-- Woven Image List -->
<my-image-list variant="woven" cols="3" gap="4">
  <my-image-list-item src="image1.jpg" alt="Image 1">
    <my-image-list-item-bar title="Woven Layout"></my-image-list-item-bar>
  </my-image-list-item>
  <my-image-list-item src="image2.jpg" alt="Image 2">
    <my-image-list-item-bar title="Alternating Sizes"></my-image-list-item-bar>
  </my-image-list-item>
</my-image-list>

<!-- Image List with Title Bars -->
<my-image-list variant="standard" cols="2" gap="4" rowHeight="200">
  <my-image-list-item src="image1.jpg" alt="Image 1">
    <my-image-list-item-bar title="Bottom Bar" subtitle="Default position" position="bottom">
      <my-icon-button slot="action" style="color: rgba(255, 255, 255, 0.54);">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      </my-icon-button>
    </my-image-list-item-bar>
  </my-image-list-item>
  
  <my-image-list-item src="image2.jpg" alt="Image 2">
    <my-image-list-item-bar title="Top Bar" subtitle="Top position" position="top">
      <my-icon-button slot="action" style="color: rgba(255, 255, 255, 0.54);">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3z"/>
        </svg>
      </my-icon-button>
    </my-image-list-item-bar>
  </my-image-list-item>
  
  <my-image-list-item src="image3.jpg" alt="Image 3">
    <my-image-list-item-bar title="Below Image" position="below"></my-image-list-item-bar>
  </my-image-list-item>
</my-image-list>

<!-- Custom Grid Sizing -->
<my-image-list variant="quilted" cols="4" gap="4">
  <my-image-list-item src="large.jpg" alt="Large Item" cols="2" rows="2">
    <my-image-list-item-bar title="Large Item" subtitle="2x2 grid"></my-image-list-item-bar>
  </my-image-list-item>
  <my-image-list-item src="wide.jpg" alt="Wide Item" cols="2">
    <my-image-list-item-bar title="Wide Item" subtitle="2x1 grid"></my-image-list-item-bar>
  </my-image-list-item>
  <my-image-list-item src="regular.jpg" alt="Regular Item">
    <my-image-list-item-bar title="Regular" subtitle="1x1 grid"></my-image-list-item-bar>
  </my-image-list-item>
</my-image-list>
```

**ImageList Properties:**
- `variant`: 'masonry' | 'quilted' | 'standard' | 'woven' - Layout variant (default: 'standard')
- `cols`: number - Number of columns (default: 2)
- `gap`: number - Gap between items using 8px unit system (default: 4)
- `rowHeight`: number - Row height in pixels for standard/woven variants (default: 164)

**ImageListItem Properties:**
- `src`: string - Image source URL
- `alt`: string - Alternative text for the image
- `featured`: boolean - Make item larger in quilted variant (2x2 grid)
- `cols`: number - Number of columns to span (default: 1)
- `rows`: number - Number of rows to span (default: 1)

**ImageListItemBar Properties:**
- `title`: string - Primary title text
- `subtitle`: string - Secondary subtitle text
- `position`: 'bottom' | 'top' | 'below' - Bar position relative to image (default: 'bottom')

**Layout Variants:**
- **standard**: All items same size in a regular grid
- **quilted**: Featured items are larger (2x2), others are regular size
- **masonry**: Items maintain aspect ratio, creating a Pinterest-like layout
- **woven**: Alternating pattern with different aspect ratios (1:1 and 2:1)

**Title Bar Positions:**
- **bottom**: Overlay at bottom of image with gradient background (default)
- **top**: Overlay at top of image with gradient background
- **below**: Below the image without overlay background

**Features:**
- **Multiple Layout Variants**: Four different layout patterns for various use cases
- **Responsive Grid System**: Configurable columns and spacing
- **Image Loading States**: Built-in loading and error state handling
- **Title Bars**: Overlay or below-image title and subtitle support
- **Action Buttons**: Support for action buttons in title bars
- **Custom Grid Sizing**: Individual items can span multiple columns/rows
- **Hover Effects**: Subtle image scaling on hover
- **Accessibility**: Proper alt text and semantic HTML structure
- **Performance**: Efficient CSS Grid and Flexbox layouts
- **Error Handling**: Graceful fallback for failed image loads

**Usage Patterns:**
- **Standard**: Photo galleries, product grids, uniform content
- **Quilted**: Featured content with supporting images
- **Masonry**: Pinterest-style layouts, varying image sizes
- **Woven**: Alternating layouts for visual interest
- Use appropriate `cols` count based on screen size and content
- Include descriptive `alt` text for all images
- Use title bars for image metadata and actions
- Consider loading performance with large image sets
- Use `gap` to control visual density
- Match `rowHeight` to your image aspect ratios

**Responsive Considerations:**
- Reduce `cols` on smaller screens for better mobile experience
- Consider touch-friendly sizing for mobile interactions
- Use CSS media queries to adjust `cols` and `gap` responsively
- Ensure title bars remain readable on small screens
- Test image loading performance on slower connections

**Accessibility:**
- Provide meaningful `alt` text for all images
- Use semantic HTML structure with proper image elements
- Ensure sufficient color contrast in title bars
- Support keyboard navigation for interactive elements
- Consider screen reader compatibility for image descriptions

### List
```html
<my-list>
  <my-list-item-button>
    <my-list-item-icon>
      <svg><!-- icon --></svg>
    </my-list-item-icon>
    <my-list-item-text primary="Primary text" secondary="Secondary text"></my-list-item-text>
    <my-list-item-secondary-action>
      <my-icon-button>×</my-icon-button>
    </my-list-item-secondary-action>
  </my-list-item-button>
</my-list>
```

**List Properties:**
- `dense`: boolean - Compact spacing
- `disablePadding`: boolean - Remove default padding
- `subheader`: string - List section header

**ListItem Properties:**
- `dense`: boolean - Compact spacing
- `disabled`: boolean - Disable interaction
- `divider`: boolean - Show bottom border
- `selected`: boolean - Show selected state
- `alignItems`: 'flex-start' | 'center' - Vertical alignment

**ListItemButton Properties:**
- Same as ListItem plus click handling and hover effects

**ListItemText Properties:**
- `primary`: string - Primary text content
- `secondary`: string - Secondary text content
- `inset`: boolean - Add left padding for alignment

**Sub-components:**
- **ListItemIcon** - Container for icons with proper spacing
- **ListItemAvatar** - Container for avatars with proper spacing
- **ListItemSecondaryAction** - Right-aligned action area

### Fab (Floating Action Button)
```html
<my-fab color="primary">
  <svg slot="icon"><!-- icon --></svg>
</my-fab>

<my-fab variant="extended" color="secondary">
  <svg slot="icon"><!-- icon --></svg>
  Add Item
</my-fab>
```

Properties:
- `color`: 'default' | 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' - Button color
- `size`: 'small' | 'medium' | 'large' - Button size
- `variant`: 'circular' | 'extended' - Shape (circular for icon-only, extended for icon + text)
- `disabled`: boolean - Disable the button
- `href`: string - Make FAB act as a link

**Usage Notes:**
- Use `slot="icon"` for the icon content
- Extended FABs can contain both icon and text
- Typically positioned fixed in the bottom-right corner of the screen
- Primary action should use `color="primary"`

### NumberField
```html
<my-number-field 
  label="Quantity" 
  variant="outlined"
  value="5"
  min="1"
  max="100"
  step="1"
></my-number-field>
```

Properties:
- `label`: string - Input label
- `value`: number - Current numeric value
- `variant`: 'outlined' | 'filled' | 'standard' - Input style
- `min`: number - Minimum allowed value
- `max`: number - Maximum allowed value
- `step`: number - Increment/decrement step size (default: 1)
- `hideSteppers`: boolean - Hide increment/decrement buttons
- `inputMode`: 'numeric' | 'decimal' - Mobile keyboard type
- `placeholder`: string - Placeholder text
- `disabled`: boolean - Disable the input
- `required`: boolean - Mark as required field
- `error`: boolean - Show error state
- `helperText`: string - Helper or error text
- `fullWidth`: boolean - Fill container width
- `size`: 'small' | 'medium' - Input size

**Features:**
- Automatic value clamping to min/max bounds
- Keyboard navigation (Arrow Up/Down)
- Custom step increments (integers or decimals)
- Mobile-optimized numeric keyboards
- Validation and error states

### ToggleButton & ToggleButtonGroup
```html
<!-- Individual toggle button -->
<my-toggle-button value="bold" selected>
  <svg><!-- bold icon --></svg>
</my-toggle-button>

<!-- Exclusive group (single selection) -->
<my-toggle-button-group value="left" color="primary">
  <my-toggle-button value="left">Left</my-toggle-button>
  <my-toggle-button value="center">Center</my-toggle-button>
  <my-toggle-button value="right">Right</my-toggle-button>
</my-toggle-button-group>

<!-- Multiple selection group -->
<my-toggle-button-group exclusive="false" color="primary">
  <my-toggle-button value="bold">Bold</my-toggle-button>
  <my-toggle-button value="italic">Italic</my-toggle-button>
</my-toggle-button-group>
```

**ToggleButton Properties:**
- `selected`: boolean - Toggle state
- `value`: string - Button value for identification
- `disabled`: boolean - Disable the button
- `color`: 'standard' | 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'
- `size`: 'small' | 'medium' | 'large' - Button size
- `fullWidth`: boolean - Fill container width

**ToggleButtonGroup Properties:**
- `value`: string - Selected value (exclusive mode)
- `values`: string[] - Selected values (multiple mode)
- `exclusive`: boolean - Single vs multiple selection (default: true)
- `color`: 'standard' | 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'
- `size`: 'small' | 'medium' | 'large' - Size for all buttons
- `orientation`: 'horizontal' | 'vertical' - Layout direction
- `disabled`: boolean - Disable all buttons
- `fullWidth`: boolean - Make buttons fill container width

**Events:**
- ToggleButton: `toggle` event with `{ value, selected }`
- ToggleButtonGroup: `change` event with `{ value }` (exclusive) or `{ values }` (multiple)

### TransferList
```html
<my-transfer-list 
  leftTitle="Available"
  rightTitle="Selected"
></my-transfer-list>
```

Properties:
- `left`: TransferListItem[] - Items in the left list
- `right`: TransferListItem[] - Items in the right list  
- `leftTitle`: string - Title for left list (default: "Available")
- `rightTitle`: string - Title for right list (default: "Selected")
- `disabled`: boolean - Disable all interactions
- `dense`: boolean - Compact spacing

**TransferListItem Interface:**
```typescript
interface TransferListItem {
  id: string;        // Unique identifier
  label: string;     // Display text
  disabled?: boolean; // Individual item disabled state
}
```

**Features:**
- Move selected items between lists
- Move all items at once
- Individual item selection with checkboxes
- Header checkbox for select/deselect all
- Disabled items support
- Item count display
- Keyboard accessible

**Events:**
- `change` event with `{ left: TransferListItem[], right: TransferListItem[] }`

### Progress
```html
<!-- Linear Progress -->
<my-progress variant="linear" mode="determinate" value="75" color="primary"></my-progress>
<my-progress variant="linear" mode="indeterminate" color="secondary"></my-progress>
<my-progress variant="linear" mode="buffer" value="60" buffer="80" color="primary"></my-progress>

<!-- Circular Progress -->
<my-progress variant="circular" mode="determinate" value="75" color="primary" size="medium"></my-progress>
<my-progress variant="circular" mode="indeterminate" color="secondary" size="large"></my-progress>

<!-- With Labels -->
<my-progress variant="linear" mode="determinate" value="85" showLabel color="success"></my-progress>
<my-progress variant="circular" mode="determinate" value="65" showLabel label="65% Complete" color="info"></my-progress>
```

Properties:
- `variant`: 'linear' | 'circular' - Progress indicator type
- `mode`: 'determinate' | 'indeterminate' | 'buffer' | 'query' - Progress mode
- `value`: number - Progress value (0-100) for determinate mode
- `buffer`: number - Buffer value (0-100) for buffer mode
- `color`: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' - Color theme
- `size`: 'small' | 'medium' | 'large' | number - Size (circular only)
- `thickness`: number - Stroke thickness for circular progress (default: 3.6)
- `showLabel`: boolean - Display progress label
- `label`: string - Custom label text (defaults to percentage for determinate mode)

**Progress Modes:**
- **Determinate**: Shows specific progress value (0-100%)
- **Indeterminate**: Shows ongoing activity without specific progress
- **Buffer**: Shows buffering progress with primary and buffer values (linear only)
- **Query**: Shows query/loading state with reverse animation (linear only)

**Features:**
- Unified API for both linear and circular progress indicators
- Multiple progress modes with smooth animations
- Customizable colors, sizes, and thickness
- Optional progress labels with custom text
- Responsive design with proper accessibility
- Buffer mode for streaming/loading scenarios

### Skeleton
```html
<!-- Text Skeletons -->
<my-skeleton variant="text" width="100%"></my-skeleton>
<my-skeleton variant="text" width="80%"></my-skeleton>
<my-skeleton variant="text" width="60%"></my-skeleton>

<!-- Shape Skeletons -->
<my-skeleton variant="rectangular" width="200px" height="118px"></my-skeleton>
<my-skeleton variant="rounded" width="150px" height="80px"></my-skeleton>
<my-skeleton variant="circular" width="40px" height="40px"></my-skeleton>

<!-- Animation Types -->
<my-skeleton variant="text" animation="pulse"></my-skeleton>
<my-skeleton variant="text" animation="wave"></my-skeleton>
<my-skeleton variant="text" animation="false"></my-skeleton>

<!-- Card Skeleton Example -->
<my-card style="padding: 16px;">
  <div style="display: flex; gap: 15px; margin-bottom: 16px;">
    <my-skeleton variant="circular" width="40px" height="40px"></my-skeleton>
    <div style="flex: 1;">
      <my-skeleton variant="text" width="60%"></my-skeleton>
      <my-skeleton variant="text" width="40%"></my-skeleton>
    </div>
  </div>
  <my-skeleton variant="rectangular" width="100%" height="200px"></my-skeleton>
  <my-skeleton variant="text" width="100%"></my-skeleton>
  <my-skeleton variant="text" width="80%"></my-skeleton>
</my-card>
```

Properties:
- `variant`: 'text' | 'rectangular' | 'rounded' | 'circular' - Skeleton shape variant
- `animation`: 'pulse' | 'wave' | false - Animation type (default: 'pulse')
- `width`: string - Custom width (CSS value like '100%', '200px')
- `height`: string - Custom height (CSS value like '20px', '100px')

**Skeleton Variants:**
- **Text**: For text content with automatic height and scaling
- **Rectangular**: For images, cards, or rectangular content areas
- **Rounded**: Similar to rectangular but with rounded corners
- **Circular**: For avatars, profile pictures, or circular elements

**Animation Types:**
- **Pulse**: Gentle opacity animation (default)
- **Wave**: Shimmer effect that moves across the skeleton
- **False**: No animation for static placeholders

**Features:**
- Multiple shape variants for different content types
- Customizable animations including pulse, wave, and static
- Flexible sizing with CSS width and height properties
- Proper accessibility attributes for screen readers
- Lightweight and performant animations
- Material Design styling and proportions
- Responsive design that adapts to container sizes

**Usage Patterns:**
- Use text skeletons for loading text content
- Use rectangular/rounded skeletons for images and media
- Use circular skeletons for avatars and profile pictures
- Combine multiple skeletons to create complex loading layouts
- Match skeleton dimensions to actual content for smooth transitions

### Snackbar
```html
<!-- Basic Snackbar -->
<my-snackbar 
  open 
  message="This is a basic snackbar message"
  autoHideDuration="6000">
</my-snackbar>

<!-- Snackbar with Action -->
<my-snackbar 
  open 
  message="Message sent" 
  action="UNDO"
  closable>
</my-snackbar>

<!-- Severity Variants -->
<my-snackbar open message="Success message" severity="success" variant="filled"></my-snackbar>
<my-snackbar open message="Info message" severity="info" variant="standard"></my-snackbar>
<my-snackbar open message="Warning message" severity="warning" variant="outlined"></my-snackbar>
<my-snackbar open message="Error message" severity="error" variant="filled"></my-snackbar>

<!-- Positioning -->
<my-snackbar open message="Top center" anchorOrigin="top-center"></my-snackbar>
<my-snackbar open message="Bottom right" anchorOrigin="bottom-right"></my-snackbar>

<!-- Persistent Snackbar -->
<my-snackbar 
  open 
  message="This won't auto-hide" 
  autoHideDuration="0" 
  closable>
</my-snackbar>
```

Properties:
- `open`: boolean - Whether the snackbar is visible
- `message`: string - The message to display
- `autoHideDuration`: number - Auto-hide delay in milliseconds (0 = no auto-hide, default: 6000)
- `anchorOrigin`: 'bottom-left' | 'bottom-center' | 'bottom-right' | 'top-left' | 'top-center' | 'top-right' - Position
- `variant`: 'standard' | 'filled' | 'outlined' - Visual style variant
- `severity`: 'success' | 'info' | 'warning' | 'error' | '' - Severity level with icon and colors
- `closable`: boolean - Show close button for manual dismissal
- `action`: string - Action button text
- `transitionDuration`: string - CSS transition duration (default: '225ms')

**Anchor Origins:**
- **bottom-left**: Bottom left corner (default)
- **bottom-center**: Bottom center of screen
- **bottom-right**: Bottom right corner
- **top-left**: Top left corner
- **top-center**: Top center of screen
- **top-right**: Top right corner

**Variants:**
- **Standard**: Default dark background with white text
- **Filled**: Colored background based on severity
- **Outlined**: White background with colored border and text

**Severity Levels:**
- **Success**: Green color with checkmark icon
- **Info**: Blue color with info icon
- **Warning**: Orange color with warning icon
- **Error**: Red color with error icon

**Events:**
- `close`: Fired when snackbar closes (detail: { reason: 'timeout' | 'clickaway' })
- `action`: Fired when action button is clicked (detail: { action: string })

**Features:**
- Auto-hide with customizable duration
- Manual dismissal with close button
- Action buttons for user interaction
- Multiple positioning options
- Severity levels with icons and colors
- Smooth enter/exit animations
- Mobile-responsive design
- Proper accessibility with ARIA attributes
- Event handling for close and action interactions
- Support for multiple simultaneous snackbars

**Usage Patterns:**
- Use for brief confirmations and feedback messages
- Include actions for undo operations or related tasks
- Position based on content and user workflow
- Use severity levels to communicate message importance
- Keep messages concise and actionable
- Provide manual close option for important messages

### Breadcrumbs
```html
<!-- Basic Breadcrumbs -->
<my-breadcrumbs></my-breadcrumbs>

<!-- With Custom Items -->
<my-breadcrumbs id="nav-breadcrumbs"></my-breadcrumbs>

<!-- Custom Separator -->
<my-breadcrumbs separator="›"></my-breadcrumbs>
<my-breadcrumbs separator="•"></my-breadcrumbs>

<!-- With Icons -->
<my-breadcrumbs id="icon-breadcrumbs"></my-breadcrumbs>

<!-- Collapsed Breadcrumbs -->
<my-breadcrumbs 
  maxItems="4" 
  itemsBeforeCollapse="1" 
  itemsAfterCollapse="1">
</my-breadcrumbs>

<!-- JavaScript Setup -->
<script>
  const breadcrumbs = document.getElementById('nav-breadcrumbs');
  breadcrumbs.items = [
    { label: 'Home', href: '/home' },
    { label: 'Products', href: '/products' },
    { label: 'Laptops', href: '/laptops' },
    { label: 'MacBook Pro' } // Current page (no href)
  ];

  const iconBreadcrumbs = document.getElementById('icon-breadcrumbs');
  iconBreadcrumbs.items = [
    { label: 'Home', href: '/home', icon: 'home' },
    { label: 'Documents', href: '/docs', icon: 'folder' },
    { label: 'Projects', href: '/projects', icon: 'folder' },
    { label: 'README.md', icon: 'file' }
  ];

  // Handle breadcrumb clicks
  breadcrumbs.addEventListener('breadcrumb-click', (e) => {
    console.log('Clicked:', e.detail.item.label);
    // Navigate to e.detail.item.href
  });
</script>
```

Properties:
- `items`: BreadcrumbItem[] - Array of breadcrumb items
- `separator`: string - Separator character between items (default: '/')
- `maxItems`: number - Maximum items to show before collapsing (default: 8)
- `itemsBeforeCollapse`: number - Items to show before collapse button (default: 1)
- `itemsAfterCollapse`: number - Items to show after collapse button (default: 1)
- `expandText`: boolean - Show expand text instead of ellipsis (default: false)

**BreadcrumbItem Interface:**
```typescript
interface BreadcrumbItem {
  label: string;        // Display text
  href?: string;        // Link URL (optional)
  disabled?: boolean;   // Disable interaction
  icon?: string;        // Icon name (optional)
}
```

**Built-in Icons:**
- `home`: Home icon
- `folder`: Folder icon
- `file`: File icon
- `settings`: Settings icon

**Collapse Behavior:**
- When `items.length > maxItems`, breadcrumbs are collapsed
- Shows first `itemsBeforeCollapse` items
- Shows collapse button (...) with dropdown menu
- Shows last `itemsAfterCollapse` items
- Dropdown shows all collapsed items

**Events:**
- `breadcrumb-click`: Fired when breadcrumb is clicked (detail: { item, index })

**Features:**
- Automatic collapsing for long breadcrumb trails
- Custom separators and icons
- Dropdown menu for collapsed items
- Keyboard navigation support
- Mobile-responsive design
- Proper semantic HTML with nav and ol elements
- ARIA attributes for accessibility
- Click event handling with item details
- Disabled state support

**Usage Patterns:**
- Use for hierarchical navigation (file systems, categories)
- Show current location within deep navigation structures
- Provide quick access to parent levels
- Include icons for better visual hierarchy
- Keep labels concise but descriptive
- Use href for navigable items, omit for current page
- Consider collapsing for deep hierarchies (>5 levels)

### Link
```html
<!-- Basic Links -->
<my-link href="/home">Home</my-link>
<my-link href="/about" color="primary">About</my-link>
<my-link href="/contact" color="secondary">Contact</my-link>

<!-- Color Variants -->
<my-link href="/error" color="error">Error Link</my-link>
<my-link href="/warning" color="warning">Warning Link</my-link>
<my-link href="/info" color="info">Info Link</my-link>
<my-link href="/success" color="success">Success Link</my-link>

<!-- Underline Options -->
<my-link href="/none" underline="none">No Underline</my-link>
<my-link href="/hover" underline="hover">Hover Underline</my-link>
<my-link href="/always" underline="always">Always Underline</my-link>

<!-- Variants -->
<my-link href="/text" variant="text" color="primary">Text Variant</my-link>
<my-link href="/outlined" variant="outlined" color="primary">Outlined Variant</my-link>
<my-link href="/contained" variant="contained" color="primary">Contained Variant</my-link>

<!-- External Links -->
<my-link href="https://example.com" target="_blank">External Link</my-link>
<my-link href="https://github.com" target="_blank" color="secondary">GitHub</my-link>

<!-- Button Component -->
<my-link component="button" color="primary">Button Link</my-link>
<my-link component="button" variant="outlined" color="secondary">Action Button</my-link>

<!-- Disabled Links -->
<my-link href="/disabled" disabled>Disabled Link</my-link>
<my-link href="/disabled" variant="contained" color="primary" disabled>Disabled Button</my-link>

<!-- Event Handling -->
<my-link id="action-link" component="button" color="success">Click Me</my-link>

<script>
  document.getElementById('action-link').addEventListener('click', (e) => {
    console.log('Link clicked:', e.detail);
    // Handle action
  });
</script>
```

Properties:
- `href`: string - Link URL (not used when component="button")
- `target`: string - Link target (_blank, _self, etc.)
- `rel`: string - Link relationship (auto-set for external links)
- `color`: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' | 'inherit' | 'textPrimary' | 'textSecondary' - Link color
- `variant`: 'text' | 'outlined' | 'contained' - Visual style variant
- `underline`: 'none' | 'hover' | 'always' - Underline behavior
- `disabled`: boolean - Disable the link
- `component`: 'a' | 'button' - HTML element to render

**Color Options:**
- **primary**: Primary theme color (default)
- **secondary**: Secondary theme color
- **error**: Error/danger color (red)
- **warning**: Warning color (orange)
- **info**: Information color (blue)
- **success**: Success color (green)
- **inherit**: Inherit parent color
- **textPrimary**: Primary text color
- **textSecondary**: Secondary text color

**Variants:**
- **text**: Simple colored text link (default)
- **outlined**: Link with border and background on hover
- **contained**: Button-like link with filled background

**Underline Behavior:**
- **none**: No underline
- **hover**: Underline on hover (default)
- **always**: Always underlined

**Events:**
- `click`: Fired when link is clicked (detail: { originalEvent })

**Features:**
- Automatic external link detection with icon
- Proper rel attributes for external links (noopener noreferrer)
- Button component option for action links
- Disabled state support
- Focus management and keyboard navigation
- Material Design color system
- Hover and active states
- Accessibility attributes

**Usage Patterns:**
- Use `href` for navigation links
- Use `component="button"` for action links that don't navigate
- Use `target="_blank"` for external links (icon added automatically)
- Use appropriate colors to indicate link purpose
- Use `variant="contained"` for prominent call-to-action links
- Use `underline="always"` for links within text content
- Use `disabled` for temporarily unavailable links

### Accordion
```html
<!-- Basic Accordion -->
<my-accordion>
  <my-accordion-summary slot="summary">
    <my-typography variant="h6">Panel Title</my-typography>
  </my-accordion-summary>
  <my-accordion-details slot="details">
    <my-typography>
      Panel content goes here. This can include any HTML content.
    </my-typography>
  </my-accordion-details>
</my-accordion>

<!-- Outlined Variant -->
<my-accordion variant="outlined">
  <my-accordion-summary slot="summary">
    <my-typography variant="h6">Outlined Panel</my-typography>
  </my-accordion-summary>
  <my-accordion-details slot="details">
    <my-typography>Content for outlined accordion.</my-typography>
  </my-accordion-details>
</my-accordion>

<!-- With Actions -->
<my-accordion>
  <my-accordion-summary slot="summary">
    <my-typography variant="h6">Panel with Actions</my-typography>
  </my-accordion-summary>
  <my-accordion-details slot="details">
    <my-typography>Panel content with action buttons.</my-typography>
    <my-accordion-actions>
      <my-button variant="outlined">Cancel</my-button>
      <my-button variant="contained" color="primary">Save</my-button>
    </my-accordion-actions>
  </my-accordion-details>
</my-accordion>

<!-- Controlled Accordion -->
<my-accordion id="panel1" expanded>
  <my-accordion-summary slot="summary">
    <my-typography variant="h6">Controlled Panel</my-typography>
  </my-accordion-summary>
  <my-accordion-details slot="details">
    <my-typography>This panel's state is controlled by JavaScript.</my-typography>
  </my-accordion-details>
</my-accordion>

<!-- Disabled Accordion -->
<my-accordion disabled>
  <my-accordion-summary slot="summary">
    <my-typography variant="h6">Disabled Panel</my-typography>
  </my-accordion-summary>
  <my-accordion-details slot="details">
    <my-typography>This panel cannot be expanded.</my-typography>
  </my-accordion-details>
</my-accordion>

<!-- Complex Content -->
<my-accordion>
  <my-accordion-summary slot="summary">
    <my-typography variant="h6">Form Panel</my-typography>
  </my-accordion-summary>
  <my-accordion-details slot="details">
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <my-text-field label="Name" variant="outlined"></my-text-field>
      <my-text-field label="Email" variant="outlined" type="email"></my-text-field>
      <div style="display: flex; align-items: center; gap: 8px;">
        <my-checkbox></my-checkbox>
        <my-typography>Subscribe to newsletter</my-typography>
      </div>
    </div>
  </my-accordion-details>
</my-accordion>

<!-- JavaScript Event Handling -->
<script>
  const accordion = document.getElementById('panel1');
  
  // Handle accordion state changes
  accordion.addEventListener('change', (e) => {
    console.log('Accordion changed:', {
      expanded: e.detail.expanded,
      previousExpanded: e.detail.previousExpanded
    });
  });
  
  // Programmatically control accordion
  accordion.expanded = true; // Expand
  accordion.expanded = false; // Collapse
</script>
```

**Accordion Properties:**
- `expanded`: boolean - Whether the accordion is expanded (default: false)
- `disabled`: boolean - Disable the accordion interaction
- `disableGutters`: boolean - Remove default margins and shadows
- `variant`: 'elevation' | 'outlined' - Visual style variant (default: 'elevation')
- `square`: boolean - Remove border radius for square corners
- `TransitionComponent`: string - Transition component name (default: 'collapse')
- `TransitionProps`: string - Additional transition properties

**AccordionSummary Properties:**
- `expandIcon`: string - Icon name for expand/collapse indicator (default: 'expand_more')
- `disabled`: boolean - Disable the summary interaction
- `iconButtonProps`: string - Additional props for the icon button

**AccordionDetails Properties:**
- `disablePadding`: boolean - Remove default padding from details content

**AccordionActions Properties:**
- `disableSpacing`: boolean - Remove default padding from actions container

**Accordion Variants:**
- **elevation**: Default variant with shadow and margins (Material Design standard)
- **outlined**: Bordered variant without shadows, suitable for grouped accordions

**Events:**
- `change`: Fired when accordion expands/collapses (detail: { expanded, previousExpanded })
- `summary-click`: Fired when summary is clicked (detail: { originalEvent })

**Features:**
- **Smooth Animations**: Expand/collapse transitions with Material Design timing
- **Keyboard Navigation**: Full keyboard support with Enter/Space to toggle
- **Accessibility**: Proper ARIA attributes and focus management
- **Flexible Content**: Support for any HTML content in details section
- **Action Buttons**: Built-in support for action buttons in accordion footer
- **Controlled State**: Programmatic control of expanded state
- **Visual Variants**: Elevation and outlined styles for different use cases
- **Responsive Design**: Adapts to container width and mobile devices
- **Nested Support**: Accordions can contain other complex components
- **Event System**: Comprehensive event handling for state changes

**Usage Patterns:**
- Use for FAQ sections, settings panels, and content organization
- Group related accordions with the outlined variant
- Include action buttons for forms and interactive content
- Use controlled state for exclusive accordion behavior (only one open)
- Disable accordions for read-only or unavailable content
- Combine with other components like forms, lists, and cards
- Use appropriate typography hierarchy in summary titles
- Keep summary text concise and descriptive
- Consider mobile users when designing accordion content

**Accessibility:**
- Proper ARIA attributes (aria-expanded, role="button")
- Keyboard navigation support (Enter, Space)
- Focus management and visual focus indicators
- Screen reader compatible with semantic HTML structure
- High contrast support for expand/collapse icons

### Box
```html
<!-- Basic Box -->
<my-box p="2" bgcolor="grey-100">
  Basic box with padding and background
</my-box>

<!-- Flexbox Layout -->
<my-box display="flex" gap="2" justifyContent="space-between" alignItems="center">
  <my-box flex="1" p="2" bgcolor="primary" color="white">Item 1</my-box>
  <my-box flex="2" p="2" bgcolor="secondary" color="white">Item 2</my-box>
  <my-box flex="1" p="2" bgcolor="success" color="white">Item 3</my-box>
</my-box>

<!-- Spacing System -->
<my-box m="2" p="3" bgcolor="info" color="white">
  Margin 2, Padding 3
</my-box>

<!-- Directional Spacing -->
<my-box pt="3" pb="1" px="2" bgcolor="warning" color="white">
  Top padding 3, bottom padding 1, horizontal padding 2
</my-box>

<!-- Colors and Styling -->
<my-box 
  p="3" 
  bgcolor="primary" 
  color="white" 
  borderRadius="8px" 
  boxShadow="0 2px 8px rgba(0,0,0,0.1)">
  Styled box with shadow and rounded corners
</my-box>

<!-- Positioning -->
<my-box position="relative" height="200px" bgcolor="grey-100">
  <my-box position="absolute" top="10px" left="10px" p="2" bgcolor="error" color="white">
    Absolutely positioned
  </my-box>
</my-box>

<!-- Typography -->
<my-box 
  fontSize="24px" 
  fontWeight="bold" 
  textAlign="center" 
  color="primary" 
  p="2">
  Large centered text
</my-box>

<!-- Complex Layout -->
<my-box 
  display="flex" 
  flexDirection="column" 
  gap="2" 
  p="3" 
  bgcolor="white" 
  border="1px solid #e0e0e0" 
  borderRadius="8px">
  
  <my-box display="flex" justifyContent="space-between" alignItems="center">
    <my-box fontSize="20px" fontWeight="600">Header</my-box>
    <my-box p="1" bgcolor="success" color="white" borderRadius="4px">Badge</my-box>
  </my-box>
  
  <my-box color="text-secondary">
    Content area with flexible layout using Box components.
  </my-box>
  
  <my-box display="flex" gap="2">
    <my-box flex="1" p="2" bgcolor="grey-100" textAlign="center">Column 1</my-box>
    <my-box flex="1" p="2" bgcolor="grey-100" textAlign="center">Column 2</my-box>
  </my-box>
</my-box>
```

**Box Properties:**

**Layout & Display:**
- `component`: 'div' | 'span' | 'section' | etc. - HTML element to render (default: 'div')
- `display`: 'block' | 'inline' | 'flex' | 'grid' | 'none' | etc. - CSS display property
- `position`: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky' - CSS position property

**Flexbox Properties:**
- `flexDirection`: 'row' | 'column' | 'row-reverse' | 'column-reverse' - Flex direction
- `flexWrap`: 'nowrap' | 'wrap' | 'wrap-reverse' - Flex wrap behavior
- `justifyContent`: 'flex-start' | 'center' | 'space-between' | 'space-around' | 'space-evenly' - Main axis alignment
- `alignItems`: 'flex-start' | 'center' | 'flex-end' | 'baseline' | 'stretch' - Cross axis alignment
- `alignContent`: 'flex-start' | 'center' | 'space-between' | 'space-around' | 'stretch' - Multi-line alignment
- `alignSelf`: 'auto' | 'flex-start' | 'center' | 'flex-end' | 'baseline' | 'stretch' - Individual item alignment
- `flex`: string - Shorthand for flex-grow, flex-shrink, and flex-basis
- `flexGrow`: number - Flex grow factor
- `flexShrink`: number - Flex shrink factor
- `flexBasis`: string - Flex basis value
- `order`: number - Flex order
- `gap`: string | number - Gap between flex/grid items (uses 8px spacing unit for numbers)
- `rowGap`: string | number - Row gap for flex/grid layouts
- `columnGap`: string | number - Column gap for flex/grid layouts

**Spacing Properties (Material Design 8px unit system):**
- `m`: string | number - Margin (all sides)
- `mt`: string | number - Margin top
- `mr`: string | number - Margin right
- `mb`: string | number - Margin bottom
- `ml`: string | number - Margin left
- `mx`: string | number - Margin horizontal (left + right)
- `my`: string | number - Margin vertical (top + bottom)
- `p`: string | number - Padding (all sides)
- `pt`: string | number - Padding top
- `pr`: string | number - Padding right
- `pb`: string | number - Padding bottom
- `pl`: string | number - Padding left
- `px`: string | number - Padding horizontal (left + right)
- `py`: string | number - Padding vertical (top + bottom)

**Sizing Properties:**
- `width`: string - CSS width value
- `height`: string - CSS height value
- `minWidth`: string - CSS min-width value
- `minHeight`: string - CSS min-height value
- `maxWidth`: string - CSS max-width value
- `maxHeight`: string - CSS max-height value

**Positioning Properties:**
- `top`: string - CSS top value
- `right`: string - CSS right value
- `bottom`: string - CSS bottom value
- `left`: string - CSS left value
- `zIndex`: string | number - CSS z-index value

**Colors & Styling:**
- `color`: string - Text color (theme colors: 'primary', 'secondary', 'error', 'warning', 'info', 'success', 'text-primary', 'text-secondary', or custom CSS color)
- `bgcolor`: string - Background color (theme colors: 'primary', 'secondary', 'error', 'warning', 'info', 'success', 'grey-50' to 'grey-500', 'white', 'transparent', or custom CSS color)
- `border`: string - CSS border value
- `borderRadius`: string - CSS border-radius value
- `boxShadow`: string - CSS box-shadow value
- `overflow`: 'visible' | 'hidden' | 'scroll' | 'auto' - CSS overflow property

**Typography Properties:**
- `fontSize`: string - CSS font-size value
- `fontWeight`: string | number - CSS font-weight value
- `lineHeight`: string | number - CSS line-height value
- `letterSpacing`: string - CSS letter-spacing value
- `textAlign`: 'left' | 'center' | 'right' | 'justify' - Text alignment
- `textTransform`: 'none' | 'capitalize' | 'uppercase' | 'lowercase' - Text transformation

**Spacing System:**
The Box component uses Material Design's 8px spacing unit system. When you provide a number for spacing properties, it's multiplied by 8px:
- `p="1"` = `padding: 8px`
- `m="2"` = `margin: 16px`
- `gap="3"` = `gap: 24px`

You can also provide string values for custom spacing:
- `p="12px"` = `padding: 12px`
- `m="1rem"` = `margin: 1rem`

**Theme Colors:**
- **Primary Colors**: 'primary', 'secondary', 'error', 'warning', 'info', 'success'
- **Text Colors**: 'text-primary', 'text-secondary', 'text-disabled'
- **Grey Palette**: 'grey-50', 'grey-100', 'grey-200', 'grey-300', 'grey-400', 'grey-500'
- **Special**: 'white', 'transparent'

**Features:**
- **Flexible Layout**: Complete flexbox support with all properties
- **Spacing System**: Material Design 8px unit system with directional spacing
- **Theme Integration**: Built-in theme colors and typography
- **Responsive Design**: All CSS properties supported for responsive layouts
- **Performance**: Efficient CSS generation with utility classes and dynamic styles
- **Accessibility**: Semantic HTML with proper element selection
- **Customization**: Support for custom CSS values alongside theme values
- **Layout Utilities**: Position, sizing, overflow, and display utilities

**Usage Patterns:**
- Use for layout containers and spacing between components
- Replace div elements with semantic layout structure
- Create responsive layouts with flexbox properties
- Apply consistent spacing using the 8px unit system
- Use theme colors for consistent design system
- Combine multiple Box components for complex layouts
- Use positioning properties for overlays and absolute positioning
- Apply typography properties for text styling within layouts

**Common Layout Patterns:**
```html
<!-- Centered Content -->
<my-box display="flex" justifyContent="center" alignItems="center" height="100vh">
  <my-box>Centered content</my-box>
</my-box>

<!-- Sidebar Layout -->
<my-box display="flex" height="100vh">
  <my-box width="250px" bgcolor="grey-100" p="2">Sidebar</my-box>
  <my-box flex="1" p="3">Main content</my-box>
</my-box>

<!-- Card Layout -->
<my-box 
  p="3" 
  bgcolor="white" 
  borderRadius="8px" 
  boxShadow="0 2px 4px rgba(0,0,0,0.1)"
  border="1px solid #e0e0e0">
  Card content
</my-box>

<!-- Grid-like Layout -->
<my-box display="flex" flexWrap="wrap" gap="2">
  <my-box flex="1" minWidth="200px" p="2" bgcolor="grey-100">Item 1</my-box>
  <my-box flex="1" minWidth="200px" p="2" bgcolor="grey-100">Item 2</my-box>
  <my-box flex="1" minWidth="200px" p="2" bgcolor="grey-100">Item 3</my-box>
</my-box>
```

### Container
```html
<!-- Basic Container -->
<my-container>
  <h1>Centered Content</h1>
  <p>This content is automatically centered and has responsive max-widths.</p>
</my-container>

<!-- Container Sizes -->
<my-container maxWidth="xs">Extra Small Container (444px max)</my-container>
<my-container maxWidth="sm">Small Container (600px max)</my-container>
<my-container maxWidth="md">Medium Container (900px max)</my-container>
<my-container maxWidth="lg">Large Container (1200px max)</my-container>
<my-container maxWidth="xl">Extra Large Container (1536px max)</my-container>

<!-- Fluid Container (no max-width) -->
<my-container maxWidth="false">
  Fluid container that takes full width
</my-container>

<!-- Container without gutters -->
<my-container disableGutters>
  Container without default padding
</my-container>

<!-- Fixed height container -->
<my-container fixed>
  Container with min-height: 100vh
</my-container>

<!-- Real-world example -->
<my-container maxWidth="lg">
  <header>
    <h1>My Application</h1>
  </header>
  
  <main>
    <section>
      <h2>Welcome</h2>
      <p>This content is properly contained and centered.</p>
    </section>
  </main>
  
  <footer>
    <p>&copy; 2024 My Company</p>
  </footer>
</my-container>
```

**Container Properties:**
- `maxWidth`: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false - Maximum width breakpoint (default: 'lg')
- `disableGutters`: boolean - Remove default horizontal padding (default: false)
- `fixed`: boolean - Set min-height to 100vh for full-height layouts (default: false)
- `component`: string - HTML element to render (default: 'div')

**Breakpoint Sizes:**
- **xs**: 444px maximum width
- **sm**: 600px maximum width  
- **md**: 900px maximum width
- **lg**: 1200px maximum width (default)
- **xl**: 1536px maximum width
- **false**: No maximum width (fluid)

**Responsive Behavior:**
The Container component automatically adjusts its max-width based on screen size:
- **Mobile** (&lt;600px): Full width with 16px horizontal padding
- **Tablet** (600px+): Respects maxWidth prop with 24px horizontal padding
- **Desktop** (900px+): Continues to respect maxWidth prop
- **Large screens** (1200px+): Uses larger breakpoints when appropriate

**Gutter System:**
- **Default gutters**: 16px padding on mobile, 24px on tablet and up
- **Disabled gutters**: No horizontal padding (useful for full-width content)
- **Responsive gutters**: Automatically adjust based on screen size

**Features:**
- **Responsive Design**: Automatically adapts to different screen sizes
- **Centered Content**: Content is horizontally centered with auto margins
- **Consistent Spacing**: Follows Material Design spacing guidelines
- **Flexible Sizing**: Multiple breakpoint options for different use cases
- **Full-height Support**: Optional min-height: 100vh for full-page layouts
- **Customizable Padding**: Can disable gutters for edge-to-edge content
- **Semantic HTML**: Configurable component element for proper semantics

**Usage Patterns:**
- Use as the main content wrapper for pages and sections
- Choose appropriate maxWidth based on content type:
  - **xs/sm**: Forms, narrow content, mobile-first designs
  - **md**: Articles, blog posts, medium-width content
  - **lg**: Dashboards, general application content (default)
  - **xl**: Wide layouts, data tables, complex interfaces
  - **false**: Full-width layouts, hero sections, backgrounds
- Use `disableGutters` when you need content to touch container edges
- Use `fixed` for full-height page layouts and landing pages
- Nest other components inside for consistent layout structure

**Common Layout Patterns:**
```html
<!-- Page Layout -->
<my-container maxWidth="lg">
  <header>Navigation and branding</header>
  <main>Primary content area</main>
  <footer>Footer information</footer>
</my-container>

<!-- Article Layout -->
<my-container maxWidth="md">
  <article>
    <h1>Article Title</h1>
    <p>Article content with optimal reading width...</p>
  </article>
</my-container>

<!-- Dashboard Layout -->
<my-container maxWidth="xl">
  <div class="dashboard-grid">
    <!-- Wide layout for data visualization -->
  </div>
</my-container>

<!-- Full-width Hero Section -->
<my-container maxWidth="false" disableGutters>
  <div class="hero-background">
    <my-container maxWidth="lg">
      <div class="hero-content">Centered content over full-width background</div>
    </my-container>
  </div>
</my-container>

<!-- Form Layout -->
<my-container maxWidth="sm">
  <form>
    <h2>Sign Up</h2>
    <!-- Form fields with optimal width for forms -->
  </form>
</my-container>
```

**Accessibility:**
- Uses semantic HTML elements (configurable via `component` prop)
- Maintains proper content hierarchy and structure
- Ensures adequate spacing for touch targets on mobile devices
- Provides consistent layout patterns for screen readers

**Performance:**
- Lightweight CSS with efficient media queries
- No JavaScript required for responsive behavior
- Minimal DOM overhead with single wrapper element
- Optimized for different screen sizes and orientations

### Grid
```html
<!-- Basic Grid -->
<my-grid container spacing="2">
  <my-grid item xs="12" sm="6" md="4">
    <div>Item 1</div>
  </my-grid>
  <my-grid item xs="12" sm="6" md="4">
    <div>Item 2</div>
  </my-grid>
  <my-grid item xs="12" sm="6" md="4">
    <div>Item 3</div>
  </my-grid>
</my-grid>

<!-- Responsive Grid -->
<my-grid container spacing="3">
  <my-grid item xs="12" md="8">
    <div>Main content (full width on mobile, 2/3 on desktop)</div>
  </my-grid>
  <my-grid item xs="12" md="4">
    <div>Sidebar (full width on mobile, 1/3 on desktop)</div>
  </my-grid>
</my-grid>

<!-- Auto-sizing Grid -->
<my-grid container spacing="2">
  <my-grid item xs="auto">
    <div>Auto width</div>
  </my-grid>
  <my-grid item xs="6">
    <div>Fixed 6 columns</div>
  </my-grid>
  <my-grid item xs="true">
    <div>Flexible width (fills remaining space)</div>
  </my-grid>
</my-grid>

<!-- Grid with Alignment -->
<my-grid container spacing="2" justifyContent="center" alignItems="center">
  <my-grid item xs="4">
    <div>Centered item</div>
  </my-grid>
  <my-grid item xs="4">
    <div>Another centered item</div>
  </my-grid>
</my-grid>

<!-- Grid with Offsets -->
<my-grid container spacing="2">
  <my-grid item xs="4">
    <div>Item 1</div>
  </my-grid>
  <my-grid item xs="4" xsOffset="4">
    <div>Item 2 with offset</div>
  </my-grid>
</my-grid>

<!-- Nested Grids -->
<my-grid container spacing="3">
  <my-grid item xs="12" md="8">
    <div>
      <h3>Main Content</h3>
      <my-grid container spacing="2">
        <my-grid item xs="6">
          <div>Nested item 1</div>
        </my-grid>
        <my-grid item xs="6">
          <div>Nested item 2</div>
        </my-grid>
      </my-grid>
    </div>
  </my-grid>
  <my-grid item xs="12" md="4">
    <div>Sidebar</div>
  </my-grid>
</my-grid>

<!-- Different Spacing -->
<my-grid container spacing="0">No spacing</my-grid>
<my-grid container spacing="1">Small spacing (8px)</my-grid>
<my-grid container spacing="2">Medium spacing (16px)</my-grid>
<my-grid container spacing="3">Large spacing (24px)</my-grid>

<!-- Directional Spacing -->
<my-grid container rowSpacing="2" columnSpacing="3">
  <my-grid item xs="6">Item with custom row/column spacing</my-grid>
  <my-grid item xs="6">Another item</my-grid>
</my-grid>
```

**Grid Properties:**

**Container Properties:**
- `container`: boolean - Makes the element a grid container (default: false)
- `spacing`: string | number - Spacing between items using 8px unit system (default: '0')
- `rowSpacing`: string | number - Vertical spacing between items (overrides spacing)
- `columnSpacing`: string | number - Horizontal spacing between items (overrides spacing)
- `direction`: 'row' | 'row-reverse' | 'column' | 'column-reverse' - Flex direction (default: 'row')
- `wrap`: 'nowrap' | 'wrap' | 'wrap-reverse' - Flex wrap behavior (default: 'wrap')
- `justifyContent`: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly' - Main axis alignment (default: 'flex-start')
- `alignItems`: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline' - Cross axis alignment (default: 'stretch')
- `alignContent`: 'stretch' | 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around' - Multi-line alignment (default: 'stretch')

**Item Properties:**
- `item`: boolean - Makes the element a grid item (default: false)
- `xs`: string | number - Grid columns for extra small screens (0-12, 'auto', or 'true')
- `sm`: string | number - Grid columns for small screens (600px+)
- `md`: string | number - Grid columns for medium screens (900px+)
- `lg`: string | number - Grid columns for large screens (1200px+)
- `xl`: string | number - Grid columns for extra large screens (1536px+)
- `xsOffset`: string | number - Column offset for extra small screens (1-11)
- `smOffset`: string | number - Column offset for small screens (1-11)
- `mdOffset`: string | number - Column offset for medium screens (1-11)
- `lgOffset`: string | number - Column offset for large screens (1-11)
- `xlOffset`: string | number - Column offset for extra large screens (1-11)

**Breakpoint System:**
- **xs**: 0px+ (extra small devices, phones)
- **sm**: 600px+ (small devices, tablets)
- **md**: 900px+ (medium devices, small laptops)
- **lg**: 1200px+ (large devices, desktops)
- **xl**: 1536px+ (extra large devices, large desktops)

**Grid Sizing Options:**
- **Numbers 1-12**: Fixed column width (1 = 8.33%, 6 = 50%, 12 = 100%)
- **'auto'**: Size based on content width
- **'true'**: Flexible sizing that fills available space
- **No value**: Item takes its natural size

**Spacing System:**
The Grid component uses Material Design's 8px spacing unit system:
- `spacing="1"` = 8px gap between items
- `spacing="2"` = 16px gap between items
- `spacing="3"` = 24px gap between items
- Custom values: `spacing="12px"` or `spacing="1rem"`

**Features:**
- **12-Column System**: Standard grid system with flexible column sizing
- **Responsive Breakpoints**: Five breakpoints matching Material Design standards
- **Flexible Sizing**: Auto, fixed, and flexible column options
- **Spacing Control**: Uniform or directional spacing with 8px unit system
- **Alignment Options**: Complete flexbox alignment control
- **Offset Support**: Push items with margin offsets at any breakpoint
- **Nested Grids**: Full support for nested grid containers
- **Performance**: Efficient CSS with minimal DOM overhead

**Usage Patterns:**
- Use `container` for the parent wrapper element
- Use `item` for each child element that should be positioned in the grid
- Start with mobile-first design using `xs` prop
- Add larger breakpoint props (`sm`, `md`, `lg`, `xl`) as needed
- Use `spacing` for consistent gaps between items
- Use offsets to create asymmetrical layouts or center content
- Nest grids for complex layouts within grid items

**Common Layout Patterns:**
```html
<!-- Two-column layout -->
<my-grid container spacing="3">
  <my-grid item xs="12" md="8">Main content</my-grid>
  <my-grid item xs="12" md="4">Sidebar</my-grid>
</my-grid>

<!-- Three-column layout -->
<my-grid container spacing="2">
  <my-grid item xs="12" sm="4">Column 1</my-grid>
  <my-grid item xs="12" sm="4">Column 2</my-grid>
  <my-grid item xs="12" sm="4">Column 3</my-grid>
</my-grid>

<!-- Card grid -->
<my-grid container spacing="3">
  <my-grid item xs="12" sm="6" md="4" lg="3">
    <div>Card 1</div>
  </my-grid>
  <my-grid item xs="12" sm="6" md="4" lg="3">
    <div>Card 2</div>
  </my-grid>
  <!-- More cards... -->
</my-grid>

<!-- Centered content -->
<my-grid container justifyContent="center">
  <my-grid item xs="12" sm="8" md="6">
    <div>Centered content with max width</div>
  </my-grid>
</my-grid>

<!-- Dashboard layout -->
<my-grid container spacing="3">
  <!-- Header -->
  <my-grid item xs="12">
    <div>Header</div>
  </my-grid>
  
  <!-- Stats cards -->
  <my-grid item xs="12" sm="6" lg="3">
    <div>Stat 1</div>
  </my-grid>
  <my-grid item xs="12" sm="6" lg="3">
    <div>Stat 2</div>
  </my-grid>
  <my-grid item xs="12" sm="6" lg="3">
    <div>Stat 3</div>
  </my-grid>
  <my-grid item xs="12" sm="6" lg="3">
    <div>Stat 4</div>
  </my-grid>
  
  <!-- Main content area -->
  <my-grid item xs="12" lg="8">
    <div>Chart area</div>
  </my-grid>
  <my-grid item xs="12" lg="4">
    <div>Activity feed</div>
  </my-grid>
</my-grid>
```

**Accessibility:**
- Uses semantic HTML structure with proper nesting
- Maintains logical tab order and focus management
- Supports screen readers with proper content flow
- Responsive design ensures usability across devices

**Performance:**
- Lightweight CSS with efficient media queries
- Minimal JavaScript overhead (CSS-based layout)
- Optimized for different screen sizes and orientations
- Efficient flexbox implementation for modern browsers

### Stack
```html
<!-- Basic Vertical Stack -->
<my-stack spacing="2">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</my-stack>

<!-- Horizontal Stack -->
<my-stack direction="row" spacing="2">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</my-stack>

<!-- Stack with Different Spacing -->
<my-stack spacing="0">No spacing</my-stack>
<my-stack spacing="1">Small spacing (8px)</my-stack>
<my-stack spacing="3">Large spacing (24px)</my-stack>
<my-stack spacing="12px">Custom spacing</my-stack>

<!-- Stack with Alignment -->
<my-stack direction="row" spacing="2" justifyContent="center" alignItems="center">
  <div>Centered item 1</div>
  <div>Centered item 2</div>
</my-stack>

<!-- Stack with Dividers -->
<my-stack spacing="2" divider="line">
  <div>Section 1</div>
  <div>Section 2</div>
  <div>Section 3</div>
</my-stack>

<!-- Stack with Custom Dividers -->
<my-stack direction="row" spacing="2" divider="•">
  <div>Home</div>
  <div>Products</div>
  <div>Contact</div>
</my-stack>

<!-- Nested Stacks -->
<my-stack spacing="3">
  <div>Header</div>
  
  <my-stack direction="row" spacing="2">
    <div>Left content</div>
    <div>Right content</div>
  </my-stack>
  
  <div>Footer</div>
</my-stack>

<!-- Navigation Example -->
<my-stack direction="row" spacing="2" justifyContent="space-between" alignItems="center">
  <div>Logo</div>
  
  <my-stack direction="row" spacing="2">
    <div>Home</div>
    <div>About</div>
    <div>Contact</div>
  </my-stack>
  
  <div>Login</div>
</my-stack>

<!-- Form Layout -->
<my-stack spacing="3">
  <h2>Contact Form</h2>
  
  <my-stack spacing="2">
    <div>
      <label>Name</label>
      <input type="text" />
    </div>
    <div>
      <label>Email</label>
      <input type="email" />
    </div>
    <div>
      <label>Message</label>
      <textarea></textarea>
    </div>
  </my-stack>
  
  <my-stack direction="row" spacing="2" justifyContent="flex-end">
    <button>Cancel</button>
    <button>Send</button>
  </my-stack>
</my-stack>
```

**Stack Properties:**
- `direction`: 'row' | 'row-reverse' | 'column' | 'column-reverse' - Layout direction (default: 'column')
- `spacing`: string | number - Spacing between items using 8px unit system (default: '1')
- `divider`: string - Divider content between items ('line' for default line, or custom text/symbols)
- `justifyContent`: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly' - Main axis alignment (default: 'flex-start')
- `alignItems`: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline' - Cross axis alignment (default: 'stretch')
- `useFlexGap`: boolean - Use modern CSS gap property vs margin fallback (default: true)
- `component`: string - HTML element to render (default: 'div')

**Direction Options:**
- **column**: Vertical stack (default) - items arranged top to bottom
- **column-reverse**: Vertical stack reversed - items arranged bottom to top
- **row**: Horizontal stack - items arranged left to right
- **row-reverse**: Horizontal stack reversed - items arranged right to left

**Spacing System:**
The Stack component uses Material Design's 8px spacing unit system:
- `spacing="1"` = 8px gap between items
- `spacing="2"` = 16px gap between items
- `spacing="3"` = 24px gap between items
- Custom values: `spacing="12px"` or `spacing="1rem"`

**Divider Options:**
- **'line'**: Default horizontal or vertical line divider
- **Custom text**: Any string like '•', '|', '→', etc.
- **Empty string**: No dividers (default)

**Alignment Options:**
- **justifyContent**: Controls alignment along the main axis (direction of stack)
- **alignItems**: Controls alignment along the cross axis (perpendicular to stack direction)

**Features:**
- **One-dimensional Layout**: Simplified layout for linear arrangements
- **Consistent Spacing**: Automatic spacing between all items
- **Flexible Direction**: Support for all four flex directions
- **Built-in Dividers**: Optional dividers between items
- **Modern CSS**: Uses CSS gap property with fallback support
- **Alignment Control**: Complete flexbox alignment options
- **Nested Support**: Stacks can be nested for complex layouts
- **Performance**: Lightweight with minimal DOM overhead

**Usage Patterns:**
- Use for linear layouts where items should be evenly spaced
- Perfect for navigation bars, form layouts, and content lists
- Use horizontal stacks for toolbars and button groups
- Use vertical stacks for content sections and form fields
- Combine with dividers for visual separation
- Nest stacks for complex multi-directional layouts

**Common Layout Patterns:**
```html
<!-- Navigation Bar -->
<my-stack direction="row" spacing="2" justifyContent="space-between" alignItems="center">
  <div>Logo</div>
  <my-stack direction="row" spacing="2">
    <div>Home</div>
    <div>About</div>
    <div>Contact</div>
  </my-stack>
  <div>Login</div>
</my-stack>

<!-- Button Group -->
<my-stack direction="row" spacing="2">
  <button>Cancel</button>
  <button>Save Draft</button>
  <button>Publish</button>
</my-stack>

<!-- Form Section -->
<my-stack spacing="2">
  <h3>Personal Information</h3>
  <input placeholder="First Name" />
  <input placeholder="Last Name" />
  <input placeholder="Email" />
</my-stack>

<!-- Content List -->
<my-stack spacing="3" divider="line">
  <div>Article 1</div>
  <div>Article 2</div>
  <div>Article 3</div>
</my-stack>

<!-- Breadcrumb Navigation -->
<my-stack direction="row" spacing="1" divider="›">
  <div>Home</div>
  <div>Products</div>
  <div>Laptops</div>
  <div>MacBook Pro</div>
</my-stack>

<!-- Sidebar Layout -->
<my-stack spacing="4">
  <div>Widget 1</div>
  <div>Widget 2</div>
  <div>Widget 3</div>
</my-stack>

<!-- Toolbar -->
<my-stack direction="row" spacing="1" alignItems="center">
  <button>Bold</button>
  <button>Italic</button>
  <button>Underline</button>
  <div>|</div>
  <button>Align Left</button>
  <button>Align Center</button>
  <button>Align Right</button>
</my-stack>
```

**When to Use Stack vs Grid vs Box:**
- **Stack**: Linear layouts with consistent spacing (navigation, forms, lists)
- **Grid**: Two-dimensional layouts with rows and columns (dashboards, card grids)
- **Box**: Single element styling and simple flexbox layouts (containers, wrappers)

**Accessibility:**
- Uses semantic HTML structure with proper element selection
- Maintains logical tab order and focus management
- Supports screen readers with proper content flow
- Dividers are properly marked up for accessibility

**Performance:**
- Lightweight CSS with efficient flexbox implementation
- Uses modern CSS gap property with automatic fallback
- Minimal JavaScript overhead for divider management
- Optimized for different screen sizes and orientations

**Browser Support:**
- Modern browsers: Uses CSS gap property for optimal performance
- Legacy browsers: Automatic fallback to margin-based spacing
- Graceful degradation ensures consistent behavior across browsers

### SpeedDial
```html
<!-- Basic SpeedDial -->
<my-speed-dial 
  id="basic-speed-dial"
  style="position: fixed; bottom: 16px; right: 16px;"
  ariaLabel="Speed Dial Actions">
</my-speed-dial>

<!-- Direction Variants -->
<my-speed-dial direction="up" style="bottom: 16px; right: 16px;"></my-speed-dial>
<my-speed-dial direction="down" style="top: 16px; right: 16px;"></my-speed-dial>
<my-speed-dial direction="left" style="top: 50%; right: 16px;"></my-speed-dial>
<my-speed-dial direction="right" style="top: 50%; left: 16px;"></my-speed-dial>

<!-- Color Variants -->
<my-speed-dial color="default"></my-speed-dial>
<my-speed-dial color="primary"></my-speed-dial>
<my-speed-dial color="secondary"></my-speed-dial>

<!-- Custom Icons -->
<my-speed-dial 
  icon="edit" 
  openIcon="close" 
  color="primary">
</my-speed-dial>

<!-- Controlled SpeedDial -->
<my-speed-dial id="controlled-dial" open></my-speed-dial>

<!-- Disabled SpeedDial -->
<my-speed-dial disabled></my-speed-dial>

<!-- JavaScript Setup -->
<script>
  const speedDial = document.getElementById('basic-speed-dial');
  
  // Set actions
  speedDial.actions = [
    { id: 'copy', icon: 'copy', tooltipTitle: 'Copy' },
    { id: 'save', icon: 'save', tooltipTitle: 'Save' },
    { id: 'print', icon: 'print', tooltipTitle: 'Print' },
    { id: 'share', icon: 'share', tooltipTitle: 'Share' }
  ];
  
  // Handle action clicks
  speedDial.addEventListener('action-click', (e) => {
    console.log('Action clicked:', e.detail.action.tooltipTitle);
    // Handle the specific action
    switch (e.detail.action.id) {
      case 'copy':
        // Copy functionality
        break;
      case 'save':
        // Save functionality
        break;
      // ... other actions
    }
  });
  
  // Handle speed dial toggle
  speedDial.addEventListener('toggle', (e) => {
    console.log('Speed dial toggled:', e.detail.open);
  });
  
  // Handle speed dial close
  speedDial.addEventListener('close', (e) => {
    console.log('Speed dial closed:', e.detail.reason);
  });
  
  // Programmatically control
  speedDial.open = true;  // Open
  speedDial.open = false; // Close
</script>
```

**SpeedDial Properties:**
- `open`: boolean - Whether the speed dial is open (default: false)
- `direction`: 'up' | 'down' | 'left' | 'right' - Direction actions appear (default: 'up')
- `hidden`: boolean - Hide the speed dial completely
- `icon`: string - Main FAB icon name (default: 'add')
- `openIcon`: string - Icon when speed dial is open (optional)
- `actions`: SpeedDialActionData[] - Array of action configurations
- `ariaLabel`: string - Accessibility label (default: 'SpeedDial')
- `color`: 'default' | 'primary' | 'secondary' - FAB color theme (default: 'default')
- `disabled`: boolean - Disable the speed dial interaction
- `tooltipTitle`: string - Tooltip for the main FAB
- `transitionDuration`: number - Animation duration in milliseconds (default: 250)

**SpeedDialActionData Interface:**
```typescript
interface SpeedDialActionData {
  id: string;              // Unique identifier
  icon: string;            // Icon name for the action
  tooltipTitle?: string;   // Tooltip text (optional)
  disabled?: boolean;      // Disable this action (optional)
  onClick?: () => void;    // Action callback (optional)
}
```

**Built-in Icons:**
- `add`: Plus/add icon (default)
- `close`: X/close icon
- `edit`: Pencil/edit icon
- `share`: Share icon
- `print`: Printer icon
- `copy`: Copy/duplicate icon
- `save`: Save/disk icon
- `delete`: Trash/delete icon
- `favorite`: Heart/favorite icon

**Direction Options:**
- **up**: Actions appear above the FAB (default, most common)
- **down**: Actions appear below the FAB
- **left**: Actions appear to the left of the FAB
- **right**: Actions appear to the right of the FAB

**Color Variants:**
- **default**: Gray background with dark text
- **primary**: Primary theme color (blue) with white text
- **secondary**: Secondary theme color (pink/red) with white text

**Events:**
- `toggle`: Fired when speed dial opens/closes (detail: { open })
- `close`: Fired when speed dial closes (detail: { reason })
- `action-click`: Fired when action is clicked (detail: { action, index })

**Features:**
- **Smooth Animations**: Staggered action reveal with Material Design timing
- **Keyboard Navigation**: Full keyboard support with arrow keys and Enter/Space
- **Accessibility**: Proper ARIA attributes and focus management
- **Backdrop Click**: Closes when clicking outside the speed dial
- **Escape Key**: Closes on Escape key press
- **Tooltips**: Built-in tooltip support for actions
- **Flexible Positioning**: Can be positioned anywhere with CSS
- **Responsive Design**: Adapts to different screen sizes
- **Event System**: Comprehensive event handling for interactions
- **Controlled State**: Programmatic control of open/close state
- **Custom Icons**: Support for custom icon sets
- **Disabled Actions**: Individual actions can be disabled

**Usage Patterns:**
- Position in bottom-right corner for primary actions (most common)
- Use for quick access to related actions (copy, save, share, etc.)
- Keep action count between 3-6 for optimal usability
- Use descriptive tooltips for all actions
- Choose appropriate direction based on available space
- Use primary color for main/important speed dials
- Consider mobile users when positioning and sizing
- Group related actions logically
- Use consistent icons across your application
- Provide keyboard alternatives for all actions

**Positioning:**
- Use `position: fixed` for global actions
- Use `position: absolute` within containers
- Common positions: `bottom: 16px; right: 16px;`
- Ensure adequate space for action expansion
- Consider mobile viewport constraints
- Avoid overlapping with other UI elements

**Accessibility:**
- Proper ARIA attributes (aria-label, aria-expanded, aria-haspopup)
- Keyboard navigation with arrow keys
- Focus management and visual focus indicators
- Screen reader compatible with semantic structure
- High contrast support for icons and tooltips
- Descriptive tooltips for all actions

### Menu
```html
<!-- Basic Menu -->
<my-menu id="basic-menu" anchorEl="menu-button" open></my-menu>

<!-- Menu with Items (JavaScript) -->
<my-button id="menu-button">Open Menu</my-button>
<my-menu id="context-menu" anchorEl="menu-button"></my-menu>

<!-- Selected Menu -->
<my-menu 
  id="selected-menu" 
  anchorEl="select-button" 
  variant="selectedMenu" 
  selectedValue="option2">
</my-menu>

<!-- Positioned Menu -->
<my-menu 
  id="positioned-menu" 
  anchorEl="anchor-element"
  anchorOrigin="top-right"
  transformOrigin="top-left"
  elevation="16">
</my-menu>

<!-- JavaScript Setup -->
<script>
  const menu = document.getElementById('context-menu');
  const button = document.getElementById('menu-button');
  
  // Set menu items
  menu.items = [
    { id: 'profile', label: 'Profile', icon: 'settings' },
    { id: 'account', label: 'My Account', icon: 'settings' },
    { id: 'divider1', divider: true },
    { id: 'logout', label: 'Logout', icon: 'settings', disabled: false }
  ];
  
  // Open menu on button click
  button.addEventListener('click', () => {
    menu.open = !menu.open;
  });
  
  // Handle menu selection
  menu.addEventListener('select', (e) => {
    console.log('Selected:', e.detail.item.label);
    // Handle the selected item
  });
  
  // Handle menu close
  menu.addEventListener('close', () => {
    console.log('Menu closed');
  });
</script>
```

Properties:
- `open`: boolean - Whether the menu is visible
- `items`: MenuItemData[] - Array of menu items to display
- `anchorEl`: string - ID or selector of the anchor element
- `anchorOrigin`: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' - Anchor position (default: 'bottom-left')
- `transformOrigin`: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' - Transform origin (default: 'top-left')
- `elevation`: number - Shadow elevation (1, 4, 8, 16) (default: 8)
- `variant`: 'menu' | 'selectedMenu' - Menu style variant (default: 'menu')
- `selectedValue`: string - Selected item ID for selectedMenu variant
- `disableAutoFocus`: boolean - Disable auto-focus when opened
- `disableRestoreFocus`: boolean - Disable focus restoration when closed

**MenuItemData Interface:**
```typescript
interface MenuItemData {
  id: string;           // Unique identifier
  label: string;        // Display text
  icon?: string;        // Icon name (optional)
  disabled?: boolean;   // Disable interaction (optional)
  divider?: boolean;    // Render as divider (optional)
  children?: MenuItemData[]; // Submenu items (optional)
}
```

**Built-in Icons:**
- `home`: Home icon
- `settings`: Settings/gear icon
- `edit`: Edit/pencil icon
- `delete`: Delete/trash icon
- `copy`: Copy/duplicate icon
- `share`: Share icon
- `check`: Checkmark icon

**Anchor Origins:**
- **bottom-left**: Menu appears below and to the left of anchor (default)
- **bottom-right**: Menu appears below and to the right of anchor
- **top-left**: Menu appears above and to the left of anchor
- **top-right**: Menu appears above and to the right of anchor

**Menu Variants:**
- **menu**: Standard menu with hover states (default)
- **selectedMenu**: Menu with selected item highlighting and checkmarks

**Events:**
- `select`: Fired when menu item is selected (detail: { item, index })
- `close`: Fired when menu closes (detail: { reason })

**Features:**
- **Keyboard Navigation**: Arrow keys, Enter, Escape, Home, End
- **Auto-positioning**: Automatically positions relative to anchor element
- **Focus Management**: Manages focus when opening/closing
- **Submenu Support**: Nested menus with arrow key navigation
- **Click Outside**: Closes when clicking outside menu area
- **Elevation Variants**: Multiple shadow depths for layering
- **Dividers**: Visual separators between menu sections
- **Disabled Items**: Non-interactive menu items
- **Icon Support**: Built-in icon system with common icons
- **Selected State**: Highlight and checkmark for selected items
- **Smooth Animations**: Enter/exit transitions with Material Design timing

**Usage Patterns:**
- Use for context menus, dropdown actions, and navigation
- Include icons for better visual hierarchy and recognition
- Use dividers to group related menu items
- Use selectedMenu variant for single-choice selections
- Position menus based on available space and user workflow
- Keep menu items concise and action-oriented
- Use disabled state for temporarily unavailable actions
- Implement keyboard shortcuts for frequently used menu items

### Table
```html
<my-table-container>
  <my-table stickyHeader>
    <my-table-head>
      <my-table-row>
        <my-table-cell variant="head">
          <my-table-sort-label active direction="asc">Name</my-table-sort-label>
        </my-table-cell>
        <my-table-cell variant="head" align="right">Age</my-table-cell>
      </my-table-row>
    </my-table-head>
    <my-table-body>
      <my-table-row hover selected>
        <my-table-cell>John Doe</my-table-cell>
        <my-table-cell align="right">28</my-table-cell>
      </my-table-row>
    </my-table-body>
  </my-table>
  <my-table-pagination 
    count="100" 
    page="0" 
    rowsPerPage="10">
  </my-table-pagination>
</my-table-container>
```

**Table Properties:**
- `size`: 'small' | 'medium'
- `stickyHeader`: boolean

**TableCell Properties:**
- `align`: 'left' | 'center' | 'right' | 'justify'
- `padding`: 'normal' | 'checkbox' | 'none'
- `variant`: 'head' | 'body' | 'footer'
- `size`: 'small' | 'medium'

**TableRow Properties:**
- `hover`: boolean - Enable hover effect
- `selected`: boolean - Show selected state

**TablePagination Properties:**
- `count`: number - Total number of rows
- `page`: number - Current page (0-indexed)
- `rowsPerPage`: number - Rows per page
- `rowsPerPageOptions`: number[] - Available page size options

**TableSortLabel Properties:**
- `active`: boolean - Whether this column is actively sorted
- `direction`: 'asc' | 'desc' - Sort direction
- `hideSortIcon`: boolean - Hide the sort icon

### Stepper
```html
<!-- Basic Horizontal Stepper -->
<my-stepper activeStep="0">
  <my-step>Select campaign settings</my-step>
  <my-step>Create an ad group</my-step>
  <my-step>Create an ad</my-step>
</my-stepper>

<!-- Stepper with Optional Step -->
<my-stepper activeStep="0">
  <my-step>Create account</my-step>
  <my-step optional>Add profile picture</my-step>
  <my-step>Verify email</my-step>
</my-stepper>

<!-- Stepper with Error State -->
<my-stepper activeStep="1">
  <my-step>Select service</my-step>
  <my-step error>Payment information</my-step>
  <my-step>Confirmation</my-step>
</my-stepper>

<!-- Alternative Label Layout -->
<my-stepper activeStep="0" alternativeLabel>
  <my-step>Order placed</my-step>
  <my-step>Processing</my-step>
  <my-step>Shipped</my-step>
  <my-step>Delivered</my-step>
</my-stepper>

<!-- Vertical Stepper with Content -->
<my-stepper activeStep="0" orientation="vertical">
  <my-step>
    Setup project
    <my-step-content step="0" activeStep="0">
      <p>Create a new project and configure the basic settings.</p>
      <button onclick="nextStep()">Continue</button>
    </my-step-content>
  </my-step>
  
  <my-step>
    Configure environment
    <my-step-content step="1" activeStep="0">
      <p>Set up your development environment.</p>
      <button onclick="previousStep()">Back</button>
      <button onclick="nextStep()">Continue</button>
    </my-step-content>
  </my-step>
</my-stepper>

<!-- Non-Linear Stepper -->
<my-stepper activeStep="0" nonLinear>
  <my-step>Personal details</my-step>
  <my-step>Address information</my-step>
  <my-step>Review & submit</my-step>
</my-stepper>
```

**Stepper Properties:**
- `activeStep`: number - Currently active step index (0-based)
- `orientation`: 'horizontal' | 'vertical' - Stepper layout orientation
- `alternativeLabel`: boolean - Center labels below step icons (horizontal only)
- `nonLinear`: boolean - Allow jumping to any step

**Step Properties:**
- `index`: number - Step index (managed automatically)
- `active`: boolean - Whether step is currently active (managed automatically)
- `completed`: boolean - Whether step is completed
- `disabled`: boolean - Disable step interaction
- `optional`: boolean - Mark step as optional
- `error`: boolean - Show error state
- `orientation`: 'horizontal' | 'vertical' - Inherited from parent Stepper
- `alternativeLabel`: boolean - Inherited from parent Stepper
- `nonLinear`: boolean - Inherited from parent Stepper

**StepLabel Properties:**
- `optional`: boolean - Show optional text
- `error`: boolean - Show error state
- `optionalText`: string - Custom optional text (default: "Optional")

**StepContent Properties:**
- `step`: number - Step index this content belongs to
- `activeStep`: number - Currently active step (update to show/hide content)
- `transitionDuration`: boolean - Enable transition animations

**Events:**
- Stepper: `step-change` event with `{ activeStep, previousStep }` when step changes
- Step: `step-click` event with `{ index }` when step is clicked

### Tabs
```html
<!-- Basic Tabs -->
<my-tabs value="0">
  <my-tab value="0" label="Tab One"></my-tab>
  <my-tab value="1" label="Tab Two"></my-tab>
  <my-tab value="2" label="Tab Three"></my-tab>
</my-tabs>

<!-- Tab Panels -->
<my-tab-panel value="0" tabsValue="0">
  Content for Tab One
</my-tab-panel>
<my-tab-panel value="1" tabsValue="0">
  Content for Tab Two
</my-tab-panel>

<!-- Tabs with Icons -->
<my-tabs value="home">
  <my-tab value="home" label="Home">
    <svg slot="icon" width="24" height="24" viewBox="0 0 24 24">
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
    </svg>
  </my-tab>
  <my-tab value="settings" label="Settings">
    <svg slot="icon" width="24" height="24" viewBox="0 0 24 24">
      <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94..."/>
    </svg>
  </my-tab>
</my-tabs>

<!-- Vertical Tabs -->
<my-tabs value="1" orientation="vertical">
  <my-tab value="1" label="Personal Info"></my-tab>
  <my-tab value="2" label="Account Settings"></my-tab>
</my-tabs>

<!-- Full Width Tabs -->
<my-tabs value="item1" variant="fullWidth">
  <my-tab value="item1" label="Item One"></my-tab>
  <my-tab value="item2" label="Item Two"></my-tab>
</my-tabs>

<!-- Scrollable Tabs -->
<my-tabs value="scroll1" variant="scrollable">
  <my-tab value="scroll1" label="First Tab"></my-tab>
  <my-tab value="scroll2" label="Second Tab"></my-tab>
  <!-- More tabs... -->
</my-tabs>
```

**Tabs Properties:**
- `value`: string - Currently selected tab value
- `orientation`: 'horizontal' | 'vertical' - Tab orientation
- `variant`: 'standard' | 'scrollable' | 'fullWidth' - Tab layout variant
- `centered`: boolean - Center tabs in container
- `indicatorColor`: 'primary' | 'secondary' - Indicator color
- `textColor`: 'primary' | 'secondary' | 'inherit' - Text color

**Tab Properties:**
- `value`: string - Unique identifier for the tab
- `label`: string - Tab label text
- `selected`: boolean - Whether tab is selected (managed automatically)
- `disabled`: boolean - Disable the tab
- `orientation`: 'horizontal' | 'vertical' - Inherited from parent Tabs
- `textColor`: 'primary' | 'secondary' | 'inherit' - Inherited from parent Tabs

**TabPanel Properties:**
- `value`: string - Panel identifier (should match corresponding tab value)
- `tabsValue`: string - Currently selected tab value (update this to show/hide panel)
- `keepMounted`: boolean - Keep panel in DOM when not visible

**Events:**
- Tabs: `change` event with `{ value, oldValue }` when tab selection changes

### Backdrop
```html
<!-- Basic Backdrop -->
<my-backdrop open>
  <my-circular-progress color="primary"></my-circular-progress>
</my-backdrop>

<!-- Backdrop with Content -->
<my-backdrop open>
  <my-card style="max-width: 400px;">
    <my-card-content>
      <h3>Modal Content</h3>
      <p>Any content can be placed on the backdrop.</p>
      <my-button onclick="closeBackdrop()">Close</my-button>
    </my-card-content>
  </my-card>
</my-backdrop>

<!-- Invisible Backdrop -->
<my-backdrop open invisible>
  <my-paper style="padding: 24px;">
    <p>Backdrop without visual background</p>
  </my-paper>
</my-backdrop>

<!-- Custom Transition and Z-Index -->
<my-backdrop 
  open 
  transitionDuration="500ms" 
  zIndex="2000"
>
  <my-circular-progress></my-circular-progress>
</my-backdrop>
```

**Backdrop Properties:**
- `open`: boolean - Whether the backdrop is visible
- `invisible`: boolean - Hide the background overlay (keeps functionality)
- `transitionDuration`: string - CSS transition duration (default: "225ms")
- `zIndex`: number - CSS z-index value (default: 1300)

**Events:**
- `backdrop-click`: Fired when backdrop area is clicked or Escape key is pressed
  - `detail.originalEvent`: The original click or keyboard event

**Features:**
- **Scroll Prevention**: Automatically prevents body scroll when open
- **Focus Management**: Focuses the backdrop when opened
- **Escape Key**: Closes on Escape key press
- **Click Outside**: Detects clicks outside of slotted content
- **Layering**: Supports multiple backdrop layers with different z-indexes
- **Accessibility**: Proper ARIA attributes and focus management

### Dialog
```html
<my-dialog open maxWidth="sm">
  <my-dialog-title>Confirm Action</my-dialog-title>
  <my-dialog-content>
    Are you sure you want to proceed?
  </my-dialog-content>
  <my-dialog-actions>
    <my-button>Cancel</my-button>
    <my-button variant="contained">Confirm</my-button>
  </my-dialog-actions>
</my-dialog>
```

## Events

Components dispatch standard events that bubble and are composed:

```javascript
const button = document.querySelector('my-button');
button.addEventListener('click', (e) => {
  console.log('Button clicked');
});

const textField = document.querySelector('my-text-field');
textField.addEventListener('change', (e) => {
  console.log('Value:', e.detail.value);
});

const tablePagination = document.querySelector('my-table-pagination');
tablePagination.addEventListener('page-change', (e) => {
  console.log('Page:', e.detail.page);
});

const sortLabel = document.querySelector('my-table-sort-label');
sortLabel.addEventListener('sort', (e) => {
  console.log('Sort direction:', e.detail.direction);
});

const autocomplete = document.querySelector('my-autocomplete');
autocomplete.options = ['Option 1', 'Option 2', 'Option 3'];
autocomplete.addEventListener('change', (e) => {
  console.log('Selected:', e.detail.value);
});
autocomplete.addEventListener('input-change', (e) => {
  console.log('Input changed:', e.detail.value);
});
```

## Customization

Components use CSS custom properties from the theme. You can customize colors by modifying `src/styles/theme.ts`.

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Watch mode
npm run dev
```

## License

MIT
