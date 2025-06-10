
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import AIGenerator from '@/components/studio/AIGenerator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useDesignStore } from '@/stores/useDesignStore';
import { Palette, History, Users, Sparkles } from 'lucide-react';

const Studio = () => {
  const { designs, currentDesign, isGenerating } = useDesignStore();
  const recentDesigns = designs.slice(0, 6);

  return (
    <div className="min-h-screen bg-gradient-to-br from-deep-black via-deep-black/95 to-electric-blue/10">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-electric-blue to-neon-green bg-clip-text text-transparent">
              AI Design Studio
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Transform your ideas into stunning tattoo designs with the power of artificial intelligence
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* AI Generator - Main Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <AIGenerator />
          </motion.div>

          {/* Side Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            {/* Current Generation Status */}
            {isGenerating && (
              <Card className="bg-card/50 backdrop-blur-lg border-electric-blue/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Sparkles className="w-5 h-5 text-electric-blue animate-pulse" />
                    AI Processing
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Your design is being generated. This may take a few moments...
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Quick Stats */}
            <Card className="bg-card/50 backdrop-blur-lg border-electric-blue/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Palette className="w-5 h-5 text-neon-green" />
                  Your Studio
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-electric-blue">{designs.length}</div>
                    <div className="text-xs text-muted-foreground">Designs Created</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-neon-green">
                      {designs.filter(d => d.isAiEnhanced).length}
                    </div>
                    <div className="text-xs text-muted-foreground">AI Enhanced</div>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  <History className="w-4 h-4 mr-2" />
                  View All Designs
                </Button>
              </CardContent>
            </Card>

            {/* Recent Designs */}
            {recentDesigns.length > 0 && (
              <Card className="bg-card/50 backdrop-blur-lg border-electric-blue/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <History className="w-5 h-5 text-gold" />
                    Recent Designs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentDesigns.map((design) => (
                      <div
                        key={design.id}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-background/20 transition-colors cursor-pointer"
                      >
                        <img
                          src={design.thumbnailUrl || design.imageUrl}
                          alt={design.title}
                          className="w-12 h-12 rounded object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm truncate">{design.title}</div>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {design.style}
                            </Badge>
                            {design.isAiEnhanced && (
                              <Badge variant="secondary" className="text-xs">
                                AI
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Collaboration Invite */}
            <Card className="bg-card/50 backdrop-blur-lg border-electric-blue/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Users className="w-5 h-5 text-electric-blue" />
                  Collaborate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  Work with professional artists to refine your AI-generated designs.
                </p>
                <Button variant="outline" className="w-full">
                  Find Artists
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Studio;
