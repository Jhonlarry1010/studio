"use client";

import type { FC } from 'react';
import { useState } from 'react';
import { refactorCode, type RefactorCodeInput } from '@/ai/flows/refactor-code';
import { CodeEditor } from '@/components/codepad/CodeEditor';
import { PreviewPane } from '@/components/codepad/PreviewPane';
import { RefactorControls } from '@/components/codepad/RefactorControls';
import { Toolbar } from '@/components/codepad/Toolbar';
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { Separator } from '@/components/ui/separator';

const CodePad: FC = () => {
  const [code, setCode] = useState<string>('// Start typing your code here...\nfunction greet(name) {\n  console.log(`Hello, ${name}!`);\n}');
  const [prompt, setPrompt] = useState<string>('Convert this code to TypeScript.');
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
      <Separator />
      <RefactorControls
        prompt={prompt}
        setPrompt={setPrompt}
        onRefactor={handleRefactor}
        isLoading={isLoading}
      />
      <Separator />
      <div className="flex flex-1 overflow-hidden p-4 gap-4">
        <div className="flex-1 flex flex-col min-w-0">
          <h2 className="text-lg font-semibold mb-2 text-foreground">Editor</h2>
          <CodeEditor code={code} setCode={setCode} />
        </div>
        <Separator orientation="vertical" className="h-auto" />
        <div className="flex-1 flex flex-col min-w-0">
          <h2 className="text-lg font-semibold mb-2 text-foreground">Preview</h2>
          <PreviewPane code={code} />
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default CodePad;
