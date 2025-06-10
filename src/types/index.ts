// Design related types
export interface TattooDesign {
  id: string;
  title: string;
  description?: string;
  prompt: string;
  style: TattooStyle;
  size: DesignSize;
  placement?: BodyPlacement;
  imageUrl: string;
  thumbnailUrl?: string;
  tags: string[];
  artist?: Artist;
  aiGenerated: boolean;
  createdAt: Date;
  updatedAt: Date;
  likes: number;
  downloads: number;
  views: number;
  featured?: boolean;
  premium?: boolean;
}

export interface Artist {
  id: string;
  name: string;
  username: string;
  email?: string;
  avatar?: string;
  bio?: string;
  location?: string;
  specialties: TattooStyle[];
  rating: number;
  reviewCount: number;
  portfolioCount: number;
  followers: number;
  verified: boolean;
  featured: boolean;
  joinDate: Date;
  socialLinks?: {
    instagram?: string;
    website?: string;
    portfolio?: string;
  };
}

export type TattooStyle = 
  | 'traditional' 
  | 'geometric' 
  | 'minimalist' 
  | 'blackwork' 
  | 'watercolor' 
  | 'tribal' 
  | 'realism' 
  | 'japanese' 
  | 'neo-traditional'
  | 'dotwork'
  | 'linework';

export type DesignSize = 'small' | 'medium' | 'large' | 'extra-large';

export type BodyPlacement = 
  | 'arm' 
  | 'back' 
  | 'chest' 
  | 'leg' 
  | 'shoulder' 
  | 'wrist' 
  | 'ankle' 
  | 'neck' 
  | 'hand' 
  | 'foot'
  | 'ribcage'
  | 'thigh'
  | 'forearm'
  | 'bicep';

// User and authentication types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: UserRole;
  plan: SubscriptionPlan;
  createdAt: Date;
  preferences: UserPreferences;
  stats: UserStats;
}

export type UserRole = 'user' | 'artist' | 'admin';

export type SubscriptionPlan = 'free' | 'starter' | 'pro' | 'studio';

export interface UserPreferences {
  defaultStyle: TattooStyle;
  preferredSize: DesignSize;
  autoSave: boolean;
  notifications: boolean;
  emailUpdates: boolean;
  theme: 'dark' | 'light';
  language: string;
}

export interface UserStats {
  designsCreated: number;
  designsLiked: number;
  designsDownloaded: number;
  artistsFollowed: number;
  monthlyGenerations: number;
  generationLimit: number;
}

// API and request types
export interface GenerateDesignRequest {
  prompt: string;
  style: TattooStyle;
  size?: DesignSize;
  placement?: BodyPlacement;
  colorful?: boolean;
  complexity?: number;
  referenceImages?: string[];
}

export interface GenerateDesignResponse {
  design: TattooDesign;
  variations?: TattooDesign[];
  generationTime: number;
  creditsUsed: number;
}

export interface SearchFilters {
  style?: TattooStyle[];
  size?: DesignSize[];
  placement?: BodyPlacement[];
  tags?: string[];
  artist?: string;
  featured?: boolean;
  premium?: boolean;
  dateRange?: {
    start: Date;
    end: Date;
  };
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// Component props types
export interface DesignCardProps {
  design: TattooDesign;
  showArtist?: boolean;
  showStats?: boolean;
  interactive?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export interface ArtistCardProps {
  artist: Artist;
  showPortfolio?: boolean;
  showStats?: boolean;
  showContact?: boolean;
}

// State management types
export interface AppState {
  user: User | null;
  currentDesign: TattooDesign | null;
  favorites: string[];
  recentSearches: string[];
  searchFilters: SearchFilters;
  loading: boolean;
  error: string | null;
}

// API error types
export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
}

// Form types
export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
  artistId?: string;
}

export interface ReviewForm {
  rating: number;
  comment: string;
  designId?: string;
  artistId?: string;
}