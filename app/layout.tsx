// app/layout.tsx
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { UserProvider } from '@/context/UserContext';
import './globals.css';

// Fonte Inter
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

// Metadata do site
export const metadata: Metadata = {
  title: 'Smartbet - Casa de Apostas Online',
  description: 'Smartbet - casa de aposta!',
};

// Configuração de viewport
export const viewport: Viewport = {
  themeColor: '#0d0d0d',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} font-sans antialiased bg-zinc-900`}>

        <UserProvider>
          {children}
        </UserProvider>

        {/* Analytics do Vercel */}
        <Analytics />
      </body>
    </html>
  );
}