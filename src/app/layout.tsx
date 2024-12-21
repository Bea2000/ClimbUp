import './globals.css';
import { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'ClimbUp',
  description: 'ClimbUp',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" data-theme="light">
      <head>
        <link rel='manifest' id='manifest' />
      </head>
      <body>
        <Toaster position="top-right" />
        <div id='modal-root'></div>
        {children}
      </body>
    </html>
  );
}
