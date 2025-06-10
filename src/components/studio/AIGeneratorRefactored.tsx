
/**
 * Refactored AI Generator component with better separation of concerns
 * Uses composition pattern and extracted sub-components
 */
import { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Sparkles, Upload, Wand2, AlertCircle } from 'lucide-react';

import { PromptInput } from './PromptInput';
import { StyleSelector } from './StyleSelector';
import { ParameterSliders } from './ParameterSliders';
import { useDesignGeneration } from '@/hooks/useDesignGeneration';
import { useDesignStore } from '@/stores/designStore';
import { AIGenerationParams, DesignStyle } from '@/types/design';

/**
 * Main AI Generator component
 * Orchestrates the design generation process
 */
export const AIGeneratorRefactored = () => {
  // Form state
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState<DesignStyle>('traditional');
  const [creativity, setCreativity] = useState([70]);
  const [detail, setDetail] = useState([80]);
  const [colorIntensity, setColorIntensity] = useState([60]);
  const [negativePrompt, setNegativePrompt] = useState('');
  const [referenceImage, setReferenceImage] = useState<File | null>(null);

  // Hooks
  const { generateDesign, isLoading, error, progress, resetState } = useDesignGeneration();
  const { addDesign } = useDesignStore();
  const { toast } = useToast();

  /**
   * Validates form input before generation
   */
  const validateInput = useCallback((): string | null => {
    if (!prompt.trim()) {
      return 'Please enter a description for your tattoo design.';
    }
    
    if (prompt.trim().length < 10) {
      return 'Please provide a more detailed description (at least 10 characters).';
    }

    return null;
  }, [prompt]);

  /**
   * Handles the design generation process
   */
  const handleGenerate = useCallback(async () => {
    // Reset any previous errors
    resetState();
    
    // Validate input
    const validationError = validateInput();
    if (validationError) {
      toast({
        title: 'Validation Error',
        description: validationError,
        variant: 'destructive'
      });
      return;
    }

    // Prepare generation parameters
    const params: AIGenerationParams = {
      prompt: prompt.trim(),
      style: selectedStyle,
      creativity: creativity[0],
      detail: detail[0],
      colorIntensity: colorIntensity[0],
      negativePrompt: negativePrompt.trim() || undefined,
      referenceImage: referenceImage || undefined
    };

    try {
      // Generate the design
      const design = await generateDesign(params);
      
      if (design) {
        // Add to store
        addDesign(design);
        
        // Show success message
        toast({
          title: 'Design Generated!',
          description: 'Your AI tattoo design has been created successfully.'
        });

        // Optional: Reset form for next generation
        // resetForm();
      }
    } catch (err) {
      // Error is already handled in the hook
      console.error('Generation failed:', err);
    }
  }, [
    prompt, selectedStyle, creativity, detail, colorIntensity, 
    negativePrompt, referenceImage, generateDesign, addDesign, 
    toast, validateInput, resetState
  ]);

  /**
   * Handles reference image upload
   */
  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Invalid File Type',
        description: 'Please upload an image file (PNG, JPG, etc.)',
        variant: 'destructive'
      });
      return;
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      toast({
        title: 'File Too Large',
        description: 'Please upload an image smaller than 10MB',
        variant: 'destructive'
      });
      return;
    }

    setReferenceImage(file);
    toast({
      title: 'Reference Image Uploaded',
      description: 'Your reference image will guide the AI generation.'
    });
  }, [toast]);

  /**
   * Removes the uploaded reference image
   */
  const removeReferenceImage = useCallback(() => {
    setReferenceImage(null);
  }, []);

  const isGenerateDisabled = isLoading || !prompt.trim();

  return (
    <Card className="w-full max-w-4xl mx-auto bg-card/50 backdrop-blur-lg border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl font-bold">
          <Sparkles className="w-6 h-6 text-primary" />
          AI Tattoo Generator
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-8">
        {/* Prompt Input Section */}
        <PromptInput
          value={prompt}
          onChange={setPrompt}
          disabled={isLoading}
        />

        {/* Style Selection */}
        <StyleSelector
          selectedStyle={selectedStyle}
          onStyleChange={setSelectedStyle}
          disabled={isLoading}
        />

        {/* Parameter Sliders */}
        <ParameterSliders
          creativity={creativity}
          detail={detail}
          colorIntensity={colorIntensity}
          onCreativityChange={setCreativity}
          onDetailChange={setDetail}
          onColorIntensityChange={setColorIntensity}
          disabled={isLoading}
        />

        {/* Reference Image Upload */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Reference Image (Optional)</Label>
          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => document.getElementById('reference-upload')?.click()}
              disabled={isLoading}
              className="flex-1"
            >
              <Upload className="w-4 h-4 mr-2" />
              {referenceImage ? referenceImage.name : 'Upload Reference'}
            </Button>
            {referenceImage && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={removeReferenceImage}
                disabled={isLoading}
              >
                Remove
              </Button>
            )}
            <input
              id="reference-upload"
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              disabled={isLoading}
              className="hidden"
            />
          </div>
        </div>

        {/* Negative Prompt */}
        <div className="space-y-2">
          <Label htmlFor="negative-prompt" className="text-sm font-medium">
            Negative Prompt (Optional)
          </Label>
          <Input
            id="negative-prompt"
            placeholder="What to avoid in the design (e.g., 'blurry, low quality, text')"
            value={negativePrompt}
            onChange={(e) => setNegativePrompt(e.target.value)}
            disabled={isLoading}
            className="bg-background/50"
          />
        </div>

        {/* Generation Progress */}
        {isLoading && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 animate-spin" />
                Generating your design...
              </span>
              <span className="font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="w-full h-2" />
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive">
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        {/* Generate Button */}
        <Button
          onClick={handleGenerate}
          disabled={isGenerateDisabled}
          className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-primary-foreground font-semibold py-3 text-lg"
        >
          <Wand2 className="w-5 h-5 mr-2" />
          {isLoading ? 'Generating...' : 'Generate Design'}
        </Button>

        {/* Quick Tips */}
        <div className="text-xs text-muted-foreground space-y-1 pt-2 border-t border-border/30">
          <p><strong>Pro Tips:</strong></p>
          <ul className="space-y-1 ml-4">
            <li>• Be specific about style, elements, and placement for better results</li>
            <li>• Include descriptive adjectives (fierce, delicate, bold, intricate)</li>
            <li>• Example: "Geometric wolf head with tribal patterns, forearm placement, black and grey"</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
