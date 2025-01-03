'use client';

import { Html5QrcodeScanner, Html5QrcodeSupportedFormats } from 'html5-qrcode';
import React, { useEffect, useRef } from 'react';

const scanRegionId = "html5qr-code-full-region";

interface QrScannerProps {
  onScan: (result: string) => void;
}

type ScanConfig = {
  fps: number;
  qrbox: { width: number; height: number };
  aspectRatio: number;
  formatsToSupport: Html5QrcodeSupportedFormats[];
  experimentalFeatures: {
    useBarCodeDetectorIfSupported: boolean;
  };
};

export default function QrScanner({ onScan }: QrScannerProps) {
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const memoizedScanHandler = useRef(onScan);

  useEffect(() => {
    memoizedScanHandler.current = onScan;
  }, [onScan]);

  useEffect(() => {
    const config: ScanConfig = {
      fps: 10,
      qrbox: { width: 250, height: 250 },
      aspectRatio: 1.0,
      formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE],
      experimentalFeatures: {
        useBarCodeDetectorIfSupported: true,
      },
    };

    if (scannerRef.current === null) {
      scannerRef.current = new Html5QrcodeScanner(
        scanRegionId,
        config,
        false,
      );
    }

    function qrCodeSuccessCallback(decodedText: string) {
      memoizedScanHandler.current(decodedText);
      scannerRef.current?.clear();
    }

    function qrCodeErrorCallback(error: string) {
      console.error(error);
    }

    setTimeout(() => {
      const container = document.getElementById(scanRegionId);
      if (scannerRef.current && container?.innerHTML === "") {
        scannerRef.current.render(qrCodeSuccessCallback, qrCodeErrorCallback);
      }
    }, 0);

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear();
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div
        id={scanRegionId}
        className="mx-auto w-full max-w-md overflow-hidden rounded-lg border border-purple-500 bg-gray-900 p-4 shadow-xl"
      />
      <style jsx global>{`
        #${scanRegionId} {
          min-height: 300px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        #${scanRegionId} video {
          border-radius: 0.5rem;
          max-width: 100%;
          height: auto;
        }
        #html5-qrcode-button-camera-permission {
          background: #8B5CF6 !important;
          color: white !important;
          border: none !important;
          padding: 0.5rem 1rem !important;
          border-radius: 0.375rem !important;
          margin: 0.5rem !important;
          cursor: pointer !important;
          font-size: 1rem !important;
        }
        #html5-qrcode-button-camera-start,
        #html5-qrcode-button-camera-stop {
          background: #8B5CF6 !important;
          color: white !important;
          border: none !important;
          padding: 0.5rem 1rem !important;
          border-radius: 0.375rem !important;
          margin: 0.5rem !important;
          cursor: pointer !important;
          font-size: 1rem !important;
        }
        #html5-qrcode-anchor-scan-type-change {
          display: none !important;
        }
        .html5-qrcode-element {
          background: transparent !important;
          border: none !important;
        }
        #html5qr-code-full-region__scan_region {
          background: transparent !important;
          position: relative !important;
          min-height: 200px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
        }
        #html5qr-code-full-region__dashboard_section {
          padding: 1rem !important;
          background: transparent !important;
          border: none !important;
          text-align: center !important;
        }
        #html5qr-code-full-region__header_message {
          color: white !important;
          margin-bottom: 1rem !important;
        }
        .html5-qrcode-element select {
          background: #374151 !important;
          color: white !important;
          border: 1px solid #6B7280 !important;
          border-radius: 0.375rem !important;
          padding: 0.5rem !important;
          margin: 0.5rem !important;
        }
        #html5qr-code-full-region__scan_region img {
          filter: invert(1) !important;
        }
        #html5qr-code-full-region__scan_region svg {
          fill: white !important;
          color: white !important;
        }
        #html5-qrcode-button-camera-start {
          font-size: 0 !important;
        }
        #html5-qrcode-button-camera-start::after {
          content: 'Iniciar escaneo' !important;
          font-size: 1rem !important;
        }

        #html5-qrcode-button-camera-stop {
          font-size: 0 !important;
        }
        #html5-qrcode-button-camera-stop::after {
          content: 'Detener escaneo' !important;
          font-size: 1rem !important;
        }

        #html5-qrcode-button-camera-permission {
          font-size: 0 !important;
        }
        #html5-qrcode-button-camera-permission::after {
          content: 'Permitir cámara' !important;
          font-size: 1rem !important;
        }
      `}</style>
    </div>
  );
} 
