
export interface ProcessStep {
  id: string;
  name: string;
  description: string;
  duration: number;
  aiInvolved: boolean;
}

export interface ImageMetadata {
  originalSize: string;
  aiModel?: string;
  processingTime: number;
  confidence: number;
  tags: string[];
  colorPalette: string[];
  createdAt: Date;
}

export interface GalleryItem {
  id: string;
  imageUrl: string;
  thumbnailUrl: string;
  title: string;
  artist: string;
  style: string;
  bodyPart: string;
  colors: string[];
  isAiEnhanced: boolean;
  processSteps: ProcessStep[];
  metadata: ImageMetadata;
  likes: number;
  downloads: number;
  views: number;
  tags: string[];
  featured?: boolean;
  beforeImage?: string;
  afterImage?: string;
}

export interface FilterState {
  styles: string[];
  bodyParts: string[];
  colors: string[];
  artists: string[];
  searchQuery: string;
  isAiOnly: boolean;
  sortBy: 'recent' | 'popular' | 'rating';
  minLikes?: number;
  dateRange?: {
    start: Date;
    end: Date;
  };
}

export interface FilterPreset {
  id: string;
  name: string;
  filters: FilterState;
  isDefault?: boolean;
}
