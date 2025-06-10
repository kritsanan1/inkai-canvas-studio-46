
/**
 * SEO Wrapper component for managing page-level SEO
 */
import { ReactNode } from 'react';
import { useSEO } from '@/hooks/useSEO';
import { PageMetadata, StructuredData } from '@/services/seoService';

interface SEOWrapperProps extends PageMetadata {
  children: ReactNode;
  structuredData?: StructuredData | StructuredData[];
}

const SEOWrapper = ({ children, structuredData, ...metadata }: SEOWrapperProps) => {
  useSEO({ ...metadata, structuredData });
  
  return <>{children}</>;
};

export default SEOWrapper;
