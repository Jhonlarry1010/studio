import type { FC, ChangeEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Wand2, Loader2 } from 'lucide-react';

interface RefactorControlsProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onRefactor: () => void;
  isLoading: boolean;
}

export const RefactorControls: FC<RefactorControlsProps> = ({ prompt, setPrompt, onRefactor, isLoading }) => {
  const handlePromptChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPrompt(event.target.value);
  };

  return (
    <div className="flex items-center p-2 space-x-2 bg-secondary border-b border-border"> {/* Added border */}
      <Input
        type="text"
        placeholder="Enter refactor prompt (e.g., 'Add type annotations')"
        value={prompt}
        onChange={handlePromptChange}
        className="flex-1 focus-visible:ring-ring bg-input border-border" // Use theme variables
        aria-label="Refactor Prompt"
        disabled={isLoading}
      />
      <Button
        onClick={onRefactor}
        disabled={isLoading}
        variant="default" // Use default variant for primary action
        className="focus-visible:ring-ring" // Ensure ring is visible
        >
        {isLoading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <Wand2 className="h-5 w-5" />
        )}
        <span className="ml-2">Refactor</span>
      </Button>
    </div>
  );
};
