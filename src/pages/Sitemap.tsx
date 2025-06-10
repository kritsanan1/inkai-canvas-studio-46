
/**
 * HTML Sitemap page for better navigation and SEO
 */
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import SEOWrapper from '@/components/SEOWrapper';
import { 
  Home, 
  Image, 
  Palette, 
  Users, 
  CreditCard, 
  Wrench,
  ArrowRight
} from 'lucide-react';

const Sitemap = () => {
  const sitePages = [
    {
      title: 'Home',
      path: '/',
      description: 'AI-powered tattoo design platform homepage',
      icon: Home,
      priority: 'High'
    },
    {
      title: 'Gallery',
      path: '/gallery',
      description: 'Browse thousands of AI-generated and traditional tattoo designs',
      icon: Image,
      priority: 'High'
    },
    {
      title: 'Create Design',
      path: '/create-design',
      description: 'Generate custom tattoo designs using AI technology',
      icon: Palette,
      priority: 'High'
    },
    {
      title: 'Artists',
      path: '/artists',
      description: 'Connect with professional tattoo artists worldwide',
      icon: Users,
      priority: 'Medium'
    },
    {
      title: 'Pricing',
      path: '/pricing',
      description: 'View subscription plans and pricing options',
      icon: CreditCard,
      priority: 'Medium'
    },
    {
      title: 'Studio',
      path: '/studio',
      description: 'Advanced design tools and collaboration features',
      icon: Wrench,
      priority: 'Medium'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-green-500';
      case 'Medium': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <SEOWrapper
      title="Sitemap - InkAI Studio | Navigate Our AI Tattoo Design Platform"
      description="Complete sitemap of InkAI Studio featuring all pages, tools, and resources for AI-powered tattoo design creation and artist collaboration."
      keywords="sitemap, navigation, AI tattoo design, tattoo gallery, artist directory, design tools"
    >
      <div className="min-h-screen bg-gradient-to-br from-deep-black via-background to-card pt-20">
        <div className="container mx-auto px-4 py-12">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Site Navigation
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore all features and pages of InkAI Studio's AI-powered tattoo design platform
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {sitePages.map((page, index) => {
              const Icon = page.icon;
              return (
                <motion.div
                  key={page.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link to={page.path}>
                    <Card className="h-full border-border/20 bg-card/50 backdrop-blur-sm hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 group">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between mb-2">
                          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <Icon className="w-6 h-6 text-primary" />
                          </div>
                          <Badge 
                            className={`${getPriorityColor(page.priority)} text-white text-xs`}
                          >
                            {page.priority}
                          </Badge>
                        </div>
                        <CardTitle className="flex items-center justify-between group-hover:text-primary transition-colors">
                          {page.title}
                          <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {page.description}
                        </p>
                        <div className="mt-3 text-xs text-primary font-mono">
                          {page.path}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Card className="max-w-2xl mx-auto border-border/20 bg-card/30 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-3">Need Help?</h3>
                <p className="text-muted-foreground text-sm">
                  Can't find what you're looking for? Our support team is here to help you navigate 
                  the platform and make the most of our AI-powered tattoo design tools.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </SEOWrapper>
  );
};

export default Sitemap;
