import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Check, 
  Crown, 
  Zap, 
  Star, 
  Sparkles,
  Download,
  Palette,
  Users,
  Shield,
  Infinity
} from 'lucide-react';

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: "Starter",
      description: "Perfect for trying out InkAI Studio",
      price: isAnnual ? 9 : 12,
      originalPrice: isAnnual ? 12 : null,
      icon: Zap,
      color: "from-primary to-electric-blue",
      popular: false,
      features: [
        "10 AI generations per month",
        "Basic style templates",
        "Standard resolution exports",
        "Community gallery access",
        "Email support"
      ],
      limitations: [
        "Watermarked exports",
        "No commercial license"
      ]
    },
    {
      name: "Pro",
      description: "For serious tattoo enthusiasts",
      price: isAnnual ? 29 : 39,
      originalPrice: isAnnual ? 39 : null,
      icon: Crown,
      color: "from-secondary to-neon-green",
      popular: true,
      features: [
        "100 AI generations per month",
        "All style templates",
        "High-resolution exports",
        "No watermarks",
        "Commercial license",
        "Priority support",
        "Advanced customization tools",
        "Style transfer features"
      ]
    },
    {
      name: "Studio",
      description: "For professional artists and studios",
      price: isAnnual ? 79 : 99,
      originalPrice: isAnnual ? 99 : null,
      icon: Star,
      color: "from-accent to-cyber-gold",
      popular: false,
      features: [
        "Unlimited AI generations",
        "All premium features",
        "Ultra-high resolution exports",
        "API access",
        "Custom model training",
        "White-label solutions",
        "Dedicated account manager",
        "24/7 phone support",
        "Team collaboration tools"
      ]
    }
  ];

  const addOns = [
    {
      name: "Extra Generations",
      description: "100 additional AI generations",
      price: 15,
      icon: Sparkles
    },
    {
      name: "Premium Templates",
      description: "Access to exclusive artist templates",
      price: 25,
      icon: Palette
    },
    {
      name: "Artist Consultation",
      description: "1-hour consultation with featured artists",
      price: 150,
      icon: Users
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-deep-black via-background to-card pt-20 pb-10">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Choose Your Plan
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Unlock the full potential of AI-powered tattoo design with flexible pricing options
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <span className={`text-sm ${!isAnnual ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
              Monthly
            </span>
            <Switch
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
              className="data-[state=checked]:bg-primary"
            />
            <span className={`text-sm ${isAnnual ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
              Annual
            </span>
            {isAnnual && (
              <Badge className="bg-gradient-to-r from-secondary to-accent text-black">
                Save 25%
              </Badge>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <Card 
                key={plan.name}
                className={`relative border-border/20 bg-card/50 backdrop-blur-sm transition-all duration-300 overflow-hidden ${
                  plan.popular 
                    ? 'ring-2 ring-primary/30 shadow-xl shadow-primary/10 scale-105' 
                    : 'hover:shadow-lg hover:shadow-primary/5'
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary"></div>
                )}
                
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-primary to-secondary text-primary-foreground">
                      <Crown className="w-3 h-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-6 pt-8">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${plan.color} flex items-center justify-center`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                  <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>
                  
                  <div className="space-y-1">
                    <div className="flex items-baseline justify-center space-x-1">
                      <span className="text-4xl font-bold">${plan.price}</span>
                      <span className="text-muted-foreground">/{isAnnual ? 'year' : 'month'}</span>
                    </div>
                    {plan.originalPrice && (
                      <div className="text-sm text-muted-foreground line-through">
                        ${plan.originalPrice}/{isAnnual ? 'year' : 'month'}
                      </div>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <Button 
                    className={`w-full ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/25' 
                        : 'bg-gradient-to-r from-muted to-muted/80 hover:from-primary/80 hover:to-secondary/80'
                    } transition-all duration-300`}
                  >
                    {plan.popular ? 'Start Free Trial' : 'Get Started'}
                  </Button>

                  <div className="space-y-3">
                    <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                      What's included
                    </h4>
                    <ul className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {plan.limitations && (
                      <div className="pt-3 border-t border-border/20">
                        <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide mb-2">
                          Limitations
                        </h4>
                        <ul className="space-y-2">
                          {plan.limitations.map((limitation, index) => (
                            <li key={index} className="flex items-start space-x-3">
                              <div className="w-4 h-4 mt-0.5 flex-shrink-0 rounded-full border border-muted-foreground/30"></div>
                              <span className="text-sm text-muted-foreground">{limitation}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Add-ons */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Add-ons & Extras</h2>
            <p className="text-muted-foreground">Enhance your experience with optional add-ons</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {addOns.map((addon) => {
              const Icon = addon.icon;
              return (
                <Card key={addon.name} className="border-border/20 bg-card/50 backdrop-blur-sm hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-to-br from-muted/20 to-muted/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">{addon.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{addon.description}</p>
                    <div className="text-2xl font-bold mb-4">${addon.price}</div>
                    <Button variant="outline" className="w-full">
                      Add to Plan
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          </div>

          <div className="max-w-3xl mx-auto grid gap-6">
            <Card className="border-border/20 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Can I switch plans anytime?</h3>
                <p className="text-muted-foreground">Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.</p>
              </CardContent>
            </Card>

            <Card className="border-border/20 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Do you offer refunds?</h3>
                <p className="text-muted-foreground">We offer a 30-day money-back guarantee for all plans. If you're not satisfied, contact our support team for a full refund.</p>
              </CardContent>
            </Card>

            <Card className="border-border/20 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">What happens if I exceed my generation limit?</h3>
                <p className="text-muted-foreground">You can purchase additional generations or upgrade to a higher plan. We'll never interrupt your creative flow.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="text-center">
          <div className="flex items-center justify-center space-x-8 text-muted-foreground mb-8">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5" />
              <span className="text-sm">SSL Secured</span>
            </div>
            <div className="flex items-center space-x-2">
              <Crown className="w-5 h-5" />
              <span className="text-sm">30-Day Guarantee</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span className="text-sm">10k+ Artists</span>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground">
            All plans include access to our community of over 10,000 tattoo artists worldwide
          </p>
        </section>
      </div>
    </div>
  );
};

export default Pricing;