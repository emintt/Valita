import type {Metadata} from 'next';
import {Almarai, Inter} from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import NavBar from '@/components/NavBar';

const inter = Inter({subsets: ['latin']});
const almarai = Almarai({
  subsets: ['arabic'],
  weight: '700'
});
export const metadata: Metadata = {
  title: 'Valita App',
  description: 'Anonyymisti palaute sovellus',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fi">
      <body className={inter.className}>
        <NavBar font={almarai.className} />
        <main className="flex min-h-screen flex-col items-center p-4">
          {children}
        </main>
      </body>
    </html>
  );
}
