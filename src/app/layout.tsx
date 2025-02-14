import './globals.css';
import { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';

import Provider from '@/app/components/SessionProvider';

export const metadata: Metadata = {
  title: 'ClimbUp',
  description: 'ClimbUp es una plataforma especializada en la gestión de competencias de escalada, diseñada para optimizar la organización de eventos',
  keywords: [
    'escalada', 
    'competencias', 
    'boulder',
    'escalada chile',
    'escalada en chile',
    'deportes de montaña',
    'gimnasio de escalada',
    'entrenamiento escalada',
    'campeonatos de escalada',
    'comunidad escalada',
    'bouldering chile',
    'escalada deportiva',
    'rutas de escalada',
    'clases de escalada',
    'escaladores chilenos',
  ],
  icons: {
    icon: '/logo.svg',
    apple: '/logo.svg',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='es'>
      <Provider>
        <head>
          <link
            rel='manifest'
            id='manifest'
          />
        </head>
        <body>
          <Toaster
            position='top-right'
            reverseOrder={false}
          />
          <div id='modal-root'></div>
          {children}
        </body>
      </Provider>
    </html>
  );
}
