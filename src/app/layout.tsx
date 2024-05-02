import type {Metadata} from 'next';
import {Almarai, Inter, Noto_Sans} from 'next/font/google';
import './globals.css';
import NavBar from '@/components/NavBar';

export const inter = Inter({
  subsets: ['latin'],  
  display: 'swap'
});
const notoSans = Noto_Sans({
  subsets: ['latin'],
  display: 'swap'
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
      <body className={notoSans.className}>
        <NavBar />
        <main className="flex min-h-screen flex-col items-center xs:p-2 bg-purple">
          {children}
        </main>
      </body>
    </html>
  );
}
