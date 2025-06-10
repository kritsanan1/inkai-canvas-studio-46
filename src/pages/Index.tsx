import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';
import ParticleSystem from '@/components/ParticleSystem';
import TypewriterText from '@/components/TypewriterText';
import CountUpAnimation from '@/components/CountUpAnimation';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import SEOWrapper from '@/components/SEOWrapper';
import { seoService } from '@/services/seoService';
import { 
  ArrowRight, 
  Sparkles, 
  Zap, 
  Users, 
  Crown,
  Play,
  Star,
  Award,
  Palette,
  Download,
  Heart,
  TrendingUp,
  Shield,
  Brush,
  Cpu
} from 'lucide-react';

const Index = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [typewriterComplete, setTypewriterComplete] = useState(false);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const features = [
    {
      icon: Cpu,
      title: "AI Design Generation",
      description: "Revolutionary AI technology creates unique tattoo designs from your ideas in seconds",
      learnMore: "Discover how our neural networks understand artistic styles and translate your vision into stunning designs."
    },
    {
      icon: Users,
      title: "Master Artists",
      description: "Connect with world-class tattoo artists who specialize in bringing AI designs to life",
      learnMore: "Our network includes award-winning artists with decades of experience in traditional and modern techniques."
    },
    {
      icon: Shield,
      title: "Safe Environment",
      description: "Studio-grade safety standards with certified artists and premium sterilized equipment",
      learnMore: "Every session follows strict health protocols with single-use needles and autoclave sterilization."
    }
  ];

  const stats = [
    { number: 5000, suffix: "+", label: "Designs Created", icon: Sparkles },
    { number: 500, suffix: "+", label: "Happy Clients", icon: Users },
    { number: 10, suffix: "+", label: "Master Artists", icon: Crown },
    { number: 99, suffix: "%", label: "Satisfaction Rate", icon: Star }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Tattoo Artist",
      content: "InkAI Studio has revolutionized my design process. I can create concepts 10x faster and my clients love the variety.",
      avatar: "/lovable-uploads/754e8be8-2196-4573-b62a-744706e401a4.png",
      rating: 5
    },
    {
      name: "Marcus Rodriguez",
      role: "Studio Owner",
      content: "The quality of AI-generated designs is incredible. It's like having a creative partner that never runs out of ideas.",
      avatar: "/lovable-uploads/95cb13d9-91c3-4ee8-a152-cb943f647c69.png",
      rating: 5
    },
    {
      name: "Alex Kim",
      role: "Freelance Artist",
      content: "My clients are amazed by the unique designs I can offer them. This platform has taken my business to the next level.",
      avatar: "/lovable-uploads/1e3643eb-d440-4399-a7b5-ed6623d2075c.png",
      rating: 5
    }
  ];

  const galleryImages = [
    "/lovable-uploads/dff4538d-c0da-4c9a-9a49-868dd441466b.png",
    "/lovable-uploads/30ac5a9c-3418-4b26-8bd9-a948f30ce8c3.png",
    "/lovable-uploads/2772e444-0bc9-4c71-9d49-5b7515865c6a.png",
    "/lovable-uploads/5827edae-7f78-4e63-ab17-27b32f9a720f.png",
    "/lovable-uploads/d909f8ec-1ccd-4c56-ad02-a761c2bcc9c7.png",
    "/lovable-uploads/8c8186c9-c126-48bd-9e85-8d1bbb272db2.png"
  ];

  const structuredData = [
    seoService.getOrganizationSchema(),
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'InkAI Studio',
      url: 'https://inkai-studio.lovable.app',
      description: 'AI-powered tattoo design platform connecting artists and clients',
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://inkai-studio.lovable.app/gallery?search={search_term_string}',
        'query-input': 'required name=search_term_string'
      }
    }
  ];

  return (
    <SEOWrapper
      title="InkAI Studio - AI-Powered Tattoo Design Platform | Create Custom Designs"
      description="Transform your ideas into stunning tattoo designs with AI. Connect with professional artists, explore thousands of designs, and create something extraordinary with InkAI Studio."
      keywords="AI tattoo design, custom tattoo generator, tattoo artist platform, AI art, tattoo ideas, design generator, professional tattoo artists"
      ogType="website"
      structuredData={structuredData}
    >
      <div className="min-h-screen bg-deep-black">
        <Navigation />
        
        {/* Hero Section */}
        <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Particle System */}
          <ParticleSystem mousePosition={mousePosition} count={30} />
          
          {/* Animated Background */}
          <motion.div 
            className="absolute inset-0 cyber-grid opacity-20"
            style={{ y: backgroundY }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 animate-mesh-gradient"></div>
          
          {/* Split Screen Layout */}
          <div className="absolute inset-0 grid lg:grid-cols-2 gap-0">
            {/* Left Side - Traditional Tools */}
            <motion.div 
              className="relative hidden lg:flex items-center justify-center p-12"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <div className="relative">
                <img 
                  src="/placeholder.svg" 
                  alt="Traditional tattoo tools" 
                  className="w-96 h-96 object-cover rounded-2xl shadow-2xl shadow-primary/20"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl"></div>
              </div>
            </motion.div>
            
            {/* Right Side - AI Interface */}
            <motion.div 
              className="relative hidden lg:flex items-center justify-center p-12"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
            >
              <div className="relative">
                <img 
                  src="/placeholder.svg" 
                  alt="AI interface mockup" 
                  className="w-96 h-96 object-cover rounded-2xl shadow-2xl shadow-secondary/20"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-2xl"></div>
              </div>
            </motion.div>
          </div>
          
          {/* Floating Elements */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-primary to-secondary rounded-full opacity-20 blur-3xl animate-cyber-float"></div>
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-gradient-to-br from-secondary to-accent rounded-full opacity-20 blur-3xl animate-cyber-float" style={{animationDelay: '1s'}}></div>
          
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="max-w-4xl mx-auto">
              {/* Badge */}
              <motion.div 
                className="mb-8"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <Badge className="bg-gradient-to-r from-primary to-secondary text-primary-foreground px-4 py-2 text-sm font-medium magnetic-hover">
                  <Sparkles className="w-4 h-4 mr-2" />
                  AI-Powered Tattoo Design Platform
                </Badge>
              </motion.div>

              {/* Typewriter Heading */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="mb-8"
              >
                <TypewriterText
                  text="Where Art Meets Artificial Intelligence"
                  delay={1000}
                  speed={80}
                  className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent leading-tight"
                  onComplete={() => setTypewriterComplete(true)}
                />
              </motion.div>

              {/* Subtitle */}
              <motion.p 
                className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={typewriterComplete ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                Transform your ideas into stunning tattoo designs with AI. Connect with professional artists. 
                Create something extraordinary.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div 
                className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16"
                initial={{ opacity: 0, y: 30 }}
                animate={typewriterComplete ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1 }}
              >
                <Button 
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-primary to-secondary hover:shadow-2xl hover:shadow-primary/25 transition-all duration-500 text-lg px-8 py-6 h-auto group magnetic-hover"
                >
                  <Link to="/create-design" className="flex items-center space-x-2">
                    <Zap className="w-5 h-5 group-hover:animate-neon-pulse" />
                    <span>Start Creating</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-border/30 hover:border-primary/50 text-lg px-8 py-6 h-auto group magnetic-hover"
                >
                  <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Watch Demo
                </Button>
              </motion.div>

              {/* Animated Stats */}
              <motion.div 
                className="grid grid-cols-2 md:grid-cols-4 gap-8"
                initial={{ opacity: 0, y: 30 }}
                animate={typewriterComplete ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.5 }}
              >
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div 
                      key={index} 
                      className="text-center group"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={typewriterComplete ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.5, delay: 1.7 + index * 0.1 }}
                    >
                      <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 magnetic-hover">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <CountUpAnimation
                        end={stat.number}
                        suffix={stat.suffix}
                        duration={2000}
                        className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
                      />
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Enhanced Features Section */}
        <section className="py-24 relative">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  Revolutionary Features
                </span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Everything you need to create, customize, and bring your tattoo designs to life with cutting-edge technology
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                  >
                    <Card className="border-border/20 bg-card/50 backdrop-blur-sm hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 group card-3d h-full">
                      <CardContent className="p-8 text-center h-full flex flex-col">
                        <motion.div 
                          className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <Icon className="w-10 h-10 text-primary group-hover:animate-neon-pulse" />
                        </motion.div>
                        <h3 className="text-2xl font-semibold mb-4 group-hover:text-primary transition-colors">
                          {feature.title}
                        </h3>
                        <p className="text-muted-foreground mb-6 flex-1">
                          {feature.description}
                        </p>
                        <motion.details 
                          className="group/details"
                          whileHover={{ scale: 1.02 }}
                        >
                          <summary className="cursor-pointer text-primary hover:text-secondary transition-colors font-medium">
                            Learn More
                          </summary>
                          <motion.p 
                            className="mt-4 text-sm text-muted-foreground border-t border-border/20 pt-4"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            transition={{ duration: 0.3 }}
                          >
                            {feature.learnMore}
                          </motion.p>
                        </motion.details>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Gallery Preview */}
        <section className="py-24 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  AI Masterpieces
                </span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                Explore thousands of unique designs created by our AI
              </p>
              <Button asChild variant="outline" className="border-primary/30 hover:bg-primary/10">
                <Link to="/gallery">
                  View Full Gallery
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {galleryImages.map((image, index) => (
                <div 
                  key={index} 
                  className="aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-muted/20 to-muted/5 group hover:scale-105 transition-transform duration-300"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <img
                    src={image}
                    alt={`AI-generated tattoo design ${index + 1} - ${index % 2 === 0 ? 'geometric' : 'traditional'} style`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Testimonials Carousel */}
        <section className="py-24 relative">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  Loved by Artists Worldwide
                </span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                See what professional tattoo artists are saying about InkAI Studio and how it's transforming their creative process
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <TestimonialCarousel 
                testimonials={testimonials}
                autoPlayInterval={6000}
              />
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10"></div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  Ready to Create?
                </span>
              </h2>
              <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
                Join thousands of artists and tattoo enthusiasts who are already creating amazing designs with AI
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <Button 
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-primary to-secondary hover:shadow-2xl hover:shadow-primary/25 transition-all duration-500 text-lg px-8 py-6 h-auto"
                >
                  <Link to="/create-design">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Start Your Journey
                  </Link>
                </Button>
                
                <Button 
                  asChild
                  variant="outline" 
                  size="lg"
                  className="border-border/30 hover:border-primary/50 text-lg px-8 py-6 h-auto"
                >
                  <Link to="/pricing">
                    <Crown className="w-5 h-5 mr-2" />
                    View Pricing
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border/20 py-12">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg rotate-45"></div>
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  InkAI Studio
                </span>
              </div>
              <p className="text-muted-foreground mb-4">
                Transforming tattoo design with artificial intelligence
              </p>
              <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
                <Link to="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
                <Link to="/terms" className="hover:text-primary transition-colors">Terms</Link>
                <Link to="/support" className="hover:text-primary transition-colors">Support</Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </SEOWrapper>
  );
};

export default Index;
