import type { FC } from 'react';
import { Save, Undo, Redo, Settings, ExternalLink } from 'lucide-react'; // Added ExternalLink
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ToolbarProps {
  onPreview: () => void; // Added onPreview prop
}

export const Toolbar: FC<ToolbarProps> = ({ onPreview }) => {
  // Placeholder actions
  const handleSave = () => console.log('Save clicked');
  const handleUndo = () => console.log('Undo clicked');
  const handleRedo = () => console.log('Redo clicked');
  const handleSettings = () => console.log('Settings clicked');

  const iconActions = [
    { label: 'Save', icon: Save, action: handleSave },
    { label: 'Undo', icon: Undo, action: handleUndo },
    { label: 'Redo', icon: Redo, action: handleRedo },
    { label: 'Preview', icon: ExternalLink, action: onPreview }, // Added Preview action
    { label: 'Settings', icon: Settings, action: handleSettings },
  ];

  return (
    <header className="flex items-center justify-between p-2 bg-secondary border-b border-border shadow-sm">
      <h1 className="text-xl font-semibold text-foreground px-2">CodePad</h1>
      <div className="flex items-center space-x-1">
        <TooltipProvider>
          {iconActions.map(({ label, icon: Icon, action }) => (
            <Tooltip key={label}>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={action} aria-label={label} className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-accent">
                  <Icon className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{label}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </div>
    </header>
  );
};
