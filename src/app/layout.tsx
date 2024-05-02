import type {Metadata} from 'next';
import {Almarai, Inter} from 'next/font/google';
import './globals.css';
import NavBar from '@/components/NavBar';

const inter = Inter({subsets: ['latin'],  display: 'swap',});
const almarai = Almarai({
  subsets: ['arabic'],
  weight: '700',
});
export const metadata: Metadata = {
  title: 'Valita App',
  description: 'Anonyymisti palaute sovellus',
};

// export const revalidate = 0;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="fi">
      <body className={inter.className}>
        <NavBar font={almarai.className} />
        <main className="flex min-h-screen flex-col items-center xs:p-2 bg-gradient-to-br from-white to-light-orange via-light-blue">
          {children}
        </main>
      </body>
    </html>
  );
}
