
"use client";

import type { FC } from 'react';
import { useState, useCallback, useEffect } from 'react';
import { refactorCode, type RefactorCodeInput } from '@/ai/flows/refactor-code';
import { CodeEditor } from '@/components/codepad/CodeEditor';
import { RefactorControls } from '@/components/codepad/RefactorControls';
import { Toolbar } from '@/components/codepad/Toolbar';
import { useToast } from "@/hooks/use-toast";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { useDebounce } from "@/hooks/use-debounce"; // Import debounce hook

const CodePad: FC = () => {
  const [code, setCode] = useState<string>('<!DOCTYPE html>\n<html>\n<head>\n  <title>My Page</title>\n  <style>\n    body { font-family: sans-serif; background-color: #f0f0f0; color: #333; padding: 1rem; }\n    h1 { color: navy; }\n    button { padding: 8px 16px; border-radius: 4px; cursor: pointer; background-color: #007bff; color: white; border: none; }\n    button:hover { background-color: #0056b3; }\n  </style>\n</head>\n<body>\n  <h1>Welcome!</h1>\n  <p>Edit the code and see the preview update.</p>\n  <button onclick="alert(\'Button clicked!\')">Click Me</button>\n  <script>\n    console.log("Hello from the script!");\n    // You can add more JS here\n  </script>\n</body>\n</html>');
  const [prompt, setPrompt] = useState<string>('Make the background light blue and change the button text to "Submit"');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const debouncedCode = useDebounce(code, 500); // Debounce code changes for preview

  const handleRefactor = useCallback(async () => {
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
  }, [code, prompt, toast]);

  // No longer needed as preview is inline
  // const handlePreview = useCallback(() => { ... }, [code, toast]);

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      {/* Remove onPreview prop */}
      <Toolbar />
      <RefactorControls
        prompt={prompt}
        setPrompt={setPrompt}
        onRefactor={handleRefactor}
        isLoading={isLoading}
      />
      <ResizablePanelGroup
        direction="horizontal"
        className="flex flex-1 overflow-hidden p-4 gap-4" // Added gap
      >
        <ResizablePanel defaultSize={50}>
          <div className="flex-1 flex flex-col min-w-0 h-full">
            <h2 className="text-sm font-medium mb-2 text-muted-foreground px-1">Editor</h2>
            <CodeEditor code={code} setCode={setCode} />
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50}>
          <div className="flex-1 flex flex-col min-w-0 h-full">
            <h2 className="text-sm font-medium mb-2 text-muted-foreground px-1">Preview</h2>
            <div className="preview-pane flex-1 bg-white rounded-lg shadow-inner overflow-auto">
              <iframe
                srcDoc={debouncedCode} // Use debounced code
                title="Preview"
                sandbox="allow-scripts allow-same-origin" // Security sandbox
                className="w-full h-full border-0"
                aria-label="Code Preview"
              />
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
      {/* Toaster is already in layout.tsx */}
    </div>
  );
};

export default CodePad;
