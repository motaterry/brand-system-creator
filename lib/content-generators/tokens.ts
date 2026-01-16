import { BrandIntake } from "../schema";

interface ColorPalette {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  secondary: string;
  secondaryLight: string;
  secondaryDark: string;
  accent: string;
  neutral: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  };
}

// Color mapping based on brand preferences and mood
function generateColorPalette(intake: BrandIntake): ColorPalette {
  const primaryColor = intake.colorPreferences[0]?.toLowerCase() || "blue";
  const secondaryColor = intake.colorPreferences[1]?.toLowerCase() || "gray";
  
  // Color palettes based on preferences
  const colorMappings: Record<string, { primary: string; secondary: string }> = {
    blue: { primary: "#2563EB", secondary: "#64748B" },
    green: { primary: "#10B981", secondary: "#6B7280" },
    purple: { primary: "#8B5CF6", secondary: "#6B7280" },
    red: { primary: "#EF4444", secondary: "#6B7280" },
    orange: { primary: "#F59E0B", secondary: "#6B7280" },
    yellow: { primary: "#EAB308", secondary: "#6B7280" },
    pink: { primary: "#EC4899", secondary: "#6B7280" },
    teal: { primary: "#14B8A6", secondary: "#6B7280" },
    navy: { primary: "#1E3A8A", secondary: "#6B7280" },
    black: { primary: "#1F2937", secondary: "#6B7280" },
    white: { primary: "#F9FAFB", secondary: "#1F2937" },
    gray: { primary: "#6B7280", secondary: "#3B82F6" },
  };

  const colors = colorMappings[primaryColor] || colorMappings.blue;
  const secondaryColors = colorMappings[secondaryColor] || colorMappings.gray;

  return {
    primary: colors.primary,
    primaryLight: adjustColor(colors.primary, 20),
    primaryDark: adjustColor(colors.primary, -20),
    secondary: secondaryColors.secondary,
    secondaryLight: adjustColor(secondaryColors.secondary, 20),
    secondaryDark: adjustColor(secondaryColors.secondary, -20),
    accent: colors.secondary,
    neutral: {
      50: "#F9FAFB",
      100: "#F3F4F6",
      200: "#E5E7EB",
      300: "#D1D5DB",
      400: "#9CA3AF",
      500: "#6B7280",
      600: "#4B5563",
      700: "#374151",
      800: "#1F2937",
      900: "#111827",
    },
  };
}

// Simple color adjustment helper
function adjustColor(hex: string, percent: number): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = ((num >> 8) & 0x00ff) + amt;
  const B = (num & 0x0000ff) + amt;
  return `#${(
    0x1000000 +
    (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
    (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
    (B < 255 ? (B < 1 ? 0 : B) : 255)
  )
    .toString(16)
    .slice(1)
    .toUpperCase()}`;
}

// Typography scale based on tone attributes
function generateTypographyScale(intake: BrandIntake) {
  const minimalist = intake.toneAttributes.minimalist;
  const bold = intake.toneAttributes.bold;

  // More minimalist = tighter scale, bolder = larger scale
  const scaleMultiplier = 1 + (bold / 10) * 0.2 - (minimalist / 10) * 0.1;

  return {
    xs: `${0.75 * scaleMultiplier}rem`,
    sm: `${0.875 * scaleMultiplier}rem`,
    base: "1rem",
    lg: `${1.125 * scaleMultiplier}rem`,
    xl: `${1.25 * scaleMultiplier}rem`,
    "2xl": `${1.5 * scaleMultiplier}rem`,
    "3xl": `${1.875 * scaleMultiplier}rem`,
    "4xl": `${2.25 * scaleMultiplier}rem`,
    "5xl": `${3 * scaleMultiplier}rem`,
    "6xl": `${3.75 * scaleMultiplier}rem`,
  };
}

// Spacing scale
function generateSpacingScale(intake: BrandIntake) {
  const minimalist = intake.toneAttributes.minimalist;
  
  // More minimalist = more generous spacing
  const multiplier = 1 + (minimalist / 10) * 0.3;

  return {
    0: "0",
    1: `${0.25 * multiplier}rem`,
    2: `${0.5 * multiplier}rem`,
    3: `${0.75 * multiplier}rem`,
    4: `${1 * multiplier}rem`,
    5: `${1.25 * multiplier}rem`,
    6: `${1.5 * multiplier}rem`,
    8: `${2 * multiplier}rem`,
    10: `${2.5 * multiplier}rem`,
    12: `${3 * multiplier}rem`,
    16: `${4 * multiplier}rem`,
    20: `${5 * multiplier}rem`,
    24: `${6 * multiplier}rem`,
    32: `${8 * multiplier}rem`,
  };
}

// Border radius based on brand personality
function generateBorderRadius(intake: BrandIntake) {
  const hasModern = intake.moodKeywords.some((k) =>
    ["modern", "contemporary", "sleek"].includes(k.toLowerCase())
  );
  const hasPlayful = intake.brandPersonality.some((p) =>
    p.toLowerCase().includes("playful")
  );
  const bold = intake.toneAttributes.bold;

  const baseRadius = hasPlayful ? 12 : hasModern ? 8 : 6;
  const multiplier = 1 + (bold / 10) * 0.3;

  return {
    none: "0",
    sm: `${2 * multiplier}px`,
    base: `${baseRadius * multiplier}px`,
    md: `${baseRadius * 1.5 * multiplier}px`,
    lg: `${baseRadius * 2 * multiplier}px`,
    xl: `${baseRadius * 3 * multiplier}px`,
    full: "9999px",
  };
}

// Shadow system based on mood
function generateShadows(intake: BrandIntake) {
  const hasSoft = intake.moodKeywords.some((k) =>
    ["soft", "gentle", "calming"].includes(k.toLowerCase())
  );
  const hasBold = intake.moodKeywords.some((k) =>
    ["bold", "strong", "vibrant"].includes(k.toLowerCase())
  );

  const intensity = hasBold ? 1.5 : hasSoft ? 0.6 : 1;

  return {
    sm: `0 1px 2px 0 rgba(0, 0, 0, ${0.05 * intensity})`,
    base: `0 1px 3px 0 rgba(0, 0, 0, ${0.1 * intensity}), 0 1px 2px -1px rgba(0, 0, 0, ${0.1 * intensity})`,
    md: `0 4px 6px -1px rgba(0, 0, 0, ${0.1 * intensity}), 0 2px 4px -2px rgba(0, 0, 0, ${0.1 * intensity})`,
    lg: `0 10px 15px -3px rgba(0, 0, 0, ${0.1 * intensity}), 0 4px 6px -4px rgba(0, 0, 0, ${0.1 * intensity})`,
    xl: `0 20px 25px -5px rgba(0, 0, 0, ${0.1 * intensity}), 0 8px 10px -6px rgba(0, 0, 0, ${0.1 * intensity})`,
    "2xl": `0 25px 50px -12px rgba(0, 0, 0, ${0.25 * intensity})`,
  };
}

// Generate Figma Tokens format (JSON)
export function generateFigmaTokens(intake: BrandIntake): string {
  const colors = generateColorPalette(intake);
  const typography = generateTypographyScale(intake);
  const spacing = generateSpacingScale(intake);
  const radius = generateBorderRadius(intake);
  const shadows = generateShadows(intake);

  const tokens = {
    colors: {
      primary: { value: colors.primary, type: "color" },
      "primary-light": { value: colors.primaryLight, type: "color" },
      "primary-dark": { value: colors.primaryDark, type: "color" },
      secondary: { value: colors.secondary, type: "color" },
      "secondary-light": { value: colors.secondaryLight, type: "color" },
      "secondary-dark": { value: colors.secondaryDark, type: "color" },
      accent: { value: colors.accent, type: "color" },
      neutral: Object.entries(colors.neutral).reduce(
        (acc, [key, value]) => {
          acc[key] = { value, type: "color" };
          return acc;
        },
        {} as Record<string, { value: string; type: string }>
      ),
    },
    typography: {
      fontSize: Object.entries(typography).reduce(
        (acc, [key, value]) => {
          acc[key] = { value, type: "fontSize" };
          return acc;
        },
        {} as Record<string, { value: string; type: string }>
      ),
    },
    spacing: Object.entries(spacing).reduce(
      (acc, [key, value]) => {
        acc[key] = { value, type: "spacing" };
        return acc;
      },
      {} as Record<string, { value: string; type: string }>
    ),
    borderRadius: Object.entries(radius).reduce(
      (acc, [key, value]) => {
        acc[key] = { value, type: "borderRadius" };
        return acc;
      },
      {} as Record<string, { value: string; type: string }>
    ),
    boxShadow: Object.entries(shadows).reduce(
      (acc, [key, value]) => {
        acc[key] = { value, type: "boxShadow" };
        return acc;
      },
      {} as Record<string, { value: string; type: string }>
    ),
  };

  return JSON.stringify(tokens, null, 2);
}

// Generate CSS Variables
export function generateCSSTokens(intake: BrandIntake): string {
  const colors = generateColorPalette(intake);
  const typography = generateTypographyScale(intake);
  const spacing = generateSpacingScale(intake);
  const radius = generateBorderRadius(intake);
  const shadows = generateShadows(intake);

  return `:root {
  /* Brand Colors */
  --color-primary: ${colors.primary};
  --color-primary-light: ${colors.primaryLight};
  --color-primary-dark: ${colors.primaryDark};
  --color-secondary: ${colors.secondary};
  --color-secondary-light: ${colors.secondaryLight};
  --color-secondary-dark: ${colors.secondaryDark};
  --color-accent: ${colors.accent};

  /* Neutral Colors */
${Object.entries(colors.neutral)
  .map(([key, value]) => `  --color-neutral-${key}: ${value};`)
  .join("\n")}

  /* Typography Scale */
${Object.entries(typography)
  .map(([key, value]) => `  --font-size-${key}: ${value};`)
  .join("\n")}

  /* Spacing Scale */
${Object.entries(spacing)
  .map(([key, value]) => `  --spacing-${key}: ${value};`)
  .join("\n")}

  /* Border Radius */
${Object.entries(radius)
  .map(([key, value]) => `  --radius-${key}: ${value};`)
  .join("\n")}

  /* Shadows */
${Object.entries(shadows)
  .map(([key, value]) => `  --shadow-${key}: ${value};`)
  .join("\n")}
}`;
}

// Generate JavaScript/TypeScript tokens
export function generateJSTokens(intake: BrandIntake): string {
  const colors = generateColorPalette(intake);
  const typography = generateTypographyScale(intake);
  const spacing = generateSpacingScale(intake);
  const radius = generateBorderRadius(intake);
  const shadows = generateShadows(intake);

  return `export const tokens = {
  colors: {
    primary: "${colors.primary}",
    primaryLight: "${colors.primaryLight}",
    primaryDark: "${colors.primaryDark}",
    secondary: "${colors.secondary}",
    secondaryLight: "${colors.secondaryLight}",
    secondaryDark: "${colors.secondaryDark}",
    accent: "${colors.accent}",
    neutral: ${JSON.stringify(colors.neutral, null, 4)},
  },
  typography: ${JSON.stringify(typography, null, 4)},
  spacing: ${JSON.stringify(spacing, null, 4)},
  borderRadius: ${JSON.stringify(radius, null, 4)},
  boxShadow: ${JSON.stringify(shadows, null, 4)},
};

export default tokens;
`;
}

// Generate Style Dictionary format
export function generateStyleDictionary(intake: BrandIntake): string {
  const colors = generateColorPalette(intake);
  const typography = generateTypographyScale(intake);
  const spacing = generateSpacingScale(intake);
  const radius = generateBorderRadius(intake);
  const shadows = generateShadows(intake);

  const styleDictionary = {
    color: {
      brand: {
        primary: { value: colors.primary },
        "primary-light": { value: colors.primaryLight },
        "primary-dark": { value: colors.primaryDark },
        secondary: { value: colors.secondary },
        "secondary-light": { value: colors.secondaryLight },
        "secondary-dark": { value: colors.secondaryDark },
        accent: { value: colors.accent },
      },
      neutral: Object.entries(colors.neutral).reduce(
        (acc, [key, value]) => {
          acc[key] = { value };
          return acc;
        },
        {} as Record<string, { value: string }>
      ),
    },
    size: {
      font: Object.entries(typography).reduce(
        (acc, [key, value]) => {
          acc[key] = { value };
          return acc;
        },
        {} as Record<string, { value: string }>
      ),
      spacing: Object.entries(spacing).reduce(
        (acc, [key, value]) => {
          acc[key] = { value };
          return acc;
        },
        {} as Record<string, { value: string }>
      ),
    },
    radius: Object.entries(radius).reduce(
      (acc, [key, value]) => {
        acc[key] = { value };
        return acc;
      },
      {} as Record<string, { value: string }>
    ),
    shadow: Object.entries(shadows).reduce(
      (acc, [key, value]) => {
        acc[key] = { value };
        return acc;
      },
      {} as Record<string, { value: string }>
    ),
  };

  return JSON.stringify(styleDictionary, null, 2);
}

// Generate README for tokens
export function generateTokensReadme(intake: BrandIntake): string {
  return `# ${intake.brandName} Design Tokens

Generated design tokens for the ${intake.brandName} brand system.

## Files

- \`figma-tokens.json\` - Figma Tokens format (compatible with Figma Tokens plugin)
- \`tokens.css\` - CSS Custom Properties
- \`tokens.js\` - JavaScript/TypeScript module
- \`style-dictionary.json\` - Style Dictionary format for multi-platform export

## Usage

### CSS
\`\`\`css
@import 'tokens.css';

.button {
  background-color: var(--color-primary);
  padding: var(--spacing-4);
  border-radius: var(--radius-base);
  box-shadow: var(--shadow-md);
}
\`\`\`

### JavaScript/React
\`\`\`javascript
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
\`\`\`

### Figma Tokens Plugin
1. Open Figma Tokens plugin
2. Import \`figma-tokens.json\`
3. Apply tokens to your designs

## Brand Colors

Based on your color preferences: ${intake.colorPreferences.join(", ")}

## Typography Scale

Scale generated based on your tone attributes:
- Minimalist: ${intake.toneAttributes.minimalist}/10
- Bold: ${intake.toneAttributes.bold}/10

## Customization

These tokens are generated based on your brand intake. You can customize them further by editing the files directly.

---
Generated: ${new Date().toLocaleDateString()}
`;
}
