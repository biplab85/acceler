import type { Metadata } from 'next';
import { Sora, Inter } from 'next/font/google';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { ContactDrawerProvider } from '@/components/ui/ContactDrawer';
import '@/styles/globals.scss';

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
  weight: ['600', '700'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['400', '500', '600'],
});

export const metadata: Metadata = {
  title: 'Acceler Investing — Data-Driven Property Advisory',
  description:
    'Sourcing high growth, maximum cashflow property analysing 15,000+ suburbs across Australia. Data-driven buyer\'s advocacy since 2020.',
  openGraph: {
    title: 'Acceler Investing — Data-Driven Property Advisory',
    description:
      'Sourcing high growth, maximum cashflow property analysing 15,000+ suburbs across Australia.',
    url: 'https://acceler.com.au',
    siteName: 'Acceler Investing',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sora.variable} ${inter.variable}`}>
      <body>
        <CustomCursor />
        <ContactDrawerProvider>
          {children}
        </ContactDrawerProvider>
      </body>
    </html>
  );
}
