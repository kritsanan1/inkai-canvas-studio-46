
/**
 * Design-related type definitions
 */
import { BaseEntity } from './common';

export interface Design extends BaseEntity {
  title: string;
  description?: string;
  imageUrl: string;
  thumbnailUrl?: string;
  artist: string;
  style: DesignStyle;
  bodyPart: BodyPart;
  colors: string[];
  tags: string[];
  isAiEnhanced: boolean;
  status: DesignStatus;
  isPublic: boolean;
  metadata: DesignMetadata;
  processSteps: ProcessStep[];
  beforeImage?: string;
  afterImage?: string;
  views: number;
  likes: number;
  downloads: number;
}

export type DesignStyle = 
  | 'traditional' 
  | 'geometric' 
  | 'minimalist' 
  | 'blackwork' 
  | 'watercolor' 
  | 'tribal' 
  | 'realism' 
  | 'japanese';

export type BodyPart = 
  | 'arm' 
  | 'back' 
  | 'chest' 
  | 'leg' 
  | 'shoulder' 
  | 'wrist' 
  | 'ankle' 
  | 'neck';

export type DesignStatus = 
  | 'draft' 
  | 'in_progress' 
  | 'completed' 
  | 'published';

export interface DesignMetadata {
  processingTime?: number;
  colorPalette: string[];
  aiModel?: string;
  prompt?: string;
  originalSize?: string;
  confidence?: number;
  createdAt: Date;
}

export interface ProcessStep {
  id: string;
  name: string;
  description: string;
  duration: number;
  aiInvolved: boolean;
}

export interface AIGenerationParams {
  prompt: string;
  style: DesignStyle;
  creativity: number;
  detail: number;
  colorIntensity: number;
  negativePrompt?: string;
  referenceImage?: File;
}

export interface DesignFilters {
  styles: DesignStyle[];
  bodyParts: BodyPart[];
  colors: string[];
  artists: string[];
  searchQuery: string;
  isAiOnly: boolean;
  sortBy: 'recent' | 'popular' | 'rating';
}
