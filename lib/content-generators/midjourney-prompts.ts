import { BrandIntake } from "../schema";

interface MidjourneyPrompt {
  title: string;
  prompt: string;
  parameters: string;
  useCase: string;
}

export function generateMidjourneyPrompts(intake: BrandIntake): string {
  const primaryPreset = Array.isArray(intake.outputPreset) && intake.outputPreset.length > 0
    ? intake.outputPreset[0]
    : 'saas-ui';

  const prompts = getPromptsForPreset(intake, primaryPreset);

  let markdown = `# Midjourney Prompts for ${intake.brandName}\n\n`;
  markdown += `Generated prompts based on your brand positioning and visual direction.\n\n`;
  markdown += `## Brand Visual Keywords\n\n`;
  markdown += `**Embrace:** ${intake.moodKeywords.join(", ")}\n`;
  markdown += `**Avoid:** ${intake.avoidKeywords.join(", ")}\n`;
  markdown += `**Colors:** ${intake.colorPreferences.join(", ")}\n\n`;
  markdown += `---\n\n`;

  prompts.forEach((prompt, index) => {
    markdown += `## ${index + 1}. ${prompt.title}\n\n`;
    markdown += `**Use Case:** ${prompt.useCase}\n\n`;
    markdown += `### Prompt\n\n`;
    markdown += `\`\`\`\n${prompt.prompt}\n\`\`\`\n\n`;
    markdown += `**Parameters:** \`${prompt.parameters}\`\n\n`;
    markdown += `---\n\n`;
  });

  markdown += `## Tips for Using These Prompts\n\n`;
  markdown += `1. **Customize:** Feel free to adjust prompts based on your specific needs\n`;
  markdown += `2. **Iterate:** Use \`--seed\` to maintain consistency across variations\n`;
  markdown += `3. **Aspect Ratios:** Adjust \`--ar\` based on your use case (16:9 for web, 9:16 for mobile, 1:1 for social)\n`;
  markdown += `4. **Style Consistency:** Use the same style references across prompts for brand coherence\n`;
  markdown += `5. **Version:** These prompts are optimized for Midjourney v6+\n\n`;

  return markdown;
}

function getPromptsForPreset(intake: BrandIntake, preset: string): MidjourneyPrompt[] {
  const baseStyle = buildBaseStyle(intake);
  
  const presetPrompts: Record<string, MidjourneyPrompt[]> = {
    "saas-ui": getSaaSPrompts(intake, baseStyle),
    "ecommerce": getEcommercePrompts(intake, baseStyle),
    "creator": getCreatorPrompts(intake, baseStyle),
    "directory-seo": getDirectoryPrompts(intake, baseStyle),
    "marketing-website": getMarketingPrompts(intake, baseStyle),
    "content-platform": getContentPrompts(intake, baseStyle),
    "mobile-app": getMobileAppPrompts(intake, baseStyle),
    "enterprise": getEnterprisePrompts(intake, baseStyle),
  };

  return presetPrompts[preset] || getSaaSPrompts(intake, baseStyle);
}

function buildBaseStyle(intake: BrandIntake): string {
  const mood = intake.moodKeywords.slice(0, 3).join(", ").toLowerCase();
  const colors = intake.colorPreferences.slice(0, 2).join(" and ").toLowerCase();
  const personality = intake.brandPersonality[0]?.toLowerCase() || "professional";
  
  return `${mood}, ${colors} color palette, ${personality} aesthetic`;
}

function getSaaSPrompts(intake: BrandIntake, baseStyle: string): MidjourneyPrompt[] {
  return [
    {
      title: "Hero Section Background",
      prompt: `Abstract digital background for SaaS website hero section, ${baseStyle}, gradient mesh, floating geometric elements, depth, clean composition, professional lighting`,
      parameters: "--ar 16:9 --style raw --v 6",
      useCase: "Website hero section background",
    },
    {
      title: "Dashboard UI Mockup",
      prompt: `Modern dashboard interface mockup, ${baseStyle}, data visualization, charts and graphs, clean UI elements, glass morphism effects, subtle shadows, isometric view`,
      parameters: "--ar 16:9 --v 6",
      useCase: "Product feature showcase",
    },
    {
      title: "Abstract Feature Illustration",
      prompt: `3D abstract illustration representing ${intake.brandValues[0]}, ${baseStyle}, floating elements, soft lighting, minimalist composition, depth of field`,
      parameters: "--ar 4:3 --v 6",
      useCase: "Feature section illustrations",
    },
    {
      title: "Team Collaboration Scene",
      prompt: `Diverse team collaborating in modern workspace, ${baseStyle}, natural lighting, laptops and devices, whiteboard, professional but approachable atmosphere, candid moment`,
      parameters: "--ar 16:9 --style raw --v 6",
      useCase: "About page, team section",
    },
    {
      title: "Mobile App Mockup",
      prompt: `Smartphone with app interface, ${baseStyle}, floating UI elements, clean design, professional product photography, studio lighting, white background`,
      parameters: "--ar 2:3 --v 6",
      useCase: "Mobile app features, product shots",
    },
    {
      title: "Integration Concept",
      prompt: `Abstract visualization of connected systems and integrations, ${baseStyle}, network nodes, flowing data, geometric shapes, isometric perspective, glowing connections`,
      parameters: "--ar 16:9 --v 6",
      useCase: "Integration page, API documentation",
    },
    {
      title: "Security and Trust Visual",
      prompt: `Abstract representation of security and data protection, ${baseStyle}, shield elements, encryption symbols, trust indicators, professional lighting, clean composition`,
      parameters: "--ar 1:1 --v 6",
      useCase: "Security page, trust badges",
    },
    {
      title: "Analytics Dashboard",
      prompt: `Beautiful analytics dashboard with real-time data, ${baseStyle}, charts, graphs, KPI cards, modern UI design, glass morphism, subtle gradients`,
      parameters: "--ar 16:9 --v 6",
      useCase: "Product screenshots, feature pages",
    },
    {
      title: "Onboarding Flow",
      prompt: `Modern onboarding screen designs, ${baseStyle}, step-by-step progress, clean illustrations, welcoming interface, professional design`,
      parameters: "--ar 9:16 --v 6",
      useCase: "Onboarding documentation, tutorials",
    },
    {
      title: "Success Story Visual",
      prompt: `Abstract visualization of growth and success, ${baseStyle}, upward trending arrows, achievement concept, celebratory but professional mood`,
      parameters: "--ar 16:9 --v 6",
      useCase: "Case studies, testimonials section",
    },
  ];
}

function getEcommercePrompts(intake: BrandIntake, baseStyle: string): MidjourneyPrompt[] {
  return [
    {
      title: "Hero Product Shot",
      prompt: `Product photography, ${intake.primaryUseCase}, ${baseStyle}, professional studio lighting, white background, crisp details, commercial quality`,
      parameters: "--ar 1:1 --style raw --v 6",
      useCase: "Hero section, product pages",
    },
    {
      title: "Lifestyle Scene",
      prompt: `Lifestyle photography featuring ${intake.primaryUseCase}, ${baseStyle}, natural setting, aspirational mood, authentic moment, soft natural lighting`,
      parameters: "--ar 4:5 --style raw --v 6",
      useCase: "Instagram posts, lifestyle content",
    },
    {
      title: "Flat Lay Composition",
      prompt: `Flat lay product photography, ${baseStyle}, curated arrangement, props and accessories, top-down view, even lighting, Instagram-worthy composition`,
      parameters: "--ar 1:1 --style raw --v 6",
      useCase: "Social media, blog posts",
    },
    {
      title: "Product Collection",
      prompt: `Product collection arranged artfully, ${baseStyle}, cohesive display, professional lighting, depth and dimension, brand storytelling`,
      parameters: "--ar 16:9 --style raw --v 6",
      useCase: "Collection pages, catalog",
    },
    {
      title: "Packaging Design Mockup",
      prompt: `Modern product packaging mockup, ${baseStyle}, elegant design, eco-friendly materials, professional product photography, studio lighting`,
      parameters: "--ar 1:1 --v 6",
      useCase: "Packaging design presentation",
    },
    {
      title: "Brand Story Image",
      prompt: `Brand story visual, artisan craftsmanship, ${baseStyle}, behind-the-scenes moment, authentic and genuine, natural lighting, documentary style`,
      parameters: "--ar 16:9 --style raw --v 6",
      useCase: "About page, brand story",
    },
    {
      title: "Seasonal Campaign",
      prompt: `Seasonal product photography, ${baseStyle}, themed props and styling, festive but elegant, professional lighting, aspirational mood`,
      parameters: "--ar 4:5 --style raw --v 6",
      useCase: "Seasonal campaigns, limited editions",
    },
    {
      title: "Detail Shot",
      prompt: `Close-up detail photography, ${baseStyle}, texture and materials, macro perspective, soft focus background, editorial quality`,
      parameters: "--ar 1:1 --style raw --v 6",
      useCase: "Product detail pages, quality showcase",
    },
    {
      title: "Customer Lifestyle",
      prompt: `Customer using product in daily life, ${baseStyle}, authentic moment, relatable scene, natural environment, candid photography style`,
      parameters: "--ar 4:5 --style raw --v 6",
      useCase: "Social proof, customer stories",
    },
    {
      title: "Unboxing Experience",
      prompt: `Unboxing experience photography, ${baseStyle}, elevated presentation, packaging reveal, hands in frame, anticipation and delight, soft lighting`,
      parameters: "--ar 9:16 --style raw --v 6",
      useCase: "Unboxing videos, social content",
    },
  ];
}

function getCreatorPrompts(intake: BrandIntake, baseStyle: string): MidjourneyPrompt[] {
  return [
    {
      title: "Creator Portrait",
      prompt: `Professional portrait of content creator, ${baseStyle}, confident and approachable, natural lighting, authentic expression, shallow depth of field`,
      parameters: "--ar 4:5 --style raw --v 6",
      useCase: "Profile pictures, about page",
    },
    {
      title: "Content Creation Scene",
      prompt: `Creator in their workspace creating content, ${baseStyle}, creative environment, natural lighting, authentic moment, equipment visible, inspiring atmosphere`,
      parameters: "--ar 16:9 --style raw --v 6",
      useCase: "Behind-the-scenes content",
    },
    {
      title: "Social Media Background",
      prompt: `Abstract background for social media posts, ${baseStyle}, bold graphics, energetic composition, Instagram-worthy aesthetic`,
      parameters: "--ar 1:1 --v 6",
      useCase: "Instagram posts, social templates",
    },
    {
      title: "Brand Pattern",
      prompt: `Repeating brand pattern design, ${baseStyle}, abstract shapes, cohesive composition, suitable for backgrounds and graphics`,
      parameters: "--ar 1:1 --tile --v 6",
      useCase: "Backgrounds, patterns, branding",
    },
    {
      title: "Motivational Quote Background",
      prompt: `Inspirational background for quote posts, ${baseStyle}, uplifting mood, space for text overlay, visually engaging but not overwhelming`,
      parameters: "--ar 1:1 --v 6",
      useCase: "Quote posts, motivational content",
    },
    {
      title: "YouTube Thumbnail Template",
      prompt: `Eye-catching YouTube thumbnail background, ${baseStyle}, bold composition, high contrast, attention-grabbing, space for text and face`,
      parameters: "--ar 16:9 --v 6",
      useCase: "YouTube thumbnails",
    },
    {
      title: "Podcast Cover Art",
      prompt: `Podcast cover art design, ${baseStyle}, bold typography space, memorable visual, works at small sizes, cohesive brand feel`,
      parameters: "--ar 1:1 --v 6",
      useCase: "Podcast branding",
    },
    {
      title: "Course or Product Mockup",
      prompt: `Digital product mockup, ${baseStyle}, laptop or tablet display, professional setting, aspirational lifestyle, clean composition`,
      parameters: "--ar 16:9 --v 6",
      useCase: "Course launches, digital products",
    },
    {
      title: "Community and Connection",
      prompt: `Visual representing community and connection, ${baseStyle}, diverse group, supportive atmosphere, warm and welcoming energy`,
      parameters: "--ar 16:9 --style raw --v 6",
      useCase: "Community pages, membership offers",
    },
    {
      title: "Personal Brand Aesthetic",
      prompt: `Lifestyle flat lay representing ${intake.brandName}, ${baseStyle}, curated objects, brand personality visible, aspirational but authentic`,
      parameters: "--ar 4:5 --style raw --v 6",
      useCase: "Brand storytelling, lifestyle content",
    },
  ];
}

function getDirectoryPrompts(intake: BrandIntake, baseStyle: string): MidjourneyPrompt[] {
  return [
    {
      title: "Category Hero Image",
      prompt: `Abstract visualization of ${intake.primaryUseCase} category, ${baseStyle}, organized structure, network connections, clean and trustworthy aesthetic`,
      parameters: "--ar 16:9 --v 6",
      useCase: "Category landing pages",
    },
    {
      title: "Search Interface Concept",
      prompt: `Modern search interface design, ${baseStyle}, clean UI elements, search bar prominence, filter options, organized layout, user-friendly`,
      parameters: "--ar 16:9 --v 6",
      useCase: "Search page mockups",
    },
    {
      title: "Location-Based Visual",
      prompt: `Abstract map and location visualization, ${baseStyle}, pinpoints and markers, geographic connections, organized information display`,
      parameters: "--ar 16:9 --v 6",
      useCase: "Location pages, map features",
    },
    {
      title: "Comparison Feature",
      prompt: `Visual representing comparison and decision-making, ${baseStyle}, side-by-side elements, clear distinction, helpful and organized presentation`,
      parameters: "--ar 16:9 --v 6",
      useCase: "Comparison pages, feature highlights",
    },
    {
      title: "Trust and Verification",
      prompt: `Abstract representation of trust and verification, ${baseStyle}, checkmarks, badges, credibility indicators, professional and reassuring`,
      parameters: "--ar 1:1 --v 6",
      useCase: "Trust badges, verification icons",
    },
    {
      title: "Community Directory",
      prompt: `Visual of organized community directory, ${baseStyle}, profile cards, diverse representation, welcoming and inclusive atmosphere`,
      parameters: "--ar 16:9 --v 6",
      useCase: "Directory listings, member pages",
    },
    {
      title: "Filter and Sort Interface",
      prompt: `Modern filter interface design, ${baseStyle}, toggle switches, dropdown menus, organized options, intuitive layout`,
      parameters: "--ar 9:16 --v 6",
      useCase: "Mobile filter screens",
    },
    {
      title: "Results Grid Layout",
      prompt: `Clean grid layout for search results, ${baseStyle}, card-based design, consistent spacing, scannable information, organized presentation`,
      parameters: "--ar 16:9 --v 6",
      useCase: "Search results pages",
    },
    {
      title: "Detail Page Hero",
      prompt: `Hero image for listing detail page, ${baseStyle}, professional presentation, highlight key information, credible and trustworthy mood`,
      parameters: "--ar 21:9 --v 6",
      useCase: "Individual listing pages",
    },
    {
      title: "Onboarding Guide",
      prompt: `Illustrated guide for using directory platform, ${baseStyle}, step-by-step visual, friendly and helpful, clear instructions`,
      parameters: "--ar 16:9 --v 6",
      useCase: "Help pages, onboarding",
    },
  ];
}

function getMarketingPrompts(intake: BrandIntake, baseStyle: string): MidjourneyPrompt[] {
  return [
    {
      title: "Hero Section Background",
      prompt: `Dynamic hero background for marketing landing page, ${baseStyle}, attention-grabbing, professional, space for headline text, compelling visual`,
      parameters: "--ar 21:9 --v 6",
      useCase: "Landing page hero sections",
    },
    {
      title: "Feature Benefit Visual",
      prompt: `Abstract illustration of product benefit, ${baseStyle}, clear concept communication, professional but engaging, suitable for marketing materials`,
      parameters: "--ar 4:3 --v 6",
      useCase: "Feature sections, benefit highlights",
    },
    {
      title: "CTA Section Background",
      prompt: `Compelling background for call-to-action section, ${baseStyle}, urgent but not aggressive, motivating mood, space for CTA button and text`,
      parameters: "--ar 16:9 --v 6",
      useCase: "CTA sections, conversion areas",
    },
    {
      title: "Social Proof Visual",
      prompt: `Visual representing testimonials and social proof, ${baseStyle}, trustworthy and credible, diverse representation, authentic feeling`,
      parameters: "--ar 16:9 --style raw --v 6",
      useCase: "Testimonial sections",
    },
    {
      title: "Stats and Numbers",
      prompt: `Visual background for statistics display, ${baseStyle}, data visualization elements, professional charts, credible presentation`,
      parameters: "--ar 16:9 --v 6",
      useCase: "Stats sections, achievements",
    },
    {
      title: "Campaign Hero Image",
      prompt: `Bold campaign hero image, ${baseStyle}, eye-catching composition, brand-forward, suitable for paid advertising, high impact`,
      parameters: "--ar 1:1 --v 6",
      useCase: "Ad campaigns, social ads",
    },
    {
      title: "Email Header",
      prompt: `Email newsletter header design, ${baseStyle}, brand recognition, compelling visual, works at email dimensions, clear focal point`,
      parameters: "--ar 3:1 --v 6",
      useCase: "Email marketing headers",
    },
    {
      title: "Webinar Background",
      prompt: `Professional webinar background, ${baseStyle}, not distracting, space for presenter and slides, credible and polished`,
      parameters: "--ar 16:9 --v 6",
      useCase: "Webinar backdrops, presentations",
    },
    {
      title: "Lead Magnet Cover",
      prompt: `Attractive cover for lead magnet or ebook, ${baseStyle}, professional design, value communication, download-worthy appeal`,
      parameters: "--ar 8:11 --v 6",
      useCase: "Ebook covers, guide downloads",
    },
    {
      title: "Conversion Page Visual",
      prompt: `High-converting landing page visual, ${baseStyle}, trust-building elements, clear value proposition support, professional quality`,
      parameters: "--ar 16:9 --v 6",
      useCase: "Conversion-focused landing pages",
    },
  ];
}

function getContentPrompts(intake: BrandIntake, baseStyle: string): MidjourneyPrompt[] {
  return [
    {
      title: "Article Header Image",
      prompt: `Editorial header image for blog article, ${baseStyle}, professional quality, relevant to ${intake.industry}, engaging but not distracting`,
      parameters: "--ar 21:9 --style raw --v 6",
      useCase: "Blog post headers",
    },
    {
      title: "Category Page Visual",
      prompt: `Visual representation of content category, ${baseStyle}, abstract concept illustration, cohesive with brand, editorial quality`,
      parameters: "--ar 16:9 --v 6",
      useCase: "Category landing pages",
    },
    {
      title: "Author Profile Background",
      prompt: `Subtle background for author profile section, ${baseStyle}, professional but approachable, doesn't compete with profile photo`,
      parameters: "--ar 16:9 --v 6",
      useCase: "Author pages, bio sections",
    },
    {
      title: "Featured Content Card",
      prompt: `Eye-catching visual for featured content card, ${baseStyle}, thumbnail-friendly, intriguing without being clickbait, professional`,
      parameters: "--ar 4:3 --v 6",
      useCase: "Featured posts, content cards",
    },
    {
      title: "Newsletter Template",
      prompt: `Clean newsletter template design, ${baseStyle}, readable layout, space for content, engaging header, professional footer`,
      parameters: "--ar 2:3 --v 6",
      useCase: "Email newsletters",
    },
    {
      title: "Series Branding",
      prompt: `Visual branding for content series, ${baseStyle}, repeatable design element, series recognition, cohesive with main brand`,
      parameters: "--ar 16:9 --v 6",
      useCase: "Content series, themed posts",
    },
    {
      title: "Topic Illustration",
      prompt: `Abstract illustration for ${intake.industry} topic, ${baseStyle}, editorial quality, concept communication, suitable for articles`,
      parameters: "--ar 1:1 --v 6",
      useCase: "In-article illustrations",
    },
    {
      title: "Reading Experience",
      prompt: `Comfortable reading environment aesthetic, ${baseStyle}, cozy but professional, natural lighting, inviting atmosphere`,
      parameters: "--ar 16:9 --style raw --v 6",
      useCase: "About reading experience",
    },
    {
      title: "Archive Page Visual",
      prompt: `Visual for archive or library page, ${baseStyle}, organized collection representation, knowledge and expertise feel`,
      parameters: "--ar 16:9 --v 6",
      useCase: "Archive pages, content libraries",
    },
    {
      title: "Social Share Card",
      prompt: `Optimized social media share card, ${baseStyle}, brand recognition, eye-catching in feed, clear title space, professional`,
      parameters: "--ar 1.91:1 --v 6",
      useCase: "Social media sharing, OG images",
    },
  ];
}

function getMobileAppPrompts(intake: BrandIntake, baseStyle: string): MidjourneyPrompt[] {
  return [
    {
      title: "App Icon Concept",
      prompt: `Modern app icon design, ${baseStyle}, simple and memorable, scalable design, recognizable at small sizes, bold and clear`,
      parameters: "--ar 1:1 --v 6",
      useCase: "App icon design",
    },
    {
      title: "Splash Screen",
      prompt: `App splash screen design, ${baseStyle}, brand presence, loading state, welcoming first impression, clean composition`,
      parameters: "--ar 9:19.5 --v 6",
      useCase: "App launch screen",
    },
    {
      title: "Onboarding Screen 1",
      prompt: `First onboarding screen illustration, ${baseStyle}, welcoming and friendly, clear value proposition, simple and engaging`,
      parameters: "--ar 9:16 --v 6",
      useCase: "Onboarding flow",
    },
    {
      title: "Empty State Illustration",
      prompt: `Friendly empty state illustration, ${baseStyle}, not discouraging, clear call-to-action support, engaging and helpful`,
      parameters: "--ar 1:1 --v 6",
      useCase: "Empty states in app",
    },
    {
      title: "Feature Showcase",
      prompt: `Mobile app feature showcase, ${baseStyle}, phone mockup with UI, professional presentation, clear feature highlight`,
      parameters: "--ar 9:16 --v 6",
      useCase: "App store screenshots",
    },
    {
      title: "Success State",
      prompt: `Success state illustration, ${baseStyle}, celebratory but not over-the-top, positive feedback, user achievement recognition`,
      parameters: "--ar 1:1 --v 6",
      useCase: "Success screens, confirmations",
    },
    {
      title: "App Store Feature Graphic",
      prompt: `App store feature graphic, ${baseStyle}, key feature highlight, attention-grabbing, clear value communication`,
      parameters: "--ar 16:9 --v 6",
      useCase: "App store listing",
    },
    {
      title: "Push Notification Icon",
      prompt: `Push notification icon design, ${baseStyle}, clear and recognizable, small size optimized, brand consistent`,
      parameters: "--ar 1:1 --v 6",
      useCase: "Push notifications",
    },
    {
      title: "In-App Banner",
      prompt: `In-app promotional banner, ${baseStyle}, attention-getting but not intrusive, clear message support, brand aligned`,
      parameters: "--ar 5:2 --v 6",
      useCase: "In-app promotions",
    },
    {
      title: "Tutorial Illustration",
      prompt: `Tutorial step illustration, ${baseStyle}, clear instruction support, simple and understandable, helpful and friendly`,
      parameters: "--ar 4:3 --v 6",
      useCase: "Tutorials, help screens",
    },
  ];
}

function getEnterprisePrompts(intake: BrandIntake, baseStyle: string): MidjourneyPrompt[] {
  return [
    {
      title: "Presentation Title Slide",
      prompt: `Corporate presentation title slide background, ${baseStyle}, professional and sophisticated, space for logo and title, executive-level quality`,
      parameters: "--ar 16:9 --v 6",
      useCase: "PowerPoint/Keynote presentations",
    },
    {
      title: "White Paper Cover",
      prompt: `White paper cover design, ${baseStyle}, authoritative and professional, credible appearance, enterprise quality, clear title space`,
      parameters: "--ar 8:11 --v 6",
      useCase: "White papers, technical documents",
    },
    {
      title: "Case Study Visual",
      prompt: `Professional case study header visual, ${baseStyle}, success and results representation, credible and trustworthy, B2B appropriate`,
      parameters: "--ar 16:9 --v 6",
      useCase: "Case studies, success stories",
    },
    {
      title: "Corporate Event Banner",
      prompt: `Corporate event banner design, ${baseStyle}, professional and polished, company branding space, event atmosphere`,
      parameters: "--ar 3:1 --v 6",
      useCase: "Event materials, conferences",
    },
    {
      title: "Executive Portrait Background",
      prompt: `Subtle background for executive portraits, ${baseStyle}, professional office environment, not distracting, corporate sophisticated`,
      parameters: "--ar 4:5 --v 6",
      useCase: "Executive profiles, team pages",
    },
    {
      title: "Annual Report Visual",
      prompt: `Annual report design element, ${baseStyle}, professional data visualization, corporate credibility, financial sophistication`,
      parameters: "--ar 8:11 --v 6",
      useCase: "Annual reports, financial documents",
    },
    {
      title: "Partnership Announcement",
      prompt: `Visual for partnership announcement, ${baseStyle}, collaborative spirit, professional handshake concept, mutual success representation`,
      parameters: "--ar 16:9 --v 6",
      useCase: "Press releases, announcements",
    },
    {
      title: "Corporate Values",
      prompt: `Abstract visualization of corporate values, ${baseStyle}, ${intake.brandValues[0]} concept, professional and meaningful, sophisticated presentation`,
      parameters: "--ar 1:1 --v 6",
      useCase: "Values pages, culture materials",
    },
    {
      title: "Email Signature Banner",
      prompt: `Professional email signature banner, ${baseStyle}, brand presence, compact design, executive communication appropriate`,
      parameters: "--ar 5:1 --v 6",
      useCase: "Email signatures",
    },
    {
      title: "Conference Booth Background",
      prompt: `Trade show booth background design, ${baseStyle}, brand prominence, professional exhibition quality, attention-grabbing from distance`,
      parameters: "--ar 16:9 --v 6",
      useCase: "Trade shows, exhibitions",
    },
  ];
}
