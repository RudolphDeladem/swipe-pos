import { useEffect, useRef } from "react";
import Quagga from "quagga";

function BarcodeScanner({ onDetected, onClose }) {
  const scannerRef = useRef(null);

  useEffect(() => {
    Quagga.init(
      {
        inputStream: {
          type: "LiveStream",
          target: scannerRef.current,
          constraints: {
            facingMode: "environment",
          },
        },
        decoder: {
          readers: [
            "ean_reader",
            "ean_8_reader",
            "code_128_reader",
            "code_39_reader",
            "upc_reader",
          ],
        },
        locate: true,
      },
      (err) => {
        if (err) {
          console.error("Scanner error:", err);
          return;
        }
        Quagga.start();
      }
    );

    Quagga.onDetected((result) => {
      const code = result.codeResult.code;
      if (code) {
        onDetected(code);
        Quagga.stop();
      }
    });

    return () => {
      Quagga.stop();
    };
  }, [onDetected]);

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 bg-black">
        <p className="text-white font-bold text-lg">Scan Barcode</p>
        <button
          onClick={onClose}
          className="text-white bg-gray-700 rounded-full w-8 h-8 flex items-center justify-center text-sm"
        >
          ✕
        </button>
      </div>

      {/* Camera View */}
      <div
        ref={scannerRef}
        className="flex-1 relative overflow-hidden"
      >
        {/* Scanning Guide */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <div className="border-2 border-green-400 rounded-xl w-64 h-32 relative">
            <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-green-400 rounded-tl-lg"></div>
            <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-green-400 rounded-tr-lg"></div>
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-green-400 rounded-bl-lg"></div>
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-green-400 rounded-br-lg"></div>
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-green-400 opacity-70"></div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-black px-4 py-4 text-center">
        <p className="text-gray-400 text-sm">
          Point your camera at a barcode
        </p>
      </div>
    </div>
  );
}

export default BarcodeScanner;