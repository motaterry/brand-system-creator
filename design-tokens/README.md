# DressCode Design Tokens

This folder contains the design tokens from the DressCode Design System, used throughout the Brand System Creator application.

## Files

- **dresscode-theme.json** - Design tokens in JSON format (Design Tokens Community Group standard)
- **dresscode-theme.css** - CSS Custom Properties (CSS Variables)
- **dresscode-theme.js** - Tailwind CSS configuration

## Color System

### Primary Color
- **Hex:** `#ffc107` (Amber/Yellow)
- **HSL:** `hsl(45, 100%, 51.4%)`
- Used for: Primary actions, highlights, accent elements

### Complementary Color
- **Hex:** `#0745ff` (Blue)
- **HSL:** `hsl(225, 100%, 51.4%)`
- Used for: Secondary actions, selected states, interactive elements

### Tints (10-90)
Lighter variations of the primary color, from `#ffc413` to `#fff9e6`

### Shades (10-90)
Darker variations of the primary color, from `#f2b707` to `#191301`

### Neutral Colors
- **Light neutrals (10-90):** From `#8f8c84` to `#f3f3f2`
- **Dark neutrals (10-90):** From `#827f77` to `#0e0d0c`

## Spacing

- **Border Radius:** `8px` (default)

## Usage in Application

The tokens are integrated into:
1. **Tailwind Config** (`tailwind.config.ts`) - Extended with DressCode colors
2. **Global CSS** (`app/globals.css`) - CSS variables for runtime access
3. **Components** - Using Tailwind utility classes

## Examples

```css
/* Using CSS Variables */
.element {
  background-color: var(--color-primary);
  border-radius: var(--border-radius);
}
```

```jsx
/* Using Tailwind Classes */
<button className="bg-primary text-neutral-dark-90 rounded-lg">
  Click me
</button>
```

---

Generated from DressCode Design System (2026-01-14)
