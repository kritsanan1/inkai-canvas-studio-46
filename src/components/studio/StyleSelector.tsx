
/**
 * Extracted style selector component with better organization
 */
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { DesignStyle } from '@/types/design';

interface StylePreset {
  id: DesignStyle;
  name: string;
  emoji: string;
  description: string;
  preview: string;
  popular?: boolean;
}

const STYLE_PRESETS: StylePreset[] = [
  { 
    id: 'traditional', 
    name: 'Traditional', 
    emoji: '🏺',
    description: 'Classic American traditional style',
    preview: '/lovable-uploads/5827edae-7f78-4e63-ab17-27b32f9a720f.png',
    popular: true
  },
  { 
    id: 'realism', 
    name: 'Realism', 
    emoji: '📸',
    description: 'Photorealistic artwork',
    preview: '/lovable-uploads/2772e444-0bc9-4c71-9d49-5b7515865c6a.png' 
  },
  { 
    id: 'minimalist', 
    name: 'Minimalist', 
    emoji: '⚪',
    description: 'Simple, elegant designs',
    preview: '/lovable-uploads/30ac5a9c-3418-4b26-8bd9-a948f30ce8c3.png',
    popular: true
  },
  { 
    id: 'tribal', 
    name: 'Tribal', 
    emoji: '🗿',
    description: 'Cultural and symbolic patterns',
    preview: '/lovable-uploads/754e8be8-2196-4573-b62a-744706e401a4.png' 
  },
  { 
    id: 'geometric', 
    name: 'Geometric', 
    emoji: '📐',
    description: 'Clean lines and mathematical patterns',
    preview: '/lovable-uploads/8c8186c9-c126-48bd-9e85-8d1bbb272db2.png' 
  },
  { 
    id: 'watercolor', 
    name: 'Watercolor', 
    emoji: '🎨',
    description: 'Flowing, painterly effects',
    preview: '/lovable-uploads/95cb13d9-91c3-4ee8-a152-cb943f647c69.png' 
  },
  { 
    id: 'blackwork', 
    name: 'Blackwork', 
    emoji: '⚫',
    description: 'Bold black ink designs',
    preview: '/lovable-uploads/2772e444-0bc9-4c71-9d49-5b7515865c6a.png' 
  },
  { 
    id: 'japanese', 
    name: 'Japanese', 
    emoji: '🌸',
    description: 'Traditional Japanese irezumi',
    preview: '/lovable-uploads/754e8be8-2196-4573-b62a-744706e401a4.png' 
  }
];

interface StyleSelectorProps {
  selectedStyle: DesignStyle;
  onStyleChange: (style: DesignStyle) => void;
  disabled?: boolean;
}

export const StyleSelector = ({ 
  selectedStyle, 
  onStyleChange, 
  disabled = false 
}: StyleSelectorProps) => {
  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium">Style Preset</Label>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {STYLE_PRESETS.map((style) => (
          <button
            key={style.id}
            type="button"
            disabled={disabled}
            onClick={() => onStyleChange(style.id)}
            className={`
              relative group overflow-hidden rounded-lg border-2 transition-all duration-200
              ${selectedStyle === style.id
                ? 'border-primary shadow-lg shadow-primary/25 scale-105'
                : 'border-border hover:border-primary/50 hover:scale-102'
              }
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            <div className="aspect-square relative">
              <img
                src={style.preview}
                alt={style.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              
              {/* Style Info */}
              <div className="absolute bottom-2 left-2 right-2">
                <div className="flex items-center space-x-1 mb-1">
                  <span className="text-lg">{style.emoji}</span>
                  {style.popular && (
                    <Badge variant="secondary" className="text-xs px-1 py-0">
                      Popular
                    </Badge>
                  )}
                </div>
                <h3 className="text-white font-medium text-sm">{style.name}</h3>
                <p className="text-white/80 text-xs leading-tight">{style.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
