import { generateFigmaTokens, generateCSSTokens, generateJSTokens, generateStyleDictionary, generateTokensReadme } from '../lib/content-generators/tokens';
import { generateMidjourneyPrompts } from '../lib/content-generators/midjourney-prompts';
import { generateSocialTemplates } from '../lib/content-generators/social-templates';
import { generateLandingSections } from '../lib/content-generators/landing-sections';
import { generateLogoConcepts } from '../lib/content-generators/logo-concepts';
import { generateComponentSpecs } from '../lib/content-generators/components';
import * as fs from 'fs';
import * as path from 'path';

const intakePath = path.join(process.cwd(), 'downloaded brand pack sample/intake/brand_intake.json');
const intake = JSON.parse(fs.readFileSync(intakePath, 'utf8'));

console.log('🚀 Generating content for:', intake.brandName);

// Tokens
console.log('📦 Generating design tokens...');
const tokensDir = path.join(process.cwd(), 'downloaded brand pack sample/outputs/tokens');
fs.mkdirSync(tokensDir, { recursive: true });
fs.writeFileSync(path.join(tokensDir, 'figma-tokens.json'), generateFigmaTokens(intake));
fs.writeFileSync(path.join(tokensDir, 'tokens.css'), generateCSSTokens(intake));
fs.writeFileSync(path.join(tokensDir, 'tokens.js'), generateJSTokens(intake));
fs.writeFileSync(path.join(tokensDir, 'style-dictionary.json'), generateStyleDictionary(intake));
fs.writeFileSync(path.join(tokensDir, 'README.md'), generateTokensReadme(intake));
console.log('✅ Design tokens generated');

// Midjourney Prompts
console.log('🎨 Generating Midjourney prompts...');
const promptsDir = path.join(process.cwd(), 'downloaded brand pack sample/outputs/midjourney-prompts');
fs.mkdirSync(promptsDir, { recursive: true });
fs.writeFileSync(path.join(promptsDir, 'midjourney_prompts.md'), generateMidjourneyPrompts(intake));
console.log('✅ Midjourney prompts generated');

// Social Templates
console.log('📱 Generating social media templates...');
const socialDir = path.join(process.cwd(), 'downloaded brand pack sample/outputs/social-templates');
fs.mkdirSync(socialDir, { recursive: true });
fs.writeFileSync(path.join(socialDir, 'social_media_templates.md'), generateSocialTemplates(intake));
console.log('✅ Social media templates generated');

// Landing Sections
console.log('🏠 Generating landing page sections...');
const landingDir = path.join(process.cwd(), 'downloaded brand pack sample/outputs/landing-sections');
fs.mkdirSync(landingDir, { recursive: true });
fs.writeFileSync(path.join(landingDir, 'landing_page_sections.md'), generateLandingSections(intake));
console.log('✅ Landing page sections generated');

// Component Specs
console.log('🧩 Generating component specifications...');
const componentsDir = path.join(process.cwd(), 'downloaded brand pack sample/outputs/ui-templates');
fs.mkdirSync(componentsDir, { recursive: true });
fs.writeFileSync(path.join(componentsDir, 'component_specifications.md'), generateComponentSpecs(intake));
console.log('✅ Component specifications generated');

// Logo Concepts
if (intake.requiresLogoExploration) {
  console.log('🎯 Generating logo concepts...');
  const logoDir = path.join(process.cwd(), 'downloaded brand pack sample/outputs/logo-concepts');
  fs.mkdirSync(logoDir, { recursive: true });
  fs.writeFileSync(path.join(logoDir, 'logo_concepts.md'), generateLogoConcepts(intake));
  console.log('✅ Logo concepts generated');
}

console.log('\n🎉 All content generated successfully!');
console.log('📁 Check: downloaded brand pack sample/outputs/');
