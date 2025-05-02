import type { FC } from 'react';
import { Save, Undo, Redo, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export const Toolbar: FC = () => {
  // Placeholder actions
  const handleSave = () => console.log('Save clicked');
  const handleUndo = () => console.log('Undo clicked');
  const handleRedo = () => console.log('Redo clicked');
  const handleSettings = () => console.log('Settings clicked');

  const iconActions = [
    { label: 'Save', icon: Save, action: handleSave },
    { label: 'Undo', icon: Undo, action: handleUndo },
    { label: 'Redo', icon: Redo, action: handleRedo },
    { label: 'Settings', icon: Settings, action: handleSettings },
  ];

  return (
    <header className="flex items-center justify-between p-2 bg-secondary shadow-md">
      <h1 className="text-xl font-bold text-primary px-2">CodePad</h1>
      <div className="flex items-center space-x-2">
        <TooltipProvider>
          {iconActions.map(({ label, icon: Icon, action }) => (
            <Tooltip key={label}>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={action} aria-label={label}>
                  <Icon className="h-5 w-5 text-foreground hover:text-accent" />
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
