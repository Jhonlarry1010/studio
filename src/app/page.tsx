"use client";

import type { FC } from 'react';
import { useState } from 'react';
import { refactorCode, type RefactorCodeInput } from '@/ai/flows/refactor-code';
import { CodeEditor } from '@/components/codepad/CodeEditor';
// import { PreviewPane } from '@/components/codepad/PreviewPane'; // Removed PreviewPane import
import { RefactorControls } from '@/components/codepad/RefactorControls';
import { Toolbar } from '@/components/codepad/Toolbar';
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
// import { Separator } from '@/components/ui/separator'; // Keep separator import if needed elsewhere, but removed from layout

const CodePad: FC = () => {
  const [code, setCode] = useState<string>('<!DOCTYPE html>\n<html>\n<head>\n  <title>My Page</title>\n  <style>\n    body { font-family: sans-serif; background-color: #f0f0f0; color: #333; }\n    h1 { color: navy; }\n  </style>\n</head>\n<body>\n  <h1>Welcome!</h1>\n  <p>Edit the code and see the preview update.</p>\n  <script>\n    console.log("Hello from the script!");\n    // You can add more JS here\n  </script>\n</body>\n</html>');
  const [prompt, setPrompt] = useState<string>('Make the background blue and add a button that alerts "Clicked!"');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const handleRefactor = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Refactor Error",
        description: "Please enter a refactoring prompt.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const input: RefactorCodeInput = { code, prompt };
      const result = await refactorCode(input);
      setCode(result.refactoredCode);
      toast({
        title: "Refactor Successful",
        description: "Code has been refactored.",
      });
    } catch (error) {
      console.error("Refactor failed:", error);
      toast({
        title: "Refactor Error",
        description: `Failed to refactor code. ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      <Toolbar />
      {/* Removed top separator */}
      <RefactorControls
        prompt={prompt}
        setPrompt={setPrompt}
        onRefactor={handleRefactor}
        isLoading={isLoading}
      />
      {/* Removed middle separator */}
      <div className="flex flex-1 overflow-hidden p-4"> {/* Removed gap-4 */}
        <div className="flex-1 flex flex-col min-w-0">
          <h2 className="text-sm font-medium mb-2 text-muted-foreground px-1">Editor</h2> {/* Subtle heading */}
          <CodeEditor code={code} setCode={setCode} />
        </div>
        {/* Removed the vertical separator div and the PreviewPane container */}
      </div>
      <Toaster />
    </div>
  );
};

export default CodePad;
