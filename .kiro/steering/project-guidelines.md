# Lit Material Components - Project Guidelines

## Project Overview

This is a comprehensive Material Design component library built with Lit Element (Web Components). The library provides 40+ reusable UI components that match the Material-UI (MUI) React library API, allowing developers to use Material Design components in any web framework or vanilla JavaScript.

### Key Principles

1. **Framework Agnostic**: Components are Web Components that work with any framework
2. **MUI API Compatibility**: Follow Material-UI React library patterns for familiarity
3. **TypeScript First**: All components are written in TypeScript with proper type definitions
4. **No Element Names**: Components export only class definitions for flexible registration
5. **Material Design Compliance**: Follow Material Design specifications for styling and behavior

## Component Architecture

### Component Structure

All components follow this standard structure:

```typescript
import { LitElement, html, unsafeCSS } from 'lit';
import { property, state } from 'lit/decorators.js';

export class ComponentName extends LitElement {
  // Public properties using @property decorator
  @property({ type: String }) label = '';
  @property({ type: Boolean }) disabled = false;
  
  // Private state using @state decorator
  @state() private focused = false;
  
  // Styles using unsafeCSS for dynamic values
  static styles = unsafeCSS`
    /* Component styles */
  `;
  
  // Lifecycle methods
  connectedCallback() { }
  disconnectedCallback() { }
  
  // Event handlers
  private handleClick = (e: Event) => { };
  
  // Render method
  render() {
    return html`
      <!-- Component template -->
    `;
  }
}
```

### Naming Conventions

- **Component Classes**: PascalCase (e.g., `TextField`, `Select`, `Button`)
- **File Names**: PascalCase matching class name (e.g., `TextField.ts`)
- **Properties**: camelCase (e.g., `fullWidth`, `helperText`)
- **CSS Classes**: kebab-case (e.g., `text-field`, `input-wrapper`)
- **Event Names**: lowercase (e.g., `change`, `input`, `click`)

## Styling Guidelines

### CSS Approach

1. **Use `unsafeCSS` for styles**: This allows dynamic values and avoids template literal issues
2. **Hardcode Material Design colors**: Use hex values instead of theme template literals to avoid TypeScript errors
3. **Follow Material Design specs**: Match spacing, typography, and color specifications
4. **Support variants**: Most components support `outlined`, `filled`, and `standard` variants

### Standard Colors

```css
/* Primary */
--primary-main: #1976d2;
--primary-dark: #1565c0;
--primary-light: #42a5f5;

/* Error */
--error-main: #d32f2f;
--error-dark: #c62828;
--error-light: #ef5350;

/* Text */
--text-primary: rgba(0, 0, 0, 0.87);
--text-secondary: rgba(0, 0, 0, 0.6);
--text-disabled: rgba(0, 0, 0, 0.38);

/* Borders */
--border-default: rgba(0, 0, 0, 0.23);
--border-hover: rgba(0, 0, 0, 0.87);
--border-disabled: rgba(0, 0, 0, 0.26);
```

### Label Positioning

**CRITICAL**: Always float labels when present to prevent overlap with placeholder text:

```typescript
render() {
  const hasValue = this.value && this.value.length > 0;
  // Always float the label if there's a label to prevent overlap
  const shouldFloat = this.label ? true : (this.focused || hasValue);
  
  const labelClasses = [
    shouldFloat ? 'floating' : '',
    this.focused ? 'focused' : '',
    hasValue ? 'has-value' : ''
  ].join(' ').trim();
}
```

## Component Patterns

### Property Definitions

Standard properties that most components should support:

```typescript
@property({ type: String }) label = '';
@property({ type: String }) value = '';
@property({ type: String }) variant: 'outlined' | 'filled' | 'standard' = 'outlined';
@property({ type: Boolean }) disabled = false;
@property({ type: Boolean }) error = false;
@property({ type: Boolean }) required = false;
@property({ type: Boolean }) fullWidth = false;
@property({ type: String }) size: 'small' | 'medium' = 'medium';
@property({ type: String }) helperText = '';
```

### Event Handling

1. **Use CustomEvent**: Dispatch custom events with detail objects
2. **Bubble events**: Set `bubbles: true` and `composed: true` for cross-shadow-DOM events
3. **Stop propagation**: Use `e.stopPropagation()` to prevent unwanted event bubbling

```typescript
this.dispatchEvent(new CustomEvent('change', {
  detail: { value: this.value },
  bubbles: true,
  composed: true
}));
```

### State Management

1. **Use @state for internal state**: Private properties that trigger re-renders
2. **Use @property for public API**: Properties that can be set from outside
3. **Call requestUpdate() when needed**: Force re-render after manual state changes

## Common Issues and Solutions

### Issue: Text Overlap (Labels and Placeholders)

**Problem**: Label text overlaps with placeholder text, creating superimposed text.

**Solution**: Always float labels when a label is present:

```typescript
// In render method
const shouldFloat = this.label ? true : (this.focused || hasValue);
```

```css
/* In CSS - always position labels in floating state */
.outlined label {
  top: 0;
  transform: translateY(-50%);
  font-size: 0.75rem;
}
```

### Issue: Dropdown Not Closing

**Problem**: Custom dropdowns (Select, Autocomplete) don't close when selecting an option.

**Solution**: Stop event propagation in option click handlers:

```typescript
@click="${(e: Event) => {
  e.stopPropagation();
  this.handleOptionClick(option);
}}"
```

### Issue: Native Elements Interfering

**Problem**: Native `<option>` elements cause display issues in custom Select components.

**Solution**: Extract options and remove native elements from DOM:

```typescript
private extractOptionsFromChildren() {
  const optionElements = this.querySelectorAll('option');
  if (optionElements.length > 0) {
    this.options = Array.from(optionElements).map(option => ({
      value: option.value,
      text: option.textContent || option.value
    }));
    // Remove native elements to prevent interference
    optionElements.forEach(option => option.remove());
  }
}
```

### Issue: TypeScript Template Literal Errors

**Problem**: Using theme template literals in CSS causes TypeScript errors.

**Solution**: Use hardcoded color values instead:

```typescript
// ❌ Don't do this
static styles = css`
  color: ${theme.palette.primary.main};
`;

// ✅ Do this
static styles = unsafeCSS`
  color: #1976d2;
`;
```

## Testing Guidelines

### Test Page Structure

Each component should have a comprehensive test page that includes:

1. **Basic Variants**: Test all visual variants (outlined, filled, standard)
2. **Sizes**: Test all size options (small, medium, large)
3. **States**: Test disabled, error, required, focused states
4. **Input Types**: Test all applicable input types
5. **Events**: Test and log all events (input, change, focus, blur)
6. **Form Integration**: Test within a form context
7. **Programmatic Control**: Test dynamic property changes
8. **Validation**: Test real-world validation scenarios
9. **Performance**: Test with large datasets when applicable

### Test Page Naming

- Component test pages: `{component-name}-test.html` (e.g., `select-test.html`)
- Use lowercase with hyphens for consistency

## Build and Development

### TypeScript Compilation

```bash
# Build all components
npm run build

# Build specific component for testing
npx tsc src/components/ComponentName.ts src/styles/theme.ts --outDir dist --target es2020 --module es2020 --moduleResolution node --experimentalDecorators --skipLibCheck --declaration
```

### Known Build Issues

- Template literal errors in older components are expected
- Focus on building and testing individual components when needed
- Use `--skipLibCheck` to avoid library type errors

## Component Registration

Components should NOT define their own element names. Export only the class:

```typescript
// ✅ Correct - Export class only
export class TextField extends LitElement { }

// ❌ Wrong - Don't register element name
customElements.define('mui-textfield', TextField);
```

Users register components with their preferred names:

```javascript
import { TextField } from './dist/index.js';
customElements.define('mui-textfield', TextField);
```

## Documentation Standards

### Component Documentation

Each component should document:

1. **Properties**: All public properties with types and defaults
2. **Events**: All dispatched events with detail structure
3. **Slots**: Any slot usage (though most components don't use slots)
4. **CSS Custom Properties**: Any exposed CSS variables
5. **Examples**: Basic usage examples

### Code Comments

- Comment complex logic and non-obvious decisions
- Explain "why" not "what" (code shows what)
- Document workarounds and browser-specific fixes
- Reference Material Design specs when applicable

## File Organization

```
project-root/
├── .kiro/
│   └── steering/           # Project guidelines and standards
├── src/
│   ├── components/         # All component implementations
│   │   ├── Button.ts
│   │   ├── TextField.ts
│   │   ├── Select.ts
│   │   └── index.ts       # Component exports
│   ├── styles/
│   │   └── theme.ts       # Theme configuration
│   └── index.ts           # Main entry point
├── dist/                  # Compiled JavaScript output
├── *-test.html           # Component test pages
├── package.json
├── tsconfig.json
└── README.md
```

## Version Control

### Commit Messages

Follow conventional commits format:

- `feat: Add new component`
- `fix: Resolve label overlap issue`
- `docs: Update component documentation`
- `style: Format code`
- `refactor: Simplify event handling`
- `test: Add test page for component`

## Future Considerations

### Planned Improvements

1. **Theme System**: Implement proper theme provider for dynamic colors
2. **Accessibility**: Add comprehensive ARIA attributes and keyboard navigation
3. **RTL Support**: Add right-to-left language support
4. **Dark Mode**: Implement dark theme variants
5. **Animation**: Add smooth transitions and animations
6. **Form Validation**: Built-in validation helpers
7. **Internationalization**: Support for multiple languages

### Component Roadmap

Priority components to implement or improve:

1. **High Priority**: TextField, Select, Button, Checkbox, Radio
2. **Medium Priority**: Dialog, Menu, Tabs, Table, Card
3. **Low Priority**: Advanced components like DataGrid, TreeView

## Getting Help

### Resources

- [Lit Documentation](https://lit.dev/)
- [Material Design Guidelines](https://material.io/design)
- [Material-UI Documentation](https://mui.com/) (for API reference)
- [Web Components Best Practices](https://web.dev/custom-elements-best-practices/)

### Common Questions

**Q: Why use `unsafeCSS` instead of `css`?**
A: `unsafeCSS` allows dynamic values and avoids TypeScript template literal errors.

**Q: Why not use Shadow DOM slots for options?**
A: Native elements can interfere with custom rendering. Extract and remove them instead.

**Q: How do I handle form integration?**
A: Use the `name` attribute and ensure components work with FormData API.

**Q: Why always float labels?**
A: To prevent overlap with placeholder text, which causes visual issues.

---

**Last Updated**: January 2026
**Maintainer**: Project Team
**Version**: 1.0.0
