"use client";

import type { FC } from 'react';
import { useState, useCallback } from 'react';
import { refactorCode, type RefactorCodeInput } from '@/ai/flows/refactor-code';
import { CodeEditor } from '@/components/codepad/CodeEditor';
import { RefactorControls } from '@/components/codepad/RefactorControls';
import { Toolbar } from '@/components/codepad/Toolbar';
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";

const CodePad: FC = () => {
  const [code, setCode] = useState<string>('<!DOCTYPE html>\n<html>\n<head>\n  <title>My Page</title>\n  <style>\n    body { font-family: sans-serif; background-color: #f0f0f0; color: #333; }\n    h1 { color: navy; }\n  </style>\n</head>\n<body>\n  <h1>Welcome!</h1>\n  <p>Edit the code and see the preview update.</p>\n  <script>\n    console.log("Hello from the script!");\n    // You can add more JS here\n  </script>\n</body>\n</html>');
  const [prompt, setPrompt] = useState<string>('Make the background blue and add a button that alerts "Clicked!"');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

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

  const handlePreview = useCallback(() => {
    try {
      const blob = new Blob([code], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const previewWindow = window.open(url, '_blank');
      if (!previewWindow) {
        toast({
          title: "Preview Error",
          description: "Failed to open preview window. Please allow popups for this site.",
          variant: "destructive",
        });
      }
      // Optional: Revoke the object URL when the preview window is closed
      // This is good practice but might be complex to implement reliably across browsers
      // if (previewWindow) {
      //   previewWindow.addEventListener('beforeunload', () => {
      //     URL.revokeObjectURL(url);
      //   });
      // } else {
      //   // Fallback: revoke after a delay if window didn't open
      //   setTimeout(() => URL.revokeObjectURL(url), 10000);
      // }
    } catch (error) {
      console.error("Preview failed:", error);
      toast({
        title: "Preview Error",
        description: `Failed to create preview. ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive",
      });
    }
  }, [code, toast]);


  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      <Toolbar onPreview={handlePreview} />
      <RefactorControls
        prompt={prompt}
        setPrompt={setPrompt}
        onRefactor={handleRefactor}
        isLoading={isLoading}
      />
      <div className="flex flex-1 overflow-hidden p-4">
        <div className="flex-1 flex flex-col min-w-0">
          <h2 className="text-sm font-medium mb-2 text-muted-foreground px-1">Editor</h2>
          <CodeEditor code={code} setCode={setCode} />
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default CodePad;
