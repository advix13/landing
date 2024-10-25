import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Quiz App</title>
        <meta name="description" content="Interactive quiz application with beautiful UI" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}