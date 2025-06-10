
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useDesignStore } from '@/stores/useDesignStore';
import { Sparkles, Upload, Wand2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const STYLE_PRESETS = [
  { id: 'traditional', name: 'Traditional', preview: '/lovable-uploads/5827edae-7f78-4e63-ab17-27b32f9a720f.png' },
  { id: 'realism', name: 'Realism', preview: '/lovable-uploads/2772e444-0bc9-4c71-9d49-5b7515865c6a.png' },
  { id: 'minimalist', name: 'Minimalist', preview: '/lovable-uploads/30ac5a9c-3418-4b26-8bd9-a948f30ce8c3.png' },
  { id: 'tribal', name: 'Tribal', preview: '/lovable-uploads/754e8be8-2196-4573-b62a-744706e401a4.png' },
  { id: 'geometric', name: 'Geometric', preview: '/lovable-uploads/8c8186c9-c126-48bd-9e85-8d1bbb272db2.png' },
  { id: 'watercolor', name: 'Watercolor', preview: '/lovable-uploads/95cb13d9-91c3-4ee8-a152-cb943f647c69.png' }
];

const AIGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('traditional');
  const [creativity, setCreativity] = useState([70]);
  const [detail, setDetail] = useState([80]);
  const [colorIntensity, setColorIntensity] = useState([60]);
  const [negativePrompt, setNegativePrompt] = useState('');
  const [referenceImage, setReferenceImage] = useState<File | null>(null);

  const { generateDesign, isGenerating, generationProgress } = useDesignStore();
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: 'Prompt Required',
        description: 'Please enter a description for your tattoo design.',
        variant: 'destructive'
      });
      return;
    }

    const design = await generateDesign({
      prompt,
      style: selectedStyle,
      creativity: creativity[0],
      detail: detail[0],
      colorIntensity: colorIntensity[0],
      negativePrompt: negativePrompt || undefined
    });

    if (design) {
      toast({
        title: 'Design Generated!',
        description: 'Your AI tattoo design has been created successfully.'
      });
    } else {
      toast({
        title: 'Generation Failed',
        description: 'Failed to generate design. Please try again.',
        variant: 'destructive'
      });
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setReferenceImage(file);
      toast({
        title: 'Reference Image Uploaded',
        description: 'Your reference image will be used to guide the AI generation.'
      });
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-card/50 backdrop-blur-lg border-electric-blue/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl font-bold">
          <Sparkles className="w-6 h-6 text-electric-blue" />
          AI Tattoo Generator
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Prompt Input */}
        <div className="space-y-2">
          <Label htmlFor="prompt" className="text-sm font-medium">
            Describe Your Tattoo Design
          </Label>
          <Textarea
            id="prompt"
            placeholder="A fierce dragon with intricate scales, breathing fire, Japanese style..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="min-h-[100px] bg-background/50"
          />
        </div>

        {/* Style Selection */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Style Preset</Label>
          <div className="grid grid-cols-3 gap-3">
            {STYLE_PRESETS.map((style) => (
              <button
                key={style.id}
                onClick={() => setSelectedStyle(style.id)}
                className={`relative group overflow-hidden rounded-lg border-2 transition-all ${
                  selectedStyle === style.id
                    ? 'border-electric-blue shadow-lg shadow-electric-blue/25'
                    : 'border-border hover:border-electric-blue/50'
                }`}
              >
                <img
                  src={style.preview}
                  alt={style.name}
                  className="w-full h-20 object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-1 left-1 right-1">
                  <Badge variant="secondary" className="text-xs w-full justify-center">
                    {style.name}
                  </Badge>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Parameter Sliders */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label className="text-sm">Creativity: {creativity[0]}%</Label>
            <Slider
              value={creativity}
              onValueChange={setCreativity}
              max={100}
              step={1}
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <Label className="text-sm">Detail: {detail[0]}%</Label>
            <Slider
              value={detail}
              onValueChange={setDetail}
              max={100}
              step={1}
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <Label className="text-sm">Color Intensity: {colorIntensity[0]}%</Label>
            <Slider
              value={colorIntensity}
              onValueChange={setColorIntensity}
              max={100}
              step={1}
              className="w-full"
            />
          </div>
        </div>

        {/* Reference Image Upload */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Reference Image (Optional)</Label>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => document.getElementById('reference-upload')?.click()}
              className="flex-1"
            >
              <Upload className="w-4 h-4 mr-2" />
              {referenceImage ? referenceImage.name : 'Upload Reference'}
            </Button>
            <input
              id="reference-upload"
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
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
            placeholder="What to avoid in the design..."
            value={negativePrompt}
            onChange={(e) => setNegativePrompt(e.target.value)}
            className="bg-background/50"
          />
        </div>

        {/* Generation Progress */}
        {isGenerating && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Generating your design...</span>
              <span>{generationProgress}%</span>
            </div>
            <Progress value={generationProgress} className="w-full" />
          </div>
        )}

        {/* Generate Button */}
        <Button
          onClick={handleGenerate}
          disabled={isGenerating || !prompt.trim()}
          className="w-full bg-gradient-to-r from-electric-blue to-neon-green hover:opacity-90 text-deep-black font-semibold py-3"
        >
          <Wand2 className="w-5 h-5 mr-2" />
          {isGenerating ? 'Generating...' : 'Generate Design'}
        </Button>

        {/* Quick Tips */}
        <div className="text-xs text-muted-foreground space-y-1 pt-2 border-t border-border">
          <p><strong>Tips:</strong> Be specific about style, elements, and placement for better results.</p>
          <p>Example: "Geometric wolf head with tribal patterns, forearm placement, black and grey"</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIGenerator;
