
/**
 * Separated prompt input component with validation and suggestions
 */
import { useState, useCallback } from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, X } from 'lucide-react';

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  maxLength?: number;
}

const PROMPT_SUGGESTIONS = [
  'Geometric wolf head with tribal patterns',
  'Japanese dragon with cherry blossoms',
  'Minimalist mountain landscape',
  'Realistic portrait with watercolor effects',
  'Celtic knot with modern geometric elements'
];

const PROMPT_TIPS = [
  'Be specific about style, elements, and placement',
  'Include descriptive adjectives (fierce, delicate, bold)',
  'Mention color preferences if desired',
  'Specify size and detail level',
  'Reference body placement for better results'
];

export const PromptInput = ({
  value,
  onChange,
  placeholder = "Describe your tattoo design in detail...",
  disabled = false,
  maxLength = 500
}: PromptInputProps) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showTips, setShowTips] = useState(false);

  const handleSuggestionClick = useCallback((suggestion: string) => {
    onChange(suggestion);
    setShowSuggestions(false);
  }, [onChange]);

  const wordCount = value.trim().split(/\s+/).filter(word => word.length > 0).length;
  const charCount = value.length;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label htmlFor="prompt" className="text-sm font-medium">
          Describe Your Tattoo Design
        </Label>
        <div className="flex items-center space-x-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setShowTips(!showTips)}
            className="text-xs"
          >
            <Lightbulb className="w-3 h-3 mr-1" />
            Tips
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setShowSuggestions(!showSuggestions)}
            className="text-xs"
          >
            Examples
          </Button>
        </div>
      </div>

      <Textarea
        id="prompt"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        maxLength={maxLength}
        className="min-h-[120px] bg-background/50 resize-none"
      />

      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{wordCount} words</span>
        <span>{charCount}/{maxLength} characters</span>
      </div>

      {/* Tips Section */}
      {showTips && (
        <div className="p-3 bg-muted/30 rounded-lg border border-border/30">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium">Writing Tips</h4>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShowTips(false)}
            >
              <X className="w-3 h-3" />
            </Button>
          </div>
          <ul className="space-y-1 text-xs text-muted-foreground">
            {PROMPT_TIPS.map((tip, index) => (
              <li key={index} className="flex items-start">
                <span className="text-primary mr-2">•</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Suggestions Section */}
      {showSuggestions && (
        <div className="p-3 bg-muted/30 rounded-lg border border-border/30">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium">Example Prompts</h4>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShowSuggestions(false)}
            >
              <X className="w-3 h-3" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {PROMPT_SUGGESTIONS.map((suggestion, index) => (
              <Badge
                key={index}
                variant="outline"
                className="cursor-pointer hover:bg-primary/10 transition-colors text-xs"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
