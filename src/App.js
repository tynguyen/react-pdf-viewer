import * as React from 'react';
import PdfWithTextOverlay from './PdfWithTextOverlay';

const A4_WIDTH = 595; // A4 width in pixels at 72 DPI

const App = () => {
  let textOverlay = [
    [
      { text: 'Hello A4', x: 100, y: 0, width: 150, height: 16 },
      { text: 'This is a sample PDF file.', x: 100, y: 120, width: 250, height: 16 },
      { text: 'It contains multiple lines of text.', x: 100, y: 140, width: 300, height: 16 },
    ]
  ];

  return (
    <div>
      <h1>React PDF Viewer</h1>
      {/* This is where your PDF viewer will go */}
      <PdfWithTextOverlay pdfFile={"mock.pdf"} textOverlay={textOverlay} pageWidthPixels={A4_WIDTH}/>
    </div>
  );
};

export default App;
