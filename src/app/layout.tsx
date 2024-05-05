import type {Metadata} from 'next';
import './globals.css';
import NavBar from '@/components/NavBar';
import { notoSans } from './fonts';

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
        <main className="flex min-h-screen flex-col items-center xs:p-2 bg-[#9B5EF0]">
          {children}
        </main>
      </body>
    </html>
  );
}
