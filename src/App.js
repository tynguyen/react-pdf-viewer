import * as React from 'react';
import PdfWithTextOverlay from './PdfWithTextOverlay';
const App = () => {
  return (
    <div>
      <h1>React PDF Viewer</h1>
      {/* This is where your PDF viewer will go */}
      <PdfWithTextOverlay pdfFile={"mock.pdf"} />
    </div>
  );
};

export default App;
