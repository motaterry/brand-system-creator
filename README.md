# Brand System Creator

A local-first tool for creating comprehensive brand system packs that feed directly into Cursor AI for implementation.

## Overview

This tool streamlines the brand design process by providing a structured intake form that generates:
- Complete brand positioning and strategy documentation
- Design tokens in multiple formats (JSON, CSS, Tailwind)
- Ready-to-use Cursor AI task with detailed specifications
- Downloadable brand pack with organized folder structure

## Features

### 🎨 DressCode Design System
Built with DressCode design tokens:
- Primary: `#ffc107` (Amber)
- Complementary: `#0745ff` (Blue)
- Complete tint/shade/neutral palettes

### 📋 Structured Brand Intake
- Basic information (name, tagline, industry)
- Brand positioning and strategy
- Voice & tone attributes (sliders)
- Visual direction preferences
- Target platforms and use cases

### 🎯 Output Presets
Eight focused presets for different needs:
1. **SaaS/UI** - Design system, tokens, UI kit
2. **E-commerce** - Packaging, product photography, lifestyle imagery
3. **Creator** - Social templates, content pillars, personal brand
4. **Directory / SEO-First Platform** - SEO-optimized pages, listing templates, content structure
5. **Marketing Website / Landing Pages** - Landing pages, conversion designs, campaign assets
6. **Content Platform / Blog** - Blog templates, article layouts, content hierarchy
7. **Mobile App Brand** - App icon, splash screens, mobile UI patterns, app store assets
8. **Enterprise / B2B Brand** - Corporate identity, presentations, documentation templates

### 🚀 Quick Export
- **Copy Cursor Task** - Clipboard-ready markdown with full specifications
- **Download Brand Pack** - ZIP file with structured folders and JSON intake

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## How to Use

1. **Load a Preset** (optional) - Choose from SaaS Dashboard, DTC Product Brand, or Creator Brand
2. **Fill Basic Info** - Project name, brand name, tagline, industry
3. **Choose Output Preset** - Select the focus (SaaS/UI, E-commerce, or Creator)
4. **Complete Brand Strategy** - Positioning, audience, values, personality
5. **Define Voice & Tone** - Characteristics and attribute sliders
6. **Set Visual Direction** - Colors, mood keywords, things to avoid
7. **Add Platforms** - Where the brand will appear
8. **Generate** - Copy task to clipboard or download full pack

## Output Structure

The generated brand pack includes:

```
brand/
├── intake/
│   └── brand_intake.json          # Structured input data
├── cursor_task.md                 # Complete Cursor AI task
└── outputs/
    ├── tokens/                    # Design tokens (multi-format)
    ├── voice-guidelines/          # Brand voice documentation
    ├── components/                # UI component specs (SaaS preset)
    ├── social-templates/          # Social media templates
    ├── landing-sections/          # Landing page specs
    └── midjourney-prompts/        # AI image generation prompts
```

## Technology Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS** (with DressCode tokens)
- **JSZip** (for pack generation)
- **File-saver** (for downloads)

## Design Tokens

Design tokens are located in `/design-tokens/` and include:
- `dresscode-theme.json` - Design Tokens Community Group format
- `dresscode-theme.css` - CSS Custom Properties
- `dresscode-theme.js` - Tailwind config format

## Presets

Three example presets included:
- **SaaS Dashboard** - Clean, modern, efficient
- **DTC Product Brand** - Natural, premium, authentic
- **Creator Brand** - Energetic, personal, vibrant

## Customization

### Adding New Presets
Edit `/lib/presets.ts` and add to `EXAMPLE_PRESETS` object.

### Modifying Output Structure
Edit `/lib/generator.ts` and adjust `OUTPUT_PRESET_CONFIG`.

### Changing Design Tokens
Replace files in `/design-tokens/` and update `tailwind.config.ts`.

## Local-First Architecture

This tool runs entirely in the browser:
- ✅ No backend required
- ✅ No authentication needed
- ✅ No data sent to servers
- ✅ Works offline (after initial load)

## License

MIT

---

Built with ❤️ for designers and developers who want to move fast without sacrificing quality.
