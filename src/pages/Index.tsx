import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';
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
  TrendingUp
} from 'lucide-react';

const Index = () => {
  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered Design",
      description: "Generate unique tattoo designs instantly with our advanced artificial intelligence"
    },
    {
      icon: Palette,
      title: "Multiple Styles",
      description: "From traditional to geometric, explore dozens of artistic styles and techniques"
    },
    {
      icon: Users,
      title: "Expert Artists",
      description: "Connect with verified tattoo artists to bring your AI designs to life"
    },
    {
      icon: Crown,
      title: "Premium Quality",
      description: "High-resolution exports ready for professional tattoo application"
    }
  ];

  const stats = [
    { number: "50K+", label: "Designs Created", icon: Sparkles },
    { number: "10K+", label: "Active Artists", icon: Users },
    { number: "98%", label: "Client Satisfaction", icon: Star },
    { number: "24/7", label: "Support Available", icon: Award }
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

  return (
    <div className="min-h-screen bg-deep-black">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 cyber-grid opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-primary to-secondary rounded-full opacity-20 blur-3xl animate-cyber-float"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-gradient-to-br from-secondary to-accent rounded-full opacity-20 blur-3xl animate-cyber-float" style={{animationDelay: '1s'}}></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Badge */}
            <div className="mb-8 animate-cyber-float">
              <Badge className="bg-gradient-to-r from-primary to-secondary text-primary-foreground px-4 py-2 text-sm font-medium">
                <Sparkles className="w-4 h-4 mr-2" />
                AI-Powered Tattoo Design Platform
              </Badge>
            </div>

            {/* Main Heading */}
            <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-foreground via-primary to-secondary bg-clip-text text-transparent">
                Ink Your
              </span>
              <br />
              <span className="bg-gradient-to-r from-secondary via-accent to-primary bg-clip-text text-transparent neon-text">
                Vision
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              Transform your ideas into stunning tattoo designs with AI. Connect with professional artists. 
              Create something extraordinary.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
              <Button 
                asChild
                size="lg"
                className="bg-gradient-to-r from-primary to-secondary hover:shadow-2xl hover:shadow-primary/25 transition-all duration-500 text-lg px-8 py-6 h-auto group"
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
                className="border-border/30 hover:border-primary/50 text-lg px-8 py-6 h-auto group"
              >
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Watch Demo
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center group">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      {stat.number}
                    </div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Powerful Features
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to create, customize, and bring your tattoo designs to life
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="border-border/20 bg-card/50 backdrop-blur-sm hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 group">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-8 h-8 text-primary group-hover:animate-neon-pulse" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
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
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Loved by Artists
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See what professional tattoo artists are saying about InkAI Studio
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-border/20 bg-card/50 backdrop-blur-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-accent fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 italic">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center space-x-3">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
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
  );
};

export default Index;