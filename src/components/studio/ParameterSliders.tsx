
/**
 * Extracted parameter sliders component for better reusability
 */
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

interface SliderConfig {
  label: string;
  value: number[];
  onChange: (value: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  formatValue?: (value: number) => string;
  description?: string;
}

interface ParameterSlidersProps {
  creativity: number[];
  detail: number[];
  colorIntensity: number[];
  onCreativityChange: (value: number[]) => void;
  onDetailChange: (value: number[]) => void;
  onColorIntensityChange: (value: number[]) => void;
  disabled?: boolean;
}

export const ParameterSliders = ({
  creativity,
  detail,
  colorIntensity,
  onCreativityChange,
  onDetailChange,
  onColorIntensityChange,
  disabled = false
}: ParameterSlidersProps) => {
  const sliders: SliderConfig[] = [
    {
      label: 'Creativity',
      value: creativity,
      onChange: onCreativityChange,
      formatValue: (value) => `${value}%`,
      description: 'How experimental the AI should be'
    },
    {
      label: 'Detail Level',
      value: detail,
      onChange: onDetailChange,
      formatValue: (value) => `${value}%`,
      description: 'Amount of fine details in the design'
    },
    {
      label: 'Color Intensity',
      value: colorIntensity,
      onChange: onColorIntensityChange,
      formatValue: (value) => `${value}%`,
      description: 'Vibrancy and saturation of colors'
    }
  ];

  return (
    <div className="space-y-6">
      <Label className="text-sm font-medium">Generation Parameters</Label>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sliders.map((slider) => (
          <div key={slider.label} className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">
                {slider.label}
              </Label>
              <span className="text-sm text-primary font-medium">
                {slider.formatValue?.(slider.value[0]) || slider.value[0]}
              </span>
            </div>
            
            <Slider
              value={slider.value}
              onValueChange={slider.onChange}
              max={slider.max || 100}
              min={slider.min || 0}
              step={slider.step || 1}
              disabled={disabled}
              className="w-full"
            />
            
            {slider.description && (
              <p className="text-xs text-muted-foreground">
                {slider.description}
              </p>
            )}
            
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Low</span>
              <span>High</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
