import React from 'react';
import { X } from 'lucide-react';

const QRCodeModal = ({ open, setOpen, qrCodeData }) => {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setOpen(false);
    }
  };

  if (!open) return null;

  return (
    <div 
      className="fixed inset-0 flex justify-center items-center bg-black/60 backdrop-blur-sm z-50 p-4"
      onClick={handleOverlayClick}
    >
      <div
        className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden 
        transform transition-all duration-300 ease-in-out scale-95 
        w-full max-w-md mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 to-purple-200/20 dark:from-blue-900/20 dark:to-purple-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Close Button */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-gray-100 dark:bg-gray-700 
          hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300 
          focus:outline-none focus:ring-2 focus:ring-offset-2 
          focus:ring-gray-300 dark:focus:ring-gray-500"
          aria-label="Close QR Code Modal"
        >
          <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        </button>

        {/* Modal Content */}
        <div className="relative z-10 p-6">
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              Scan QR Code
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Easily share this link by scanning the QR code
            </p>
          </div>

          {/* QR Code Container */}
          <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-inner mb-6 flex justify-center">
            <div className="border-4 border-gray-200 dark:border-gray-700 p-2 rounded-xl">
              <img
                src={qrCodeData}
                alt="QR Code"
                className="w-64 h-64 object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodeModal;