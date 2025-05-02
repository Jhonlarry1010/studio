import type { Metadata } from 'next';
import { Inter } from 'next/font/google'; // Using Inter for a cleaner look, similar to VS Code UI fonts
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster'; // Ensure Toaster is imported

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans', // Changed from Geist to Inter
});

export const metadata: Metadata = {
  title: 'CodePad', // Updated title
  description: 'A VS Code clone with AI refactoring capabilities.', // Updated description
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark"> {/* Apply dark class to html tag */}
      <body className={cn('font-sans antialiased', inter.variable)}>
        {children}
        <Toaster /> {/* Add Toaster component here */}
      </body>
    </html>
  );
}
