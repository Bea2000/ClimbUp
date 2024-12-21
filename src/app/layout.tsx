import './globals.css';
import { Toaster } from 'react-hot-toast';

import Provider from '@/app/components/SessionProvider';

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
