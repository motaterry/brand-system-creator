# Quick Start Guide

## 🚀 Start the App

```bash
npm run dev
```

Then open: **http://localhost:3000**

## 🎨 What You'll See

A beautiful form with **DressCode design tokens** (yellow/blue theme):
- Quick preset buttons at the top
- Structured sections for brand details
- Interactive sliders for tone attributes
- Chip selectors for multi-choice options
- Two big buttons at bottom: **Copy Cursor Task** + **Download Brand Pack**

## 📝 Basic Workflow

1. **Choose a preset** (optional) - "SaaS Dashboard", "DTC Product Brand", or "Creator Brand"
2. **Fill required fields** (*) - Project name, Brand name, Industry, Use case
3. **Select output preset(s)** - Choose one or more: SaaS/UI, E-commerce, Creator, Directory/SEO, Marketing Website, Content Platform, Mobile App, or Enterprise
4. **Complete other sections** - As much detail as you want
5. **Click "Copy Cursor Task"** - Paste into Cursor AI to generate brand system
6. **Click "Download Brand Pack"** - Get ZIP with `/brand` folder structure

## 🎯 Output Preset Options

### SaaS/UI Focus
Generates: Design system, tokens (Figma/Style Dictionary/Tailwind), UI components, landing page specs

### E-commerce Focus
Generates: Packaging system, product photography guidelines, lifestyle imagery, social templates

### Creator Focus
Generates: Personal brand voice, content pillars, 10+ social templates, bio/profile templates

### Directory / SEO-First Platform
Generates: SEO-optimized page templates, listing cards, content hierarchy, filter/search UI patterns

### Marketing Website / Landing Pages
Generates: Landing page templates, conversion-focused designs, campaign assets, email templates

### Content Platform / Blog
Generates: Article templates, content hierarchy, category pages, reading experience optimization

### Mobile App Brand
Generates: App icon direction, splash screens, mobile UI patterns, app store assets

### Enterprise / B2B Brand
Generates: Corporate identity, presentation templates, documentation templates, professional assets

## 📦 What's in the ZIP?

```
brand/
├── intake/brand_intake.json       ← Your structured input
├── cursor_task.md                 ← Paste this into Cursor AI
└── outputs/                       ← Empty folders ready for AI generation
    ├── tokens/
    ├── social-templates/
    ├── landing-sections/
    └── midjourney-prompts/
```

## 💡 Pro Tips

- **Use presets as starting points** - They fill most fields intelligently
- **The more detail you add**, the better the AI output
- **Positioning statement** follows format: "For [audience], [brand] is the [category] that [benefit] because [reason]"
- **Tone sliders** range 1-10, with opposite attributes on each end
- **Logo exploration** is optional (most focus is on brand system, not logo)

## 🎨 Design System

This app uses **DressCode tokens**:
- Primary: `#ffc107` (amber/yellow)
- Complementary: `#0745ff` (blue)
- Full tint/shade/neutral palettes included

See `/design-tokens/` for JSON, CSS, and JS formats.

## 🔧 Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- JSZip + file-saver (for downloads)

## 🚫 No Backend Needed

Everything runs in your browser:
- No auth
- No database
- No API calls
- Works offline

---

**Need help?** Check the main README.md or the code comments.

**Ready to build?** `npm run dev` and go! 🎉
