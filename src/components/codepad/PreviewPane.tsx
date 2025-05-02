import type { FC } from 'react';

interface PreviewPaneProps {
  code: string;
}

export const PreviewPane: FC<PreviewPaneProps> = ({ code }) => {
  // Basic preview - just displays the raw code in a pre tag
  // In a real app, this would involve parsing and syntax highlighting
  return (
    <div className="preview-pane flex-1">
      <pre>{code}</pre>
    </div>
  );
};
