import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { 
  Wand2, 
  Download, 
  Share2, 
  Save, 
  Undo, 
  Redo,
  Layers,
  Palette,
  Settings,
  Sparkles,
  Upload,
  RefreshCw
} from 'lucide-react';

const CreateDesign = () => {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('traditional');
  const [size, setSize] = useState([6]);
  const [complexity, setComplexity] = useState([5]);
  const [colorful, setColorful] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const styles = [
    { id: 'traditional', name: 'Traditional', emoji: '🏺', description: 'Classic American traditional style' },
    { id: 'geometric', name: 'Geometric', emoji: '📐', description: 'Clean lines and mathematical patterns' },
    { id: 'minimalist', name: 'Minimalist', emoji: '⚪', description: 'Simple, elegant designs' },
    { id: 'blackwork', name: 'Blackwork', emoji: '⚫', description: 'Bold black ink designs' },
    { id: 'watercolor', name: 'Watercolor', emoji: '🎨', description: 'Flowing, painterly effects' },
    { id: 'tribal', name: 'Tribal', emoji: '🗿', description: 'Cultural and symbolic patterns' },
    { id: 'realism', name: 'Realism', emoji: '📸', description: 'Photorealistic artwork' },
    { id: 'japanese', name: 'Japanese', emoji: '🌸', description: 'Traditional Japanese irezumi' }
  ];

  const placements = [
    { id: 'arm', name: 'Arm', popular: true },
    { id: 'back', name: 'Back', popular: true },
    { id: 'chest', name: 'Chest', popular: false },
    { id: 'leg', name: 'Leg', popular: true },
    { id: 'shoulder', name: 'Shoulder', popular: false },
    { id: 'wrist', name: 'Wrist', popular: false },
    { id: 'ankle', name: 'Ankle', popular: false },
    { id: 'neck', name: 'Neck', popular: false }
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate AI generation with progress
    setTimeout(() => {
      setGeneratedImage('/lovable-uploads/dff4538d-c0da-4c9a-9a49-868dd441466b.png');
      setIsGenerating(false);
    }, 4000);
  };

  const handleRegenerateVariation = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const images = [
        '/lovable-uploads/754e8be8-2196-4573-b62a-744706e401a4.png',
        '/lovable-uploads/30ac5a9c-3418-4b26-8bd9-a948f30ce8c3.png',
        '/lovable-uploads/2772e444-0bc9-4c71-9d49-5b7515865c6a.png'
      ];
      setGeneratedImage(images[Math.floor(Math.random() * images.length)]);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-deep-black via-background to-card pt-20 pb-10">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Create Your Design
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Bring your tattoo vision to life with our advanced AI design studio
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Panel - Controls */}
          <div className="lg:col-span-4 space-y-6">
            {/* Prompt Input */}
            <Card className="border-border/20 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Wand2 className="w-5 h-5 text-primary" />
                  <span>Describe Your Vision</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="prompt" className="text-sm font-medium mb-2 block">
                    Design Description
                  </Label>
                  <Textarea
                    id="prompt"
                    placeholder="A majestic dragon wrapped around a Japanese cherry blossom tree, with geometric patterns in the background..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="min-h-32 bg-input/50 border-border/30 focus:border-primary/50 text-sm"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Be descriptive! Include style, elements, colors, and mood.
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="colorful" className="text-sm font-medium">
                    Include Colors
                  </Label>
                  <Switch
                    id="colorful"
                    checked={colorful}
                    onCheckedChange={setColorful}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Style Selection */}
            <Card className="border-border/20 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Palette className="w-5 h-5 text-secondary" />
                  <span>Style</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {styles.map((styleOption) => (
                    <Button
                      key={styleOption.id}
                      variant={style === styleOption.id ? "default" : "outline"}
                      className={`h-auto p-3 flex flex-col items-center space-y-2 text-left ${
                        style === styleOption.id 
                          ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25' 
                          : 'border-border/30 hover:border-primary/50'
                      }`}
                      onClick={() => setStyle(styleOption.id)}
                    >
                      <span className="text-2xl">{styleOption.emoji}</span>
                      <div className="text-center">
                        <div className="font-medium text-xs">{styleOption.name}</div>
                        <div className="text-xs opacity-75 leading-tight">{styleOption.description}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Size and Complexity */}
            <Card className="border-border/20 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="w-5 h-5 text-accent" />
                  <span>Parameters</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-sm font-medium mb-3 block">
                    Size: {size[0]} inches
                  </Label>
                  <Slider
                    value={size}
                    onValueChange={setSize}
                    max={12}
                    min={1}
                    step={0.5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Small</span>
                    <span>Large</span>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium mb-3 block">
                    Complexity: {complexity[0]}/10
                  </Label>
                  <Slider
                    value={complexity}
                    onValueChange={setComplexity}
                    max={10}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Simple</span>
                    <span>Detailed</span>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium mb-3 block">
                    Placement (Optional)
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {placements.map((placement) => (
                      <Badge
                        key={placement.id}
                        variant="outline"
                        className={`cursor-pointer transition-all duration-300 ${
                          placement.popular ? 'border-primary/30' : 'border-border/30'
                        } hover:border-primary/50`}
                      >
                        {placement.name}
                        {placement.popular && <span className="ml-1 text-primary">•</span>}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Generate Button */}
            <Button 
              onClick={handleGenerate}
              disabled={!prompt.trim() || isGenerating}
              className="w-full h-12 bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 text-lg font-medium"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                  Generating Magic...
                </>
              ) : (
                <>
                  <Wand2 className="w-5 h-5 mr-2" />
                  Generate Design
                </>
              )}
            </Button>
          </div>

          {/* Right Panel - Canvas */}
          <div className="lg:col-span-8">
            <Card className="border-border/20 bg-card/50 backdrop-blur-sm min-h-[700px]">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Layers className="w-5 h-5 text-accent" />
                    <span>Design Canvas</span>
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" disabled>
                      <Undo className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" disabled>
                      <Redo className="w-4 h-4" />
                    </Button>
                    <div className="w-px h-4 bg-border/30 mx-2"></div>
                    <Button variant="outline" size="sm" disabled={!generatedImage}>
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                    <Button variant="outline" size="sm" disabled={!generatedImage}>
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                    <Button variant="outline" size="sm" disabled={!generatedImage}>
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="h-full p-6">
                <div className="w-full h-[600px] bg-gradient-to-br from-muted/10 to-muted/5 rounded-lg border-2 border-dashed border-border/30 flex items-center justify-center relative overflow-hidden">
                  {isGenerating ? (
                    <div className="text-center">
                      <div className="animate-cyber-float mb-6">
                        <Sparkles className="w-20 h-20 text-primary animate-neon-pulse mx-auto" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Creating Your Design</h3>
                      <p className="text-muted-foreground mb-4">Our AI is analyzing your description...</p>
                      <div className="w-48 h-2 bg-muted/20 rounded-full mx-auto overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full animate-pulse" style={{width: '75%'}}></div>
                      </div>
                    </div>
                  ) : generatedImage ? (
                    <div className="w-full h-full flex flex-col">
                      <div className="flex-1 flex items-center justify-center">
                        <img
                          src={generatedImage}
                          alt="Generated tattoo design"
                          className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                        />
                      </div>
                      <div className="mt-4 flex items-center justify-center space-x-4">
                        <Button
                          onClick={handleRegenerateVariation}
                          variant="outline"
                          disabled={isGenerating}
                          className="flex items-center space-x-2"
                        >
                          <RefreshCw className="w-4 h-4" />
                          <span>Generate Variation</span>
                        </Button>
                        <Button className="bg-gradient-to-r from-primary to-secondary">
                          <Download className="w-4 h-4 mr-2" />
                          Download HD
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Upload className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2 text-muted-foreground">Ready to Create</h3>
                      <p className="text-muted-foreground">
                        {prompt ? 'Click Generate Design to bring your vision to life' : 'Enter a description to get started'}
                      </p>
                    </div>
                  )}
                  
                  {/* Grid overlay */}
                  <div className="absolute inset-0 cyber-grid opacity-10"></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateDesign;