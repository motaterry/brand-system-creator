import { BrandIntake } from "../schema";

export function generateLogoConcepts(intake: BrandIntake): string {
  let markdown = `# Logo Concepts for ${intake.brandName}\n\n`;
  markdown += `Conceptual logo directions based on your brand positioning.\n\n`;
  markdown += `**Note:** These are conceptual directions to guide professional logo design, not final logo designs.\n\n`;
  markdown += `---\n\n`;

  markdown += `## Brand Foundation\n\n`;
  markdown += `**Brand Name:** ${intake.brandName}\n`;
  markdown += `**Tagline:** ${intake.tagline || 'N/A'}\n`;
  markdown += `**Industry:** ${intake.industry}\n`;
  markdown += `**Brand Values:** ${intake.brandValues.join(", ")}\n`;
  markdown += `**Brand Personality:** ${intake.brandPersonality.join(", ")}\n`;
  markdown += `**Mood:** ${intake.moodKeywords.join(", ")}\n\n`;
  markdown += `---\n\n`;

  const concepts = generateConceptDirections(intake);
  
  concepts.forEach((concept, index) => {
    markdown += `## Concept ${index + 1}: ${concept.name}\n\n`;
    markdown += `### Design Direction\n\n`;
    markdown += `${concept.description}\n\n`;
    markdown += `### Visual Elements\n\n`;
    markdown += `**Type:** ${concept.type}\n\n`;
    markdown += `**Style:** ${concept.style}\n\n`;
    markdown += `**Key Characteristics:**\n`;
    concept.characteristics.forEach(char => {
      markdown += `- ${char}\n`;
    });
    markdown += `\n**Color Approach:**\n${concept.colorApproach}\n\n`;
    markdown += `**Typography Suggestion:**\n${concept.typography}\n\n`;
    markdown += `### Rationale\n\n`;
    markdown += `${concept.rationale}\n\n`;
    markdown += `### Applications\n\n`;
    markdown += `${concept.applications}\n\n`;
    markdown += `---\n\n`;
  });

  markdown += generateLogoGuidelines(intake);
  markdown += generateApplicationExamples(intake);

  return markdown;
}

interface LogoConcept {
  name: string;
  description: string;
  type: string;
  style: string;
  characteristics: string[];
  colorApproach: string;
  typography: string;
  rationale: string;
  applications: string;
}

function generateConceptDirections(intake: BrandIntake): LogoConcept[] {
  const isMinimalist = intake.toneAttributes.minimalist > 6;
  const isBold = intake.toneAttributes.bold > 6;
  const isPlayful = intake.toneAttributes.playful > 6;
  const isFormal = intake.toneAttributes.formal > 6;

  const concepts: LogoConcept[] = [];

  // Concept 1: Based on brand personality
  if (isMinimalist && isFormal) {
    concepts.push({
      name: "Refined Minimalism",
      description: `A sophisticated, minimalist approach that communicates ${intake.brandValues[0]} through simplicity and precision. Clean lines and thoughtful negative space create a mark that feels both timeless and modern.`,
      type: "Wordmark with subtle symbol",
      style: "Minimalist, geometric, refined",
      characteristics: [
        "Clean, simple letterforms",
        "Strategic use of negative space",
        "Geometric precision",
        "Timeless and scalable",
        "Professional and sophisticated",
      ],
      colorApproach: `Monochromatic or limited palette. Primary: ${intake.colorPreferences[0]}. Use single color with variations in weight and opacity for depth.`,
      typography: `${isFormal ? 'Sans-serif, geometric' : 'Sans-serif, humanist'} typeface. Medium to light weight. Excellent legibility at all sizes. Consider custom letterforms for brandName initials.`,
      rationale: `Aligns with ${intake.brandPersonality.filter(p => ['Professional', 'Sophisticated', 'Trustworthy'].includes(p)).join(' and ')} personality. The minimalist approach reflects ${intake.brandValues[0]} through clarity and honesty in design.`,
      applications: "Excellent for digital products, corporate materials, and applications requiring high scalability. Works beautifully in favicon and small sizes.",
    });
  } else if (isBold && isPlayful) {
    concepts.push({
      name: "Bold Expression",
      description: `An energetic, distinctive mark that captures attention and communicates ${intake.brandName}'s ${intake.brandPersonality[0]} personality. Confident forms and dynamic composition create immediate impact.`,
      type: "Symbol + Wordmark combination",
      style: "Bold, dynamic, memorable",
      characteristics: [
        "Strong, confident shapes",
        "Dynamic composition",
        "Highly memorable",
        "Energetic and engaging",
        "Distinctive personality",
      ],
      colorApproach: `Bold use of brand colors. Primary: ${intake.colorPreferences[0]}, Secondary: ${intake.colorPreferences[1] || 'complementary color'}. Can use gradients or duotone for modern appeal.`,
      typography: "Bold or semi-bold sans-serif. Rounded or geometric. Custom letterforms that enhance the brand's unique personality.",
      rationale: `Reflects ${intake.brandPersonality.filter(p => ['Bold', 'Playful', 'Innovative'].includes(p)).join(' and ')} values. Creates strong brand recognition and stands out in ${intake.industry}.`,
      applications: "Perfect for marketing materials, social media, and customer-facing applications. The symbol can work independently in apps and social profiles.",
    });
  } else {
    concepts.push({
      name: "Balanced Professional",
      description: `A balanced approach that combines ${intake.brandValues[0]} with approachability. The mark feels professional yet accessible, modern yet timeless.`,
      type: "Lettermark with supporting element",
      style: `${isFormal ? 'Professional, structured' : 'Approachable, friendly'}`,
      characteristics: [
        "Clean and professional",
        "Approachable design language",
        "Balanced composition",
        "Versatile across applications",
        "Modern but not trendy",
      ],
      colorApproach: `Primary: ${intake.colorPreferences[0]} for main brand elements. Neutral: Gray or black for text. Optional: ${intake.colorPreferences[1]} as accent.`,
      typography: "Sans-serif with personality. Medium weight. Good balance between modern and classic. Excellent readability.",
      rationale: `Communicates ${intake.brandValues.slice(0, 2).join(' and ')} effectively. Appropriate for ${intake.industry} while remaining distinctive.`,
      applications: "Versatile across all applications from website to business cards. Professional enough for corporate use, friendly enough for customer interaction.",
    });
  }

  // Concept 2: Industry-appropriate
  if (intake.industry.toLowerCase().includes('tech') || intake.industry.toLowerCase().includes('saas')) {
    concepts.push({
      name: "Tech-Forward",
      description: `A modern, technology-inspired mark that signals innovation and ${intake.brandValues.includes('Innovation') ? 'cutting-edge thinking' : 'forward progress'}. Geometric forms suggest precision and reliability.`,
      type: "Abstract symbol mark",
      style: "Geometric, modern, technical",
      characteristics: [
        "Geometric precision",
        "Suggestive of connectivity or systems",
        "Modern and forward-thinking",
        "Scalable and flexible",
        "Technology-inspired without cliché",
      ],
      colorApproach: `Technology palette: ${intake.colorPreferences[0]} as primary. Consider gradients or subtle color transitions. Works well in monochrome for B2B contexts.`,
      typography: "Modern sans-serif, geometric or grotesk style. Clean lines, excellent digital rendering. Consider variable font for flexibility.",
      rationale: "Positions ${intake.brandName} as innovative and modern within ${intake.industry}. The geometric approach suggests systematic thinking and reliability.",
      applications: "Excellent for digital-first brands. Works beautifully in UI, app icons, and digital products. The abstract nature allows for animation and interaction.",
    });
  } else if (intake.industry.toLowerCase().includes('health') || intake.industry.toLowerCase().includes('wellness')) {
    concepts.push({
      name: "Trusted Care",
      description: `A warm, reassuring mark that communicates ${intake.brandValues.includes('Care') || intake.brandValues.includes('Trust') ? 'care and trustworthiness' : 'reliability and support'}. Organic forms and thoughtful design create emotional connection.`,
      type: "Symbol + Wordmark",
      style: "Organic, warm, trustworthy",
      characteristics: [
        "Warm, approachable forms",
        "Organic or natural elements",
        "Reassuring and stable",
        "Human-centered design",
        "Professional yet caring",
      ],
      colorApproach: `Calming palette: ${intake.colorPreferences.filter(c => ['Green', 'Blue', 'Teal'].includes(c))[0] || intake.colorPreferences[0]}. Soft, nurturing tones. Avoid harsh contrasts.`,
      typography: "Humanist sans-serif or soft geometric. Approachable and readable. Medium weight for stability without harshness.",
      rationale: `Reflects ${intake.brandValues.filter(v => ['Care', 'Trust', 'Wellness'].includes(v)).join(' and ')}. Creates emotional connection appropriate for healthcare sector.`,
      applications: "Ideal for patient-facing materials, websites, and healthcare applications. The caring tone builds trust while maintaining professionalism.",
    });
  } else {
    concepts.push({
      name: "Industry Authority",
      description: `A mark that establishes ${intake.brandName} as a credible authority in ${intake.industry}. Balanced between modern and traditional, it communicates expertise and trustworthiness.`,
      type: "Wordmark with iconic element",
      style: "Authoritative, established, credible",
      characteristics: [
        "Strong, stable composition",
        "Authoritative presence",
        "Professional and credible",
        "Industry-appropriate",
        "Memorable and distinctive",
      ],
      colorApproach: `Professional palette: ${intake.colorPreferences[0]} as primary, navy or deep gray as secondary. Classic, credible color approach.`,
      typography: "Serious but not stiff. Sans-serif or serif depending on industry tradition. Medium to bold weight. Excellent legibility.",
      rationale: `Positions ${intake.brandName} as established authority in ${intake.industry}. Balances innovation with credibility.`,
      applications: "Perfect for B2B contexts, professional services, and industries requiring trust signals. Works across print and digital.",
    });
  }

  // Concept 3: Unique brand personality play
  const uniquePersonality = intake.brandPersonality.find(p => 
    ['Quirky', 'Playful', 'Bold', 'Innovative'].includes(p)
  );

  if (uniquePersonality) {
    concepts.push({
      name: `${uniquePersonality} Character`,
      description: `A distinctive mark that embraces ${intake.brandName}'s ${uniquePersonality.toLowerCase()} personality. This direction is less conventional, more memorable, and designed to stand out in ${intake.industry}.`,
      type: "Unique mark or character-based logo",
      style: `${uniquePersonality}, distinctive, memorable`,
      characteristics: [
        `Embraces ${uniquePersonality.toLowerCase()} personality`,
        "Highly memorable and distinctive",
        "Less conventional, more unique",
        "Strong brand differentiation",
        "Conversation-starting design",
      ],
      colorApproach: `Expressive color use: ${intake.colorPreferences.slice(0, 2).join(' and ')}. Don't be afraid of bold combinations. Color becomes part of brand personality.`,
      typography: `${uniquePersonality === 'Playful' || uniquePersonality === 'Quirky' ? 'Friendly, rounded, or custom letterforms' : 'Bold, confident, attention-grabbing'}. Typography should reinforce personality.`,
      rationale: `Differentiates ${intake.brandName} from competitors through distinctive personality. Memorable and shareable in social contexts.`,
      applications: "Excellent for consumer-facing brands, B2C applications, and brands targeting younger or more design-savvy audiences. Creates strong social media presence.",
    });
  } else {
    concepts.push({
      name: "Modern Classic",
      description: `A timeless approach that will age gracefully. This mark balances contemporary design trends with classic principles, ensuring ${intake.brandName} looks current today and relevant tomorrow.`,
      type: "Classic wordmark or monogram",
      style: "Timeless, refined, enduring",
      characteristics: [
        "Timeless design principles",
        "Won't feel dated quickly",
        "Refined and well-crafted",
        "Balanced and harmonious",
        "Classic with modern touch",
      ],
      colorApproach: `Classic palette: ${intake.colorPreferences[0]} as primary. Can be as simple as black/white with color as accent. Focuses on form over color trends.`,
      typography: "Classic proportions, modern execution. Sans-serif or refined serif. Excellent craftsmanship in letterform details.",
      rationale: `Creates lasting brand equity. Won't require frequent updates. Communicates stability and ${intake.brandValues.includes('Trust') ? 'trustworthiness' : 'quality'}.`,
      applications: "Versatile across all contexts. Ages well and maintains relevance. Perfect for brands building long-term equity.",
    });
  }

  return concepts.slice(0, 5); // Return up to 5 concepts
}

function generateLogoGuidelines(intake: BrandIntake): string {
  return `## Logo Design Guidelines\n\n### Considerations for ${intake.brandName}\n\n#### Wordmark vs. Symbol\n\n**Wordmark Advantages:**
- Immediate name recognition
- Better for new or lesser-known brands
- No symbol interpretation needed
- Works well for ${intake.brandName} if name is distinctive\n\n**Symbol Advantages:**
- More compact for small applications
- Can work without text (app icons)
- More versatile across languages
- Stronger visual memory\n\n**Recommendation:** ${intake.brandName.length > 12 ? 'Consider symbol + abbreviated wordmark' : 'Can work as wordmark, symbol optional'}\n\n#### Scalability Requirements\n\n**Must work at:**
- Favicon size (16×16px, 32×32px)
- Mobile app icon (1024×1024px)
- Social media profile (various sizes)
- Business card (small print)
- Billboard or large format\n\n**Design accordingly:**
- Avoid thin lines that disappear at small sizes
- Ensure details are meaningful at all scales
- Test in monochrome (will it be recognizable?)\n\n#### Color Flexibility\n\n**Develop versions:**
1. **Full color:** Primary brand colors
2. **Monochrome:** Single color (usually black)
3. **Reverse:** For dark backgrounds (usually white)
4. **Grayscale:** For B&W reproduction\n\n#### Clear Space\n\nDefine minimum clear space around logo:
- Typically equal to height of a key letter
- Keeps logo from visual clutter
- Ensures proper breathing room\n\n#### Incorrect Usage Examples\n\nDocument what NOT to do:
- Don't stretch or distort
- Don't change colors without approval
- Don't rotate or skew
- Don't add effects (shadows, glows, etc.)
- Don't place on busy backgrounds\n- Don't place colors that fail contrast tests\n\n---\n\n`;
}

function generateApplicationExamples(intake: BrandIntake): string {
  return `## Application Examples\n\n### Favicon (16×16px, 32×32px)\n\n**Considerations:**
- Extremely limited space
- Often monochrome or very limited color
- Must be recognizable at tiny size\n- Consider: Single letter, simple symbol, or monogram\n\n**For ${intake.brandName}:**
${intake.brandName.length > 0 ? `Use "${intake.brandName.charAt(0)}" as monogram or simplified symbol` : 'Use simplified brand mark'}\n\n### App Icon (iOS: 1024×1024px)\n\n**Requirements:**
- No transparency (solid background)
- Fills square format
- Rounded corners applied by OS
- Must be distinctive in app drawer\n- Should maintain brand recognition\n\n**Approach:**
- Symbol-based (if available)
- Lettermark on brand color background
- Avoid detailed illustrations\n\n### Website Header\n\n**Horizontal lockup:**
- Typically wider than tall
- Include tagline if helpful: "${intake.tagline || 'Your tagline here'}"\n- Consider dark and light versions for different page styles\n\n**Responsive behavior:**
- Full logo on desktop
- Simplified or symbol-only on mobile
- Maintain recognition across sizes\n\n### Business Card\n\n**Dimensions:** 3.5" × 2" (89mm × 51mm)\n\n**Placement:**
- Front: Main logo placement
- Back: Optional secondary placement or pattern\n- Ensure legibility at card size\n- Consider vertical or horizontal orientation\n\n### Social Media\n\n**Profile Pictures (circular crop):**
- Design must work in circle
- Centered, balanced composition
- Simple enough for small display\n\n**Cover/Banner Images:**
- Opportunity for full brand expression
- Can include tagline, visuals, messaging
- Update seasonally or for campaigns\n\n### Email Signature\n\n**Size:** ~150-200px wide maximum
**Format:** PNG with transparency (or solid background)
**Consideration:** Must look good on various email clients\n\n### Presentation Materials\n\n**PowerPoint/Keynote:**
- Corner placement (typically top-left or bottom-right)
- Small but legible
- Monochrome version often best for not competing with content\n\n### Merchandise\n\n**T-shirts, mugs, pens, etc.:**
- Consider single-color versions (screen printing cost)
- Test at actual production sizes
- Ensure design translates to different materials\n- Embroidery requires simplified version\n\n---\n\n## Next Steps\n\n### Professional Design Process\n\n1. **Select Direction:** Choose 1-2 concepts to explore
2. **Hire Designer:** Work with professional logo designer
3. **Iterations:** Expect 2-3 rounds of refinement
4. **Finalize:** Get all file formats and color versions
5. **Guidelines:** Create comprehensive brand guidelines\n\n### File Formats Needed\n\n**Vector:**
- AI (Adobe Illustrator source)
- EPS (universal vector)
- SVG (web vector)
- PDF (print and sharing)\n\n**Raster:**
- PNG with transparency (web, various sizes)
- JPG on white background (various sizes)
- Favicon formats (ICO, multiple sizes)\n\n### Trademark Considerations\n\n- Search existing trademarks in your industry
- Consider trademark registration
- Ensure logo is distinctive enough to protect
- Consult intellectual property attorney\n\n---\n\n**Remember:** These are conceptual directions to guide professional design. A skilled logo designer will refine these concepts into a polished, production-ready mark that serves ${intake.brandName} for years to come.`;
}
