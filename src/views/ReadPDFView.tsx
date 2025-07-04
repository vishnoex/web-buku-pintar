"use client";

import React, { useState } from 'react';
import MainLayout from '@/components/templates/MainLayout';
import { Button } from '@/components/atoms/button';
import { ChevronLeft, Settings } from 'lucide-react';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

interface ReadPDFViewProps {
  slug: string;
}

const ReadPDFView: React.FC<ReadPDFViewProps> = ({ slug }) => {
  // Assume the PDF is in the public folder and slug is the filename (with .pdf)
  const url = `/books/Berbicara_Dari_Hati.pdf`;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const defaultLayout = defaultLayoutPlugin();

  console.log(slug);

  return (
    <MainLayout className="h-screen w-screen p-0 m-0">
      <div className="relative h-full">
        {/* Header */}
        <div className="fixed top-0 left-0 right-0 z-20 bg-white shadow-sm py-4 px-4 flex justify-between items-center">
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100" onClick={() => window.history.back()}>
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <span className="text-lg font-semibold">PDF Viewer</span>
          <div className="flex space-x-2">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100">
              <Settings className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* PDF Content */}
        <div style={{ height: '100vh', paddingTop: '60px' }}>
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.10.111/build/pdf.worker.min.js">
            <Viewer
              fileUrl={url}
              plugins={[defaultLayout]}
              onDocumentLoad={() => {
                setLoading(false);
                setError(null);
              }}
              // @ts-expect-error: onDocumentLoadError is not in types, but supported by react-pdf-viewer
              onDocumentLoadError={() => {
                setError('Failed to load PDF.');
                setLoading(false);
              }}
            />
          </Worker>
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-10">
              <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin" />
            </div>
          )}
          {error && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-10">
              <p className="text-red-500 text-lg">{error}</p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default ReadPDFView; 