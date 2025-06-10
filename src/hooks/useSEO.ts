
/**
 * Custom hook for managing SEO metadata and structured data
 */
import { useEffect } from 'react';
import { seoService, PageMetadata, StructuredData } from '@/services/seoService';

interface UseSEOOptions extends PageMetadata {
  structuredData?: StructuredData | StructuredData[];
}

export const useSEO = (options: UseSEOOptions) => {
  useEffect(() => {
    // Update page metadata
    seoService.updatePageMetadata({
      title: options.title,
      description: options.description,
      canonical: options.canonical,
      keywords: options.keywords,
      ogImage: options.ogImage,
      ogType: options.ogType
    });

    // Add structured data if provided
    if (options.structuredData) {
      seoService.removeStructuredData();
      seoService.addStructuredData(options.structuredData);
    }

    // Cleanup function
    return () => {
      // Remove structured data when component unmounts
      if (options.structuredData) {
        seoService.removeStructuredData();
      }
    };
  }, [options]);
};
