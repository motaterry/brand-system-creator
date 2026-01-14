import JSZip from "jszip";
import { saveAs } from "file-saver";
import { BrandIntake } from "./schema";

const OUTPUT_PRESET_CONFIG = {
  "saas-ui": {
    title: "SaaS/UI Focus",
    deliverables: [
      "Design system architecture",
      "Component library specifications",
      "Design tokens (Figma Tokens + Style Dictionary)",
      "Tailwind config (optional)",
      "UI patterns and templates",
      "Landing page hero + 2-3 key sections",
      "Application UI mockups",
    ],
    folders: ["tokens", "components", "ui-templates", "landing-sections", "midjourney-prompts"]
  },
  "ecommerce": {
    title: "E-commerce Focus",
    deliverables: [
      "Visual brand rules",
      "Product photography direction",
      "Packaging design system",
      "Lifestyle imagery guidelines",
      "Design tokens (colors, typography)",
      "Landing page templates",
      "Social media templates (6 formats)",
      "Midjourney prompt pack for product shots",
    ],
    folders: ["tokens", "packaging", "product-photography", "lifestyle-imagery", "social-templates", "landing-sections", "midjourney-prompts"]
  },
  "creator": {
    title: "Creator/Personal Brand Focus",
    deliverables: [
      "Brand voice and positioning",
      "Content pillars and themes",
      "Social media templates (6+ formats)",
      "Profile and bio templates",
      "Visual rules (colors, fonts, filters)",
      "Design tokens",
      "Landing page hero + about section",
      "Midjourney prompt pack for personal brand content",
    ],
    folders: ["voice-guidelines", "social-templates", "content-pillars", "tokens", "landing-sections", "midjourney-prompts"]
  },
  "directory-seo": {
    title: "Directory / SEO-First Platform",
    deliverables: [
      "SEO-optimized page templates",
      "Listing card designs (category, detail, search)",
      "Content hierarchy and information architecture",
      "Design tokens (colors, typography, spacing)",
      "Filter and search UI patterns",
      "Category landing page templates",
      "Schema markup guidelines",
      "Social sharing templates",
    ],
    folders: ["tokens", "page-templates", "listing-templates", "ui-templates", "landing-sections", "social-templates", "midjourney-prompts"]
  },
  "marketing-website": {
    title: "Marketing Website / Landing Pages",
    deliverables: [
      "Landing page templates (hero, features, testimonials, CTA)",
      "Conversion-focused design patterns",
      "Campaign asset templates",
      "Design tokens (colors, typography)",
      "Email template designs",
      "Social media campaign templates",
      "A/B testing variant suggestions",
      "Midjourney prompts for marketing visuals",
    ],
    folders: ["tokens", "landing-sections", "campaign-assets", "email-templates", "social-templates", "midjourney-prompts"]
  },
  "content-platform": {
    title: "Content Platform / Blog",
    deliverables: [
      "Article/blog post templates",
      "Content hierarchy and typography system",
      "Category and tag page designs",
      "Author profile templates",
      "Design tokens (typography-focused)",
      "Reading experience optimization",
      "Social sharing card templates",
      "Newsletter template designs",
    ],
    folders: ["tokens", "content-templates", "article-templates", "landing-sections", "social-templates", "email-templates", "midjourney-prompts"]
  },
  "mobile-app": {
    title: "Mobile App Brand",
    deliverables: [
      "App icon design direction",
      "Splash screen designs",
      "Mobile UI component patterns",
      "App store screenshots templates",
      "Design tokens (mobile-optimized)",
      "Onboarding flow designs",
      "Mobile-specific brand guidelines",
      "App store listing assets",
    ],
    folders: ["tokens", "app-assets", "mobile-components", "app-store-assets", "ui-templates", "midjourney-prompts"]
  },
  "enterprise": {
    title: "Enterprise / B2B Brand",
    deliverables: [
      "Corporate identity guidelines",
      "Presentation templates (PowerPoint/Keynote)",
      "Documentation templates",
      "Email signature designs",
      "Design tokens (professional palette)",
      "Case study templates",
      "White paper layouts",
      "Corporate social media templates",
    ],
    folders: ["tokens", "corporate-templates", "presentation-templates", "documentation-templates", "email-templates", "social-templates", "midjourney-prompts"]
  }
};

export function generateCursorTask(intake: BrandIntake): string {
  // outputPreset agora é um array, usar o primeiro elemento ou 'saas-ui' como padrão
  const primaryPreset = Array.isArray(intake.outputPreset) && intake.outputPreset.length > 0
    ? intake.outputPreset[0]
    : (typeof intake.outputPreset === 'string' ? intake.outputPreset : 'saas-ui');
  const presetConfig = OUTPUT_PRESET_CONFIG[primaryPreset as keyof typeof OUTPUT_PRESET_CONFIG];
  
  return `# Brand System Development Task
**Output Preset:** ${presetConfig.title}

## Project Overview
**Brand Name:** ${intake.brandName}
**Tagline:** ${intake.tagline || "N/A"}
**Industry:** ${intake.industry}
**Primary Use Case:** ${intake.primaryUseCase}

## Brand Positioning

### Positioning Statement
${intake.positioningStatement || "Not provided"}

### Target Audience
${intake.targetAudience.map(a => `- ${a}`).join("\n") || "- Not specified"}

### Unique Selling Points
${intake.uniqueSellingPoints.map(u => `- ${u}`).join("\n") || "- Not specified"}

### Brand Values
${intake.brandValues.map(v => `- ${v}`).join("\n") || "- Not specified"}

### Brand Personality
${intake.brandPersonality.map(p => `- ${p}`).join("\n") || "- Not specified"}

## Brand Voice & Tone

### Voice Characteristics
${intake.voiceCharacteristics.map(v => `- ${v}`).join("\n") || "- Not specified"}

### Tone Attributes (1-10 scale)
- **Formal ↔ Casual:** ${intake.toneAttributes.formal}/10
- **Serious ↔ Playful:** ${intake.toneAttributes.playful}/10
- **Subtle ↔ Bold:** ${intake.toneAttributes.bold}/10
- **Complex ↔ Minimalist:** ${intake.toneAttributes.minimalist}/10

### Key Messages
${intake.keyMessages.map(m => `- ${m}`).join("\n") || "- Not specified"}

## Visual Direction

### Color Preferences
${intake.colorPreferences.map(c => `- ${c}`).join("\n") || "- Not specified"}

### Mood Keywords (Embrace)
${intake.moodKeywords.map(m => `- ${m}`).join("\n") || "- Not specified"}

### Keywords to Avoid
${intake.avoidKeywords.map(a => `- ${a}`).join("\n") || "- Not specified"}

## Competitive Context
${intake.competitorUrls.length > 0 ? intake.competitorUrls.map(u => `- ${u}`).join("\n") : "- No competitors specified"}

## Target Platforms
${intake.platforms.map(p => `- ${p}`).join("\n") || "- Not specified"}

## Additional Notes
${intake.additionalNotes || "None"}

---

## Deliverables Required (${presetConfig.title})

${presetConfig.deliverables.map((d, i) => `${i + 1}. ${d}`).join("\n")}

---

## Task Instructions for Cursor AI

Based on the brand intake above, create a comprehensive **brand system** with the following structure:

### 1. Brand Positioning & Voice
**Output:** \`/brand/outputs/voice-guidelines/\`
- Brand positioning document
- Voice and tone guidelines
- Messaging framework
- Content pillars (if applicable)
- Do's and don'ts for brand communication

### 2. Visual Rules & Design Tokens
**Output:** \`/brand/outputs/tokens/\`

Generate design tokens in **multiple formats**:

#### a) Figma Tokens format (JSON)
\`\`\`json
{
  "colors": {
    "primary": { "value": "#..." },
    "secondary": { "value": "#..." }
  },
  "typography": {
    "heading-xl": {
      "fontFamily": { "value": "..." },
      "fontSize": { "value": "..." },
      "lineHeight": { "value": "..." }
    }
  },
  "spacing": { ... },
  "radii": { ... }
}
\`\`\`

#### b) Style Dictionary format (JSON)
Follow Amazon Style Dictionary structure for multi-platform export

#### c) Tailwind Config (optional)
If preset is SaaS/UI, generate a complete \`tailwind.config.js\` with custom colors, fonts, spacing

**Include:**
- Primary, secondary, accent color palettes (with variants)
- Typography scale (heading, body, caption sizes)
- Spacing scale
- Border radius values
- Shadow system
- Animation/timing tokens (if applicable)

### 3. Component Specifications
**Output:** \`/brand/outputs/components/\` (if SaaS/UI, Directory/SEO, or Mobile App preset)

Document specifications for:
- Buttons (primary, secondary, ghost, sizes)
- Forms (inputs, selects, checkboxes)
- Cards
- Navigation patterns
- Modals and overlays
- Data visualization (if applicable)
${primaryPreset === 'directory-seo' ? '- Listing cards and filters\n- Search components\n- Category navigation' : ''}
${primaryPreset === 'mobile-app' ? '- Mobile-specific components\n- Touch targets and gestures\n- Native app patterns' : ''}

Include Figma-ready specs or code snippets.

### 4. Landing Page Templates
**Output:** \`/brand/outputs/landing-sections/\`

Create specifications for:
- **Hero section** (headline, subheadline, CTA, visual direction)
- **Feature/benefit blocks** (2-3 sections)
- **Social proof section** (if applicable)
- **CTA section**

Include copywriting examples and layout mockup descriptions.

### 5. Social Media Templates
**Output:** \`/brand/outputs/social-templates/\`

${primaryPreset === 'creator' ? 'Create 10+ templates' : primaryPreset === 'marketing-website' || primaryPreset === 'enterprise' ? 'Create 8 templates' : 'Create 6 templates'} for:
- Instagram post (1080x1080)
- Instagram story (1080x1920)
- Twitter/X header (1500x500)
- LinkedIn post
- YouTube thumbnail
${primaryPreset === 'creator' 
  ? '- TikTok cover, Threads post, etc.'
  : primaryPreset === 'marketing-website' || primaryPreset === 'enterprise'
  ? '- Facebook cover, LinkedIn company page'
  : '- Facebook cover'}

Include:
- Layout specifications
- Typography usage
- Color application
- Imagery guidelines

### 6. Midjourney Prompt Pack
**Output:** \`/brand/outputs/midjourney-prompts/midjourney_prompts.md\`

Generate ${primaryPreset === 'ecommerce' ? '15-20' : primaryPreset === 'directory-seo' || primaryPreset === 'marketing-website' ? '12-15' : '10-15'} Midjourney prompts for:
${primaryPreset === 'ecommerce' 
  ? `- Product photography (white background, lifestyle, flat lay)
- Packaging mockups
- Lifestyle scenes
- Brand imagery` 
  : primaryPreset === 'creator'
  ? `- Personal brand portraits
- Content backgrounds
- Social media visuals
- Workspace/lifestyle shots`
  : primaryPreset === 'directory-seo'
  ? `- Directory listing visuals
- Category page hero images
- Search interface mockups
- Community/network imagery`
  : primaryPreset === 'marketing-website'
  ? `- Hero section backgrounds
- Feature illustration concepts
- Testimonial background visuals
- Campaign imagery`
  : primaryPreset === 'content-platform'
  ? `- Article header images
- Blog category visuals
- Author portrait styles
- Reading experience imagery`
  : primaryPreset === 'mobile-app'
  ? `- App interface mockups
- Splash screen concepts
- App store feature graphics
- Onboarding illustration styles`
  : primaryPreset === 'enterprise'
  ? `- Corporate presentation backgrounds
- Professional imagery concepts
- Case study visuals
- B2B marketing imagery`
  : `- UI mockups and scenes
- Hero images
- Abstract brand visuals
- Illustration style references`}

Each prompt should include:
- Full Midjourney prompt text
- Suggested parameters (--ar, --style, --v)
- Use case description

${intake.requiresLogoExploration ? `
### 7. Logo Exploration (Optional)
**Output:** \`/brand/outputs/logo-concepts/\`

Provide:
- 3-5 logo concept directions with rationale
- Wordmark vs. symbol considerations
- Application examples (favicon, app icon, lockups)

**Note:** This is conceptual direction, not final logo design.
` : ''}

---

## Output File Structure

\`\`\`
/brand
├── intake/
│   └── brand_intake.json
├── cursor_task.md (this file)
└── outputs/
${presetConfig.folders.map(f => `    ├── ${f}/`).join('\n')}
${intake.requiresLogoExploration ? '    └── logo-concepts/\n' : ''}
\`\`\`

---

## Brand Intake Data (JSON)

\`\`\`json
${JSON.stringify(intake, null, 2)}
\`\`\`

---

**Generated:** ${intake.createdAt}
**Project:** ${intake.projectName}
**Preset:** ${Array.isArray(intake.outputPreset) ? intake.outputPreset.join(', ') : intake.outputPreset}
`;
}

export async function generateBrandPack(intake: BrandIntake): Promise<Blob> {
  const zip = new JSZip();
  const brandFolder = zip.folder("brand")!;
  const intakeFolder = brandFolder.folder("intake")!;
  const outputsFolder = brandFolder.folder("outputs")!;

  // Add brand_intake.json
  intakeFolder.file(
    "brand_intake.json",
    JSON.stringify(intake, null, 2)
  );

  // Add cursor_task.md
  const cursorTaskContent = generateCursorTask(intake);
  brandFolder.file("cursor_task.md", cursorTaskContent);

  // Add preset-specific folders
  const primaryPresetForFolders = Array.isArray(intake.outputPreset) && intake.outputPreset.length > 0
    ? intake.outputPreset[0]
    : (typeof intake.outputPreset === 'string' ? intake.outputPreset : 'saas-ui');
  const presetConfig = OUTPUT_PRESET_CONFIG[primaryPresetForFolders as keyof typeof OUTPUT_PRESET_CONFIG];
  presetConfig.folders.forEach(folder => {
    outputsFolder.folder(folder);
  });

  if (intake.requiresLogoExploration) {
    outputsFolder.folder("logo-concepts");
  }
  
  // Add README in outputs
  outputsFolder.file(
    "README.md",
    `# Brand System Outputs

**Preset:** ${presetConfig.title}

## Deliverables

${presetConfig.deliverables.map((d, i) => `${i + 1}. ${d}`).join('\n')}

## Folder Structure

${presetConfig.folders.map(f => `- \`/${f}\` - ${getFolderDescription(f)}`).join('\n')}
${intake.requiresLogoExploration ? '- `/logo-concepts` - Logo direction and concepts\n' : ''}

Use the \`cursor_task.md\` file in the parent directory to generate these assets with Cursor AI.

---
Generated: ${new Date(intake.createdAt).toLocaleString()}
`
  );

  return await zip.generateAsync({ type: "blob" });
}

function getFolderDescription(folder: string): string {
  const descriptions: Record<string, string> = {
    "tokens": "Design tokens (Figma Tokens, Style Dictionary, Tailwind)",
    "components": "UI component specifications",
    "ui-templates": "Application UI patterns and templates",
    "landing-sections": "Landing page section specifications",
    "social-templates": "Social media template specs",
    "packaging": "Packaging design system",
    "product-photography": "Product photography guidelines",
    "lifestyle-imagery": "Lifestyle imagery direction",
    "voice-guidelines": "Brand voice and messaging",
    "content-pillars": "Content themes and pillars",
    "midjourney-prompts": "AI image generation prompts",
    "logo-concepts": "Logo concepts and direction",
    "page-templates": "Page template designs and layouts",
    "listing-templates": "Listing and card template designs",
    "campaign-assets": "Marketing campaign visual assets",
    "email-templates": "Email template designs",
    "content-templates": "Content page templates",
    "article-templates": "Article and blog post templates",
    "app-assets": "Mobile app visual assets",
    "mobile-components": "Mobile-specific UI components",
    "app-store-assets": "App store listing assets",
    "corporate-templates": "Corporate identity templates",
    "presentation-templates": "Presentation slide templates",
    "documentation-templates": "Documentation page templates",
  };
  return descriptions[folder] || "Brand assets";
}

export function downloadBrandPack(intake: BrandIntake) {
  generateBrandPack(intake).then((blob) => {
    const filename = `${intake.projectName.toLowerCase().replace(/\s+/g, "-")}-brand-pack.zip`;
    saveAs(blob, filename);
  });
}

export function copyToClipboard(text: string): Promise<void> {
  return navigator.clipboard.writeText(text);
}
