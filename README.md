# Lit Material Components

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

### Form Controls
- **Button** - Material button with variants (text, contained, outlined)
- **Checkbox** - Checkbox with indeterminate state support
- **Radio** - Radio button
- **Switch** - Toggle switch
- **TextField** - Text input with variants (outlined, filled, standard)
- **Select** - Dropdown select
- **Slider** - Range slider

### Data Display
- **Typography** - Text with Material Design typography styles
- **Chip** - Compact elements for tags, filters, etc.
- **Divider** - Horizontal or vertical divider
- **Paper** - Container with elevation

### Feedback
- **Alert** - Alert messages with severity levels
- **CircularProgress** - Circular loading indicator
- **LinearProgress** - Linear loading indicator

### Surfaces
- **Card** - Card container with CardContent and CardActions
- **Paper** - Elevated surface container

### Utils
- **IconButton** - Button for icons
- **Dialog** - Modal dialog with DialogTitle, DialogContent, DialogActions

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
