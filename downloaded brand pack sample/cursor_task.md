# Brand System Development Task
**Output Preset:** Directory / SEO-First Platform

## Project Overview
**Brand Name:** Rota do Peso
**Tagline:** Compare clínicas, escolha com segurança.
**Industry:** Other
**Primary Use Case:** Filtrar e comparar clínicas e profissionais de controle de peso na sua cidade para escolher com segurança.

## Brand Positioning

### Positioning Statement
Rota do Peso é uma plataforma de descoberta e comparação que ajuda pessoas a encontrar clínicas e profissionais de controle de peso com clareza, transparência e critérios objetivos, facilitando decisões informadas em um cenário confuso e fragmentado.

A marca se posiciona como curadora neutra, focada em organizar informação relevante, tornar opções comparáveis e reduzir incertezas, sem substituir orientação médica ou promover tratamentos específicos.

### Target Audience
- Not specified

### Unique Selling Points
- Not specified

### Brand Values
- Care
- Trust
- Wellness
- Transparency
- Quality

### Brand Personality
- Caring
- Trustworthy
- Approachable
- Authoritative

## Brand Voice & Tone

### Voice Characteristics
- Warm
- Clear
- Reassuring
- Concise
- Expert
- Educational

### Tone Attributes (1-10 scale)
- **Formal ↔ Casual:** 5/10
- **Serious ↔ Playful:** 3/10
- **Subtle ↔ Bold:** 5/10
- **Complex ↔ Minimalist:** 7/10

### Key Messages
- Rota do Peso existe para organizar opções e critérios em um cenário confuso e fragmentado.
- A plataforma não vende resultados. Ela ajuda a comparar clínicas e profissionais por informações relevantes.
- Critérios visíveis, linguagem direta e ausência de exageros tornam a decisão mais consciente.
- Rota do Peso orienta a escolha, mas não substitui avaliação ou acompanhamento médico.
- Listagens locais facilitam encontrar opções reais, na sua cidade ou região.
- Quando o paciente entende melhor o processo, o cuidado tende a ser mais alinhado desde o início.

## Visual Direction

### Color Preferences
- Green
- Teal
- Blue
- White

### Mood Keywords (Embrace)
- Calming
- Trustworthy
- Natural
- Caring

### Keywords to Avoid
- Cold
- Clinical
- Intimidating

## Competitive Context
- No competitors specified

## Target Platforms
- Website
- Social Media

## Additional Notes
None

---

## Deliverables Required (Directory / SEO-First Platform)

1. SEO-optimized page templates
2. Listing card designs (category, detail, search)
3. Content hierarchy and information architecture
4. Design tokens (colors, typography, spacing)
5. Filter and search UI patterns
6. Category landing page templates
7. Schema markup guidelines
8. Social sharing templates

---

## Task Instructions for Cursor AI

Based on the brand intake above, create a comprehensive **brand system** with the following structure:

### 1. Brand Positioning & Voice
**Output:** `/brand/outputs/voice-guidelines/`
- Brand positioning document
- Voice and tone guidelines
- Messaging framework
- Content pillars (if applicable)
- Do's and don'ts for brand communication

### 2. Visual Rules & Design Tokens
**Output:** `/brand/outputs/tokens/`

Generate design tokens in **multiple formats**:

#### a) Figma Tokens format (JSON)
```json
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
```

#### b) Style Dictionary format (JSON)
Follow Amazon Style Dictionary structure for multi-platform export

#### c) Tailwind Config (optional)
If preset is SaaS/UI, generate a complete `tailwind.config.js` with custom colors, fonts, spacing

**Include:**
- Primary, secondary, accent color palettes (with variants)
- Typography scale (heading, body, caption sizes)
- Spacing scale
- Border radius values
- Shadow system
- Animation/timing tokens (if applicable)

### 3. Component Specifications
**Output:** `/brand/outputs/components/` (if SaaS/UI, Directory/SEO, or Mobile App preset)

Document specifications for:
- Buttons (primary, secondary, ghost, sizes)
- Forms (inputs, selects, checkboxes)
- Cards
- Navigation patterns
- Modals and overlays
- Data visualization (if applicable)
- Listing cards and filters
- Search components
- Category navigation


Include Figma-ready specs or code snippets.

### 4. Landing Page Templates
**Output:** `/brand/outputs/landing-sections/`

Create specifications for:
- **Hero section** (headline, subheadline, CTA, visual direction)
- **Feature/benefit blocks** (2-3 sections)
- **Social proof section** (if applicable)
- **CTA section**

Include copywriting examples and layout mockup descriptions.

### 5. Social Media Templates
**Output:** `/brand/outputs/social-templates/`

Create 6 templates for:
- Instagram post (1080x1080)
- Instagram story (1080x1920)
- Twitter/X header (1500x500)
- LinkedIn post
- YouTube thumbnail
- Facebook cover

Include:
- Layout specifications
- Typography usage
- Color application
- Imagery guidelines

### 6. Midjourney Prompt Pack
**Output:** `/brand/outputs/midjourney-prompts/midjourney_prompts.md`

Generate 12-15 Midjourney prompts for:
- Directory listing visuals
- Category page hero images
- Search interface mockups
- Community/network imagery

Each prompt should include:
- Full Midjourney prompt text
- Suggested parameters (--ar, --style, --v)
- Use case description


### 7. Logo Exploration (Optional)
**Output:** `/brand/outputs/logo-concepts/`

Provide:
- 3-5 logo concept directions with rationale
- Wordmark vs. symbol considerations
- Application examples (favicon, app icon, lockups)

**Note:** This is conceptual direction, not final logo design.


---

## Output File Structure

```
/brand
├── intake/
│   └── brand_intake.json
├── cursor_task.md (this file)
└── outputs/
    ├── tokens/
    ├── page-templates/
    ├── listing-templates/
    ├── ui-templates/
    ├── landing-sections/
    ├── social-templates/
    ├── midjourney-prompts/
    └── logo-concepts/

```

---

## Brand Intake Data (JSON)

```json
{
  "tagline": "Compare clínicas, escolha com segurança.",
  "outputPreset": [
    "directory-seo",
    "content-platform"
  ],
  "positioningStatement": "Rota do Peso é uma plataforma de descoberta e comparação que ajuda pessoas a encontrar clínicas e profissionais de controle de peso com clareza, transparência e critérios objetivos, facilitando decisões informadas em um cenário confuso e fragmentado.\n\nA marca se posiciona como curadora neutra, focada em organizar informação relevante, tornar opções comparáveis e reduzir incertezas, sem substituir orientação médica ou promover tratamentos específicos.",
  "targetAudience": [],
  "brandValues": [
    "Care",
    "Trust",
    "Wellness",
    "Transparency",
    "Quality"
  ],
  "brandPersonality": [
    "Caring",
    "Trustworthy",
    "Approachable",
    "Authoritative"
  ],
  "competitorUrls": [],
  "colorPreferences": [
    "Green",
    "Teal",
    "Blue",
    "White"
  ],
  "moodKeywords": [
    "Calming",
    "Trustworthy",
    "Natural",
    "Caring"
  ],
  "avoidKeywords": [
    "Cold",
    "Clinical",
    "Intimidating"
  ],
  "toneAttributes": {
    "formal": 5,
    "playful": 3,
    "bold": 5,
    "minimalist": 7
  },
  "voiceCharacteristics": [
    "Warm",
    "Clear",
    "Reassuring",
    "Concise",
    "Expert",
    "Educational"
  ],
  "keyMessages": [
    "Rota do Peso existe para organizar opções e critérios em um cenário confuso e fragmentado.",
    "A plataforma não vende resultados. Ela ajuda a comparar clínicas e profissionais por informações relevantes.",
    "Critérios visíveis, linguagem direta e ausência de exageros tornam a decisão mais consciente.",
    "Rota do Peso orienta a escolha, mas não substitui avaliação ou acompanhamento médico.",
    "Listagens locais facilitam encontrar opções reais, na sua cidade ou região.",
    "Quando o paciente entende melhor o processo, o cuidado tende a ser mais alinhado desde o início."
  ],
  "uniqueSellingPoints": [],
  "platforms": [
    "Website",
    "Social Media"
  ],
  "requiresLogoExploration": true,
  "additionalNotes": "",
  "projectName": "clinicas-catalogo",
  "brandName": "Rota do Peso",
  "industry": "Other",
  "primaryUseCase": "Filtrar e comparar clínicas e profissionais de controle de peso na sua cidade para escolher com segurança.",
  "createdAt": "2026-01-15T01:16:49.215Z"
}
```

---

**Generated:** 2026-01-15T01:16:49.215Z
**Project:** clinicas-catalogo
**Preset:** directory-seo, content-platform
