export interface BrandIntake {
  // Basic Info
  projectName: string;
  brandName: string;
  tagline: string;
  industry: string;
  outputPreset: string[]; // ["saas-ui", "ecommerce", "creator", "directory-seo", "marketing-website", "content-platform", "mobile-app", "enterprise"] - múltipla seleção permitida
  
  // Positioning & Strategy
  targetAudience: string[];
  brandValues: string[];
  brandPersonality: string[];
  positioningStatement: string;
  competitorUrls: string[];
  
  // Visual Direction
  colorPreferences: string[];
  moodKeywords: string[];
  avoidKeywords: string[];
  
  // Voice & Tone
  toneAttributes: {
    formal: number; // 1-10
    playful: number;
    bold: number;
    minimalist: number;
  };
  voiceCharacteristics: string[];
  
  // Content & Messaging
  keyMessages: string[];
  uniqueSellingPoints: string[];
  
  // Output Requirements
  primaryUseCase: string;
  platforms: string[];
  requiresLogoExploration: boolean;
  
  // Additional
  additionalNotes: string;
  
  // Meta
  createdAt: string;
}

export const BRAND_INTAKE_SCHEMA = {
  $schema: "http://json-schema.org/draft-07/schema#",
  type: "object",
  required: ["projectName", "brandName", "industry", "outputPreset", "primaryUseCase"],
  properties: {
    projectName: {
      type: "string",
      minLength: 1,
      maxLength: 100,
      description: "Project identifier"
    },
    brandName: {
      type: "string",
      minLength: 1,
      maxLength: 100,
      description: "Brand name"
    },
    tagline: {
      type: "string",
      maxLength: 200,
      description: "Brand tagline or slogan"
    },
    industry: {
      type: "string",
      minLength: 1,
      description: "Industry or category"
    },
    outputPreset: {
      type: "array",
      minItems: 1,
      items: { 
        type: "string",
        enum: ["saas-ui", "ecommerce", "creator", "directory-seo", "marketing-website", "content-platform", "mobile-app", "enterprise"]
      },
      description: "Output focus and deliverables presets (múltipla seleção permitida)"
    },
    positioningStatement: {
      type: "string",
      maxLength: 500,
      description: "Core positioning statement"
    },
    targetAudience: {
      type: "array",
      items: { type: "string" },
      description: "Target audience segments"
    },
    brandValues: {
      type: "array",
      items: { type: "string" },
      description: "Core brand values"
    },
    brandPersonality: {
      type: "array",
      items: { type: "string" },
      description: "Brand personality traits"
    },
    competitorUrls: {
      type: "array",
      items: { type: "string" },
      description: "Competitor websites"
    },
    colorPreferences: {
      type: "array",
      items: { type: "string" },
      description: "Preferred colors"
    },
    moodKeywords: {
      type: "array",
      items: { type: "string" },
      description: "Mood and feeling keywords"
    },
    avoidKeywords: {
      type: "array",
      items: { type: "string" },
      description: "Keywords to avoid"
    },
    toneAttributes: {
      type: "object",
      properties: {
        formal: { type: "number", minimum: 1, maximum: 10 },
        playful: { type: "number", minimum: 1, maximum: 10 },
        bold: { type: "number", minimum: 1, maximum: 10 },
        minimalist: { type: "number", minimum: 1, maximum: 10 }
      }
    },
    voiceCharacteristics: {
      type: "array",
      items: { type: "string" },
      description: "Brand voice characteristics"
    },
    keyMessages: {
      type: "array",
      items: { type: "string" },
      description: "Key brand messages"
    },
    uniqueSellingPoints: {
      type: "array",
      items: { type: "string" },
      description: "Unique selling propositions"
    },
    primaryUseCase: {
      type: "string",
      minLength: 1,
      description: "Primary use case or purpose"
    },
    platforms: {
      type: "array",
      items: { type: "string" },
      description: "Target platforms"
    },
    requiresLogoExploration: {
      type: "boolean",
      description: "Whether logo concepts should be generated"
    },
    additionalNotes: {
      type: "string",
      description: "Additional context or notes"
    },
    createdAt: {
      type: "string",
      format: "date-time"
    }
  }
};
