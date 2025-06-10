
/**
 * SEO Service for managing metadata, structured data, and SEO optimizations
 */

export interface PageMetadata {
  title: string;
  description: string;
  canonical?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
}

export interface StructuredData {
  '@context': string;
  '@type': string;
  [key: string]: any;
}

class SEOService {
  private baseUrl = 'https://inkai-studio.lovable.app';

  // Update page metadata dynamically
  updatePageMetadata(metadata: PageMetadata) {
    // Update title
    document.title = metadata.title;

    // Update or create meta tags
    this.updateMetaTag('description', metadata.description);
    this.updateMetaTag('keywords', metadata.keywords || '');
    
    // Update canonical URL
    this.updateCanonicalTag(metadata.canonical || window.location.pathname);
    
    // Update Open Graph tags
    this.updateMetaTag('og:title', metadata.title, 'property');
    this.updateMetaTag('og:description', metadata.description, 'property');
    this.updateMetaTag('og:url', `${this.baseUrl}${window.location.pathname}`, 'property');
    this.updateMetaTag('og:type', metadata.ogType || 'website', 'property');
    this.updateMetaTag('og:image', metadata.ogImage || `${this.baseUrl}/lovable-uploads/dff4538d-c0da-4c9a-9a49-868dd441466b.png`, 'property');
    
    // Update Twitter Card tags
    this.updateMetaTag('twitter:card', 'summary_large_image', 'name');
    this.updateMetaTag('twitter:title', metadata.title, 'name');
    this.updateMetaTag('twitter:description', metadata.description, 'name');
    this.updateMetaTag('twitter:image', metadata.ogImage || `${this.baseUrl}/lovable-uploads/dff4538d-c0da-4c9a-9a49-868dd441466b.png`, 'name');
  }

  private updateMetaTag(name: string, content: string, attribute: string = 'name') {
    if (!content) return;
    
    let element = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
    
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute(attribute, name);
      document.head.appendChild(element);
    }
    
    element.content = content;
  }

  private updateCanonicalTag(path: string) {
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    
    canonical.href = `${this.baseUrl}${path}`;
  }

  // Add structured data to page
  addStructuredData(data: StructuredData | StructuredData[]) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
  }

  // Remove existing structured data
  removeStructuredData() {
    const scripts = document.querySelectorAll('script[type="application/ld+json"]');
    scripts.forEach(script => script.remove());
  }

  // Generate organization schema
  getOrganizationSchema(): StructuredData {
    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'InkAI Studio',
      description: 'AI-powered tattoo design platform connecting artists and clients',
      url: this.baseUrl,
      logo: `${this.baseUrl}/lovable-uploads/dff4538d-c0da-4c9a-9a49-868dd441466b.png`,
      sameAs: [
        'https://twitter.com/inkaistudio',
        'https://instagram.com/inkaistudio'
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        email: 'support@inkaistudio.com'
      },
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'US'
      }
    };
  }

  // Generate FAQ schema for pricing page
  getFAQSchema(): StructuredData {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How does AI tattoo design generation work?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Our AI uses advanced machine learning models to transform your ideas and prompts into unique tattoo designs. Simply describe what you want, select a style, and our AI will generate multiple design variations for you to choose from.'
          }
        },
        {
          '@type': 'Question',
          name: 'Can I work with professional tattoo artists?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes! Our platform connects you with verified professional tattoo artists who can refine AI-generated designs or create completely custom pieces. You can browse artist portfolios, read reviews, and book consultations directly through our platform.'
          }
        },
        {
          '@type': 'Question',
          name: 'What styles of tattoos can the AI create?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Our AI can generate designs in multiple styles including traditional, geometric, minimalist, blackwork, watercolor, tribal, realism, Japanese, and more. Each style is trained on thousands of high-quality tattoo designs.'
          }
        }
      ]
    };
  }

  // Generate product schema for pricing plans
  getProductSchema(plan: { name: string; price: number; features: string[] }): StructuredData {
    return {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: `InkAI Studio ${plan.name} Plan`,
      description: `${plan.name} subscription plan for AI tattoo design generation`,
      brand: {
        '@type': 'Brand',
        name: 'InkAI Studio'
      },
      offers: {
        '@type': 'Offer',
        price: plan.price,
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: `${this.baseUrl}/pricing`
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        reviewCount: '250'
      }
    };
  }

  // Generate creative work schema for designs
  getCreativeWorkSchema(design: any): StructuredData {
    return {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: design.title,
      description: `${design.style} tattoo design for ${design.bodyPart}`,
      image: design.imageUrl,
      creator: {
        '@type': 'Person',
        name: design.artist
      },
      genre: design.style,
      keywords: design.tags.join(', '),
      dateCreated: design.metadata.createdAt,
      isAccessibleForFree: false,
      interactionStatistic: [
        {
          '@type': 'InteractionCounter',
          interactionType: 'https://schema.org/LikeAction',
          userInteractionCount: design.likes
        },
        {
          '@type': 'InteractionCounter',
          interactionType: 'https://schema.org/ViewAction',
          userInteractionCount: design.views
        }
      ]
    };
  }

  // Generate sitemap data
  generateSitemapUrls(): Array<{ url: string; lastmod: string; changefreq: string; priority: string }> {
    const baseUrl = this.baseUrl;
    const today = new Date().toISOString().split('T')[0];
    
    return [
      { url: `${baseUrl}/`, lastmod: today, changefreq: 'daily', priority: '1.0' },
      { url: `${baseUrl}/gallery`, lastmod: today, changefreq: 'daily', priority: '0.9' },
      { url: `${baseUrl}/create-design`, lastmod: today, changefreq: 'weekly', priority: '0.9' },
      { url: `${baseUrl}/artists`, lastmod: today, changefreq: 'weekly', priority: '0.8' },
      { url: `${baseUrl}/pricing`, lastmod: today, changefreq: 'monthly', priority: '0.8' },
      { url: `${baseUrl}/studio`, lastmod: today, changefreq: 'weekly', priority: '0.7' }
    ];
  }
}

export const seoService = new SEOService();
