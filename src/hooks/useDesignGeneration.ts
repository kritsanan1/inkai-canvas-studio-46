
/**
 * Custom hook for handling AI design generation
 * Separates business logic from UI components
 */
import { useState, useCallback } from 'react';
import { AIGenerationParams, Design } from '@/types/design';
import { LoadingState } from '@/types/common';
import { designService } from '@/services/designService';

interface UseDesignGenerationReturn extends LoadingState {
  generateDesign: (params: AIGenerationParams) => Promise<Design | null>;
  progress: number;
  resetState: () => void;
}

export const useDesignGeneration = (): UseDesignGenerationReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const simulateProgress = useCallback(() => {
    const intervals = [20, 40, 60, 80, 100];
    const progressInterval = 500; // Update every 500ms

    intervals.forEach((targetProgress, index) => {
      setTimeout(() => {
        setProgress(targetProgress);
      }, index * progressInterval);
    });
  }, []);

  const generateDesign = useCallback(async (params: AIGenerationParams): Promise<Design | null> => {
    try {
      setIsLoading(true);
      setError(null);
      setProgress(0);

      // Validate parameters
      if (!params.prompt?.trim()) {
        throw new Error('Design prompt is required');
      }

      // Start progress simulation
      simulateProgress();

      // Generate design using service
      const design = await designService.generateDesign(params);
      
      setProgress(100);
      return design;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Generation failed';
      setError(errorMessage);
      console.error('Design generation error:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [simulateProgress]);

  const resetState = useCallback(() => {
    setIsLoading(false);
    setError(null);
    setProgress(0);
  }, []);

  return {
    isLoading,
    error,
    progress,
    generateDesign,
    resetState
  };
};
