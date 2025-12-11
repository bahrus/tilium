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

### Navigation
- **AppBar** - Top app bar with title, navigation, and action buttons
- **BottomNavigation** - Bottom navigation bar for mobile apps with action buttons
- **Drawer** - Side navigation panel with temporary, persistent, and permanent variants
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
- **Slider** - Range slider

### Data Display
- **Avatar** - User profile picture or initials in circular, rounded, or square format
- **Badge** - Small status indicator that appears on top of content
- **List** - Flexible list component with ListItem, ListItemText, ListItemIcon, etc.
- **Typography** - Text with Material Design typography styles
- **Chip** - Compact elements for tags, filters, etc.
- **Divider** - Horizontal or vertical divider
- **Paper** - Container with elevation

### Feedback
- **Alert** - Alert messages with severity levels
- **CircularProgress** - Circular loading indicator
- **LinearProgress** - Linear loading indicator

### Surfaces
- **Card** - Flexible card container with CardHeader, CardMedia, CardContent, and CardActions
- **Paper** - Elevated surface container

### Utils
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
