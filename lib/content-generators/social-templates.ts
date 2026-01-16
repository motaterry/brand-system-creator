import { BrandIntake } from "../schema";

export function generateSocialTemplates(intake: BrandIntake): string {
  let markdown = `# Social Media Templates for ${intake.brandName}\n\n`;
  markdown += `Brand-aligned social media templates and guidelines.\n\n`;
  markdown += `## Brand Voice Reminder\n\n`;
  markdown += `**Characteristics:** ${intake.voiceCharacteristics.join(", ")}\n`;
  markdown += `**Tone:** ${getToneDescription(intake)}\n`;
  markdown += `**Key Messages:**\n${intake.keyMessages.map(m => `- ${m}`).join('\n')}\n\n`;
  markdown += `---\n\n`;

  const templates = [
    generateInstagramPost(intake),
    generateInstagramStory(intake),
    generateLinkedInPost(intake),
    generateTwitterPost(intake),
    generateFacebookPost(intake),
    generateYouTubeThumbnail(intake),
  ];

  templates.forEach((template, index) => {
    markdown += template + '\n\n';
    if (index < templates.length - 1) markdown += '---\n\n';
  });

  markdown += `## General Guidelines\n\n`;
  markdown += `### Color Usage\n`;
  markdown += `- **Primary Color:** Use for main brand elements and CTAs\n`;
  markdown += `- **Secondary Color:** Use for accents and supporting elements\n`;
  markdown += `- **Background:** ${intake.colorPreferences.join(" or ")} tones\n\n`;
  
  markdown += `### Typography\n`;
  markdown += `- **Headlines:** Bold, clear, ${intake.toneAttributes.bold > 7 ? 'impactful' : 'balanced'}\n`;
  markdown += `- **Body Text:** ${intake.toneAttributes.formal > 6 ? 'Professional and polished' : 'Conversational and accessible'}\n`;
  markdown += `- **Captions:** ${intake.voiceCharacteristics.includes('Concise') ? 'Keep concise and to the point' : 'Can be more detailed and story-driven'}\n\n`;
  
  markdown += `### Imagery\n`;
  markdown += `- **Mood:** ${intake.moodKeywords.join(", ")}\n`;
  markdown += `- **Avoid:** ${intake.avoidKeywords.join(", ")}\n`;
  markdown += `- **Style:** Consistent with brand personality (${intake.brandPersonality.join(", ")})\n\n`;
  
  markdown += `### Hashtag Strategy\n`;
  markdown += `- Industry tags related to ${intake.industry}\n`;
  markdown += `- Brand values: #${intake.brandValues.join(" #")}\n`;
  markdown += `- 5-10 hashtags per post for optimal reach\n\n`;

  markdown += `### Content Pillars\n\n`;
  markdown += `Create content around these themes:\n`;
  markdown += `1. **Value/Education:** Share insights about ${intake.primaryUseCase}\n`;
  markdown += `2. **Brand Story:** Communicate ${intake.brandValues[0]} and ${intake.brandValues[1]}\n`;
  markdown += `3. **Community:** Engage with your audience around shared interests\n`;
  markdown += `4. **Product/Service:** Showcase your offerings authentically\n\n`;

  return markdown;
}

function getToneDescription(intake: BrandIntake): string {
  const { formal, playful, bold, minimalist } = intake.toneAttributes;
  let tone = [];
  
  if (formal > 6) tone.push("Formal");
  else if (formal < 4) tone.push("Casual");
  
  if (playful > 6) tone.push("Playful");
  else if (playful < 4) tone.push("Serious");
  
  if (bold > 6) tone.push("Bold");
  else if (bold < 4) tone.push("Subtle");
  
  if (minimalist > 6) tone.push("Minimalist");
  else if (minimalist < 4) tone.push("Complex");
  
  return tone.join(", ");
}

function generateInstagramPost(intake: BrandIntake): string {
  return `## 1. Instagram Post (1080×1080px)

### Layout Specifications

**Dimensions:** 1080×1080px (1:1 ratio)

**Layout Options:**

#### Option A: Bold Statement
- Large headline text (centered)
- Brand colors as background
- Logo in corner (60×60px minimum)
- Minimal design, maximum impact

#### Option B: Image + Text Overlay
- Background image (from Midjourney prompts)
- Text overlay with semi-transparent background
- Headline + subtext
- Logo placement

#### Option C: Grid Layout
- Multiple sections/panels
- Mix of imagery and text
- Color blocking using brand palette
- Visual hierarchy

### Typography
- **Headline:** ${intake.toneAttributes.bold > 6 ? '72-96pt, Bold' : '60-72pt, Semi-bold'}
- **Body:** 36-48pt, Regular
- **Logo/Brand:** Place in bottom-right or top-left

### Color Scheme
- Primary: ${intake.colorPreferences[0]}
- Accent: ${intake.colorPreferences[1] || intake.colorPreferences[0]}
- Text: High contrast for readability

### Content Examples

**Post 1: Value Proposition**
\`\`\`
${intake.keyMessages[0] || intake.positioningStatement.substring(0, 100) + '...'}

Caption: Share the story behind this value. Why does ${intake.brandValues[0]} matter to ${intake.brandName}? Use 1-2 paragraphs to connect emotionally.

Hashtags: #${intake.industry.replace(/\s/g, '')} #${intake.brandValues[0]} #${intake.brandValues[1]} [+ 5-7 more]
\`\`\`

**Post 2: Behind the Scenes**
\`\`\`
Give your audience a peek into how ${intake.brandName} works.

Caption: Authentic storytelling about your process, team, or mission. Show the human side of your brand.

Hashtags: Focus on community and authenticity tags
\`\`\`

**Post 3: Educational Content**
\`\`\`
Quick tip or insight about ${intake.primaryUseCase}

Caption: Share expertise in ${intake.industry}. Position ${intake.brandName} as a trusted resource.

Hashtags: Educational + industry-specific tags
\`\`\``;
}

function generateInstagramStory(intake: BrandIntake): string {
  return `## 2. Instagram Story (1080×1920px)

### Layout Specifications

**Dimensions:** 1080×1920px (9:16 ratio)

**Safe Zones:**
- Top: Avoid 250px (profile picture area)
- Bottom: Avoid 300px (swipe-up/interactive elements)
- Design focus: Middle 1370px

### Story Templates

#### Template 1: Announcement
- Full-bleed background (brand color or image)
- Centered headline (top third)
- Supporting text (middle)
- CTA sticker (bottom safe zone)

#### Template 2: Poll/Question
- Brand-colored background
- Question at top
- Poll sticker in middle
- Engage with personality: ${intake.brandPersonality[0]}

#### Template 3: Swipe Series (3-5 frames)
- Consistent header design
- Frame counter (1/5, 2/5, etc.)
- Progressive information
- Ending with CTA

### Typography
- **Headlines:** 84-120pt
- **Body Text:** 48-60pt
- **Minimum Text Size:** 40pt for readability

### Interactive Elements
- **Polls:** Use brand colors
- **Questions:** Align with voice (${intake.voiceCharacteristics[0]})
- **Quizzes:** Fun way to educate about ${intake.primaryUseCase}
- **Countdown:** For launches or events

### Content Ideas

1. **Quick Tip Series:** Share 5 tips about ${intake.industry}
2. **Day in the Life:** Show ${intake.brandName} in action
3. **Q&A:** Answer common questions about ${intake.primaryUseCase}
4. **Behind the Scenes:** Authentic glimpses into your work
5. **User Spotlight:** Feature customer stories (with permission)`;
}

function generateLinkedInPost(intake: BrandIntake): string {
  return `## 3. LinkedIn Post

### Image Specifications

**Dimensions:** 1200×627px (1.91:1 ratio)

**Layout:**
- Professional but engaging design
- Clear value proposition
- Company logo visible
- Text overlay (if using image)

### Content Strategy

LinkedIn is ideal for:
- ${intake.brandValues.includes('Innovation') || intake.brandValues.includes('Excellence') ? 'Thought leadership' : 'Industry insights'}
- Professional updates about ${intake.brandName}
- Case studies and success stories
- Industry trends in ${intake.industry}

### Post Format

#### Structure
1. **Hook:** Start with attention-grabbing first line
2. **Value:** Deliver on the promise
3. **Context:** Relate to ${intake.primaryUseCase}
4. **CTA:** Encourage meaningful engagement

#### Tone
- ${intake.toneAttributes.formal > 5 ? 'Professional and polished' : 'Professional but conversational'}
- ${intake.voiceCharacteristics.includes('Expert') ? 'Demonstrate expertise' : 'Share authentic experiences'}
- Avoid: ${intake.avoidKeywords.join(", ")}

### Content Examples

**Post 1: Industry Insight**
\`\`\`
[Hook: Surprising statistic or question about ${intake.industry}]

[2-3 paragraphs expanding on the insight, relating to ${intake.brandValues[0]} and ${intake.brandValues[1]}]

[Close with actionable takeaway]

What's your experience with this? Share in comments 👇
\`\`\`

**Post 2: Case Study**
\`\`\`
How [Client/Customer] achieved [specific result] with ${intake.brandName}

The Challenge: [Brief problem description]
The Solution: [How ${intake.brandName} helped]
The Results: [Specific, measurable outcomes]

[Key lessons learned]

Interested in similar results? Let's connect.
\`\`\`

**Post 3: Company Update**
\`\`\`
[Exciting update about ${intake.brandName}]

This matters because [connect to ${intake.positioningStatement.substring(0, 150)}...]

[What this means for your audience]

[Call to engagement]
\`\`\``;
}

function generateTwitterPost(intake: BrandIntake): string {
  return `## 4. Twitter/X Post

### Image Specifications

**Dimensions:** 1200×675px (16:9 ratio)

**Design:**
- High contrast for mobile viewing
- Bold typography
- Brand colors prominent
- Logo visible but not dominant

### Content Strategy

Twitter excels at:
- Quick insights and tips
- Industry commentary
- Real-time updates
- Community engagement

### Character Strategy
- Optimal: 100-120 characters (higher engagement)
- Maximum: 280 characters
- Use threads for longer thoughts

### Tweet Types

#### 1. Value Tweet
\`\`\`
[One key insight about ${intake.primaryUseCase}]

Why it matters: [Brief explanation]

[Relevant hashtag]
\`\`\`

#### 2. Question Tweet
\`\`\`
What's your biggest challenge with ${intake.industry}?

${intake.brandName} wants to help. Drop your questions 👇
\`\`\`

#### 3. Thread Starter
\`\`\`
🧵 5 things you should know about ${intake.primaryUseCase}

Thread 👇

1/ [First point with detail]
2/ [Second point]
...
5/ [Final point with CTA]
\`\`\`

#### 4. Announcement
\`\`\`
Big news from ${intake.brandName} 🎉

[Brief announcement focusing on ${intake.keyMessages[0] || 'key value'}]

Learn more: [link]
\`\`\`

### Hashtag Strategy
- 1-2 hashtags maximum (unlike Instagram)
- Focus on trending industry tags
- Create branded hashtag: #${intake.brandName.replace(/\s/g, '')}

### Voice Guidelines
- ${intake.voiceCharacteristics.includes('Concise') ? 'Be brief and punchy' : 'Tell micro-stories'}
- ${intake.brandPersonality.includes('Friendly') ? 'Conversational and approachable' : 'Professional and authoritative'}
- Emoji usage: ${intake.toneAttributes.playful > 6 ? 'Moderate use 👍' : 'Minimal and strategic ✓'}`;
}

function generateFacebookPost(intake: BrandIntake): string {
  return `## 5. Facebook Post

### Image Specifications

**Dimensions:** 1200×630px (1.91:1 ratio)

**Cover Photo:** 820×312px
**Profile Picture:** 170×170px

### Content Strategy

Facebook works well for:
- Community building
- Longer-form content
- Event promotion
- Customer stories

### Post Structure

#### Long-Form Posts
Facebook allows longer captions - use them strategically:

\`\`\`
[Engaging opening - question or story hook]

[2-4 paragraphs of value]
- Share expertise about ${intake.primaryUseCase}
- Connect to ${intake.brandValues[0]}
- Add personal or brand story

[Clear call-to-action]

[Relevant link]
\`\`\`

#### Short Updates
\`\`\`
[Single impactful statement or question]

[Encourage comments]
\`\`\`

### Image Posts

#### Option 1: Single Image
- Branded visual from Midjourney prompts
- Text overlay with key message
- Logo in corner

#### Option 2: Carousel (up to 10 images)
- Tell a story across slides
- Educational content series
- Before/after transformations
- Product/service showcase

### Content Calendar Ideas

**Monday:** Motivation/Weekly Goal
- Align with ${intake.brandValues[0]}

**Wednesday:** Educational Post
- Tips about ${intake.primaryUseCase}

**Friday:** Community Engagement
- Question or poll
- Share customer stories

**Weekend:** Behind-the-Scenes
- Team highlights
- Company culture
- ${intake.brandPersonality[0]} personality

### Facebook-Specific Features

- **Facebook Live:** Host Q&As or behind-the-scenes tours
- **Events:** Promote webinars, launches, or community gatherings
- **Groups:** Build community around ${intake.brandName}
- **Stories:** 1080×1920px, similar to Instagram but longer lifespan`;
}

function generateYouTubeThumbnail(intake: BrandIntake): string {
  return `## 6. YouTube Thumbnail

### Specifications

**Dimensions:** 1280×720px (16:9 ratio)
**File Size:** Under 2MB
**Format:** JPG, PNG, or GIF

### Design Principles

#### Rule of Thirds
- Place face/focal point on intersection points
- Text in top or bottom third
- Leave breathing room

#### Contrast
- High contrast between foreground and background
- Text must be readable at small sizes
- Use brand colors strategically

#### Consistency
- Develop recognizable thumbnail style
- Same layout/font across series
- Brand colors consistent

### Typography

**Headline Text:**
- Font size: 80-120pt
- Style: ${intake.toneAttributes.bold > 6 ? 'Bold, high impact' : 'Clear, readable'}
- Max words: 4-6 words
- Color: High contrast with background

**Best Practices:**
- All caps for impact (if aligned with brand voice)
- Outline or shadow for legibility
- No text in lower 20% (YouTube UI overlap)

### Layout Templates

#### Template 1: Face + Text
\`\`\`
- Large face on one side (expressive)
- Bold text on opposite side
- Brand colors in background
- Small logo in corner
\`\`\`

#### Template 2: Split Screen
\`\`\`
- Two contrasting images/concepts
- "VS" or comparison visual
- Text overlay identifying both sides
\`\`\`

#### Template 3: Problem/Solution
\`\`\`
- Before/After visual
- Arrow or transformation indicator
- Benefit-focused text
\`\`\`

#### Template 4: Number/List
\`\`\`
- Large number (if list video)
- Key topic words
- Intriguing visual related to content
\`\`\`

### Series Branding

If creating video series:
- Consistent header bar or border
- Series name/logo placement
- Episode number
- Color coding by series

### Content Themes for ${intake.brandName}

1. **Educational:** "How to [achieve result] with [your method]"
2. **Behind-Scenes:** "Inside ${intake.brandName}"
3. **Case Studies:** "[Customer] Success Story"
4. **Tutorials:** "Complete Guide to ${intake.primaryUseCase}"
5. **Industry Insights:** "State of ${intake.industry} in 2026"

### Testing Recommendations
- A/B test different styles
- Analyze which thumbnails get best CTR
- Adjust based on audience response
- Keep evolving while maintaining brand consistency`;
}
