import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

// Component to render PDF pages
const PdfViewer = ({ pdfFile, scale }) => {
  const [numPages, setNumPages] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
      {Array.from(new Array(numPages), (el, index) => (
        <Page key={`page_${index + 1}`} pageNumber={index + 1} scale={scale} />
      ))}
    </Document>
  );
};

// Overlay component to position text with selectable visibility
const TextOverlay = ({ textOverlay, scale }) => {
  return (
    // <div style={{ position: 'relative', pointerEvents: 'none' }}>
    <>
      {textOverlay.map((item, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            left: item.x * scale,
            top: item.y * scale,
            width: item.width * scale,
            height: item.height * scale,
            color: 'black',//,'transparent', // Make text invisible initially
            pointerEvents: 'auto', // Allow user to select and interact with the text
            // backgroundColor: 'lightgray', //'transparent', // Background is transparent initially
            userSelect: 'text', // Enable text selection
          }}
          className="selectable-text"
        >
          {item.text}
        </div>
      ))}
      {/* Global CSS for text selection */}
      <style jsx>{`
        .selectable-text::selection {
          color: black; /* Text becomes visible when selected */
          background-color: rgba(255, 255, 0, 0.5); /* Light yellow transparent background */
        }
      `}</style>
    {/* </div> */}
    </>
  );
};

// Combine PDF viewer and text overlay
const PdfViewerWithOverlay = ({ pdfFile, textOverlay, scale = 1.0 }) => {
  return (
    <div style={{ position: 'relative' }}>
      {/* PDF Viewer */}
      <PdfViewer pdfFile={pdfFile} scale={scale} />

      {/* Text Overlay */}
      <TextOverlay textOverlay={textOverlay} scale={scale} />
    </div>
  );
};

export default PdfViewerWithOverlay;