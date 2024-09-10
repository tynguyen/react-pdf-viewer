import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
const A4_WIDTH = 595; // A4 width in pixels at 72 DPI

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

// Component to render PDF pages
const PdfViewerWithOverlay = ({ pdfFile, textOverlay, pageWidthPixels = A4_WIDTH}) => {
  const [pageScale, setPageScale] = useState(1); // Track the scale for responsiveness

  const onPageLoadSuccess = ({ originalWidth }) => {
    // Calculate the scale to maintain aspect ratio and responsiveness
    const scale = window.innerWidth / originalWidth;
    console.log('Scale is set to ', scale)
    setPageScale(scale < 1 ? scale : 1); // Scale down only, don't upscale beyond 1:1
  };
  
  const [numPages, setNumPages] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div style={{ maxWidth: '100%', width: pageWidthPixels + 'px', margin: '0 auto' }}>
      <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.from(new Array(numPages), (el, index) => (
          <div 
            key={`page_${index + 1}`} 
            style={{ 
              position: 'relative', 
              marginBottom: '20px', 
              width: '100%', // Make responsive
              maxWidth: `${pageWidthPixels}px`, // Limit to A4 width when needed
              margin: '0 auto' // Center the content
            }}
          >

            <Page 
              key={`page_${index + 1}`} 
              pageNumber={index + 1} 
              width={pageWidthPixels * pageScale}
              onLoadSuccess={onPageLoadSuccess}
            />

            <TextOverlay textOverlay={textOverlay[index]} pageScale={pageScale} />

        </div>
        ))}
      </Document>
    </div>
  );
};

// Overlay component to position text with selectable visibility
const TextOverlay = ({ textOverlay, pageScale }) => {
  console.log('Scale: ', pageScale);
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      }}
    >
      {textOverlay.map((item, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            left: `${item.x * pageScale}px`,
            top: `${item.y * pageScale}px`,
            width: `${item.width * pageScale}px`,
            height: `${item.height* pageScale}px`,
            // color: 'black',//,'transparent', // Make text invisible initially
            color: 'transparent',//,'transparent', // Make text invisible initially
            pointerEvents: 'auto', // Allow user to select and interact with the text
            // backgroundColor: 'lightgray', //'transparent', // Background is transparent initially
            backgroundColor: 'transparent', // Background is transparent initially
            userSelect: 'text', // Enable text selection
            fontSize: `${item.height * pageScale}px`, // Scale the font size
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
    </div>
  );
};

export default PdfViewerWithOverlay;