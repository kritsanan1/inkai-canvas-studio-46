
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SEOWrapper from '@/components/SEOWrapper';
import { seoService } from '@/services/seoService';
import { 
  Check, 
  Sparkles, 
  Crown, 
  Zap, 
  Users,
  ArrowRight,
  Star
} from 'lucide-react';

const Pricing = () => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      name: 'Starter',
      price: { monthly: 9.99, yearly: 99.99 },
      description: 'Perfect for individuals getting started',
      features: [
        '50 AI generations per month',
        '5 design revisions',
        'Basic style selection',
        'Standard support',
        'Gallery access'
      ],
      popular: false,
      icon: Zap
    },
    {
      name: 'Pro',
      price: { monthly: 19.99, yearly: 199.99 },
      description: 'Best for serious designers and artists',
      features: [
        '200 AI generations per month',
        'Unlimited design revisions',
        'Premium styles & effects',
        'Priority support',
        'Advanced collaboration tools',
        'High-resolution exports',
        'Custom style training'
      ],
      popular: true,
      icon: Crown
    },
    {
      name: 'Studio',
      price: { monthly: 49.99, yearly: 499.99 },
      description: 'For professional studios and teams',
      features: [
        'Unlimited AI generations',
        'Team collaboration',
        'White-label options',
        '24/7 priority support',
        'Custom integrations',
        'Advanced analytics',
        'Artist revenue sharing',
        'Custom branding'
      ],
      popular: false,
      icon: Users
    }
  ];

  const structuredData = [
    seoService.getFAQSchema(),
    ...plans.map(plan => seoService.getProductSchema({
      name: plan.name,
      price: plan.price[billingPeriod],
      features: plan.features
    }))
  ];

  return (
    <SEOWrapper
      title="Pricing Plans - InkAI Studio | AI Tattoo Design Subscriptions"
      description="Choose the perfect plan for your AI tattoo design needs. From individual creators to professional studios, find affordable pricing with powerful features."
      keywords="tattoo design pricing, AI tattoo subscription, tattoo design plans, professional tattoo tools, studio pricing"
      structuredData={structuredData}
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
                Choose Your Plan
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Unlock the full potential of AI-powered tattoo design with flexible pricing options
            </p>
          </motion.div>

          {/* Billing Toggle */}
          <motion.div
            className="flex justify-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Tabs value={billingPeriod} onValueChange={(value) => setBillingPeriod(value as any)}>
              <TabsList className="grid w-full grid-cols-2 max-w-xs">
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="yearly">
                  Yearly
                  <Badge className="ml-2 bg-green-500 text-white text-xs">Save 20%</Badge>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => {
              const Icon = plan.icon;
              return (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className={plan.popular ? 'scale-105' : ''}
                >
                  <Card className={`h-full border-border/20 bg-card/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300 ${
                    plan.popular ? 'border-primary/50 shadow-lg shadow-primary/20' : ''
                  }`}>
                    <CardHeader className="text-center pb-4">
                      {plan.popular && (
                        <Badge className="bg-gradient-to-r from-primary to-secondary text-white w-fit mx-auto mb-4">
                          <Star className="w-3 h-3 mr-1" />
                          Most Popular
                        </Badge>
                      )}
                      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                      <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                      <p className="text-muted-foreground text-sm">{plan.description}</p>
                      <div className="mt-4">
                        <span className="text-4xl font-bold">${plan.price[billingPeriod]}</span>
                        <span className="text-muted-foreground">/{billingPeriod === 'monthly' ? 'month' : 'year'}</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Button 
                        className={`w-full mb-6 ${
                          plan.popular 
                            ? 'bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/25' 
                            : 'bg-primary hover:bg-primary/90'
                        }`}
                      >
                        Get Started
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                      <ul className="space-y-3">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-sm">
                            <Check className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* FAQ Section */}
          <motion.div
            className="mt-20 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-center mb-8">
              Frequently Asked Questions
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-border/20 bg-card/30 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">How does AI tattoo design generation work?</h3>
                  <p className="text-muted-foreground text-sm">
                    Our AI uses advanced machine learning models to transform your ideas and prompts into unique tattoo designs. Simply describe what you want, select a style, and our AI will generate multiple design variations for you to choose from.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-border/20 bg-card/30 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">Can I work with professional tattoo artists?</h3>
                  <p className="text-muted-foreground text-sm">
                    Yes! Our platform connects you with verified professional tattoo artists who can refine AI-generated designs or create completely custom pieces. You can browse artist portfolios, read reviews, and book consultations directly through our platform.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-border/20 bg-card/30 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">What styles of tattoos can the AI create?</h3>
                  <p className="text-muted-foreground text-sm">
                    Our AI can generate designs in multiple styles including traditional, geometric, minimalist, blackwork, watercolor, tribal, realism, Japanese, and more. Each style is trained on thousands of high-quality tattoo designs.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-border/20 bg-card/30 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">Can I cancel my subscription anytime?</h3>
                  <p className="text-muted-foreground text-sm">
                    Absolutely! You can cancel your subscription at any time with no questions asked. You'll continue to have access to your plan's features until the end of your current billing period.
                  </p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </SEOWrapper>
  );
};

export default Pricing;
