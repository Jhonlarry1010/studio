import type { FC } from 'react';
import { useEffect, useState } from 'react';

interface PreviewPaneProps {
  code: string;
}

export const PreviewPane: FC<PreviewPaneProps> = ({ code }) => {
  const [iframeKey, setIframeKey] = useState(0);

  // Use effect to force iframe remount when code changes significantly
  // This helps clear old state/scripts if necessary
  useEffect(() => {
    setIframeKey(prevKey => prevKey + 1);
  }, [code]);

  return (
    <div className="preview-pane flex-1 bg-background rounded-lg shadow-inner overflow-hidden">
      <iframe
        key={iframeKey} // Change key to force remount on code change
        srcDoc={code}
        title="Code Preview"
        sandbox="allow-scripts allow-same-origin" // Basic sandbox for security, allowing scripts
        className="w-full h-full border-0"
        aria-label="Code Preview Area"
      />
    </div>
  );
};
