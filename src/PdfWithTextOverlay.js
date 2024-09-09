import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const PdfWithTextOverlay = ({ pdfFile}) => {
  const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div>
      <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.from(new Array(numPages), (el, index) => (
          <div key={`page_${index + 1}`} style={{ position: 'relative' }}>
            <Page pageNumber={index + 1} />
            {/* {extractedTextData[index + 1].map((text, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  top: `${text.top}%`, // Use OCR coordinates
                  left: `${text.left}%`,
                  width: `${text.width}%`,
                  height: `${text.height}%`,
                  backgroundColor: 'rgba(255, 255, 0, 0.3)',
                  pointerEvents: 'none', // Ensure text selection works without interference
                }}
              >
                {text.content}
              </div>
            ))} */}
          </div>
        ))}
      </Document>
    </div>
  );
};

export default PdfWithTextOverlay;