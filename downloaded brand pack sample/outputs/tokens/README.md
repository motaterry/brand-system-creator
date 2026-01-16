# Rota do Peso Design Tokens

Generated design tokens for the Rota do Peso brand system.

## Files

- `figma-tokens.json` - Figma Tokens format (compatible with Figma Tokens plugin)
- `tokens.css` - CSS Custom Properties
- `tokens.js` - JavaScript/TypeScript module
- `style-dictionary.json` - Style Dictionary format for multi-platform export

## Usage

### CSS
```css
@import 'tokens.css';

.button {
  background-color: var(--color-primary);
  padding: var(--spacing-4);
  border-radius: var(--radius-base);
  box-shadow: var(--shadow-md);
}
```

### JavaScript/React
```javascript
import tokens from './tokens.js';

const Button = () => (
  <button style={{
    backgroundColor: tokens.colors.primary,
    padding: tokens.spacing[4],
    borderRadius: tokens.borderRadius.base,
  }}>
    Click me
  </button>
);
```

### Figma Tokens Plugin
1. Open Figma Tokens plugin
2. Import `figma-tokens.json`
3. Apply tokens to your designs

## Brand Colors

Based on your color preferences: Green, Teal, Blue, White

## Typography Scale

Scale generated based on your tone attributes:
- Minimalist: 7/10
- Bold: 5/10

## Customization

These tokens are generated based on your brand intake. You can customize them further by editing the files directly.

---
Generated: 1/14/2026
