import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Paintbrush, 
  Sparkles, 
  Download, 
  Share2, 
  Settings, 
  Layers,
  Palette,
  Wand2
} from 'lucide-react';

const Studio = () => {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('traditional');
  const [isGenerating, setIsGenerating] = useState(false);

  const styles = [
    { id: 'traditional', name: 'Traditional', preview: '🏺' },
    { id: 'geometric', name: 'Geometric', preview: '📐' },
    { id: 'minimalist', name: 'Minimalist', preview: '⚪' },
    { id: 'blackwork', name: 'Blackwork', preview: '⚫' },
    { id: 'watercolor', name: 'Watercolor', preview: '🎨' },
    { id: 'tribal', name: 'Tribal', preview: '🗿' },
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setIsGenerating(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-deep-black via-background to-card pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              AI Design Studio
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Transform your ideas into stunning tattoo designs with the power of artificial intelligence
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Controls Panel */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-border/20 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Wand2 className="w-5 h-5 text-primary" />
                  <span>Design Controls</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="prompt" className="text-sm font-medium mb-2 block">
                    Describe Your Design
                  </Label>
                  <Textarea
                    id="prompt"
                    placeholder="A dragon wrapped around a sword with Celtic knots..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="min-h-24 bg-input/50 border-border/30 focus:border-primary/50"
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium mb-3 block">Style</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {styles.map((styleOption) => (
                      <Button
                        key={styleOption.id}
                        variant={style === styleOption.id ? "default" : "outline"}
                        className={`h-12 flex flex-col items-center space-y-1 ${
                          style === styleOption.id 
                            ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25' 
                            : 'border-border/30 hover:border-primary/50'
                        }`}
                        onClick={() => setStyle(styleOption.id)}
                      >
                        <span className="text-lg">{styleOption.preview}</span>
                        <span className="text-xs">{styleOption.name}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                <Button 
                  onClick={handleGenerate}
                  disabled={!prompt.trim() || isGenerating}
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
                >
                  {isGenerating ? (
                    <>
                      <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Paintbrush className="w-4 h-4 mr-2" />
                      Generate Design
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border/20 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="w-5 h-5 text-secondary" />
                  <span>Advanced Options</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="size" className="text-sm font-medium mb-2 block">
                    Size
                  </Label>
                  <select className="w-full bg-input/50 border border-border/30 rounded-md px-3 py-2 text-sm">
                    <option>Small (2-4 inches)</option>
                    <option>Medium (4-8 inches)</option>
                    <option>Large (8+ inches)</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="placement" className="text-sm font-medium mb-2 block">
                    Placement
                  </Label>
                  <select className="w-full bg-input/50 border border-border/30 rounded-md px-3 py-2 text-sm">
                    <option>Arm</option>
                    <option>Back</option>
                    <option>Chest</option>
                    <option>Leg</option>
                    <option>Other</option>
                  </select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Canvas Area */}
          <div className="lg:col-span-2">
            <Card className="border-border/20 bg-card/50 backdrop-blur-sm h-[600px]">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Layers className="w-5 h-5 text-accent" />
                    <span>Design Canvas</span>
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="h-full p-6">
                <div className="w-full h-full bg-gradient-to-br from-muted/10 to-muted/5 rounded-lg border-2 border-dashed border-border/30 flex items-center justify-center relative overflow-hidden">
                  {isGenerating ? (
                    <div className="text-center">
                      <div className="animate-cyber-float mb-4">
                        <Sparkles className="w-16 h-16 text-primary animate-neon-pulse mx-auto" />
                      </div>
                      <p className="text-muted-foreground">AI is crafting your design...</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Palette className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                      <p className="text-muted-foreground">
                        {prompt ? 'Click Generate to create your design' : 'Enter a description to get started'}
                      </p>
                    </div>
                  )}
                  
                  {/* Grid overlay */}
                  <div className="absolute inset-0 cyber-grid opacity-20"></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Studio;