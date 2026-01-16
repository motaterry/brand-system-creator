import { BrandIntake } from "../schema";

export function generateComponentSpecs(intake: BrandIntake): string {
  let markdown = `# Component Specifications for ${intake.brandName}\n\n`;
  markdown += `UI component guidelines and specifications.\n\n`;
  markdown += `## Design System Foundation\n\n`;
  markdown += `These components are built on the design tokens defined in the \`/tokens\` folder.\n\n`;
  markdown += `**Refer to:**\n`;
  markdown += `- \`tokens.css\` for CSS variables\n`;
  markdown += `- \`figma-tokens.json\` for Figma Tokens plugin\n`;
  markdown += `- \`tokens.js\` for JavaScript/React implementations\n\n`;
  markdown += `---\n\n`;

  markdown += generateButtonSpecs(intake);
  markdown += generateFormSpecs(intake);
  markdown += generateCardSpecs(intake);
  markdown += generateNavigationSpecs(intake);
  
  if (intake.outputPreset.includes('directory-seo') || intake.outputPreset.includes('content-platform')) {
    markdown += generateListingCardSpecs(intake);
    markdown += generateFilterSpecs(intake);
  }

  markdown += generateModalSpecs(intake);
  markdown += generateGeneralGuidelines(intake);

  return markdown;
}

function generateButtonSpecs(intake: BrandIntake): string {
  const isBold = intake.toneAttributes.bold > 6;
  const isMinimalist = intake.toneAttributes.minimalist > 6;

  return `## 1. Buttons\n\n### Primary Button\n\n**Purpose:** Main call-to-action, highest priority actions\n\n**Visual Specifications:**\n\`\`\`css
.button-primary {
  /* Color */
  background-color: var(--color-primary);
  color: white;
  border: none;
  
  /* Typography */
  font-size: var(--font-size-base);
  font-weight: ${isBold ? '700' : '600'};
  letter-spacing: ${isBold ? '0.02em' : '0'};
  text-transform: ${isBold ? 'uppercase' : 'none'};
  
  /* Spacing */
  padding: var(--spacing-3) var(--spacing-6);
  
  /* Border */
  border-radius: var(--radius-base);
  
  /* Effects */
  box-shadow: var(--shadow-sm);
  transition: all 0.2s ease;
  cursor: pointer;
}

.button-primary:hover {
  background-color: var(--color-primary-dark);
  box-shadow: var(--shadow-md);
  transform: ${isMinimalist ? 'none' : 'translateY(-1px)'};
}

.button-primary:active {
  transform: translateY(0);
  box-shadow: var(--shadow-sm);
}

.button-primary:disabled {
  background-color: var(--color-neutral-400);
  cursor: not-allowed;
  opacity: 0.6;
}
\`\`\`\n\n**Sizes:**\n\n\`\`\`css
.button-small {
  padding: var(--spacing-2) var(--spacing-4);
  font-size: var(--font-size-sm);
}

.button-medium {
  /* Default size shown above */
}

.button-large {
  padding: var(--spacing-4) var(--spacing-8);
  font-size: var(--font-size-lg);
}
\`\`\`\n\n### Secondary Button\n\n**Purpose:** Secondary actions, less emphasis than primary\n\n**Visual Specifications:**\n\`\`\`css
.button-secondary {
  background-color: transparent;
  color: var(--color-primary);
  border: 2px solid var(--color-primary);
  
  /* Typography */
  font-size: var(--font-size-base);
  font-weight: ${isBold ? '600' : '500'};
  
  /* Spacing */
  padding: var(--spacing-3) var(--spacing-6);
  
  /* Border */
  border-radius: var(--radius-base);
  
  /* Effects */
  transition: all 0.2s ease;
  cursor: pointer;
}

.button-secondary:hover {
  background-color: var(--color-primary);
  color: white;
}

.button-secondary:active {
  background-color: var(--color-primary-dark);
}
\`\`\`\n\n### Ghost/Tertiary Button\n\n**Purpose:** Subtle actions, minimal emphasis\n\n**Visual Specifications:**\n\`\`\`css
.button-ghost {
  background-color: transparent;
  color: var(--color-neutral-700);
  border: none;
  
  padding: var(--spacing-2) var(--spacing-4);
  border-radius: var(--radius-base);
  
  transition: all 0.2s ease;
  cursor: pointer;
}

.button-ghost:hover {
  background-color: var(--color-neutral-100);
  color: var(--color-primary);
}
\`\`\`\n\n### Usage Guidelines\n\n- **Primary Button:** Use only once per screen section (hero CTA, form submit)
- **Secondary Button:** Use for alternative actions (Learn More, Cancel)
- **Ghost Button:** Use for low-priority actions (Skip, Dismiss)
- **Button Text:** ${intake.voiceCharacteristics.includes('Concise') ? 'Keep concise: 1-3 words' : 'Be clear: 2-5 words'}
- **Tone:** ${intake.brandPersonality[0]}, action-oriented\n\n### Accessibility\n\n- Minimum touch target: 44×44px
- Color contrast: Minimum 4.5:1
- Focus state: Visible outline
- Aria labels for icon-only buttons\n\n---\n\n`;
}

function generateFormSpecs(intake: BrandIntake): string {
  const isMinimalist = intake.toneAttributes.minimalist > 6;

  return `## 2. Form Elements\n\n### Text Input\n\n**Visual Specifications:**\n\`\`\`css
.input-text {
  /* Base */
  width: 100%;
  padding: var(--spacing-3) var(--spacing-4);
  
  /* Typography */
  font-size: var(--font-size-base);
  font-family: inherit;
  color: var(--color-neutral-900);
  
  /* Border */
  border: 2px solid var(--color-neutral-300);
  border-radius: var(--radius-base);
  
  /* Effects */
  background-color: white;
  transition: border-color 0.2s ease;
}

.input-text:focus {
  outline: none;
  border-color: var(--color-primary);
  ${!isMinimalist ? 'box-shadow: 0 0 0 3px var(--color-primary-light);' : ''}
}

.input-text:disabled {
  background-color: var(--color-neutral-100);
  cursor: not-allowed;
}

.input-text.error {
  border-color: #EF4444;
}
\`\`\`\n\n**Label:**\n\`\`\`css
.input-label {
  display: block;
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-neutral-700);
  margin-bottom: var(--spacing-2);
}
\`\`\`\n\n**Helper Text:**\n\`\`\`css
.input-helper {
  font-size: var(--font-size-xs);
  color: var(--color-neutral-500);
  margin-top: var(--spacing-1);
}

.input-error-message {
  font-size: var(--font-size-xs);
  color: #EF4444;
  margin-top: var(--spacing-1);
}
\`\`\`\n\n### Textarea\n\n**Extends text input styles, with:**\n\`\`\`css
.textarea {
  /* Inherits input-text styles */
  min-height: 120px;
  resize: vertical;
  font-family: inherit;
}
\`\`\`\n\n### Select Dropdown\n\n**Visual Specifications:**\n\`\`\`css
.select {
  /* Base - similar to input-text */
  width: 100%;
  padding: var(--spacing-3) var(--spacing-4);
  padding-right: var(--spacing-10); /* Space for arrow */
  
  /* Typography */
  font-size: var(--font-size-base);
  font-family: inherit;
  
  /* Border */
  border: 2px solid var(--color-neutral-300);
  border-radius: var(--radius-base);
  
  /* Native appearance */
  appearance: none;
  background-color: white;
  background-image: url("data:image/svg+xml,..."); /* Dropdown arrow */
  background-repeat: no-repeat;
  background-position: right var(--spacing-4) center;
  
  cursor: pointer;
}

.select:focus {
  outline: none;
  border-color: var(--color-primary);
}
\`\`\`\n\n### Checkbox\n\n**Visual Specifications:**\n\`\`\`css
.checkbox-wrapper {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
}

.checkbox {
  width: 20px;
  height: 20px;
  border: 2px solid var(--color-neutral-400);
  border-radius: var(--radius-sm);
  cursor: pointer;
  
  /* Custom styling with accent-color */
  accent-color: var(--color-primary);
}

.checkbox-label {
  font-size: var(--font-size-base);
  color: var(--color-neutral-700);
  cursor: pointer;
}
\`\`\`\n\n### Radio Button\n\n**Similar to checkbox but circular:**\n\`\`\`css
.radio {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  accent-color: var(--color-primary);
}
\`\`\`\n\n### Form Layout Guidelines\n\n- **Field Spacing:** var(--spacing-6) between fields
- **Label Position:** Above input (stack vertically)
- **Required Fields:** Mark with asterisk or "(required)"
- **Error Handling:** Show errors below field, red border, clear message
- **Success State:** Green border, checkmark icon
- **Validation:** ${intake.voiceCharacteristics.includes('Friendly') ? 'Helpful, friendly error messages' : 'Clear, direct error messages'}\n\n---\n\n`;
}

function generateCardSpecs(intake: BrandIntake): string {
  const isMinimalist = intake.toneAttributes.minimalist > 6;
  const hasShadow = !intake.avoidKeywords.some(k => k.toLowerCase().includes('shadow'));

  return `## 3. Cards\n\n### Basic Card\n\n**Purpose:** Content containers, grouping related information\n\n**Visual Specifications:**\n\`\`\`css
.card {
  /* Layout */
  display: flex;
  flex-direction: column;
  
  /* Spacing */
  padding: var(--spacing-6);
  
  /* Border */
  background-color: white;
  border: ${isMinimalist ? '1px solid var(--color-neutral-200)' : 'none'};
  border-radius: var(--radius-lg);
  
  /* Effects */
  ${hasShadow ? 'box-shadow: var(--shadow-md);' : ''}
  transition: all 0.2s ease;
}

.card:hover {
  ${hasShadow ? 'box-shadow: var(--shadow-lg);' : 'border-color: var(--color-primary);'}
  ${!isMinimalist ? 'transform: translateY(-2px);' : ''}
}
\`\`\`\n\n### Card with Image\n\n**Structure:**\n\`\`\`html
<div class="card-with-image">
  <img class="card-image" src="..." alt="..." />
  <div class="card-content">
    <h3 class="card-title">Title</h3>
    <p class="card-description">Description...</p>
    <a class="card-link">Read more →</a>
  </div>
</div>
\`\`\`\n\n**Styles:**\n\`\`\`css
.card-with-image {
  /* Extends .card */
  padding: 0;
  overflow: hidden;
}

.card-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card-content {
  padding: var(--spacing-6);
}

.card-title {
  font-size: var(--font-size-xl);
  font-weight: 700;
  color: var(--color-neutral-900);
  margin-bottom: var(--spacing-2);
}

.card-description {
  font-size: var(--font-size-base);
  color: var(--color-neutral-600);
  line-height: 1.6;
  margin-bottom: var(--spacing-4);
}

.card-link {
  color: var(--color-primary);
  font-weight: 600;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-1);
}
\`\`\`\n\n### Card Grid Layout\n\n**Responsive grid:**\n\`\`\`css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--spacing-6);
  padding: var(--spacing-8) 0;
}

@media (max-width: 768px) {
  .card-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-4);
  }
}
\`\`\`\n\n### Usage Guidelines\n\n- **Content:** Keep card content concise and scannable
- **Images:** Use consistent aspect ratios across card grids
- **Actions:** Max 1-2 actions per card
- **Hover:** Provide visual feedback on interactive cards\n\n---\n\n`;
}

function generateNavigationSpecs(intake: BrandIntake): string {
  const isFormal = intake.toneAttributes.formal > 6;

  return `## 4. Navigation\n\n### Header/Navigation Bar\n\n**Structure:**\n\`\`\`html
<header class="header">
  <div class="header-container">
    <a class="logo" href="/">
      <img src="logo.svg" alt="${intake.brandName}" />
    </a>
    <nav class="nav-menu">
      <a class="nav-link" href="/features">Features</a>
      <a class="nav-link" href="/pricing">Pricing</a>
      <a class="nav-link" href="/about">About</a>
      <a class="nav-link" href="/contact">Contact</a>
    </nav>
    <div class="nav-actions">
      <button class="button-secondary">Log In</button>
      <button class="button-primary">Sign Up</button>
    </div>
  </div>
</header>
\`\`\`\n\n**Styles:**\n\`\`\`css
.header {
  background-color: white;
  border-bottom: 1px solid var(--color-neutral-200);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--spacing-4) var(--spacing-6);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-8);
}

.logo img {
  height: 40px;
  width: auto;
}

.nav-menu {
  display: flex;
  gap: var(--spacing-6);
  align-items: center;
}

.nav-link {
  color: var(--color-neutral-700);
  text-decoration: none;
  font-size: var(--font-size-base);
  font-weight: ${isFormal ? '500' : '400'};
  transition: color 0.2s ease;
}

.nav-link:hover {
  color: var(--color-primary);
}

.nav-link.active {
  color: var(--color-primary);
  font-weight: 600;
}

.nav-actions {
  display: flex;
  gap: var(--spacing-3);
}
\`\`\`\n\n### Mobile Navigation\n\n**Hamburger Menu:**\n\`\`\`css
.mobile-menu-toggle {
  display: none;
  background: none;
  border: none;
  padding: var(--spacing-2);
  cursor: pointer;
}

@media (max-width: 768px) {
  .nav-menu,
  .nav-actions {
    display: none;
  }
  
  .mobile-menu-toggle {
    display: block;
  }
  
  .nav-menu.mobile-open {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    padding: var(--spacing-4);
    box-shadow: var(--shadow-lg);
  }
}
\`\`\`\n\n### Breadcrumbs\n\n**For directory/content sites:**\n\`\`\`html
<nav class="breadcrumbs" aria-label="Breadcrumb">
  <a href="/">Home</a>
  <span class="breadcrumb-separator">›</span>
  <a href="/category">Category</a>
  <span class="breadcrumb-separator">›</span>
  <span class="breadcrumb-current">Current Page</span>
</nav>
\`\`\`\n\n**Styles:**\n\`\`\`css
.breadcrumbs {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  font-size: var(--font-size-sm);
  color: var(--color-neutral-600);
  padding: var(--spacing-4) 0;
}

.breadcrumbs a {
  color: var(--color-primary);
  text-decoration: none;
}

.breadcrumb-separator {
  color: var(--color-neutral-400);
}

.breadcrumb-current {
  color: var(--color-neutral-900);
  font-weight: 500;
}
\`\`\`\n\n---\n\n`;
}

function generateListingCardSpecs(intake: BrandIntake): string {
  return `## 5. Listing Cards (Directory/SEO)\n\n### Search Result Card\n\n**Purpose:** Display individual listings in search results\n\n**Structure:**\n\`\`\`html
<article class="listing-card">
  <img class="listing-image" src="..." alt="..." />
  <div class="listing-content">
    <div class="listing-header">
      <h3 class="listing-title">Listing Title</h3>
      <div class="listing-rating">
        <span class="stars">★★★★☆</span>
        <span class="rating-count">(24 reviews)</span>
      </div>
    </div>
    <p class="listing-description">Brief description...</p>
    <div class="listing-meta">
      <span class="listing-location">📍 Location</span>
      <span class="listing-category">Category</span>
    </div>
    <div class="listing-footer">
      <span class="listing-price">$$$</span>
      <a href="..." class="listing-link">View Details →</a>
    </div>
  </div>
</article>
\`\`\`\n\n**Styles:**\n\`\`\`css
.listing-card {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: var(--spacing-4);
  padding: var(--spacing-4);
  border: 1px solid var(--color-neutral-200);
  border-radius: var(--radius-lg);
  transition: all 0.2s ease;
}

.listing-card:hover {
  border-color: var(--color-primary);
  box-shadow: var(--shadow-md);
}

.listing-image {
  width: 200px;
  height: 150px;
  object-fit: cover;
  border-radius: var(--radius-base);
}

.listing-title {
  font-size: var(--font-size-lg);
  font-weight: 700;
  color: var(--color-neutral-900);
  margin-bottom: var(--spacing-1);
}

.listing-rating {
  display: flex;
  align-items: center;
  gap: var(--spacing-1);
  font-size: var(--font-size-sm);
}

.stars {
  color: #F59E0B;
}

.listing-description {
  font-size: var(--font-size-sm);
  color: var(--color-neutral-600);
  margin: var(--spacing-2) 0;
  line-height: 1.5;
}

.listing-meta {
  display: flex;
  gap: var(--spacing-3);
  font-size: var(--font-size-sm);
  color: var(--color-neutral-500);
  margin-bottom: var(--spacing-3);
}

.listing-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.listing-link {
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 600;
}
\`\`\`\n\n### Category Card\n\n**Purpose:** Navigate to listing categories\n\n**Styles:**\n\`\`\`css
.category-card {
  padding: var(--spacing-6);
  text-align: center;
  background: linear-gradient(135deg, var(--color-primary-light), var(--color-primary));
  border-radius: var(--radius-lg);
  color: white;
  transition: transform 0.2s ease;
}

.category-card:hover {
  transform: scale(1.05);
}

.category-icon {
  font-size: 48px;
  margin-bottom: var(--spacing-3);
}

.category-title {
  font-size: var(--font-size-xl);
  font-weight: 700;
}

.category-count {
  font-size: var(--font-size-sm);
  opacity: 0.9;
}
\`\`\`\n\n---\n\n`;
}

function generateFilterSpecs(intake: BrandIntake): string {
  return `## 6. Filters and Search\n\n### Filter Sidebar\n\n**Structure:**\n\`\`\`html
<aside class="filter-sidebar">
  <div class="filter-section">
    <h4 class="filter-title">Category</h4>
    <div class="filter-options">
      <label class="filter-option">
        <input type="checkbox" name="category" value="option1" />
        <span>Option 1</span>
      </label>
      <!-- More options... -->
    </div>
  </div>
  <!-- More filter sections... -->
</aside>
\`\`\`\n\n**Styles:**\n\`\`\`css
.filter-sidebar {
  background: white;
  border: 1px solid var(--color-neutral-200);
  border-radius: var(--radius-lg);
  padding: var(--spacing-6);
  position: sticky;
  top: 100px;
}

.filter-section {
  margin-bottom: var(--spacing-6);
}

.filter-section:last-child {
  margin-bottom: 0;
}

.filter-title {
  font-size: var(--font-size-base);
  font-weight: 700;
  color: var(--color-neutral-900);
  margin-bottom: var(--spacing-3);
}

.filter-option {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  padding: var(--spacing-2) 0;
  cursor: pointer;
}

.filter-option input[type="checkbox"] {
  accent-color: var(--color-primary);
}
\`\`\`\n\n### Search Bar\n\n**Styles:**\n\`\`\`css
.search-bar {
  position: relative;
  width: 100%;
  max-width: 600px;
}

.search-input {
  width: 100%;
  padding: var(--spacing-3) var(--spacing-12) var(--spacing-3) var(--spacing-4);
  font-size: var(--font-size-lg);
  border: 2px solid var(--color-neutral-300);
  border-radius: var(--radius-full);
}

.search-icon {
  position: absolute;
  right: var(--spacing-4);
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-neutral-400);
}

.search-input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 4px var(--color-primary-light);
}
\`\`\`\n\n---\n\n`;
}

function generateModalSpecs(intake: BrandIntake): string {
  return `## 7. Modals and Overlays\n\n### Modal Dialog\n\n**Structure:**\n\`\`\`html
<div class="modal-overlay">
  <div class="modal">
    <button class="modal-close" aria-label="Close">×</button>
    <h3 class="modal-title">Modal Title</h3>
    <div class="modal-content">
      <!-- Content here -->
    </div>
    <div class="modal-actions">
      <button class="button-secondary">Cancel</button>
      <button class="button-primary">Confirm</button>
    </div>
  </div>
</div>
\`\`\`\n\n**Styles:**\n\`\`\`css
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: var(--spacing-4);
}

.modal {
  background: white;
  border-radius: var(--radius-xl);
  padding: var(--spacing-8);
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: var(--shadow-2xl);
}

.modal-close {
  position: absolute;
  top: var(--spacing-4);
  right: var(--spacing-4);
  background: none;
  border: none;
  font-size: 32px;
  cursor: pointer;
  color: var(--color-neutral-400);
}

.modal-title {
  font-size: var(--font-size-2xl);
  font-weight: 700;
  margin-bottom: var(--spacing-4);
}

.modal-actions {
  display: flex;
  gap: var(--spacing-3);
  justify-content: flex-end;
  margin-top: var(--spacing-6);
}
\`\`\`\n\n### Toast Notification\n\n**Styles:**\n\`\`\`css
.toast {
  position: fixed;
  bottom: var(--spacing-4);
  right: var(--spacing-4);
  background: var(--color-neutral-900);
  color: white;
  padding: var(--spacing-4) var(--spacing-6);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
  animation: slideIn 0.3s ease;
}

.toast.success {
  background: #10B981;
}

.toast.error {
  background: #EF4444;
}

@keyframes slideIn {
  from {
    transform: translateX(400px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
\`\`\`\n\n---\n\n`;
}

function generateGeneralGuidelines(intake: BrandIntake): string {
  return `## General Component Guidelines\n\n### Spacing System\n\nUse consistent spacing from design tokens:\n- **Component padding:** var(--spacing-4) to var(--spacing-6)
- **Element gaps:** var(--spacing-2) to var(--spacing-4)
- **Section spacing:** var(--spacing-8) to var(--spacing-12)\n\n### Typography Hierarchy\n\n- **H1 (Page Title):** var(--font-size-4xl), weight 700
- **H2 (Section Title):** var(--font-size-2xl), weight 700
- **H3 (Subsection):** var(--font-size-xl), weight 600
- **Body Text:** var(--font-size-base), weight 400
- **Small Text:** var(--font-size-sm), weight 400\n\n### Color Usage\n\n- **Primary Color:** CTAs, links, key actions
- **Secondary Color:** Accents, supporting elements
- **Neutral Grays:** Text, borders, backgrounds
- **Semantic Colors:**
  - Success: #10B981 (green)
  - Error: #EF4444 (red)
  - Warning: #F59E0B (orange)
  - Info: #3B82F6 (blue)\n\n### Responsive Design\n\n**Breakpoints:**\n\`\`\`css
/* Mobile First Approach */
/* Base: < 768px (mobile) */
@media (min-width: 768px) { /* Tablet */ }
@media (min-width: 1024px) { /* Desktop */ }
@media (min-width: 1440px) { /* Large Desktop */ }
\`\`\`\n\n**Guidelines:**
- Design mobile-first
- Stack columns vertically on mobile
- Reduce spacing on smaller screens
- Ensure touch targets are 44×44px minimum
- Test on real devices\n\n### Accessibility Standards\n\n- **Color Contrast:** Minimum 4.5:1 for text
- **Focus States:** Always visible and clear
- **Keyboard Navigation:** All interactive elements accessible
- **Alt Text:** All images must have descriptive alt text
- **ARIA Labels:** Use for screen readers
- **Semantic HTML:** Use proper HTML5 elements\n\n### Animation Guidelines\n\n- **Duration:** 150-300ms for micro-interactions
- **Easing:** ease or ease-out for natural feel
- **Purpose:** Enhance UX, never just decoration
- **Respect prefers-reduced-motion:** ${intake.moodKeywords.some(k => k.toLowerCase().includes('calm')) ? 'Minimize animations' : 'Use subtle animations'}\n\n### Component States\n\nAll interactive components should have:\n1. **Default:** Resting state
2. **Hover:** Mouse over
3. **Active:** Being clicked/pressed
4. **Focus:** Keyboard focus
5. **Disabled:** Not available
6. **Loading:** Processing (if applicable)\n\n### Brand Voice in Components\n\n**Tone:** ${intake.voiceCharacteristics.join(", ")}
**Personality:** ${intake.brandPersonality.join(", ")}\n\n**Microcopy Guidelines:**
- Button text: ${intake.voiceCharacteristics.includes('Concise') ? 'Keep to 1-3 words' : 'Be clear and descriptive'}
- Error messages: ${intake.voiceCharacteristics.includes('Friendly') ? 'Helpful and supportive' : 'Clear and direct'}
- Help text: ${intake.voiceCharacteristics.includes('Educational') ? 'Informative and guiding' : 'Brief and to the point'}
- Loading states: "${intake.brandPersonality.includes('Friendly') ? 'Hang tight...' : 'Loading...'}"
- Empty states: "${intake.brandPersonality.includes('Friendly') ? 'Nothing here yet!' : 'No items found'}"\n\n---\n\n## Implementation Notes\n\n### Framework Integration\n\n**React Example:**\n\`\`\`jsx
import tokens from './tokens.js';

const Button = ({ variant = 'primary', size = 'medium', children }) => {
  return (
    <button 
      className={\`button button-\${variant} button-\${size}\`}
      style={{
        backgroundColor: variant === 'primary' ? tokens.colors.primary : 'transparent'
      }}
    >
      {children}
    </button>
  );
};
\`\`\`\n\n**Vue Example:**\n\`\`\`vue
<template>
  <button :class="buttonClasses" :style="buttonStyles">
    <slot />
  </button>
</template>

<script>
import tokens from './tokens.js';

export default {
  props: {
    variant: { type: String, default: 'primary' },
    size: { type: String, default: 'medium' }
  },
  computed: {
    buttonClasses() {
      return \`button button-\${this.variant} button-\${this.size}\`;
    },
    buttonStyles() {
      return {
        backgroundColor: this.variant === 'primary' ? tokens.colors.primary : 'transparent'
      };
    }
  }
};
</script>
\`\`\`\n\n### Testing Checklist\n\n- [ ] Component renders correctly on mobile, tablet, desktop
- [ ] All interactive states work (hover, active, focus, disabled)
- [ ] Keyboard navigation works
- [ ] Screen reader announces correctly
- [ ] Color contrast meets WCAG AA standards
- [ ] Component matches brand personality: ${intake.brandPersonality[0]}
- [ ] Loading and error states handled gracefully
- [ ] Works in major browsers (Chrome, Firefox, Safari, Edge)\n\n---\n\n**Remember:** These components should feel ${intake.moodKeywords.slice(0, 2).join(' and ')} while maintaining ${intake.brandValues[0]} in every interaction.`;
}
