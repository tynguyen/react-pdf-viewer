import * as React from 'react';
import PdfWithTextOverlay from './PdfWithTextOverlay';
const App = () => {
  const textOverlay = [
    { text: 'Hello moto', x: 100, y: 120, width: 150, height: 20 },
    { text: 'This is a sample PDF file.', x: 100, y: 140, width: 250, height: 20 },
    { text: 'It contains multiple lines of text.', x: 100, y: 160, width: 300, height: 20 },
  ];

  return (
    <div>
      <h1>React PDF Viewer</h1>
      {/* This is where your PDF viewer will go */}
      <PdfWithTextOverlay pdfFile={"mock.pdf"} textOverlay={textOverlay}/>
    </div>
  );
};

export default App;
