import { BrandIntake } from "../schema";

export function generateLandingSections(intake: BrandIntake): string {
  let markdown = `# Landing Page Sections for ${intake.brandName}\n\n`;
  markdown += `Landing page specifications and copywriting templates.\n\n`;
  markdown += `## Brand Positioning Reminder\n\n`;
  markdown += `${intake.positioningStatement}\n\n`;
  markdown += `---\n\n`;

  markdown += generateHeroSection(intake) + '\n\n';
  markdown += generateFeaturesSections(intake) + '\n\n';
  markdown += generateSocialProofSection(intake) + '\n\n';
  markdown += generateCTASection(intake) + '\n\n';
  markdown += generateAdditionalSections(intake) + '\n\n';

  return markdown;
}

function generateHeroSection(intake: BrandIntake): string {
  const tagline = intake.tagline || `${intake.brandValues[0]} you can trust`;
  const primaryMessage = intake.keyMessages[0] || intake.positioningStatement.split('.')[0];

  return `## 1. Hero Section

### Layout Specifications

**Structure:**
- Full-width section (100vw)
- Minimum height: 600px (desktop), 500px (mobile)
- Two-column layout (60/40 or 50/50 split)
- Responsive: Stack on mobile

**Left Column: Copy**
- Headline
- Subheadline
- CTA buttons (primary + secondary)
- Trust indicators (optional)

**Right Column: Visual**
- Hero image/illustration (from Midjourney prompts)
- Product screenshot
- Video (optional)

### Copywriting

#### Headline (H1)
\`\`\`
${generateHeadlineVariations(intake)}
\`\`\`

**Guidelines:**
- ${intake.toneAttributes.bold > 6 ? 'Bold and impactful' : 'Clear and compelling'}
- ${intake.voiceCharacteristics.includes('Concise') ? 'Under 10 words' : 'Can be more descriptive'}
- Focus on benefit, not feature
- Include power words related to ${intake.brandValues[0]}

#### Subheadline (H2)
\`\`\`
${primaryMessage}
\`\`\`

**Guidelines:**
- Expand on headline promise
- 15-25 words
- Address ${intake.primaryUseCase}
- Tone: ${getToneDescription(intake)}

#### CTA Buttons

**Primary CTA:**
- Text: ${generatePrimaryCTA(intake)}
- Style: Brand primary color
- Size: Large, prominent
- Hover effect: Subtle scale or color shift

**Secondary CTA:**
- Text: ${generateSecondaryCTA(intake)}
- Style: Outlined or ghost button
- Less prominent than primary
- Alternative action path

### Visual Direction

**Image Mood:** ${intake.moodKeywords.slice(0, 3).join(", ")}
**Avoid:** ${intake.avoidKeywords.join(", ")}
**Style:** ${intake.brandPersonality[0]}, aligned with ${intake.colorPreferences[0]} color palette

Use Midjourney prompt #1 from your prompts pack for hero visuals.

### Trust Indicators (Optional)

Below CTAs, add social proof:
- "Trusted by 10,000+ ${intake.industry} professionals"
- Logos of notable clients/partners
- Star rating or review score
- Security badges (if relevant)

---`;
}

function generateHeadlineVariations(intake: BrandIntake): string {
  const brandName = intake.brandName;
  const primaryValue = intake.brandValues[0];
  const useCase = intake.primaryUseCase;
  
  const variations = [
    `${primaryValue} Made Simple for ${intake.industry}`,
    `The ${intake.brandPersonality[0]} Way to ${useCase}`,
    `${brandName}: ${intake.tagline || `Your Partner in ${primaryValue}`}`,
    `Transform Your ${intake.industry} Experience`,
    `${useCase}—Powered by ${primaryValue}`,
  ];

  return variations.map((v, i) => `Option ${i + 1}: ${v}`).join('\n');
}

function getToneDescription(intake: BrandIntake): string {
  const { formal, playful, bold } = intake.toneAttributes;
  if (formal > 6) return "Professional and polished";
  if (playful > 6) return "Friendly and engaging";
  if (bold > 6) return "Bold and direct";
  return "Balanced and approachable";
}

function generatePrimaryCTA(intake: BrandIntake): string {
  const options = [
    "Get Started Free",
    "Start Your Free Trial",
    `Try ${intake.brandName} Free`,
    "See How It Works",
    "Get Started Now",
    "Start Free Trial",
  ];
  return options[0]; // Return first, user can choose
}

function generateSecondaryCTA(intake: BrandIntake): string {
  const options = [
    "Watch Demo",
    "Learn More",
    "See Examples",
    "View Pricing",
    "Talk to Sales",
    "Book a Demo",
  ];
  return options[0];
}

function generateFeaturesSections(intake: BrandIntake): string {
  const features = generateFeaturesList(intake);

  return `## 2. Features/Benefits Sections

### Section Structure

Create 2-4 feature sections, alternating layout direction for visual interest.

**Pattern:**
- Section 1: Image Left, Text Right
- Section 2: Text Left, Image Right
- Section 3: Image Left, Text Right
- etc.

### Layout Specifications

**Container:**
- Max-width: 1200px
- Padding: 80px 0 (desktop), 60px 0 (mobile)
- Background: Alternate white/light brand color

**Two-Column:**
- 50/50 split on desktop
- Stack on mobile (content first, then image)

**Content Column:**
- Feature headline (H3)
- Description paragraph
- Bullet points or key benefits
- Optional CTA link

**Visual Column:**
- Feature illustration or screenshot
- Use Midjourney prompts #2-4
- Maintain consistent style

### Feature Content

${features.map((feature, index) => `
#### Feature ${index + 1}: ${feature.title}

**Headline:**
\`${feature.headline}\`

**Description:**
\`${feature.description}\`

**Key Points:**
${feature.points.map(p => `- ${p}`).join('\n')}

**Visual:** ${feature.visual}
`).join('\n---\n')}

### Design Guidelines

**Typography:**
- Headline: ${intake.toneAttributes.bold > 6 ? '32-40px, Bold' : '28-36px, Semi-bold'}
- Body: 16-18px, Regular
- Line height: 1.6 for readability

**Colors:**
- Headlines: Primary brand color or neutral dark
- Body text: Neutral gray for readability
- Accents: Secondary brand color for icons/bullets

**Spacing:**
- Section padding: ${intake.toneAttributes.minimalist > 6 ? '100px' : '80px'} vertical
- Element spacing: ${intake.toneAttributes.minimalist > 6 ? 'Generous' : 'Balanced'}

---`;
}

function generateFeaturesList(intake: BrandIntake): Array<{
  title: string;
  headline: string;
  description: string;
  points: string[];
  visual: string;
}> {
  const useCase = intake.primaryUseCase;
  const values = intake.brandValues;
  
  return [
    {
      title: values[0] || "Core Value",
      headline: `Built on ${values[0]}`,
      description: `${intake.brandName} puts ${values[0]} at the center of everything we do. ${intake.keyMessages[0] || `Experience the difference that ${values[0]} makes in ${useCase}.`}`,
      points: [
        `${values[0]}-first approach to ${useCase}`,
        `Transparent processes and clear communication`,
        `Designed with your needs in mind`,
      ],
      visual: "Abstract illustration representing trust and reliability (Midjourney prompt #2)",
    },
    {
      title: "Key Capability",
      headline: `Everything You Need for ${useCase}`,
      description: `Comprehensive tools and features designed specifically for ${intake.industry} professionals.`,
      points: [
        `Streamlined workflow for ${useCase}`,
        `Intuitive interface that just works`,
        `Powerful features without complexity`,
      ],
      visual: "Product screenshot or feature mockup (Midjourney prompt #3)",
    },
    {
      title: values[1] || "Secondary Value",
      headline: `Powered by ${values[1]}`,
      description: `We believe ${values[1]} should be accessible to everyone in ${intake.industry}.`,
      points: [
        `Industry-leading standards`,
        `Continuous improvement and updates`,
        `Dedicated support when you need it`,
      ],
      visual: "Supporting visual or illustration (Midjourney prompt #4)",
    },
  ];
}

function generateSocialProofSection(intake: BrandIntake): string {
  return `## 3. Social Proof Section

### Layout Options

#### Option A: Testimonial Grid
**Structure:**
- 3-column grid (desktop), 1-column (mobile)
- Each testimonial card includes:
  - Quote (2-3 sentences)
  - Customer name
  - Customer title/company
  - Optional: Photo or company logo

**Example Card:**
\`\`\`
"${intake.brandName} transformed how we approach ${intake.primaryUseCase}. The ${intake.brandValues[0]} and ${intake.brandValues[1]} are evident in every interaction."

— [Customer Name]
[Title] at [Company]
\`\`\`

#### Option B: Featured Testimonial
**Structure:**
- Large, prominent quote
- Customer photo (large, professional)
- Detailed attribution
- Background: Light brand color or subtle pattern

**Layout:**
- Center-aligned
- Max-width: 800px
- Quote: 24-32px
- Attribution: 16-18px

#### Option C: Stats + Testimonials
**Structure:**
- Top: Key metrics in large numbers
  - "10,000+ ${intake.industry} professionals"
  - "98% Customer satisfaction"
  - "50+ Countries worldwide"
- Bottom: Rotating testimonials

### Content Guidelines

**Testimonial Criteria:**
- Specific results, not generic praise
- Mentions ${intake.brandValues[0]} or ${intake.brandValues[1]}
- Addresses common pain points
- Feels authentic, not scripted

**Customer Selection:**
- Diverse representation
- Relevant to target audience
- Recognizable companies (if possible)
- Various use cases showcased

### Design Specifications

**Typography:**
- Quote: ${intake.toneAttributes.formal > 6 ? 'Serif font for credibility' : 'Sans-serif for modern feel'}
- Size: 20-24px for quotes
- Style: Italic or quotation marks

**Colors:**
- Background: Light tint of brand color
- Text: Neutral dark for readability
- Accents: Brand primary color

**Images:**
- Customer photos: Circular crop, 80-100px
- Company logos: Grayscale, max 120px wide
- Keep visual hierarchy clear

### Trust Badges

Include below testimonials:
- Security certifications
- Industry associations
- Awards or recognition
- Partner logos

---`;
}

function generateCTASection(intake: BrandIntake): string {
  return `## 4. Final CTA Section

### Layout Specifications

**Structure:**
- Full-width section
- Center-aligned content
- Bold background (brand color or gradient)
- High contrast text

**Container:**
- Max-width: 700px (content)
- Padding: 80px 20px
- Clear visual separation from previous section

### Copywriting

#### Headline
\`\`\`
${generateCTAHeadlines(intake)}
\`\`\`

**Guidelines:**
- ${intake.toneAttributes.bold > 6 ? 'Bold and urgent' : 'Compelling but not pushy'}
- Action-oriented
- Benefit-focused
- 5-10 words maximum

#### Subheadline
\`\`\`
${intake.keyMessages[intake.keyMessages.length - 1] || `Join thousands who trust ${intake.brandName} for ${intake.primaryUseCase}`}
\`\`\`

**Guidelines:**
- Reinforce value proposition
- Address remaining objections
- Create urgency (if appropriate)

#### CTA Button

**Primary:**
- Text: "Get Started Free" or "Start Your Free Trial"
- Size: Extra large (prominent)
- Color: Contrasting color (white on brand color)
- Hover: Subtle animation

**Supporting Text:**
- "No credit card required"
- "Free for 14 days"
- "Cancel anytime"
- "Join 10,000+ users"

### Visual Elements

**Background Options:**
1. Solid brand primary color
2. Gradient (primary to secondary)
3. Background image with overlay (from Midjourney)
4. Abstract pattern

**Additional Elements:**
- Icons representing key benefits
- Subtle brand pattern overlay
- Trust indicator badges
- Customer logos (grayscale)

### Layout Variations

#### Variation A: Simple & Direct
\`\`\`
[Headline]
[Subheadline]
[Large CTA Button]
[Supporting text]
\`\`\`

#### Variation B: Value Reinforcement
\`\`\`
[Headline]
[3 Key Benefits - Icon + Text]
[CTA Button]
[Trust indicators]
\`\`\`

#### Variation C: Comparison
\`\`\`
[Headline: "Join [X] others who've already made the switch"]
[Before/After or With/Without comparison]
[CTA Button]
\`\`\`

### Design Specifications

**Typography:**
- Headline: ${intake.toneAttributes.bold > 6 ? '40-56px' : '36-48px'}, Bold
- Subheadline: 18-24px, Regular
- CTA Button: 18-20px, Semi-bold

**Colors:**
- Background: Brand primary or bold gradient
- Text: White or high-contrast
- Button: Contrasting color with high visibility

**Spacing:**
- Headline to subheadline: 20px
- Subheadline to button: 32px
- Button to supporting text: 16px
- ${intake.toneAttributes.minimalist > 6 ? 'Generous whitespace' : 'Balanced spacing'}

---`;
}

function generateCTAHeadlines(intake: BrandIntake): string {
  const options = [
    `Ready to Transform Your ${intake.industry} Experience?`,
    `Start Your ${intake.brandValues[0]} Journey Today`,
    `Join Thousands Using ${intake.brandName}`,
    `Experience ${intake.brandValues[0]} Like Never Before`,
    `Get Started with ${intake.brandName} Today`,
  ];
  
  return options.map((opt, i) => `Option ${i + 1}: ${opt}`).join('\n');
}

function generateAdditionalSections(intake: BrandIntake): string {
  return `## 5. Additional Recommended Sections

### FAQ Section

**Purpose:** Address common objections and questions

**Layout:**
- Accordion-style (expandable questions)
- 2-column on desktop, 1-column mobile
- 6-10 questions

**Sample Questions:**
1. What makes ${intake.brandName} different?
2. How does ${intake.primaryUseCase} work with ${intake.brandName}?
3. What kind of support do you offer?
4. Is ${intake.brandName} suitable for ${intake.industry}?
5. How do I get started?
6. What are the pricing options?

### How It Works Section

**Purpose:** Simplify understanding of ${intake.primaryUseCase}

**Layout:**
- 3-step process
- Horizontal flow (left to right)
- Icon + Number + Description for each step

**Example:**
\`\`\`
Step 1: [Action] → Step 2: [Action] → Step 3: [Result]
\`\`\`

### Comparison Section (If Applicable)

**Purpose:** Position against competitors or alternatives

**Layout:**
- Comparison table
- ${intake.brandName} vs. [Alternative]
- Highlight differentiators
- Fair but favorable comparison

### Integration/Platform Section (If SaaS)

**Purpose:** Show ecosystem compatibility

**Layout:**
- Logo grid of integrations
- "Works with" or "Integrates with"
- Organized by category

### Pricing Teaser (If Applicable)

**Purpose:** Introduce pricing without overwhelming

**Layout:**
- 2-3 tier cards
- Highlight most popular
- Clear feature differentiation
- CTA: "See full pricing" or "Get started"

---

## General Design Principles

### Consistency
- Use design tokens for colors, spacing, typography
- Maintain visual hierarchy throughout
- Consistent button styles and states

### Accessibility
- Color contrast ratio: Minimum 4.5:1
- Font size: Minimum 16px for body text
- Alt text for all images
- Keyboard navigation support

### Performance
- Optimize images (WebP format)
- Lazy load below-fold content
- Minimize animations for faster load
- Mobile-first responsive design

### Brand Alignment
- **Mood:** ${intake.moodKeywords.join(", ")}
- **Personality:** ${intake.brandPersonality.join(", ")}
- **Values:** ${intake.brandValues.join(", ")}
- **Voice:** ${intake.voiceCharacteristics.join(", ")}

---

## Responsive Breakpoints

- **Mobile:** < 768px
- **Tablet:** 768px - 1024px
- **Desktop:** > 1024px
- **Large Desktop:** > 1440px

Ensure all sections adapt gracefully across devices, with mobile experience prioritized.`;
}
