import type { FC, ChangeEvent } from 'react';
import { Textarea } from '@/components/ui/textarea';

interface CodeEditorProps {
  code: string;
  setCode: (code: string) => void;
}

export const CodeEditor: FC<CodeEditorProps> = ({ code, setCode }) => {
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setCode(event.target.value);
  };

  return (
    <div className="editor-pane flex-1 bg-secondary rounded-lg shadow-inner"> {/* Use secondary background */}
      <Textarea
        value={code}
        onChange={handleChange}
        placeholder="Enter your code here..."
        className="editor-pane textarea focus-visible:ring-ring" // Use theme ring color
        aria-label="Code Editor"
      />
    </div>
  );
};
