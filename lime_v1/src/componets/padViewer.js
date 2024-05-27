// src/PDFViewer.js
import React from 'react';
import Modal from 'antd/es/modal/Modal';
import { useLocation } from 'react-router-dom';

function PDFViewer({url , visible, handleCancel}) {
//   const location = useLocation();
//   const { pdfUrl } = location.state;
   console.log("in PDFViwer pdfviz:" , visible)
 

  return (
    <Modal
    title="Add reference manually"
    visible={visible}
    onCancel={handleCancel}
    footer={null}

  >
    <div>
      <h1>PDF Viewer</h1>
      <embed src={url} type="application/pdf" width="100%" height="100%" />
    </div>
    </Modal>
  );
}

export default PDFViewer;
